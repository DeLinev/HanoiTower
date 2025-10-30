import { Layout } from "../components/layout/Layout";
import { GameControls } from "../components/game/GameControls";
import { HanoiGame } from "../components/game/HanoiGame";
import { useGame } from "../hooks/useGame";
import { useState } from "react";
import Portal from "../components/common/Portal";
import type { GameStatistic } from "../types/game.types";
import { ResultsPage } from "./ResultsPage";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGameSettingsStore } from "../stores/useGameSettingsStore";
import { useScoreboardStore } from "../stores/useScoreboardStore";

export function GamePage() {
    const { difficulty } = useGameSettingsStore();
    const { addRecord } = useScoreboardStore();
    const [ currentPlayer ] = useLocalStorage<string>("currentPlayer", "Player1");

    const handleGameComplete = (movesCount: number, timePassed: number, timeRemaining: number | null, isGameWon: boolean) => {
        const minMoves = Math.pow(2, difficulty.disks) - 1;
        const efficiency = Math.round((minMoves / movesCount) * 100);

        const newGameStats: GameStatistic = {
            movesCount,
            timePassed,
            timeRemaining,
            difficulty: difficulty,
            minMoves,
            efficiency,
            isGameWon
        };

        setGameStats(newGameStats);
        addRecord(newGameStats, currentPlayer);
        setShowModal(true);
    }

    const handlePlayAgain = () => {
        resetGame();
        setShowModal(false);
    }

    const {
        timePassed,
        timeRemaining,
        isTimerRunning,
        handleTowerSelect,
        resetGame,
        pauseGame,
        resumeGame,
    } = useGame(difficulty, handleGameComplete);

    const [showModal, setShowModal] = useState(false);
    const [gameStats, setGameStats] = useState<GameStatistic | null>(null);

    return (
        <Layout>
            <GameControls 
                timePassed={timePassed}
                timeRemaining={timeRemaining}
                isTimerRunning={isTimerRunning}
                onReset={resetGame}
                onPause={pauseGame}
                onResume={resumeGame}
            />

            <HanoiGame onTowerSelect={handleTowerSelect} />

            {showModal &&
                <Portal>
                    <ResultsPage
                        gameStatistic={gameStats!}
                        onPlayAgain={handlePlayAgain}
                    />
                </Portal>
            }
        </Layout>
    )
}