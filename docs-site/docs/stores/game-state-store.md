---
sidebar_position: 2
---

# useGameStateStore

**File:** `src/stores/useGameStateStore.ts`

A Zustand store that manages the runtime game state - towers, disks, move counter, and win/loss flags. **Not persisted** (resets on page reload).

## Store Shape

```typescript
type GameStateStore = {
  gameState: GameState;
  initializeGame: (difficulty: Difficulty) => void;
  selectTower: (towerId: number | null) => void;
  moveDisk: (fromTowerId: number, toTowerId: number) => void;
  incrementMoves: () => void;
  setGameWon: () => void;
  setGameLost: () => void;
  resetGame: (difficulty: Difficulty) => void;
}
```

## State - `gameState`

| Property | Type | Description |
|---|---|---|
| `towers` | `Tower[]` | Array of 3 towers, each containing an array of disks |
| `movesCount` | `number` | Number of moves made |
| `isGameWon` | `boolean` | Whether the player has won |
| `isGameLost` | `boolean` | Whether the player has lost (time up) |
| `difficulty` | `Difficulty` | Current game difficulty |
| `selectedTower` | `number \| null` | ID of the currently highlighted tower |

## Actions

### `initializeGame(difficulty: Difficulty)`

Creates a fresh game state with the specified number of disks stacked on tower 0 (largest at bottom, smallest at top).

### `selectTower(towerId: number | null)`

Sets or clears the selected tower highlight.

### `moveDisk(fromTowerId: number, toTowerId: number)`

Moves the top disk from one tower to another. Also increments `movesCount` and clears the tower selection.

### `incrementMoves()`

Manually increments the move counter by 1.

### `setGameWon()`

Sets `isGameWon` to `true`.

### `setGameLost()`

Sets `isGameLost` to `true`.

### `resetGame(difficulty: Difficulty)`

Resets the game state to a fresh initial configuration for the given difficulty.

## Initial Tower Setup

When initialized with `n` disks, the store creates:

| Tower | Contents |
|---|---|
| Tower 0 | All `n` disks (size `n` at bottom, size `1` at top) |
| Tower 1 | Empty |
| Tower 2 | Empty |

## Usage

```typescript
import { useGameStateStore } from "./stores/useGameStateStore";

const gameState = useGameStateStore(state => state.gameState);
const initializeGame = useGameStateStore(state => state.initializeGame);
const moveDisk = useGameStateStore(state => state.moveDisk);

initializeGame(difficulty);
moveDisk(0, 2); // Move top disk from tower 0 to tower 2
```
