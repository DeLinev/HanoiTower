import { Layout } from "../components/layout/Layout";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Scoreboard } from "../types/game.types";
import { useNavigate } from "react-router-dom";

export default function ScoreboardPage() {
    const [scoreboard] = useLocalStorage<Scoreboard>('scoreboard', []);
    const navigate = useNavigate();

    const handleNicknameClick = (nickname: string) => {
        navigate(`/score/${nickname}`);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Scoreboard
                </h1>
                
                {scoreboard.length === 0 ? (
                    <div className="text-center py-8">
                        No players yet. Start playing to see scores!
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                                        №
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                                        Nickname
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold text-sm uppercase tracking-wider">
                                        Games Played
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800">
                                {scoreboard.map((player, index) => (
                                    <tr 
                                        key={player.nickname}
                                        className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
                                        onClick={() => handleNicknameClick(player.nickname)}
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            #{index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-semibold hover:underline">
                                            {player.nickname}
                                        </td>
                                        <td className="px-6 py-4 text-center ">
                                            {player.gameStats.length}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    )
}