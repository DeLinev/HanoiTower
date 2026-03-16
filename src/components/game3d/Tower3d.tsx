import { getDisk3dThickness } from "../../constants/game.constants";
import type { Tower3dProps } from "../../types/ui.types";
import Disk3d from "./Disk3d";

export default function Tower3d({ tower, onClick, isSelected, onDiskDrop, canDropOnTower, isGameActive, position }: Tower3dProps) {
    const towerWidth = 1;
    const towerHeight = 10;
    const [x, y, z] = position;
    const diskBaseY = 0.26;
    let stackedHeight = 0;

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

            {tower.disks.map((disk, index) => {
                const diskY = diskBaseY + stackedHeight;
                stackedHeight += getDisk3dThickness(disk.size);

                return <Disk3d
                    key={disk.id}
                    disk={disk}
                    towerId={tower.id}
                    isTopDisk={index === tower.disks.length - 1}
                    isGameActive={isGameActive}
                    position={[x, diskY, z]}
                />
            })}
        </group>
    )
}