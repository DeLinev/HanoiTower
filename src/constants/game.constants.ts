import type { Difficulty, DifficultyLevel, Disk, GameState } from "../types/game.types";

export const difficulties: Difficulty[] = [
    { value: 'novice' as DifficultyLevel, label: 'Novice', disks: 3, description: '3 disks - ideal for beginners' },
    { value: 'proficient' as DifficultyLevel, label: 'Proficient', disks: 4, description: '4 disks - classic version' },
    { value: 'expert' as DifficultyLevel, label: 'Expert', disks: 5, description: '5 disks - for experienced players' },
];

export const disksPlaceholder: Disk[] = Array.from({ length: difficulties[1].disks }, (_, i) => ({
    id: i,
    size: (difficulties[1].disks - i),
}));

export const gameStatePlaceholder: GameState = {
    towers: [
        { id: 0, disks: disksPlaceholder },
        { id: 1, disks: [] },
        { id: 2, disks: [] },
    ],
    movesCount: 15,
    isGameWon: false,
    difficulty: difficulties[1],
    selectedTower: null
}