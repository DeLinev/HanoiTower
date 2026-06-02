import { useWoodTextures } from "../../hooks/useSceneTextures";

export default function Base3d({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
    const baseWidth = 60;
    const baseDepth = 20;
    const baseHeight = 0.5;

    const textures = useWoodTextures();

    return (
        <mesh position={position} receiveShadow>
            <boxGeometry args={[baseWidth, baseHeight, baseDepth]} />
            <meshStandardMaterial
                {...textures}
                color="#6b4226"
                roughness={0.75}
                metalness={0.0}
                envMapIntensity={0.3}
            />
        </mesh>
    );
}