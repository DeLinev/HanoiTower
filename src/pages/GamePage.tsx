import { Layout } from "../components/layout/Layout";
import { GameControls } from "../components/game/GameControls";
import { HanoiGame } from "../components/game/HanoiGame";
import type { GamePageProps } from "../types/ui.types";
import { useGame } from "../hooks/useGame";
import { useState } from "react";
import Portal from "../components/common/Portal";
import type { GameStatistic } from "../types/game.types";
import { ResultsPage } from "./ResultsPage";

export function GamePage({ difficulty, onQuit }: GamePageProps) {

    const handleGameComplete = (movesCount: number, timePassed: number, timeRemaining: number | null, isGameWon: boolean) => {
        const minMoves = Math.pow(2, difficulty.disks) - 1;
        const efficiency = Math.round((minMoves / movesCount) * 100);

        setGameStats({
            movesCount,
            timePassed,
            timeRemaining,
            difficulty,
            minMoves,
            efficiency,
            isGameWon
        });
        setShowModal(true);
    }

    const handlePlayAgain = () => {
        resetGame();
        setShowModal(false);
    }

    const {
        gameState,
        timePassed,
        timeRemaining,
        handleTowerSelect,
        isTimerRunning,
        resetGame,
        pauseGame,
        resumeGame,
    } = useGame(difficulty, handleGameComplete);

    const [showModal, setShowModal] = useState(false);
    const [gameStats, setGameStats] = useState<GameStatistic | null>(null);

    return (
        <Layout>
            <GameControls
                movesCount={gameState.movesCount}
                timePassed={timePassed}
                timeRemaining={timeRemaining}
                isTimerRunning={isTimerRunning}
                onReset={resetGame}
                onPause={pauseGame}
                onResume={resumeGame}
                onQuite={onQuit}
            />

            <HanoiGame gameState={gameState} onTowerSelect={handleTowerSelect} />

            {showModal &&
                <Portal>
                    <ResultsPage
                        gameStatistic={gameStats!}
                        onPlayAgain={handlePlayAgain}
                        onMainMenu={onQuit}
                    />
                </Portal>
            }
        </Layout>
    )
}