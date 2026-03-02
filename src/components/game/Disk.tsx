import { useDrag } from "react-dnd";
import type { DragItem } from "../../types/game.types";
import type { DiskComponentProps } from "../../types/ui.types";

export const DISK_DRAG_TYPE = "DISK";

export function Disk({ disk, towerId, isTopDisk, isGameActive }: DiskComponentProps) {
    const width = 20 + (disk.size * 10);

    const colors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-purple-500',
        'bg-pink-500',
    ];

    const color = colors[disk.size - 1] || colors[0];

    const [{ isDragging }, dragRef] = useDrag<DragItem, void, { isDragging: boolean }>(() => ({
        type: DISK_DRAG_TYPE,
        item: { diskId: disk.id, diskSize: disk.size, fromTowerId: towerId },
        canDrag: () => isTopDisk && isGameActive,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [disk.id, disk.size, towerId, isTopDisk, isGameActive]);
    
    return (
        <div
            ref={dragRef as unknown as React.Ref<HTMLDivElement>}
            style={{ width: `${width}%` }}
            className={`
                h-10 z-50 rounded-2xl ${color}
                transition-opacity duration-150
                ${isTopDisk && isGameActive ? 'cursor-grab active:cursor-grabbing' : ''}
                ${isDragging ? 'opacity-40 scale-105' : 'opacity-100'}
            `}>
            <div className="w-full h-full rounded-lg border-b-4 border-black/20" />
        </div>
    )
}