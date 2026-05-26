import type { Tower3dProps } from "../../types/ui.types";

/**
 * Tower3d — renders only the rod and cap sphere.
 *
 * Disks are no longer children of Tower3d.  They are rendered at the
 * Scene level so that moving a disk between towers does NOT cause
 * React to unmount / remount the Disk3d component (which would
 * destroy any in‑flight animation state).
 */
export default function Tower3d({ tower, position, onClick, isSelected }: Tower3dProps) {
    const towerWidth = 1;
    const towerHeight = 10;
    const [x, y, z] = position;

    return (
        <group>
            <mesh position={position} castShadow receiveShadow onClick={onClick}>
                <cylinderGeometry args={[towerWidth, towerWidth, towerHeight, 32]} />
                <meshStandardMaterial color={isSelected ? "#b0b0b0" : "grey"} />
            </mesh>

            <mesh position={[x, y + towerHeight / 2, z]} castShadow receiveShadow>
                <sphereGeometry args={[1, 32, 16]} />
                <meshStandardMaterial color={isSelected ? "#b0b0b0" : "grey"} />
            </mesh>
        </group>
    );
}