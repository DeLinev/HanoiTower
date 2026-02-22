---
sidebar_position: 2
---

# Architecture Overview

This page describes the high-level architecture of the Tower of Hanoi application.

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── game/            # Game-specific components
│   └── layout/          # Page layout wrapper
├── constants/           # Game constants & difficulty presets
├── hooks/               # Custom React hooks
├── pages/               # Route-level page components
├── stores/              # Zustand state stores
├── types/               # TypeScript type definitions
├── utils/               # Utility/helper functions
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles (Tailwind CSS)
```

## Routing

The app uses **React Router v7** for client-side navigation. Routes are defined in `App.tsx`:

| Path | Page Component | Description |
|---|---|---|
| `/` | `StartPage` | Game settings form (nickname, disks, timer) |
| `/game` | `GamePage` | Main gameplay screen |
| `/scoreboard` | `ScoreboardPage` | List of all players and their game counts |
| `/score/:nickname` | `ScorePage` | Detailed statistics for a specific player |
| `/not-found` | `NotFoundPage` | 404 page |
| `*` | `NotFoundPage` | Catch-all for unknown routes |

## State Management

The application uses **Zustand** for state management with three stores:

1. **`useGameSettingsStore`** - Persists difficulty settings to `localStorage` under the key `gameSettings`.
2. **`useGameStateStore`** - Manages runtime game state (towers, moves, win/loss). Not persisted.
3. **`useScoreboardStore`** - Persists player scores to `localStorage` under the key `scoreboard`.

Zustand's `persist` middleware is used for stores that need to survive page reloads.