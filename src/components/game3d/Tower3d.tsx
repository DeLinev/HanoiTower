import type { Tower3dProps } from "../../types/ui.types";
import { QUALITY } from "../../constants/quality.constants";
import * as THREE from "three";
import { useMetalTextures } from "../../hooks/useSceneTextures";

type ExtendedTower3dProps = Tower3dProps & {
    isFocused: boolean;
};

export default function Tower3d({ position, onClick, isSelected, isFocused }: ExtendedTower3dProps) {
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

            {isFocused && (
                <mesh
                    position={[x, 0.27, z]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <ringGeometry args={[5, 5.5, 48]} />
                    <meshStandardMaterial
                        color="#fbbf24"
                        emissive="#fbbf24"
                        emissiveIntensity={0.6}
                        transparent
                        opacity={0.7}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
        </group>
    );
}