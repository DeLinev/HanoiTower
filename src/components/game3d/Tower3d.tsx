import type { Tower3dProps } from "../../types/ui.types";
import { QUALITY } from "../../constants/quality.constants";
import * as THREE from "three";

export default function Tower3d({ position, onClick, isSelected }: Tower3dProps) {
    const towerWidth = 1;
    const towerHeight = 10;
    const [x, y, z] = position;

    return (
        <group>
            <mesh position={position} castShadow receiveShadow onClick={onClick}>
                <cylinderGeometry args={[
                    towerWidth, towerWidth, towerHeight,
                    QUALITY.towerRadialSegments,
                ]} />
                <meshStandardMaterial color={isSelected ? "#b0b0b0" : "grey"} side={THREE.DoubleSide} />
            </mesh>

            <mesh position={[x, y + towerHeight / 2, z]} castShadow receiveShadow>
                <sphereGeometry args={[
                    1,
                    QUALITY.towerCapSegments[0],
                    QUALITY.towerCapSegments[1],
                ]} />
                <meshStandardMaterial color={isSelected ? "#b0b0b0" : "grey"} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}