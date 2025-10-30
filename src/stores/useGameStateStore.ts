import { create } from "zustand";
import type { Difficulty, Disk, GameState, Tower } from "../types/game.types";
import { gameStateDefaultValue } from "../constants/game.constants";

type GameStateStore = {
    gameState: GameState;
    initializeGame: (difficulty: Difficulty) => void;
    selectTower: (towerId: number | null) => void;
    moveDisk: (fromTowerId: number, toTowerId: number) => void;
    incrementMoves: () => void;
    setGameWon: () => void;
    setGameLost: () => void;
    resetGame: (difficulty: Difficulty) => void;
};

const createInitialGameState = (difficulty: Difficulty): GameState => {
    const diskCount = difficulty.disks;
    const disks: Disk[] = Array.from({ length: diskCount }, (_, i) => ({
        id: i,
        size: diskCount - i,
    }));

    return {
        ...gameStateDefaultValue,
        towers: [
            { id: 0, disks: disks },
            { id: 1, disks: [] },
            { id: 2, disks: [] },
        ],
        difficulty,
    };
};

export const useGameStateStore = create<GameStateStore>((set) => ({
    gameState: gameStateDefaultValue,
    timePassed: 0,
    timeRemaining: null,
    isTimerRunning: false,
    isTimeUp: false,

    initializeGame: (difficulty: Difficulty) => set({
        gameState: createInitialGameState(difficulty),
    }),

    selectTower: (towerId: number | null) => 
        set((state) => ({
            gameState: { ...state.gameState, selectedTower: towerId }
        })),

    moveDisk: (fromTowerId: number, toTowerId: number) =>
        set((state) => {
            const newTowers: Tower[] = state.gameState.towers.map(tower => ({
                ...tower,
                disks: [...tower.disks]
            }));

            const fromTower = newTowers.find(t => t.id === fromTowerId)!;
            const toTower = newTowers.find(t => t.id === toTowerId)!;

            const disk = fromTower.disks.pop()!;
            toTower.disks.push(disk);

            return {
                gameState: {
                    ...state.gameState,
                    towers: newTowers,
                    movesCount: state.gameState.movesCount + 1,
                    selectedTower: null,
                }
            };
        }),

    incrementMoves: () =>
        set((state) => ({
            gameState: { ...state.gameState, movesCount: state.gameState.movesCount + 1 }
        })),

    setGameWon: () =>
        set((state) => ({
            gameState: { ...state.gameState, isGameWon: true }
        })),

    setGameLost: () =>
        set((state) => ({
            gameState: { ...state.gameState, isGameLost: true }
        })),

    resetGame: (difficulty: Difficulty) => set({
        gameState: createInitialGameState(difficulty),
    }),
}));
