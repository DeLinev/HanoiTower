---
sidebar_position: 3
---

# Layout Components

Layout wrappers located in `src/components/layout/`.

---

## Layout

**File:** `src/components/layout/Layout.tsx`

The main page layout wrapper that provides a consistent header and content area across all pages.

### Props

| Prop | Type | Description |
|---|---|---|
| `children` | `ReactNode` | Page content to render inside the layout |

### Header Features

- **Logo** - SVG logo image (`src/assets/logo.svg`)
- **Title** - "Tower of Hanoi" as a link to the home page (`/`)
- **Help icon** (`QuestionMarkCircleIcon`) - Hover to show game rules tooltip
- **Settings icon** (`AdjustmentsVerticalIcon`) - Click to open the cookie preferences modal via `vanilla-cookieconsent`'s `showPreferences()` function

### Usage

```tsx
import { Layout } from "./components/layout/Layout";

<Layout>
  <h1>Page content goes here</h1>
</Layout>
```
