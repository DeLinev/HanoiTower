import { useMemo } from "react";
import type { Disk3dComponentProps } from "../../types/ui.types";
import * as THREE from "three";
import { getDisk3dThickness } from "../../constants/game.constants";

export default function Disk3d({ disk, towerId, isTopDisk, isGameActive, position }: Disk3dComponentProps) {
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
        <mesh position={position} geometry={geometry} castShadow>
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
    )
}