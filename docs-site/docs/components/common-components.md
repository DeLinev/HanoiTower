---
sidebar_position: 1
---

# Common Components

Reusable UI components located in `src/components/common/`.

---

## Button

**File:** `src/components/common/Button.tsx`

A configurable button component with variant, size, and width options.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | - | Button content |
| `onClick` | `() => void` | - | Click handler |
| `variant` | `'primary' \| 'secondary' \| 'success'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Whether button expands to full container width |

### Usage

```tsx
import { Button } from "./components/common/Button";

<Button variant="primary" size="large" onClick={handleClick}>
  Start Game
</Button>

<Button variant="secondary" size="small" fullWidth>
  Reset
</Button>
```

### Variant Styles

- **`primary`** - Blue background (`bg-blue-600`)
- **`secondary`** - Gray background (`bg-gray-600`)
- **`success`** - Green background (`bg-green-600`)

---

## Card

**File:** `src/components/common/Card.tsx`

A container card component with optional icon and title.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | - | Card content |
| `Icon` | `ElementType` | - | Optional Heroicon component displayed next to the title |
| `title` | `string` | - | Optional card title |

### Usage

```tsx
import { Card } from "./components/common/Card";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";

<Card Icon={Cog6ToothIcon} title="Game Settings">
  <p>Card content goes here</p>
</Card>
```

---

## StatCard

**File:** `src/components/common/StatCard.tsx`

A colored statistic display card used on results and score pages.

### Props

| Prop | Type | Description |
|---|---|---|
| `value` | `string \| number` | The statistic value to display |
| `label` | `string` | Label text below the value |
| `color` | `'orange' \| 'indigo' \| 'green' \| 'blue' \| 'red'` | Background color |

### Usage

```tsx
<StatCard value={42} label="Number of Moves" color="orange" />
<StatCard value="85%" label="Win Rate" color="green" />
```

---

## InfoRow

**File:** `src/components/common/InfoRow.tsx`

A key-value row component for displaying labeled information.

### Props

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Left-aligned label text |
| `value` | `ReactNode` | Right-aligned value (can be a string, number, or JSX) |

### Usage

```tsx
<InfoRow label="Difficulty" value="Expert" />
<InfoRow label="Time Remaining" value={<span className="text-green-600">01m 30s</span>} />
```

---

## StatRow

**File:** `src/components/common/StatRow.tsx`

A row component that displays a single game result in the player's score history.

### Props

| Prop | Type | Description |
|---|---|---|
| `game` | `GameStatistic` | A game statistic record |

Shows: win/loss badge, moves count, time elapsed, time remaining (if timer was on), efficiency (if won), and disk count.

---

## AchievementMessage

**File:** `src/components/common/AchievementMessage.tsx`

Displays a congratulatory or encouraging message based on the player's efficiency percentage.

### Props

| Prop | Type | Description |
|---|---|---|
| `efficiency` | `number` | Efficiency percentage (0–100+) |

### Behavior

- **`efficiency === 100`** - Shows a green "Perfect!" message (solved in optimal moves).
- **`efficiency < 100`** - Shows a blue "Great job!" encouragement message.

---

## Portal

**File:** `src/components/common/Portal.tsx`

Renders children into a DOM node outside the main React tree (`#portal-root`). Used for modal overlays.

### Props

| Prop | Type | Description |
|---|---|---|
| `children` | `ReactNode` | Content to render in the portal |

### Usage

```tsx
<Portal>
  <ResultsPage gameStatistic={stats} onPlayAgain={handlePlayAgain} />
</Portal>
```

---

## CookiePopup

**File:** `src/components/common/CookiePopup.tsx`

GDPR-compliant cookie consent banner powered by `vanilla-cookieconsent`.

### Cookie Categories

| Category | Default | Description |
|---|---|---|
| `necessary` | Enabled (read-only) | Essential cookies that cannot be disabled |
| `analytics` | Disabled | Performance & analytics cookies, opt-in only |

### Cookies Set

- **`necessary-cookie`** - Always set on consent
- **`analytics-cookie`** - Only set if the user explicitly consents to analytics

This component renders nothing visually (`return null`) - the cookie banner is managed by the `vanilla-cookieconsent` library.
