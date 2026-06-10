import { useMemo, useRef, useEffect, useCallback } from "react";
import type { Disk3dComponentProps } from "../../types/ui.types";
import * as THREE from "three";
import { getDisk3dThickness } from "../../constants/game.constants";
import { QUALITY } from "../../constants/quality.constants";
import { useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { usePlasticTextures } from "../../hooks/useSceneTextures";

const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const SNAP_THRESHOLD = 9;
const LIFT_Y = 14;

// Exponential-lerp speed: 20 → ~95% convergence in 0.15s
const LERP_SPEED = 20;
const WAYPOINT_SNAP = 0.12;

type Phase = "idle" | "dragging" | "animating" | "hovering" | "shaking";

export default function Disk3d({
    disk,
    towerId,
    isTopDisk,
    isGameActive,
    targetPosition,
    towerPositions,
    onDiskDrop,
    canDropOnTower,
    getDropTargetY,
}: Disk3dComponentProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const phase = useRef<Phase>("idle");

    const idleTarget = useRef(new THREE.Vector3(...targetPosition));
    const dragPos = useRef(new THREE.Vector3());
    const waypoints = useRef<THREE.Vector3[]>([]);
    const wpIndex = useRef(0);
    const onAnimDone = useRef<(() => void) | null>(null);

    const hoverTarget = useRef(new THREE.Vector3());
    const shakeStart = useRef(0);

    const cleanupDrag = useRef<(() => void) | null>(null);

    // Reusable THREE objects to avoid GC pressure in the render loop
    const raycaster = useRef(new THREE.Raycaster());
    const ndc = useRef(new THREE.Vector2());
    const planeHit = useRef(new THREE.Vector3());

    const { camera, gl } = useThree();

    useEffect(() => {
        // Only update idle target when we're at rest — prevents mid-animation teleporting
        if (phase.current === "idle") {
            idleTarget.current.set(...targetPosition);
        }
    }, [targetPosition]);

    useEffect(() => {
        return () => { cleanupDrag.current?.(); };
    }, []);

    // GameKeyboardControls dispatches granular events per interaction step.
    // Each Disk3d instance filters by its own disk.id.
    useEffect(() => {
        const isMe = (e: Event) => (e as CustomEvent).detail.diskId === disk.id;

        const onLift = (e: Event) => {
            if (!isMe(e) || phase.current !== "idle") return;
            const { targetX, liftY } = (e as CustomEvent).detail;
            hoverTarget.current.set(targetX, liftY, 0);
            phase.current = "hovering";
        };

        const onFollow = (e: Event) => {
            if (!isMe(e) || phase.current !== "hovering") return;
            hoverTarget.current.x = (e as CustomEvent).detail.targetX;
        };

        const onDrop = (e: Event) => {
            if (!isMe(e)) return;
            const { fromTowerId, toTowerId, waypoints: wps } = (e as CustomEvent).detail;
            waypoints.current = wps;
            wpIndex.current = 0;
            phase.current = "animating";
            onAnimDone.current = () => onDiskDrop(fromTowerId, toTowerId);
        };

        const onCancel = (e: Event) => {
            if (!isMe(e)) return;
            if (phase.current !== "hovering" && phase.current !== "shaking") return;
            waypoints.current = [idleTarget.current.clone()];
            wpIndex.current = 0;
            phase.current = "animating";
            onAnimDone.current = null;
        };

        const onShake = (e: Event) => {
            if (!isMe(e) || phase.current !== "hovering") return;
            shakeStart.current = performance.now() / 1000;
            phase.current = "shaking";
        };

        window.addEventListener("kb-disk-lift", onLift);
        window.addEventListener("kb-disk-follow", onFollow);
        window.addEventListener("kb-disk-drop", onDrop);
        window.addEventListener("kb-disk-cancel", onCancel);
        window.addEventListener("kb-disk-shake", onShake);
        return () => {
            window.removeEventListener("kb-disk-lift", onLift);
            window.removeEventListener("kb-disk-follow", onFollow);
            window.removeEventListener("kb-disk-drop", onDrop);
            window.removeEventListener("kb-disk-cancel", onCancel);
            window.removeEventListener("kb-disk-shake", onShake);
        };
    }, [disk.id, onDiskDrop]);

    const screenToWorld = useCallback(
        (sx: number, sy: number): THREE.Vector3 | null => {
            const rect = gl.domElement.getBoundingClientRect();
            ndc.current.set(
                ((sx - rect.left) / rect.width) * 2 - 1,
                -((sy - rect.top) / rect.height) * 2 + 1,
            );
            raycaster.current.setFromCamera(ndc.current, camera);
            const hit = raycaster.current.ray.intersectPlane(dragPlane, planeHit.current);
            return hit ? planeHit.current.clone() : null;
        },
        [camera, gl],
    );

    const findNearestTower = useCallback(
        (worldX: number) => {
            let bestIdx = 0;
            let bestDist = Infinity;
            towerPositions.forEach((tp, i) => {
                const d = Math.abs(tp[0] - worldX);
                if (d < bestDist) { bestDist = d; bestIdx = i; }
            });
            return { index: bestIdx, distance: bestDist };
        },
        [towerPositions],
    );

    const handlePointerDown = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            if (!isTopDisk || !isGameActive || phase.current !== "idle") return;
            if (e.nativeEvent.button !== 0) return;
            e.stopPropagation();

            phase.current = "dragging";

            const w = screenToWorld(e.nativeEvent.clientX, e.nativeEvent.clientY);
            if (w) dragPos.current.copy(w);

            const canvas = gl.domElement;
            canvas.style.cursor = "grabbing";

            const onMove = (ev: PointerEvent) => {
                const w = screenToWorld(ev.clientX, ev.clientY);
                if (w) dragPos.current.copy(w);
            };

            const cleanup = () => {
                canvas.removeEventListener("pointermove", onMove);
                canvas.removeEventListener("pointerup", onUp);
                canvas.removeEventListener("lostpointercapture", onLostCapture);
                canvas.style.cursor = "";
                cleanupDrag.current = null;
            };

            const onUp = (ev: PointerEvent) => {
                cleanup();
                try { canvas.releasePointerCapture(ev.pointerId); } catch { /* ok */ }
                if (phase.current !== "dragging") return;

                const dropX = dragPos.current.x;
                const { index: nearest, distance } = findNearestTower(dropX);

                const valid =
                    distance < SNAP_THRESHOLD &&
                    nearest !== towerId &&
                    canDropOnTower(towerId, nearest);

                if (valid) {
                    const targetX = towerPositions[nearest][0];
                    const targetY = getDropTargetY(nearest);
                    const curPos = meshRef.current.position;
                    waypoints.current = [
                        new THREE.Vector3(curPos.x, LIFT_Y, 0),
                        new THREE.Vector3(targetX,  LIFT_Y, 0),
                        new THREE.Vector3(targetX,  targetY, 0),
                    ];
                    wpIndex.current = 0;
                    phase.current = "animating";
                    onAnimDone.current = () => onDiskDrop(towerId, nearest);
                } else {
                    waypoints.current = [new THREE.Vector3(...targetPosition)];
                    wpIndex.current = 0;
                    phase.current = "animating";
                    onAnimDone.current = null;
                }
            };

            const onLostCapture = () => {
                cleanup();
                waypoints.current = [new THREE.Vector3(...targetPosition)];
                wpIndex.current = 0;
                phase.current = "animating";
                onAnimDone.current = null;
            };

            canvas.addEventListener("pointermove", onMove);
            canvas.addEventListener("pointerup", onUp);
            canvas.addEventListener("lostpointercapture", onLostCapture);
            cleanupDrag.current = cleanup;

            try { canvas.setPointerCapture(e.nativeEvent.pointerId); } catch { /* ok */ }
        },
        [isTopDisk, isGameActive, towerId, towerPositions,
         canDropOnTower, onDiskDrop, getDropTargetY,
         targetPosition, screenToWorld, findNearestTower, gl],
    );

    useFrame((_, delta) => {
        if (!meshRef.current) return;
        const pos = meshRef.current.position;

        // Frame-rate-independent exponential lerp
        const t = 1 - Math.exp(-LERP_SPEED * delta);

        switch (phase.current) {
            case "dragging":
                pos.copy(dragPos.current);
                break;

            case "animating": {
                const wp = waypoints.current[wpIndex.current];
                if (!wp) { phase.current = "idle"; break; }

                pos.lerp(wp, t);

                if (pos.distanceTo(wp) < WAYPOINT_SNAP) {
                    pos.copy(wp);
                    wpIndex.current += 1;

                    if (wpIndex.current >= waypoints.current.length) {
                        phase.current = "idle";
                        // Sync idle target to final position so the idle lerp
                        // doesn't drift for one frame before the useEffect
                        // catches the new targetPosition from the store.
                        idleTarget.current.copy(pos);
                        onAnimDone.current?.();
                        onAnimDone.current = null;
                    }
                }
                break;
            }

            case "hovering":
                pos.lerp(hoverTarget.current, t);
                break;

            case "shaking": {
                const elapsed = performance.now() / 1000 - shakeStart.current;
                const DURATION = 0.4;
                const AMPLITUDE = 1.5;
                const FREQ = 25;

                if (elapsed > DURATION) {
                    phase.current = "hovering";
                    break;
                }

                // Decaying sine wave: rapid oscillation that fades to zero
                const decay = 1 - elapsed / DURATION;
                const offset = Math.sin(elapsed * FREQ) * AMPLITUDE * decay;
                pos.lerp(hoverTarget.current, t);
                pos.x += offset;
                break;
            }

            case "idle":
            default:
                pos.lerp(idleTarget.current, t);
                break;
        }
    });

    const DISK_COLORS = [
        "#d94040", "#e08530", "#c9b835", "#45a86f",
        "#3a8fd6", "#5b5fc7", "#9346b0", "#d44882",
    ];
    const color = DISK_COLORS[disk.size - 1] || DISK_COLORS[0];
    const calculatedWidth = 2 + disk.size * 0.5;
    const outerRadius = Math.max(2, calculatedWidth);
    const innerRadius = 1;
    const thickness = getDisk3dThickness(disk.size);

    const geometry = useMemo(() => {
        const edge = thickness * 0.3;
        const path = new THREE.Path();

        path.moveTo(innerRadius, 0);
        path.lineTo(outerRadius - edge, 0);
        path.quadraticCurveTo(outerRadius, 0, outerRadius, edge);
        path.lineTo(outerRadius, thickness - edge);
        path.quadraticCurveTo(outerRadius, thickness, outerRadius - edge, thickness);
        path.lineTo(innerRadius, thickness);

        const points = path.getPoints(QUALITY.diskProfileSamples);
        return new THREE.LatheGeometry(points, QUALITY.diskRadialSegments);
    }, [outerRadius, innerRadius, thickness]);

    const textures = usePlasticTextures();

    return (
        <mesh
            ref={meshRef}
            position={targetPosition}
            onPointerDown={handlePointerDown}
            onPointerOver={() => {
                if (isTopDisk && isGameActive && phase.current === "idle") {
                    gl.domElement.style.cursor = "grab";
                }
            }}
            onPointerOut={() => {
                if (phase.current !== "dragging") {
                    gl.domElement.style.cursor = "";
                }
            }}
            geometry={geometry}
            castShadow
            receiveShadow
        >
            <meshPhysicalMaterial
                {...textures}
                color={color}
                roughness={0.35}
                metalness={0.0}
                clearcoat={0.6}
                clearcoatRoughness={0.15}
                envMapIntensity={0.8}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}