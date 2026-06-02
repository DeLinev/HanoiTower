import type { Tower3dProps } from "../../types/ui.types";
import { QUALITY } from "../../constants/quality.constants";
import * as THREE from "three";
import { useMetalTextures } from "../../hooks/useSceneTextures";

export default function Tower3d({ position, onClick, isSelected }: Tower3dProps) {
    const towerWidth = 1;
    const towerHeight = 10;
    const [x, y, z] = position;

    const rodColor = isSelected ? "#c0c8d0" : "#8a9199";
    const rodMetalness = 0.85;
    const rodRoughness = isSelected ? 0.18 : 0.28;

    const textures = useMetalTextures();

    return (
        <group>
            <mesh position={position} castShadow receiveShadow onClick={onClick}>
                <cylinderGeometry args={[
                    towerWidth, towerWidth, towerHeight,
                    QUALITY.towerRadialSegments,
                ]} />
                <meshStandardMaterial
                    {...textures}
                    color={rodColor}
                    metalness={rodMetalness}
                    roughness={rodRoughness}
                    envMapIntensity={1.0}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh position={[x, y + towerHeight / 2, z]} castShadow receiveShadow>
                <sphereGeometry args={[
                    1,
                    QUALITY.towerCapSegments[0],
                    QUALITY.towerCapSegments[1],
                ]} />
                <meshStandardMaterial
                    {...textures}
                    color={rodColor}
                    metalness={rodMetalness}
                    roughness={rodRoughness}
                    envMapIntensity={1.0}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}