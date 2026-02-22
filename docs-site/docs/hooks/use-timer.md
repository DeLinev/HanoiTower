---
sidebar_position: 2
---

# useTimer

**File:** `src/hooks/useTimer.ts`

A versatile timer hook that supports both elapsed time tracking and countdown functionality.

## Signature

```typescript
function useTimer(
  autoStart?: boolean,
  timeLimit?: number | null,
  onTimeUp?: () => void
): {
    timePassed: number;
    timeRemaining: number | null;
    isRunning: boolean;
    isTimeUp: boolean;
    start: () => void;
    pause: () => void;
    reset: () => void;
    restart: () => void;
}
```

## Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `autoStart` | `boolean` | `false` | Whether the timer starts automatically on mount |
| `timeLimit` | `number \| null` | `null` | Optional time limit in seconds (enables countdown mode) |
| `onTimeUp` | `() => void` | - | Callback invoked when the time limit is reached |

## Return Value

| Property | Type | Description |
|---|---|---|
| `timePassed` | `number` | Elapsed time in seconds |
| `timeRemaining` | `number \| null` | Remaining time (null if no time limit) |
| `isRunning` | `boolean` | Whether the timer is currently ticking |
| `isTimeUp` | `boolean` | Whether the time limit has been reached |
| `start` | `() => void` | Start or resume the timer |
| `pause` | `() => void` | Pause the timer |
| `reset` | `() => void` | Reset to 0 and stop |
| `restart` | `() => void` | Reset to 0 and immediately start |

## How It Works

- Uses `setInterval` with a 1-second tick interval.
- When `timeLimit` is provided, the timer automatically stops and sets `isTimeUp = true` when `timePassed >= timeLimit`.
- `timeRemaining` is calculated as `Math.max(0, timeLimit - timePassed)`.
- The `onTimeUp` callback is stored in a `useRef` to avoid stale closure issues.

## Usage

```typescript
// Countdown timer with 60-second limit
const timer = useTimer(true, 60, () => console.log("Time's up!"));

// Stopwatch (no limit)
const stopwatch = useTimer(true);
```
