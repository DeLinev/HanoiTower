import type { Difficulty, DifficultyLevel, GameState, } from "../types/game.types";

export const difficulties: Difficulty[] = [
    { value: 'novice' as DifficultyLevel, label: 'Novice', disks: 3, description: '3 disks - ideal for beginners', isTimerOn: true, timeLimit: null },
    { value: 'proficient' as DifficultyLevel, label: 'Proficient', disks: 4, description: '4 disks - classic version', isTimerOn: true, timeLimit: 120 },
    { value: 'expert' as DifficultyLevel, label: 'Expert', disks: 5, description: '5 disks - for experienced players', isTimerOn: true, timeLimit: 180 },
];

export const gameStateDefaultValue: GameState = {
    towers: [],
    movesCount: 0,
    isGameWon: false,
    isGameLost: false,
    selectedTower: null,
    difficulty: difficulties[1]
}