---
sidebar_position: 4
---

# useDiskMovement

**File:** `src/hooks/useDiskMovement.ts`

Provides utility functions for disk operations on towers. All functions are pure - they return new data without mutating the originals.

## Returned Functions

### `moveDisk(towers: Tower[], fromTowerId: number, toTowerId: number): Tower[]`

Creates a deep clone of the towers array, pops the top disk from the source tower, and pushes it onto the destination tower. Returns the updated towers array.

**Note:** This function does not validate the move - use `useGameValidation.canMoveDisk()` before calling this.

### `getTopDisk(tower: Tower): Disk | null`

Returns the top disk (last element) of a tower, or `null` if the tower is empty.

### `getDiskCount(tower: Tower): number`

Returns the number of disks on a tower.

## Usage

```typescript
const { moveDisk, getTopDisk, getDiskCount } = useDiskMovement();

const newTowers = moveDisk(towers, 0, 2);
const topDisk = getTopDisk(tower);    // { id: 0, size: 3 } or null
const count = getDiskCount(tower);     // 3
```
