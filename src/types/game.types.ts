export type DifficultyLevel = 'novice' | 'proficient' | 'expert';

export type Difficulty = {
    value: DifficultyLevel,
    label: string,
    disks: number,
    description: string
}

export type Disk = {
    id: number,
    size: number
}

export type Tower = {
    id: number,
    disks: Disk[]
}

export type GameState = {
    towers: Tower[],
    movesCount: number,
    isGameWon: boolean,
    difficulty: Difficulty,
    timePassed: number
}