import type { ElementType, ReactNode } from "react"
import type { Difficulty, GameState, GameStatistic } from "./game.types"

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
    onMainMenu: () => void
}

export type GamePageProps = {
    difficulty: Difficulty,
    onQuit: () => void,
    onGameWin: (movesCount: number, timePassed: number) => void
}

export type GameControlsProps = {
    movesCount: number, 
    timePassed: number, 
    isTimerRunning: boolean,
    onReset: () => void, 
    onPause: () => void, 
    onResume: () => void, 
    onQuite: () => void
}

export type HanoiGameProps = { 
    gameState: GameState, 
    onTowerSelect: (towerId: number) => void
}