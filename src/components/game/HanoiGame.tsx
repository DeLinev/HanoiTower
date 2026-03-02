import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tower } from "./Tower";
import { useGameStateStore } from "../../stores/useGameStateStore";
import type { HanoiGameProps } from "../../types/ui.types";

export function HanoiGame({ onTowerSelect, onDiskDrop, canDropOnTower, isGameActive }: HanoiGameProps) {
    const gameState = useGameStateStore(state => state.gameState);
    
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full p-8">
                <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {gameState.towers.map((tower, i) => (
                        <Tower
                            key={tower.id}
                            tower={tower}
                            onClick={() => onTowerSelect(tower.id)}
                            isSelected={gameState.selectedTower === i}
                            onDiskDrop={onDiskDrop}
                            canDropOnTower={canDropOnTower}
                            isGameActive={isGameActive}
                        />
                    ))}
                </div>
                <div className="w-full h-4 bg-gray-400 rounded-lg max-w-4xl mx-auto"></div>
            </div>
        </DndProvider>
    )
}