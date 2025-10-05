import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { StatCard } from "../components/common/StatCard";
import { InfoRow } from "../components/common/InfoRow";
import { AchievementMessage } from "../components/common/AchievementMessage";
import { Layout } from "../components/layout/Layout";
import type { GameState } from "../types/game.types";
import { formatTime } from "../utils/format.utils";

export function ResultsPage({ gameState }: { gameState: GameState }) {
    const minMoves = Math.pow(2, gameState.difficulty.disks) - 1;
    const efficiency = Math.round((minMoves / gameState.movesCount) * 100);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
                <Card title="🥳 Congratulations!">
                    <h2 className="text-center font-bold text-xl">Your results</h2>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <StatCard 
                            value={gameState.movesCount}
                            label="Number of Moves"
                            color="orange"
                        />

                        <StatCard 
                            value={formatTime(gameState.timePassed)}
                            label="Time"
                            color="indigo"
                        />
                    </div>

                    <div className="space-y-1 mb-3">
                        <InfoRow 
                            label="Difficulty"
                            value={gameState.difficulty.label}
                        />

                        <InfoRow 
                            label="Minimum number of moves"
                            value={minMoves}
                        />

                        <InfoRow 
                            label="Efficiency"
                            value={
                                <span className={`font-semibold ${efficiency >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                                    {efficiency}%
                                </span>
                            }
                        />
                    </div>

                    <AchievementMessage efficiency={efficiency} />

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