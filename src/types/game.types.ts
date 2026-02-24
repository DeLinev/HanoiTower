export type DifficultyLevel = 'novice' | 'proficient' | 'expert' | 'custom';

export type Difficulty = {
    value: DifficultyLevel,
    label: string,
    disks: number,
    description: string,
    isTimerOn: boolean,
    timeLimit: number | undefined | null
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
    isGameLost: boolean,
    difficulty: Difficulty,
    selectedTower: number | null,
}

export type GameStatistic = {
    movesCount: number,
    timePassed: number,
    timeRemaining: number | null,
    difficulty: Difficulty,
    minMoves: number,
    efficiency: number,
    isGameWon: boolean
}

export type SettingsFormData = {
    nickname: string
    difficultyValue: string,
    isTimerOn: boolean,
    customDisks: number,
    timeLimitMin: number,
    timeLimitSec: number,
}

export type PlayerScore = {
    nickname: string;
    gameStats: GameStatistic[];
}

export type Scoreboard = PlayerScore[];