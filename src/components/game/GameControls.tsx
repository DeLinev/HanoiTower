import type { GameControlsProps } from "../../types/ui.types";
import { formatTime } from "../../utils/format.utils";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

export function GameControls({ movesCount, timePassed, isTimerRunning, onReset, onPause, onResume, onQuite }: GameControlsProps) {
    return (
        <Card>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex gap-6">
                    <div className="text-center">
                        <div className="text-sm text-gray-200 mb-1">Moves</div>
                        <div className="text-2xl font-bold">{movesCount}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-200 mb-1">Time</div>
                        <div className="text-2xl font-bold">{formatTime(timePassed)}</div>
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
                    <Button variant="secondary" size="small" onClick={onQuite}>
                        Quite
                    </Button>
                </div>
            </div>
        </Card>
    )
}