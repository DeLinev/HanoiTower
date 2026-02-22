---
sidebar_position: 1
---

# useGameSettingsStore

**File:** `src/stores/useGameSettingsStore.ts`

A Zustand store that manages the player's selected difficulty settings. **Persisted** to `localStorage` under the key `gameSettings`.

## Store Shape

```typescript
type GameSettingsStore = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}
```

## State

| Property | Type | Default | Description |
|---|---|---|---|
| `difficulty` | `Difficulty` | `difficulties[1]` (Proficient) | The currently selected difficulty configuration |

## Actions

### `setDifficulty(difficulty: Difficulty)`

Updates the difficulty. The new value is automatically persisted to `localStorage`.

## Persistence

Uses Zustand's `persist` middleware with `{ name: 'gameSettings' }`. The data is stored as JSON in `localStorage.gameSettings`.

## Usage

```typescript
import { useGameSettingsStore } from "./stores/useGameSettingsStore";

// In a component
const { difficulty, setDifficulty } = useGameSettingsStore();

// Or select specific state
const difficulty = useGameSettingsStore(state => state.difficulty);
```
