import { Layout } from "../components/layout/Layout";
import { GameControls } from "../components/game/GameControls";
import { HanoiGame } from "../components/game/HanoiGame";
import type { GamePageProps } from "../types/ui.types";
import { useGame } from "../hooks/useGame";
import { useEffect } from "react";

export function GamePage({ difficulty, onQuit, onGameWin }: GamePageProps) {
    const {
        gameState,
        timePassed,
        handleTowerSelect,
        isTimerRunning,
        resetGame,
        pauseGame,
        resumeGame,
    } = useGame(difficulty, onGameWin);

    useEffect(() => {
        console.log(gameState.towers)
    }, [gameState.towers]);

    return (
        <Layout>
            <GameControls 
                movesCount={gameState.movesCount}
                timePassed={timePassed}
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