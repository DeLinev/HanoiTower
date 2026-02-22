---
sidebar_position: 8
---

# Types

All TypeScript type definitions are located in `src/types/`.

---

## Game Types (`game.types.ts`)

### DifficultyLevel

```typescript
type DifficultyLevel = 'novice' | 'proficient' | 'expert' | 'custom';
```

### Difficulty

```typescript
type Difficulty = {
  value: DifficultyLevel;
  label: string;           // Display name (e.g., "Novice")
  disks: number;           // Number of disks
  description: string;     // Human-readable description
  isTimerOn: boolean;      // Whether a countdown timer is active
  timeLimit: number | undefined; // Time limit in seconds
}
```

### Disk

```typescript
type Disk = {
  id: number;    // Unique identifier
  size: number;  // Determines width and stacking rules (larger = wider)
}
```

### Tower

```typescript
type Tower = {
  id: number;      // Tower identifier (0, 1, or 2)
  disks: Disk[];   // Stack of disks (last element = top disk)
}
```

### GameState

```typescript
type GameState = {
  towers: Tower[];
  movesCount: number;
  isGameWon: boolean;
  isGameLost: boolean;
  difficulty: Difficulty;
  selectedTower: number | null;
}
```

### GameStatistic

```typescript
type GameStatistic = {
  movesCount: number;
  timePassed: number;
  timeRemaining: number | null;
  difficulty: Difficulty;
  minMoves: number;
  efficiency: number;
  isGameWon: boolean;
}
```

### SettingsFormData

Used by `react-hook-form` on the Start Page:

```typescript
type SettingsFormData = {
  nickname: string;
  difficultyValue: string;
  isTimerOn: boolean;
  customDisks: number;
  timeLimitMin: number;
  timeLimitSec: number;
}
```

### PlayerScore & Scoreboard

```typescript
type PlayerScore = {
  nickname: string;
  gameStats: GameStatistic[];
}

type Scoreboard = PlayerScore[];
```

---

## UI Types (`ui.types.ts`)

Props types for various components:

| Type | Used By | Key Props |
|---|---|---|
| `DifficultyProps` | `DifficultyOption` | `diff`, `setSelectedDifficulty`, `selectedDifficulty` |
| `CardProps` | `Card` | `children`, `Icon?`, `title?` |
| `InfoRowProps` | `InfoRow` | `label`, `value` |
| `StatCardProps` | `StatCard` | `value`, `label`, `color` |
| `ResultsPageProps` | `ResultsPage` | `gameStatistic`, `onPlayAgain` |
| `GameControlsProps` | `GameControls` | `timePassed`, `timeRemaining`, `isTimerRunning`, `onReset`, `onPause`, `onResume` |
| `HanoiGameProps` | `HanoiGame` | `onTowerSelect` |
| `TowerProps` | `Tower` | `tower`, `onClick`, `isSelected` |
