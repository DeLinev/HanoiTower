import { useDrop } from "react-dnd";
import type { DragItem } from "../../types/game.types";
import type { TowerProps } from "../../types/ui.types";
import { Disk, DISK_DRAG_TYPE } from "./Disk";

export function Tower({ tower, onClick, isSelected, onDiskDrop, canDropOnTower, isGameActive }: TowerProps) {
    const [{ isOver, canDrop }, dropRef] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>(() => ({
        accept: DISK_DRAG_TYPE,
        canDrop: (item) => canDropOnTower(item.fromTowerId, tower.id),
        drop: (item) => {
            onDiskDrop(item.fromTowerId, tower.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [tower.id, canDropOnTower, onDiskDrop]);

    let dropHighlight = '';
    if (isOver && canDrop) {
        dropHighlight = 'ring-4 ring-green-400 bg-green-50/30';
    } else if (isOver && !canDrop) {
        dropHighlight = 'ring-4 ring-red-400 bg-red-50/30';
    } else if (canDrop) {
        dropHighlight = 'ring-2 ring-green-300/50';
    }

    return (
        <div
            ref={dropRef as unknown as React.Ref<HTMLDivElement>}
            className={`flex flex-col items-center justify-end w-full h-100 relative transition-all duration-200 transform cursor-pointer rounded-lg ${dropHighlight}`}
            onClick={() => onClick()}
            role="button"
            aria-pressed={isSelected}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        >
            <div className="absolute bottom-0 w-2 h-64 bg-gray-300 rounded-t-lg"></div>

            <div className="absolute bottom-4 flex flex-col-reverse items-center w-full">
                {tower.disks.map((disk, index) => (
                    <Disk
                        key={disk.id}
                        disk={disk}
                        towerId={tower.id}
                        isTopDisk={index === tower.disks.length - 1}
                        isGameActive={isGameActive}
                    />
                ))}
            </div>

            <div className={`absolute inset-x-3 h-6 bg-gradient-to-t from-gray-100/70 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    )
}