import { useState } from "react";
import type { Difficulty, Disk, GameState } from "../types/game.types";
import { Layout } from "../components/layout/Layout";
import { GameControls } from "../components/game/GameControls";
import { HanoiGame } from "../components/game/HanoiGame";

export function GamePage({ difficulty }: { difficulty: Difficulty }) {
    const disksPlaceholder: Disk[] = Array.from({ length: difficulty.disks }, (_, i) => ({
      id: i,
      size: (difficulty.disks - i),
    }));

    const gameStatePlaceholder: GameState = {
        towers: [
            { id: 0, disks: disksPlaceholder },
            { id: 1, disks: [] },
            { id: 2, disks: [] },
        ],
        movesCount: 0,
        isGameWon: false,
        difficulty,
        timePassed: 0
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [gameState, setGameState] = useState<GameState>(gameStatePlaceholder);

    return (
        <Layout>
            <GameControls gameState={gameState} />
            
            <HanoiGame gameState={gameState}/>
        </Layout>
    )
}