import { useCallback, useEffect } from "react";
import type { Difficulty } from "../types/game.types";
import { useGameValidation } from "./useGameValidation";
import { useTimer } from "./useTimer";
import { useTowerSelection } from "./useTowerSelection";
import { useGameStateStore } from "../stores/useGameStateStore";

export function useGame(difficulty: Difficulty, onGameComplete: (movesCount: number, timePassed: number, remainingTime: number | null, isGameWon: boolean) => void) {
    const diskCount = difficulty.disks;
    
    const gameState = useGameStateStore(state => state.gameState);
    
    const initializeGame = useGameStateStore(state => state.initializeGame);
    const selectTower = useGameStateStore(state => state.selectTower);
    const moveDisk = useGameStateStore(state => state.moveDisk);
    const setGameWon = useGameStateStore(state => state.setGameWon);
    const resetGameState = useGameStateStore(state => state.resetGame);
    
    const handleTimeUp = useCallback(() => {
        onGameComplete?.(gameState.movesCount, difficulty.timeLimit!, 0, false);
    }, [onGameComplete, difficulty.timeLimit, gameState.movesCount]);

    const validation = useGameValidation();
    const timer = useTimer(true, difficulty.timeLimit, handleTimeUp); 
    const selection = useTowerSelection();
    
    useEffect(() => {
        initializeGame(difficulty);
    }, [difficulty, initializeGame]);

    const isGameActive = !gameState.isGameWon && !gameState.isGameLost && timer.isRunning;

    const executeMove = useCallback((fromTowerId: number, toTowerId: number) => {
        moveDisk(fromTowerId, toTowerId);

        const updatedTowers = gameState.towers.map(tower => ({
            ...tower,
            disks: [...tower.disks]
        }));
        const fromTower = updatedTowers.find(t => t.id === fromTowerId)!;
        const toTower = updatedTowers.find(t => t.id === toTowerId)!;
        const disk = fromTower.disks.pop()!;
        toTower.disks.push(disk);

        const isWon = validation.checkWin(updatedTowers, diskCount);
        if (isWon) {
            setGameWon();
            timer.pause();
            onGameComplete?.(gameState.movesCount + 1, timer.timePassed, timer.timeRemaining, true);
        }
    }, [gameState.towers, gameState.movesCount, moveDisk, setGameWon, timer, onGameComplete, validation, diskCount]);

    const canDropOnTower = useCallback((fromTowerId: number, toTowerId: number): boolean => {
        if (!isGameActive) return false;
        if (fromTowerId === toTowerId) return false;

        const fromTower = gameState.towers.find(t => t.id === fromTowerId);
        const toTower = gameState.towers.find(t => t.id === toTowerId);
        if (!fromTower || !toTower) return false;

        return validation.canMoveDisk(fromTower, toTower);
    }, [isGameActive, gameState.towers, validation]);

    const handleDiskDrop = useCallback((fromTowerId: number, toTowerId: number) => {
        if (!isGameActive) return;
        if (fromTowerId === toTowerId) return;

        const fromTower = gameState.towers.find(t => t.id === fromTowerId);
        const toTower = gameState.towers.find(t => t.id === toTowerId);
        if (!fromTower || !toTower) return;
        if (!validation.canMoveDisk(fromTower, toTower)) return;

        executeMove(fromTowerId, toTowerId);
        selection.deselectTower();
    }, [isGameActive, gameState.towers, validation, executeMove, selection]);

    const handleTowerSelect = (towerId: number) => {
        if (!isGameActive) return;

        const selectedTowerObj = gameState.towers.find(t => t.id === towerId);

        if (selection.selectedTower === null) {
            if (validation.canSelectTower(selectedTowerObj!)) {
                selection.selectTower(towerId);
                selectTower(towerId);
            }
        } else {
            const currentSelectedTowerObj = gameState.towers.find(t => t.id === selection.selectedTower);

            if (selection.selectedTower === towerId) {
                selection.deselectTower();
                selectTower(null);
                return;
            }

            if (validation.canMoveDisk(currentSelectedTowerObj!, selectedTowerObj!)) {
                executeMove(selection.selectedTower, towerId);
                selection.deselectTower();
            } else {
                selection.deselectTower();
                selectTower(null);
            }
        }
    }

    const resetGame = () => {
        resetGameState(difficulty);
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
        timePassed: timer.timePassed,
        timeRemaining: timer.timeRemaining,
        isTimerRunning: timer.isRunning,
        isTimeUp: timer.isTimeUp,
        isGameActive,
        handleTowerSelect,
        handleDiskDrop,
        canDropOnTower,
        resetGame,
        pauseGame,
        resumeGame,
    }
}