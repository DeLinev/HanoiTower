import type { ElementType, ReactNode } from "react"
import type { Difficulty, Disk, GameStatistic, Tower } from "./game.types"

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
    className?: string;
}

export type HanoiGameProps = {
    onTowerSelect: (towerId: number) => void;
    onDiskDrop: (fromTowerId: number, toTowerId: number) => void;
    canDropOnTower: (fromTowerId: number, toTowerId: number) => boolean;
    isGameActive: boolean;
}

export type TowerProps = { 
    tower: Tower, 
    onClick: () => void, 
    isSelected: boolean,
    onDiskDrop: (fromTowerId: number, toTowerId: number) => void;
    canDropOnTower: (fromTowerId: number, toTowerId: number) => boolean;
    isGameActive: boolean;
}

export type Tower3dProps = TowerProps & {
    position: [number, number, number];
    towerPositions: [number, number, number][];
}

export type DiskComponentProps = {
    disk: Disk;
    towerId: number;
    isTopDisk: boolean;
    isGameActive: boolean;
}

export type Disk3dComponentProps = DiskComponentProps & {
    position: [number, number, number];
    towerPositions: [number, number, number][];
    onDiskDrop: (fromTowerId: number, toTowerId: number) => void;
    canDropOnTower: (fromTowerId: number, toTowerId: number) => boolean;
}