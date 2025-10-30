import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/format.utils";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { useGameStateStore } from "../../stores/useGameStateStore";
import type { GameControlsProps } from "../../types/ui.types";

export function GameControls({ timePassed, timeRemaining, isTimerRunning, onReset, onPause, onResume }: GameControlsProps) {
    const navigate = useNavigate();
    const movesCount = useGameStateStore(state => state.gameState.movesCount);
    
    return (
        <Card>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex gap-6">
                    <div className="text-center">
                        <div className="text-sm text-gray-200 mb-1">Moves</div>
                        <div className="text-2xl font-bold">{movesCount}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-200 mb-1">
                            {timeRemaining !== null && timeRemaining !== undefined ? 'Time Left' : 'Time'}
                        </div>
                        <div className="text-2xl font-bold">
                            {formatTime(timeRemaining !== null && timeRemaining !== undefined ? timeRemaining : timePassed)}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="secondary" size="small" onClick={onReset}>
                        Reset
                    </Button>
                    {
                        isTimerRunning ?
                        <Button variant="secondary" size="small" onClick={onPause}>
                            Pause
                        </Button>
                        :
                        <Button variant="secondary" size="small" onClick={onResume}>
                            Resume
                        </Button>
                    }
                    <Button variant="secondary" size="small" onClick={() => navigate("/")}>
                        Quite
                    </Button>
                </div>
            </div>
        </Card>
    )
}