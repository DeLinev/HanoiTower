import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { StatCard } from "../components/common/StatCard";
import { InfoRow } from "../components/common/InfoRow";
import { AchievementMessage } from "../components/common/AchievementMessage";
// import { Layout } from "../components/layout/Layout";
import { formatTime } from "../utils/format.utils";
import type { ResultsPageProps } from "../types/ui.types";

export function ResultsPage({ gameStatistic, onPlayAgain, onMainMenu }: ResultsPageProps) {
    const { isGameWon, difficulty, timeRemaining } = gameStatistic;
    const hasTimeLimit = difficulty.isTimerOn && difficulty.timeLimit !== null;

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
                <Card>
                    <h1 className="font-serif text-3xl text-center">{isGameWon ? "🥳 Congratulations!" : "🙏 Don't give up, you can do it!"}</h1>
                    <hr className="border-1 border-gray-500" />
                    <h2 className="text-center font-bold text-xl">
                        {isGameWon ? "Victory!" : "Game Over"}
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <StatCard 
                            value={gameStatistic.movesCount}
                            label="Number of Moves"
                            color="orange"
                        />

                        <StatCard 
                            value={formatTime(gameStatistic.timePassed)}
                            label="Time Elapsed"
                            color="indigo"
                        />
                    </div>

                    <div className="space-y-1 mb-3">
                        <InfoRow 
                            label="Difficulty"
                            value={gameStatistic.difficulty.label}
                        />

                        <InfoRow 
                            label="Minimum number of moves"
                            value={gameStatistic.minMoves}
                        />

                        {hasTimeLimit && (
                            <InfoRow 
                                label="Time Remaining"
                                value={
                                    <span className={`font-semibold ${timeRemaining && timeRemaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {timeRemaining !== null ? formatTime(timeRemaining) : "Time's up!"}
                                    </span>
                                }
                            />
                        )}

                        {isGameWon && (
                            <InfoRow 
                                label="Efficiency"
                                value={
                                    <span className={`font-semibold ${gameStatistic.efficiency >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                                        {gameStatistic.efficiency}%
                                    </span>
                                }
                            />
                        )}
                    </div>

                    {isGameWon && <AchievementMessage efficiency={gameStatistic.efficiency} />}

                    <div className="flex gap-3">
                        <Button
                            variant="primary"
                            size="large"
                            fullWidth
                            onClick={onPlayAgain}
                        >
                            Play again
                        </Button>
                        <Button
                            variant="secondary"
                            size="large"
                            fullWidth
                            onClick={onMainMenu}
                        >
                            Main menu
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}