---
sidebar_position: 3
---

# useScoreboardStore

**File:** `src/stores/useScoreboardStore.ts`

A Zustand store that manages the player scoreboard. **Persisted** to `localStorage` under the key `scoreboard`.

## Store Shape

```typescript
type ScoreboardStore = {
  scoreboard: Scoreboard;             // PlayerScore[]
  addRecord: (gameStat: GameStatistic, currentPlayer: string) => void;
  clearScoreboard: () => void;
}
```

## State

| Property | Type | Default | Description |
|---|---|---|---|
| `scoreboard` | `Scoreboard` | `[]` | Array of player score records |

### Scoreboard Data Structure

```typescript
type PlayerScore = {
  nickname: string;
  gameStats: GameStatistic[];
}

type Scoreboard = PlayerScore[];
```

Each `GameStatistic` contains:

| Field | Type | Description |
|---|---|---|
| `movesCount` | `number` | Total moves made |
| `timePassed` | `number` | Elapsed time in seconds |
| `timeRemaining` | `number \| null` | Remaining time (null if no limit) |
| `difficulty` | `Difficulty` | The difficulty configuration used |
| `minMoves` | `number` | Theoretical minimum moves ($2^n - 1$) |
| `efficiency` | `number` | Percentage: `(minMoves / movesCount) × 100` |
| `isGameWon` | `boolean` | Whether the game was won |

## Actions

### `addRecord(gameStat: GameStatistic, currentPlayer: string)`

Adds a game result to the scoreboard. If the player already exists, the new game stat is appended to their `gameStats` array. If the player is new, a new entry is created.

### `clearScoreboard()`

Clears all scoreboard records (sets scoreboard to an empty array).

## Persistence

Uses Zustand's `persist` middleware with `{ name: 'scoreboard' }`. All data is stored as JSON in `localStorage.scoreboard`.

## Usage

```typescript
import { useScoreboardStore } from "./stores/useScoreboardStore";

const { scoreboard, addRecord, clearScoreboard } = useScoreboardStore();

addRecord(gameStatistic, "Player1");
clearScoreboard();
```
