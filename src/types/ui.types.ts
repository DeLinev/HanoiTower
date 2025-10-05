import type { ElementType, ReactNode } from "react"
import type { Difficulty } from "./game.types"

export type DifficultyProps = {
    diff: Difficulty,
    setSelectedDifficulty: (selectedDifficulty: Difficulty) => void,
    selectedDifficulty: Difficulty
}

export type CardProps = {
    children: ReactNode, 
    Icon?: ElementType, 
    title?: string
}

export type InfoRowProps = {
    label: string;
    value: ReactNode;
}

export type StatCardProps = {
    value: string | number;
    label: string;
    color: 'orange' | 'indigo' | 'green' | 'blue' | 'red';
}