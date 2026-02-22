---
sidebar_position: 5
---

# useTowerSelection

**File:** `src/hooks/useTowerSelection.ts`

Manages which tower is currently selected by the player during gameplay.

## Return Value

| Property | Type | Description |
|---|---|---|
| `selectedTower` | `number \| null` | ID of the currently selected tower, or `null` |
| `selectTower` | `(towerId: number) => void` | Select a specific tower |
| `deselectTower` | `() => void` | Clear the selection |
| `toggleTower` | `(towerId: number) => void` | Toggle selection (select if unselected, deselect if same) |
| `isTowerSelected` | `(towerId: number) => boolean` | Check if a specific tower is selected |

## Usage

```typescript
const { selectedTower, selectTower, deselectTower, toggleTower, isTowerSelected } = useTowerSelection();

selectTower(0);         // Select tower 0
isTowerSelected(0);     // true
toggleTower(0);         // Deselect tower 0
deselectTower();        // Explicit deselect
```
