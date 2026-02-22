---
sidebar_position: 1
---

# useGame

**File:** `src/hooks/useGame.ts`

The main game orchestration hook. Combines timer, tower selection, validation, and game state management into a single interface for the `GamePage`.

## Signature

```typescript
function useGame(
  difficulty: Difficulty,
  onGameComplete: (
    movesCount: number,
    timePassed: number,
    remainingTime: number | null,
    isGameWon: boolean
  ) => void
): {
    timePassed: number;
    timeRemaining: number | null;
    isTimerRunning: boolean;
    isTimeUp: boolean;
    handleTowerSelect: (towerId: number) => void;
    resetGame: () => void;
    pauseGame: () => void;
    resumeGame: () => void;
}
```

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `difficulty` | `Difficulty` | The current game difficulty configuration |
| `onGameComplete` | `function` | Callback invoked when the game ends (win or time up) |

## Return Value

| Property | Type | Description |
|---|---|---|
| `timePassed` | `number` | Elapsed time in seconds |
| `timeRemaining` | `number \| null` | Remaining time (null if no limit) |
| `isTimerRunning` | `boolean` | Whether the timer is currently running |
| `isTimeUp` | `boolean` | Whether the timer has expired |
| `handleTowerSelect` | `(towerId: number) => void` | Handler for tower click events |
| `resetGame` | `() => void` | Resets the game to initial state |
| `pauseGame` | `() => void` | Pauses the timer |
| `resumeGame` | `() => void` | Resumes the timer |

## Game Logic Flow

1. **Initialize** - On mount (or difficulty change), calls `initializeGame(difficulty)` to set up towers with the correct number of disks.
2. **Tower Selection** - When a tower is clicked:
   - If no tower is selected and the clicked tower has disks → select it.
   - If the same tower is clicked again → deselect it.
   - If a different tower is clicked and the move is valid → move the disk and check for win.
   - If the move is invalid → deselect.
3. **Win Check** - After each move, checks if all disks are on the last tower.
4. **Time Up** - If the timer expires, `onGameComplete` is called with `isGameWon: false`.

## Internal Hooks Used

- `useGameStateStore` - Zustand store for game state
- `useTimer` - Timer management
- `useTowerSelection` - Tower selection state
- `useGameValidation` - Move validation and win checking
