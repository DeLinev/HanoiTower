import type { Difficulty, DifficultyLevel } from "../types/game.types";

export const difficulties: Difficulty[] = [
    { value: 'novice' as DifficultyLevel, label: 'Novice', disks: 3, description: '3 disks - ideal for beginners' },
    { value: 'proficient' as DifficultyLevel, label: 'Proficient', disks: 4, description: '4 disks - classic version' },
    { value: 'expert' as DifficultyLevel, label: 'Expert', disks: 5, description: '5 disks - for experienced players' },
];