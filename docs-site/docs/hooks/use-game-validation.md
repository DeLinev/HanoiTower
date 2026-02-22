---
sidebar_position: 3
---

# useGameValidation

**File:** `src/hooks/useGameValidation.ts`

Provides pure validation functions for game rules: tower selection, disk movement, win condition, and minimum moves calculation.

## Returned Functions

### `canSelectTower(tower: Tower): boolean`

Returns `true` if the tower has at least one disk (i.e., the player can pick a disk from it).

### `canMoveDisk(fromTower: Tower, toTower: Tower): boolean`

Returns `true` if a disk can be moved from `fromTower` to `toTower`. The move is valid when:

- The source tower is not empty, **and**
- The destination tower is empty, **or** the top disk on the destination is larger than the moving disk.

### `checkWin(towers: Tower[], maxDiskCount: number): boolean`

Returns `true` if all disks are stacked on the **last tower** (i.e., the last tower has `maxDiskCount` disks).

### `getMinMoves(disksCount: number): number`

Returns the theoretical minimum number of moves needed to solve the puzzle: $2^n - 1$.

## Usage

```typescript
const validation = useGameValidation();

if (validation.canSelectTower(tower)) { /* select */ }
if (validation.canMoveDisk(from, to)) { /* move */ }
if (validation.checkWin(towers, 5)) { /* game won */ }

const minMoves = validation.getMinMoves(5); // 31
```
