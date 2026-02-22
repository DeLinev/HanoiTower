---
sidebar_position: 6
---

# useLocalStorage

**File:** `src/hooks/useLocalStorage.ts`

A generic hook for reading, writing, and removing values from the browser's `localStorage`. Automatically syncs across tabs via the `storage` event.

## Signature

```typescript
function useLocalStorage<T>(
    key: string, 
    initialValue: T): readonly [
        T, 
        (value: T | ((prev: T) => T)) => void, 
        () => void
    ]
```

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `key` | `string` | The localStorage key |
| `initialValue` | `T` | Fallback value if the key doesn't exist |

## Return Value

Returns a tuple of three values:

| Index | Type | Description |
|---|---|---|
| `[0]` | `T` | The current stored value |
| `[1]` | `(value: T \| ((prev: T) => T)) => void` | Setter function (accepts direct value or updater function) |
| `[2]` | `() => void` | Remove function (deletes the key and resets to `initialValue`) |

## Features

- **JSON serialization** - Automatically `JSON.stringify` on write and `JSON.parse` on read.
- **Cross-tab sync** - Listens for `StorageEvent` events and updates state when the same key changes in another tab.
- **Error handling** - Catches and logs errors gracefully without crashing.

## Usage

```typescript
const [player, setPlayer, removePlayer] = useLocalStorage("currentPlayer", "Player1");

setPlayer("NewName");          // Save to localStorage
setPlayer(prev => prev + "!"); // Functional update
removePlayer();                // Remove from localStorage
```
