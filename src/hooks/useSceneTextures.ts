import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const WOOD_DIR = "textures/Wood027_2K-JPG/Wood027_2K-JPG";
const METAL_DIR = "textures/Metal055A_2K-JPG/Metal055A_2K-JPG";
const PLASTIC_DIR = "textures/Plastic010_2K-JPG/Plastic010_2K-JPG";

function configureTextures(
    textures: Record<string, THREE.Texture>,
    repeatX: number,
    repeatY: number,
) {
    Object.values(textures).forEach(tex => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeatX, repeatY);
    });
    return textures;
}

export function useWoodTextures() {
    const textures = useTexture({
        map: `${WOOD_DIR}_Color.jpg`,
        normalMap: `${WOOD_DIR}_NormalGL.jpg`,
        roughnessMap: `${WOOD_DIR}_Roughness.jpg`,
    });

    return useMemo(
        () => configureTextures(textures, 4, 2),
        [textures],
    );
}

export function useMetalTextures() {
    const textures = useTexture({
        map: `${METAL_DIR}_Color.jpg`,
        normalMap: `${METAL_DIR}_NormalGL.jpg`,
        roughnessMap: `${METAL_DIR}_Roughness.jpg`,
        metalnessMap: `${METAL_DIR}_Metalness.jpg`,
    });

    return useMemo(
        () => configureTextures(textures, 1, 2),
        [textures],
    );
}

export function usePlasticTextures() {
    const textures = useTexture({
        map: `${PLASTIC_DIR}_Color.jpg`,
        normalMap: `${PLASTIC_DIR}_NormalGL.jpg`,
        roughnessMap: `${PLASTIC_DIR}_Roughness.jpg`,
    });

    return useMemo(
        () => configureTextures(textures, 1, 1),
        [textures],
    );
}

useTexture.preload(`${WOOD_DIR}_Color.jpg`);
useTexture.preload(`${WOOD_DIR}_NormalGL.jpg`);
useTexture.preload(`${WOOD_DIR}_Roughness.jpg`);

useTexture.preload(`${METAL_DIR}_Color.jpg`);
useTexture.preload(`${METAL_DIR}_NormalGL.jpg`);
useTexture.preload(`${METAL_DIR}_Roughness.jpg`);
useTexture.preload(`${METAL_DIR}_Metalness.jpg`);

useTexture.preload(`${PLASTIC_DIR}_Color.jpg`);
useTexture.preload(`${PLASTIC_DIR}_NormalGL.jpg`);
useTexture.preload(`${PLASTIC_DIR}_Roughness.jpg`);
