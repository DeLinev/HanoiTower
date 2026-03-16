import { useRef } from "react";
import { useGameStateStore } from "../../stores/useGameStateStore";
import type { HanoiGameProps } from "../../types/ui.types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import * as THREE from "three";
import Tower3d from "./Tower3d";

function Light() {
    const lightRef = useRef<THREE.SpotLight>(null!)

    useHelper(lightRef, THREE.SpotLightHelper, 1)

    return (
        <spotLight
            ref={lightRef}
            position={[-60, 20, 10]}
            angle={0.2}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
        />
    )
}

export function Scene({ onTowerSelect, onDiskDrop, canDropOnTower, isGameActive }: HanoiGameProps) {
    const gameState = useGameStateStore(state => state.gameState);
    const towerSpacing = 18;
    const centerIndex = (gameState.towers.length - 1) / 2;

    return (
        <Canvas
            shadows
            camera={{
                position: [0, 5, 60],
                fov: 35,
                near: 0.1,
                far: 1000,
            }}
            gl={{
                antialias: true
            }}
        >
            <OrbitControls target={[0, 5, 0]} />
            <axesHelper args={[5]} />
            {/* <gridHelper args={[10, 10]} /> */}
            <ambientLight intensity={0.5} />
            <Light />
            <mesh position={[0, 0, 0]} receiveShadow>
                <boxGeometry args={[60, 0.5, 20]} />
                <meshStandardMaterial color="#8f8176" />
            </mesh>
            {gameState.towers.map((tower) => (
                <Tower3d 
                    key={tower.id} 
                    tower={tower} 
                    position={[(tower.id - centerIndex) * towerSpacing, 5, 0]} 
                    onClick={() => onTowerSelect(tower.id)}
                    isSelected={gameState.selectedTower === tower.id}
                    onDiskDrop={onDiskDrop}
                    canDropOnTower={canDropOnTower}
                    isGameActive={isGameActive}
                />
            ))}
        </Canvas>
    )
}