import type { GameState } from "../../types/game.types";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

export function GameControls({ gameState }: { gameState: GameState }) {
    return (
        <Card>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex gap-6">
                    <div className="text-center">
                        <div className="text-sm text-gray-200 mb-1">Moves</div>
                        <div className="text-2xl font-bold">{gameState.movesCount}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-200 mb-1">Time</div>
                        <div className="text-2xl font-bold">00:02:45</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="secondary" size="small">
                        Reset
                    </Button>
                    <Button variant="secondary" size="small">
                        Pause
                    </Button>
                    <Button variant="secondary" size="small">
                        Quite
                    </Button>
                </div>
            </div>
        </Card>
    )
}