import { useCallback, useState } from "react";
import type { Difficulty, Disk, GameState } from "../types/game.types";
import { useDiskMovement } from "./useDiskMovement";
import { useGameValidation } from "./useGameValidation";
import { useTimer } from "./useTimer";
import { useTowerSelection } from "./useTowerSelection";

export function useGame(difficulty: Difficulty, onGameComplete: (movesCount: number, timePassed: number, remainingTime: number | null, isGameWon: boolean) => void) {
    const diskCount = difficulty.disks;
    const initializeGame = (): GameState => {

        const disks: Disk[] = Array.from({ length: diskCount }, (_, i) => ({
            id: i,
            size: diskCount - i,
        }));

        return {
            towers: [
                { id: 0, disks: disks },
                { id: 1, disks: [] },
                { id: 2, disks: [] },
            ],
            movesCount: 0,
            isGameWon: false,
            isGameLost: false,
            selectedTower: null,
            difficulty,
        };
    }

    const [gameState, setGameState] = useState<GameState>(initializeGame());
    
    const handleTimeUp = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            isGameLost: true,
        }));
        onGameComplete?.(gameState.movesCount, difficulty.timeLimit!, 0, false);
    }, [onGameComplete, difficulty.timeLimit, gameState.movesCount]);

    const validation = useGameValidation();
    const timer = useTimer(true, difficulty.timeLimit, handleTimeUp); 
    const selection = useTowerSelection();
    const movement = useDiskMovement();

    const handleTowerSelect = (towerId: number) => {
        if (gameState.isGameWon || gameState.isGameLost || !timer.isRunning) return;

        const selectedTower = gameState.towers.find(t => t.id === towerId);

        if (selection.selectedTower === null) {
            if (validation.canSelectTower(selectedTower!)) {
                selection.selectTower(towerId);
                setGameState(prev => ({
                    ...prev, selectedTower: towerId
                }));
            }
        } else {
            const currentSelectedTowerObj = gameState.towers.find(t => t.id === selection.selectedTower);

            if (selection.selectedTower === towerId) {
                selection.deselectTower();
                setGameState((prev) => ({
                    ...prev,
                    selectedTower: null,
                }));
                return;
            }

            if (validation.canMoveDisk(currentSelectedTowerObj!, selectedTower!)) {
                const newTowers = movement.moveDisk(
                    gameState.towers,
                    selection.selectedTower,
                    towerId
                );
                const newMovesCount = gameState.movesCount + 1;
                const isWon = validation.checkWin(newTowers, diskCount);

                if (isWon) {
                    timer.pause();
                    onGameComplete?.(newMovesCount, timer.timePassed, timer.timeRemaining, true);
                }

                setGameState({
                    towers: newTowers,
                    movesCount: newMovesCount,
                    isGameWon: isWon,
                    isGameLost: false,
                    selectedTower: null,
                    difficulty,
                });

                selection.deselectTower();
            } else {
                selection.deselectTower();
                setGameState((prev) => ({
                    ...prev,
                    selectedTower: null,
                }));
            }
        }
    }

    const resetGame = () => {
        setGameState(initializeGame());
        timer.reset();
        timer.start();
        selection.deselectTower();
    };

    const pauseGame = () => {
        timer.pause();
    }

    const resumeGame = () => {
        if (!gameState.isGameWon && !gameState.isGameLost) {
            timer.start();
        }
    };

    return {
        gameState,
        timePassed: timer.timePassed,
        timeRemaining: timer.timeRemaining,
        isTimerRunning: timer.isRunning,
        isTimeUp: timer.isTimeUp,
        handleTowerSelect,
        resetGame,
        pauseGame,
        resumeGame,
    }
}