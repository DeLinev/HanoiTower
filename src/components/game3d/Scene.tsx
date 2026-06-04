import { Suspense, useMemo, useRef, useCallback, useEffect } from "react";
import { useGameStateStore } from "../../stores/useGameStateStore";
import type { HanoiGameProps } from "../../types/ui.types";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getDisk3dThickness } from "../../constants/game.constants";
import { QUALITY } from "../../constants/quality.constants";
import * as THREE from "three";
import Tower3d from "./Tower3d";
import Disk3d from "./Disk3d";
import Base3d from "./Base3d";
import { KeyboardControls } from "./KeyboardControls";

function Lights() {
    return (
        <group>
            <spotLight
                position={[-30, 25, 20]}
                angle={0.3}
                penumbra={0.8}
                decay={0}
                intensity={Math.PI * 0.9}
                color="#fff5e6"
                castShadow
                shadow-mapSize-width={QUALITY.shadowMapSize}
                shadow-mapSize-height={QUALITY.shadowMapSize}
                shadow-bias={-0.0001}
                shadow-normalBias={0.02}
                shadow-camera-near={1}
                shadow-camera-far={80}
                shadow-camera-left={-40}
                shadow-camera-right={40}
                shadow-camera-top={30}
                shadow-camera-bottom={-10}
            />

            <directionalLight
                position={[25, 10, -15]}
                intensity={0.6}
                color="#cce0ff"
            />

            <pointLight
                position={[0, 18, -20]}
                intensity={0.8}
                color="#ffffff"
            />

            <ambientLight intensity={0.35} />
        </group>
    );
}

const INITIAL_CAM_POS = new THREE.Vector3(0, 5, 60);
const INITIAL_CAM_TARGET = new THREE.Vector3(0, 5, 0);

function CameraReset({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
    const { camera } = useThree();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Home" || (e.key === "r" && !e.ctrlKey && !e.metaKey)) {
                const controls = controlsRef.current;
                if (!controls) return;

                camera.position.copy(INITIAL_CAM_POS);
                controls.target.copy(INITIAL_CAM_TARGET);
                controls.update();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [camera, controlsRef]);

    return null;
}

export function Scene({ onTowerSelect, onDiskDrop, canDropOnTower, isGameActive }: HanoiGameProps) {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const gameState = useGameStateStore(state => state.gameState);
    const towerSpacing = 18;
    const centerIndex = (gameState.towers.length - 1) / 2;

    const towerPositions = useMemo(() => {
        return Array.from({ length: gameState.towers.length }, (_, index) =>
            [(index - centerIndex) * towerSpacing, 5, 0] as [number, number, number]
        );
    }, [gameState.towers.length, centerIndex, towerSpacing]);

    const allDiskData = useMemo(() => {
        const DISK_BASE_Y = 0.26;

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
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.1,
            }}
        >
            <CameraReset controlsRef={controlsRef} />
            <KeyboardControls controlsRef={controlsRef} />
            <OrbitControls
                ref={controlsRef}
                target={[0, 5, 0]}
                mouseButtons={{
                    LEFT:   undefined as unknown as THREE.MOUSE,
                    MIDDLE: THREE.MOUSE.ROTATE,
                    RIGHT:  THREE.MOUSE.PAN,
                }}
                enableZoom={true}
                minDistance={20}
                maxDistance={120}
                enableDamping={true}
                dampingFactor={0.12}
                maxPolarAngle={Math.PI / 2}
            />

            {import.meta.env.DEV && <axesHelper args={[15]} />}

            <Lights />

            <Environment preset="apartment" background={false} />

            <Suspense fallback={null}>
                <Base3d />

                {gameState.towers.map((tower) => (
                    <Tower3d
                        key={tower.id}
                        tower={tower}
                        position={towerPositions[tower.id]}
                        onClick={() => onTowerSelect(tower.id)}
                        isSelected={gameState.selectedTower === tower.id}
                    />
                ))}

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
            </Suspense>
        </Canvas>
    );
}