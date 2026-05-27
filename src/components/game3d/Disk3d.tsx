import { useMemo, useRef, useEffect, useCallback } from "react";
import type { Disk3dComponentProps } from "../../types/ui.types";
import * as THREE from "three";
import { getDisk3dThickness } from "../../constants/game.constants";
import { useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";

/** Invisible plane at z = 0 used to project the pointer into world space. */
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
/** Max X‑distance (world units) from a tower center for a drop to register. */
const SNAP_THRESHOLD = 9;
/** Y coordinate the disk lifts to during the fly‑over animation. */
const LIFT_Y = 14;
/**
 * Exponential‑lerp speed factor.  Higher = faster convergence.
 *   5 → ~95 % in 0.6 s     10 → ~95 % in 0.3 s     15 → ~95 % in 0.2 s
 */
const LERP_SPEED = 20;
/** Distance below which we "snap" exactly to a waypoint target. */
const WAYPOINT_SNAP = 0.12;

type Phase = "idle" | "dragging" | "animating";

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

    /** Where the idle lerp is heading. */
    const idleTarget = useRef(new THREE.Vector3(...targetPosition));
    /** Live cursor position while dragging. */
    const dragPos = useRef(new THREE.Vector3());
    /** Ordered list of positions the disk must visit after a drop. */
    const waypoints = useRef<THREE.Vector3[]>([]);
    const wpIndex = useRef(0);
    /** Callback fired after the last waypoint is reached. */
    const onAnimDone = useRef<(() => void) | null>(null);

    /** Stored so we can clean up window listeners on unmount. */
    const cleanupDrag = useRef<(() => void) | null>(null);

    // Re-usable THREE objects – avoids GC churn in the hot path.
    const raycaster = useRef(new THREE.Raycaster());
    const ndc = useRef(new THREE.Vector2());
    const planeHit = useRef(new THREE.Vector3());

    const { camera, gl } = useThree();

    useEffect(() => {
        // Only overwrite the target when we're not mid-drag / mid-anim,
        // so that a re-render during a spring animation can't teleport
        // the disk.
        if (phase.current === "idle") {
            idleTarget.current.set(...targetPosition);
        }
    }, [targetPosition]);

    useEffect(() => {
        return () => { cleanupDrag.current?.(); };
    }, []);

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
            e.stopPropagation();

            phase.current = "dragging";

            // Lift the disk to the cursor immediately
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
                    // lift → fly → drop
                    const targetX = towerPositions[nearest][0];
                    const targetY = getDropTargetY(nearest);
                    const curPos = meshRef.current.position;
                    waypoints.current = [
                        new THREE.Vector3(curPos.x, LIFT_Y, 0),   // 1. lift
                        new THREE.Vector3(targetX,  LIFT_Y, 0),   // 2. fly
                        new THREE.Vector3(targetX,  targetY, 0),  // 3. drop
                    ];
                    wpIndex.current = 0;
                    phase.current = "animating";
                    onAnimDone.current = () => {
                        onDiskDrop(towerId, nearest);
                    };
                } else {
                    // Invalid / same tower → glide back
                    waypoints.current = [
                        new THREE.Vector3(...targetPosition),
                    ];
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

        // Frame-rate-independent exponential lerp factor.
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
                    pos.copy(wp);           // snap exactly
                    wpIndex.current += 1;

                    if (wpIndex.current >= waypoints.current.length) {
                        phase.current = "idle";
                        // Sync idle target to wherever the animation ended
                        // (prevents a one‑frame drift before the useEffect
                        //  fires with the new targetPosition from the store).
                        idleTarget.current.copy(pos);
                        onAnimDone.current?.();
                        onAnimDone.current = null;
                    }
                }
                break;
            }

            case "idle":
            default:
                pos.lerp(idleTarget.current, t);
                break;
        }
    });

    const width = 2;

    const colors = [
        "#ff0000", "#ff9800", "#ffff00", "#4caf50",
        "#2196f3", "#3f51b5", "#9c27b0", "#e91e63",
    ];
    const color = colors[disk.size - 1] || colors[0];

    const calculatedWidth = width + disk.size * 0.5;
    const outerRadius = calculatedWidth < 2 ? 2 : calculatedWidth;
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

        const points = path.getPoints(64);
        return new THREE.LatheGeometry(points, 64);
    }, [outerRadius, innerRadius, thickness]);

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
        >
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
    );
}