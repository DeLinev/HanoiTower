import type { Difficulty, DifficultyLevel } from "./game.types"

export type DifficultyType = {
    diff: Difficulty,
    setSelectedDifficulty: (selectedDifficulty: DifficultyLevel) => void,
    selectedDifficulty: DifficultyLevel
}