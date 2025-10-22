import { Layout } from "../components/layout/Layout";
import { GameControls } from "../components/game/GameControls";
import { HanoiGame } from "../components/game/HanoiGame";
import type { GamePageProps } from "../types/ui.types";
import { useGame } from "../hooks/useGame";
import { useEffect } from "react";

export function GamePage({ difficulty, onQuit, onGameComplete }: GamePageProps) {

    const {
        gameState,
        timePassed,
        timeRemaining,
        handleTowerSelect,
        isTimerRunning,
        resetGame,
        pauseGame,
        resumeGame,
    } = useGame(difficulty, onGameComplete);

    useEffect(() => {
        console.log(gameState.towers)
    }, [gameState.towers]);

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
        </Layout>
    )
}