export type DifficultyLevel = 'novice' | 'proficient' | 'expert';

export type Difficulty = {
    value: DifficultyLevel, 
    label: string, 
    disks: number, 
    description: string
}