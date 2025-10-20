import { useState } from "react";
import { difficulties } from "../constants/game.constants";
import type { Difficulty, Disk, GameState } from "../types/game.types";
import { useDiskMovement } from "./useDiskMovement";
import { useGameValidation } from "./useGameValidation";
import { useTimer } from "./useTimer";
import { useTowerSelection } from "./useTowerSelection";

export function useGame(difficulty: Difficulty, onGameWin: (movesCount: number, timePassed: number) => void) {
    const validation = useGameValidation();
    const timer = useTimer(true); // Auto-start the timer
    const selection = useTowerSelection();
    const movement = useDiskMovement();

    const diskCount = difficulties.find(diff => diff.label === difficulty.label)!.disks;

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
            selectedTower: null,
            difficulty,
        };
    }

    const [gameState, setGameState] = useState<GameState>(initializeGame());

    const handleTowerSelect = (towerId: number) => {
        if (gameState.isGameWon || !timer.isRunning) return;

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
                    onGameWin?.(newMovesCount, timer.timePassed);
                }

                setGameState({
                    towers: newTowers,
                    movesCount: newMovesCount,
                    isGameWon: isWon,
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
        if (!gameState.isGameWon) {
            timer.start();
        }
    };

    const minMoves = validation.getMinMoves(diskCount);

    return {
        gameState,
        timePassed: timer.timePassed,
        isTimerRunning: timer.isRunning,
        minMoves: minMoves,
        handleTowerSelect,
        resetGame,
        pauseGame,
        resumeGame,
    }
}