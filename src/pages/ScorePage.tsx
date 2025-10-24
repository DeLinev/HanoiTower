import { Navigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage"
import type { GameStatistic, Scoreboard } from "../types/game.types";
import { Layout } from "../components/layout/Layout";
import { StatCard } from "../components/common/StatCard";
import StatRow from "../components/common/StatRow";

export default function ScorePage() {
    const [scoreboard] = useLocalStorage<Scoreboard>('scoreboard', []);
    const { nickname } = useParams();

    const userScore = scoreboard.find(entry => entry.nickname === nickname);
    if (!userScore) {
        return <Navigate to="/not-found" replace />;
    }

    const { gameStats } = userScore;

    const totalGames = gameStats.length;
    const gamesWon = gameStats.filter(game => game.isGameWon).length;
    const gamesLost = totalGames - gamesWon;
    const winRate = totalGames > 0 ? ((gamesWon / totalGames) * 100).toFixed(1) : 0;
    const recentGames = [...gameStats].reverse().slice(0, 5);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-center mb-2">
                        {nickname}'s Statistics
                    </h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard color="blue" label="Total Games" value={totalGames} />
                    <StatCard color="green" label="Games Won" value={gamesWon} />
                    <StatCard color="red" label="Games Lost" value={gamesLost} />
                    <StatCard color="indigo" label="Win Rate" value={`${winRate}%`} />
                </div>

                {recentGames.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-bold mb-4">
                            Recent Games
                        </h2>
                        <div className="space-y-3">
                            {recentGames.map((game: GameStatistic, index: number) => (
                                <StatRow key={index} game={game} />
                            ))}
                        </div>
                    </div>
                )}

                {totalGames === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-xl">No games played yet.</p>
                        <p className="mt-2">Start playing to see your statistics!</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}