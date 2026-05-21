import { useMemo, useRef, useEffect } from "react";
import type { Disk3dComponentProps } from "../../types/ui.types";
import * as THREE from "three";
import { getDisk3dThickness } from "../../constants/game.constants";
import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import type { ThreeEvent } from "@react-three/fiber";

const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const intersectPoint = new THREE.Vector3();

export default function Disk3d({ disk, towerId, isTopDisk, isGameActive, position, towerPositions, onDiskDrop, canDropOnTower }: Disk3dComponentProps) {
    // 1. Create a lock to protect the spring from parent re-renders
    const isDragging = useRef(false);

    const [spring, api] = useSpring(() => ({
        position: position,
        config: { friction: 20, tension: 200 }
    }));

    // 2. Safely sync position changes from the parent ONLY if we aren't dragging
    useEffect(() => {
        if (!isDragging.current) {
            api.start({ position: position });
        }
    }, [position, api]);

    const bind = useDrag(({ active, first, last, event }) => {
        const r3fEvent = event as unknown as ThreeEvent<PointerEvent>;

        // 3. Lock the pointer to the mesh as soon as the click happens
        if (first) {
            isDragging.current = true;
            (r3fEvent.target as any).setPointerCapture(r3fEvent.pointerId);
        }

        // Keep following the cursor while the drag is in progress.
        if (active && r3fEvent.ray && isTopDisk && isGameActive) {
            r3fEvent.ray.intersectPlane(dragPlane, intersectPoint);
            api.start({
                position: [intersectPoint.x, intersectPoint.y, 0]
            });
        }

        // 4. Unlock everything ONLY when the mouse button is physically released
        if (last) {
            isDragging.current = false;
            (r3fEvent.target as any).releasePointerCapture?.(r3fEvent.pointerId);
            
            // Your snap logic can safely go here once you uncomment it
        }
    });

    const width = 2;

    const colors = [
        '#ff0000',   // red
        '#ff9800',   // orange
        '#ffff00',   // yellow
        '#4caf50',   // green
        '#2196f3',   // blue
        '#3f51b5',   // indigo
        '#9c27b0',   // purple
        '#e91e63',   // pink
    ];

    const color = colors[disk.size - 1] || colors[0];

    const calculatedWidth = width + (disk.size * 0.5);
    const outerRadius = calculatedWidth < 2 ? 2 : calculatedWidth;
    const innerRadius = 1;
    const thickness = getDisk3dThickness(disk.size);

    const geometry = useMemo(() => {
        const edge = thickness * 0.3

        const path = new THREE.Path();

        path.moveTo(innerRadius, 0);
        path.lineTo(outerRadius - edge, 0);
        path.quadraticCurveTo(outerRadius, 0, outerRadius, edge);
        path.lineTo(outerRadius, thickness - edge);
        path.quadraticCurveTo(outerRadius, thickness, outerRadius - edge, thickness);
        path.lineTo(innerRadius, thickness);

        const points = path.getPoints(64);

        return new THREE.LatheGeometry(points, 64)
    }, [outerRadius, innerRadius, thickness])

    return (
        <animated.mesh {...spring} {...bind()} geometry={geometry} castShadow>
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </animated.mesh>
    )
}