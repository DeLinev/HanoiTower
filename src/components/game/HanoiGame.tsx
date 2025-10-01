import type { GameState } from "../../types/game.types";
import { Tower } from "./Tower";

export function HanoiGame({ gameState }: { gameState: GameState }) {
    return (
        <div className="w-full p-8">
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto border-1 border-gray-500 rounded-xl">
                {gameState.towers.map((tower) => (
                    <Tower key={tower.id} tower={tower} />
                ))}
            </div>
        </div>
    )
}