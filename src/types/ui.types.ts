import type { ElementType, ReactNode } from "react"
import type { Difficulty, GameStatistic } from "./game.types"

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

export type ResultsPageProps = {
    gameStatistic: GameStatistic,
    onPlayAgain: () => void,
}

export type GameControlsProps = {
    timePassed: number,
    timeRemaining: number | null,
    isTimerRunning: boolean,
    onReset: () => void;
    onPause: () => void;
    onResume: () => void;
}

export type HanoiGameProps = {
    onTowerSelect: (towerId: number) => void;
}