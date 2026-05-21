import { useMemo } from "react";
import { getDisk3dThickness } from "../../constants/game.constants";
import type { Tower3dProps } from "../../types/ui.types";
import Disk3d from "./Disk3d";

export default function Tower3d({ tower, onClick, isSelected, onDiskDrop, canDropOnTower, isGameActive, position, towerPositions }: Tower3dProps) {
    const towerWidth = 1;
    const towerHeight = 10;
    const [x, y, z] = position;
    const diskBaseY = 0.26;
    // let stackedHeight = 0;

    const diskPositions = useMemo(() => {
        let stackedHeight = 0;
        return tower.disks.map((disk) => {
            const diskY = diskBaseY + stackedHeight;
            stackedHeight += getDisk3dThickness(disk.size);
            return [x, diskY, z] as [number, number, number];
        });
    }, [tower.disks, x, z]); // Only recalculate if disks or tower base coordinates change

    return (
        <group>
            <mesh position={position} castShadow receiveShadow>
                <cylinderGeometry args={[towerWidth, towerWidth, towerHeight, 32]} />
                <meshStandardMaterial color="grey" />
            </mesh>

            <mesh position={[x, y + towerHeight / 2, z]} castShadow receiveShadow>
                <sphereGeometry args={[1, 32, 16]} />
                <meshStandardMaterial color="grey" />
            </mesh>

            {tower.disks.map((disk, index) => (
                <Disk3d
                    key={disk.id}
                    disk={disk}
                    towerId={tower.id}
                    isTopDisk={index === tower.disks.length - 1}
                    isGameActive={isGameActive}
                    // Pass the stable reference here!
                    position={diskPositions[index]} 
                    towerPositions={towerPositions}
                    onDiskDrop={onDiskDrop}
                    canDropOnTower={canDropOnTower}
                />
            ))}
        </group>
    )
}