import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { StatCard } from "../components/common/StatCard";
import { InfoRow } from "../components/common/InfoRow";
import { AchievementMessage } from "../components/common/AchievementMessage";
import { Layout } from "../components/layout/Layout";
import { formatTime } from "../utils/format.utils";
import type { ResultsPageProps } from "../types/ui.types";

export function ResultsPage({ gameStatistic, onPlayAgain, onMainMenu }: ResultsPageProps) {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
                <Card title="🥳 Congratulations!">
                    <h2 className="text-center font-bold text-xl">Your results</h2>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <StatCard 
                            value={gameStatistic.movesCount}
                            label="Number of Moves"
                            color="orange"
                        />

                        <StatCard 
                            value={formatTime(gameStatistic.timePassed)}
                            label="Time"
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

                        <InfoRow 
                            label="Efficiency"
                            value={
                                <span className={`font-semibold ${gameStatistic.efficiency >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                                    {gameStatistic.efficiency}%
                                </span>
                            }
                        />
                    </div>

                    <AchievementMessage efficiency={gameStatistic.efficiency} />

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
        </Layout>
    )
}