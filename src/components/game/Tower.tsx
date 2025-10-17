import type { Tower } from "../../types/game.types";
import { Disk } from "./Disk";

export function Tower({ tower, onClick } : { tower: Tower, onClick: () => void }) {
    return (
        <div className="flex flex-col items-center justify-end w-full h-100 relative" onClick={() => onClick()}>
            <div className="absolute bottom-0 w-2 h-64 bg-gray-300 rounded-t-lg"></div>

            <div className="absolute bottom-4 flex flex-col-reverse items-center w-full">
                {tower.disks.map((disk) => (
                    <Disk key={disk.id} disk={disk} />
                ))}
            </div>
        </div>
    )
}