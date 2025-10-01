import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Layout } from "../components/layout/Layout";
import type { GameState } from "../types/game.types";
import { formatTime } from "../utils/format.utils";

export function ResultsPage({ gameState }: { gameState: GameState }) {
    const minMoves = Math.pow(2, gameState.difficulty.disks) - 1;
    const efficiency = Math.round((minMoves / gameState.movesCount) * 100);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
                <Card title="🥳 Вітаємо!">
                    <h2 className="text-center font-bold text-xl">Your results</h2>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-orange-500 rounded-lg p-2 text-center">
                            <div className="text-4xl font-bold mb-2">
                                {gameState.movesCount}
                            </div>
                            <div className="font-bold">Number of Moves</div>
                        </div>

                        <div className="bg-indigo-500 rounded-lg p-2 text-center">
                            <div className="text-4xl font-bold mb-2">
                                {formatTime(gameState.timePassed)}
                            </div>
                            <div className="font-bold">Time</div>
                        </div>
                    </div>

                    <div className="space-y-1 mb-3">
                        <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                            <span className="text-gray-300">Difficulty:</span>
                            <span className="font-semibold">
                                {gameState.difficulty.label}
                            </span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                            <span className="text-gray-300">Minimum number of moves:</span>
                            <span className="font-semibold">{minMoves}</span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                            <span className="text-gray-300">Efficiency:</span>
                            <span className={`font-semibold ${efficiency >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                                {efficiency}%
                            </span>
                        </div>
                    </div>

                    {efficiency === 100 ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                            <p className="text-green-800 font-semibold text-center">
                                ⭐ Perfect! You solved the puzzle in the optimal way!
                            </p>
                        </div>
                    ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                            <p className="text-blue-800 text-center">
                                Great job! Try to reach the minimum number of moves.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            variant="primary"
                            size="large"
                            fullWidth
                        >
                            Play again
                        </Button>
                        <Button
                            variant="secondary"
                            size="large"
                            fullWidth
                        >
                            Main menu
                        </Button>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}