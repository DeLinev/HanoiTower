import type { GameStatistic } from "../../types/game.types";
import { formatTime } from "../../utils/format.utils";

export default function StatRow({ game } : { game: GameStatistic}) {
    const hasTimeLimit = game.difficulty.isTimerOn && game.difficulty.timeLimit !== null;
    
    return (
        <div
            className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${game.isGameWon
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                        }`}>
                        {game.isGameWon ? 'Won' : 'Lost'}
                    </span>
                </div>
                <div className="flex gap-6 text-sm">
                    <div>
                        <span className="text-gray-400">Moves: </span>
                        <span className="font-semibold">{game.movesCount}</span>
                    </div>
                    <div>
                        <span className="text-gray-400">Time Elap.: </span>
                        <span className="font-semibold">{formatTime(game.timePassed)}</span>
                    </div>
                    {hasTimeLimit && (
                        <div>
                            <span className="text-gray-400">Time Rem.: </span>
                            <span className="font-semibold">{game.timeRemaining !== null && formatTime(game.timeRemaining)}</span>
                        </div>
                    )}
                    {game.isGameWon && (
                        <div>
                            <span className="text-gray-400">Efficiency: </span>
                            <span className="font-semibold">{game.efficiency}%</span>
                        </div>
                    )}
                    <div>
                        <span className="text-gray-400">Disks: </span>
                        <span className="font-semibold">{game.difficulty.disks}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}