---
sidebar_position: 7
---

# Pages

All pages are located in `src/pages/` and serve as route-level components rendered by React Router.

---

## StartPage

**File:** `src/pages/StartPage.tsx` | **Route:** `/`

The landing page with a game settings form.

### Form Fields

| Field | Validation | Description |
|---|---|---|
| Nickname | Required, 3–10 chars, alphanumeric + underscores | Player display name |
| Number of disks | Required, 3–10 | How many disks to play with |
| Timer toggle | Checkbox | Enable/disable countdown timer |
| Time limit (min/sec) | 0–60 min, 0–59 sec | Visible only when timer is on |

### Behavior

- Uses `react-hook-form` for validation
- Loads defaults from `useGameSettingsStore` (persisted difficulty) and `useLocalStorage` (player name)
- On submit: saves settings to the store and navigates to `/game`
- Contains a "Scoreboard" button that navigates to `/scoreboard`

---

## GamePage

**File:** `src/pages/GamePage.tsx` | **Route:** `/game`

The main gameplay page.

### Features

- Renders `GameControls` (timer, move counter, action buttons) and `HanoiGame` (towers & disks)
- Uses the `useGame` hook to orchestrate all game logic
- On game completion (win or time up): shows `ResultsPage` in a modal portal
- Records the game result to the scoreboard via `useScoreboardStore.addRecord()`

---

## ResultsPage

**File:** `src/pages/ResultsPage.tsx` | **Used as:** Modal (not a standalone route)

Post-game results overlay shown inside a `Portal`.

### Props

| Prop | Type | Description |
|---|---|---|
| `gameStatistic` | `GameStatistic` | The completed game's statistics |
| `onPlayAgain` | `() => void` | Callback to reset and start a new game |

### Displayed Data

- Win/loss status with contextual message
- Move count, time elapsed (as `StatCard` components)
- Difficulty, minimum moves, time remaining, efficiency (as `InfoRow` components)
- `AchievementMessage` based on efficiency (only on win)
- "Play again" and "Main menu" buttons

---

## ScoreboardPage

**File:** `src/pages/ScoreboardPage.tsx` | **Route:** `/scoreboard`

Displays a table of all players and their total games played.

### Features

- Lists all players from `useScoreboardStore`
- Each row is clickable → navigates to `/score/:nickname`
- "Clear Scoreboard" button to delete all records
- Shows a placeholder message if no players exist yet

---

## ScorePage

**File:** `src/pages/ScorePage.tsx` | **Route:** `/score/:nickname`

Detailed statistics for a specific player.

### Displayed Data

- **Summary cards:** Total games, games won, games lost, win rate
- **Recent games:** Last 5 games with `StatRow` components showing win/loss, moves, time, efficiency, disk count
- Redirects to `/not-found` if the nickname is not found in the scoreboard

---

## NotFoundPage

**File:** `src/pages/NotFoundPage.tsx` | **Route:** `/not-found` and `*`

A 404 error page with a "Home" button that navigates back to `/`.
