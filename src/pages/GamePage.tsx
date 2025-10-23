import { Layout } from "../components/layout/Layout";
import { GameControls } from "../components/game/GameControls";
import { HanoiGame } from "../components/game/HanoiGame";
import { useGame } from "../hooks/useGame";
import { useState } from "react";
import Portal from "../components/common/Portal";
import type { Difficulty, GameStatistic } from "../types/game.types";
import { ResultsPage } from "./ResultsPage";
import useLocalStorage from "../hooks/useLocalStorage";
import { difficulties } from "../constants/game.constants";

export function GamePage() {
     const { storedValue } = useLocalStorage<Difficulty>("gameSettings", difficulties[1]);

    const handleGameComplete = (movesCount: number, timePassed: number, timeRemaining: number | null, isGameWon: boolean) => {
        const minMoves = Math.pow(2, storedValue.disks) - 1;
        const efficiency = Math.round((minMoves / movesCount) * 100);

        setGameStats({
            movesCount,
            timePassed,
            timeRemaining,
            difficulty: storedValue,
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
    } = useGame(storedValue, handleGameComplete);

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
            />

            <HanoiGame gameState={gameState} onTowerSelect={handleTowerSelect} />

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