---
sidebar_position: 2
---

# Game Components

Components specific to the Tower of Hanoi gameplay, located in `src/components/game/`.

---

## HanoiGame

**File:** `src/components/game/HanoiGame.tsx`

The main game board component. Renders a grid of three towers and a base platform.

### Props

| Prop | Type | Description |
|---|---|---|
| `onTowerSelect` | `(towerId: number) => void` | Callback invoked when a tower is clicked |

### Behavior

- Reads towers from `useGameStateStore`
- Renders three `Tower` components in a 3-column CSS grid
- Highlights the currently selected tower based on `gameState.selectedTower`
- Renders a gray base bar below the towers

### Usage

```tsx
<HanoiGame onTowerSelect={handleTowerSelect} />
```

---

## Tower

**File:** `src/components/game/Tower.tsx`

Represents a single tower (peg) in the game. Shows a vertical rod and stacked disks.

### Props

| Prop | Type | Description |
|---|---|---|
| `tower` | `Tower` | The tower data containing its id and array of disks |
| `onClick` | `() => void` | Click handler for selecting this tower |
| `isSelected` | `boolean` | Whether this tower is currently selected |

### Behavior

- Renders a vertical rod (`div` with gray background)
- Stacks `Disk` components from bottom to top using `flex-col-reverse`
- Shows a highlight gradient at the bottom when `isSelected` is `true`
- Supports keyboard navigation (`Enter` and `Space` keys)

### Accessibility

- `role="button"` - Indicates the tower is interactive
- `aria-pressed` - Reflects the selected state
- `tabIndex={0}` - Makes the tower focusable
- `onKeyDown` - Keyboard support for Enter/Space

---

## Disk

**File:** `src/components/game/Disk.tsx`

Renders a single disk with a width proportional to its size and a color based on its size index.

### Props

| Prop | Type | Description |
|---|---|---|
| `disk` | `Disk` | Disk data with `id` and `size` properties |

### Sizing

The width is calculated as: `20 + (disk.size × 10)` percent of the container width.

### Color Palette

| Size | Color |
|---|---|
| 1 | Red |
| 2 | Orange |
| 3 | Yellow |
| 4 | Green |
| 5 | Blue |
| 6 | Indigo |
| 7 | Purple |
| 8 | Pink |

---

## GameControls

**File:** `src/components/game/GameControls.tsx`

The top control bar displayed during gameplay. Shows the move counter, timer, and action buttons.

### Props

| Prop | Type | Description |
|---|---|---|
| `timePassed` | `number` | Elapsed time in seconds |
| `timeRemaining` | `number \| null` | Remaining time (null if no time limit) |
| `isTimerRunning` | `boolean` | Whether the timer is currently running |
| `onReset` | `() => void` | Callback to reset the game |
| `onPause` | `() => void` | Callback to pause the timer |
| `onResume` | `() => void` | Callback to resume the timer |

### Displayed Information

- **Moves** - Current move count from `useGameStateStore`
- **Time** - Shows `timeRemaining` if a time limit exists, otherwise `timePassed`

### Action Buttons

| Button | Action |
|---|---|
| Reset | Resets the entire game |
| Pause / Resume | Toggles timer state |
| Quit | Navigates back to the start page (`/`) |
