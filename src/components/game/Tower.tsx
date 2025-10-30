import type { Tower } from "../../types/game.types";
import type { TowerProps } from "../../types/ui.types";
import { Disk } from "./Disk";

export function Tower({ tower, onClick, isSelected } : TowerProps) {
    return (
        <div
            className="flex flex-col items-center justify-end w-full h-100 relative transition-all duration-200 transform cursor-pointer"
            onClick={() => onClick()}
            role="button"
            aria-pressed={isSelected}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        >
            <div className="absolute bottom-0 w-2 h-64 bg-gray-300 rounded-t-lg"></div>

            <div className="absolute bottom-4 flex flex-col-reverse items-center w-full">
                {tower.disks.map((disk) => (
                    <Disk key={disk.id} disk={disk} />
                ))}
            </div>

            <div className={`absolute inset-x-3 h-6 bg-gradient-to-t from-gray-100/70 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    )
}