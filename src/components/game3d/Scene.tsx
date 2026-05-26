import { useMemo, useRef, useCallback } from "react";
import { useGameStateStore } from "../../stores/useGameStateStore";
import type { HanoiGameProps } from "../../types/ui.types";
import { Canvas } from "@react-three/fiber";
import { Environment, useHelper } from "@react-three/drei";
import { getDisk3dThickness } from "../../constants/game.constants";
import * as THREE from "three";
import Tower3d from "./Tower3d";
import Disk3d from "./Disk3d";

// ── lighting ─────────────────────────────────────────────────────
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

// ── scene ────────────────────────────────────────────────────────
export function Scene({ onTowerSelect, onDiskDrop, canDropOnTower, isGameActive }: HanoiGameProps) {
    const gameState = useGameStateStore(state => state.gameState);
    const towerSpacing = 18;
    const centerIndex = (gameState.towers.length - 1) / 2;

    // X / Y / Z base position for each tower rod.
    const towerPositions = useMemo(() => {
        return gameState.towers.map((_, index) => 
            [(index - centerIndex) * towerSpacing, 5, 0] as [number, number, number]
        );
    }, [gameState.towers.length, centerIndex, towerSpacing]);

    // ── flat list of every disk with its computed resting position ─
    const allDiskData = useMemo(() => {
        const DISK_BASE_Y = 0.26; // just above the ground box

        return gameState.towers.flatMap((tower) => {
            const towerPos = towerPositions[tower.id];
            let stackedHeight = 0;

            return tower.disks.map((disk, index) => {
                const diskY = DISK_BASE_Y + stackedHeight;
                stackedHeight += getDisk3dThickness(disk.size);

                return {
                    disk,
                    towerId: tower.id,
                    isTopDisk: index === tower.disks.length - 1,
                    targetPosition: [towerPos[0], diskY, towerPos[2]] as [number, number, number],
                };
            });
        });
    }, [gameState.towers, towerPositions]);

    /**
     * Given a tower id, return the Y coordinate where the next
     * disk would rest if dropped on top of that tower's current stack.
     * This is called by Disk3d to build its drop‑animation waypoints
     * *before* the game state is updated.
     */
    const getDropTargetY = useCallback(
        (targetTowerId: number) => {
            const DISK_BASE_Y = 0.26;
            const tower = gameState.towers[targetTowerId];
            let y = DISK_BASE_Y;
            for (const d of tower.disks) {
                y += getDisk3dThickness(d.size);
            }
            return y;
        },
        [gameState.towers],
    );

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
            {/* <OrbitControls target={[0, 5, 0]} /> */}
            <axesHelper args={[5]} />
            {/* <gridHelper args={[10, 10]} /> */}
            {/* <ambientLight intensity={0.5} /> */}
            <Light />
            <Environment preset="sunset" />
            <mesh position={[0, 0, 0]} receiveShadow>
                <boxGeometry args={[60, 0.5, 20]} />
                <meshStandardMaterial color="#a37858" />
            </mesh>

            {/* ── tower rods (no disks) ───────────────────────── */}
            {gameState.towers.map((tower) => (
                <Tower3d
                    key={tower.id}
                    tower={tower}
                    position={towerPositions[tower.id]}
                    onClick={() => onTowerSelect(tower.id)}
                    isSelected={gameState.selectedTower === tower.id}
                />
            ))}

            {/* ── all disks rendered here (flat, not nested) ──── */}
            {allDiskData.map(({ disk, towerId, isTopDisk, targetPosition }) => (
                <Disk3d
                    key={disk.id}
                    disk={disk}
                    towerId={towerId}
                    isTopDisk={isTopDisk}
                    isGameActive={isGameActive}
                    targetPosition={targetPosition}
                    towerPositions={towerPositions}
                    onDiskDrop={onDiskDrop}
                    canDropOnTower={canDropOnTower}
                    getDropTargetY={getDropTargetY}
                />
            ))}
        </Canvas>
    )
}