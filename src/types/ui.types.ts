import type { ElementType, ReactNode } from "react"
import type { Difficulty } from "./game.types"

export type DifficultyType = {
    diff: Difficulty,
    setSelectedDifficulty: (selectedDifficulty: Difficulty) => void,
    selectedDifficulty: Difficulty
}

export type CardType = {
    children: ReactNode, 
    Icon?: ElementType, 
    title?: string
}