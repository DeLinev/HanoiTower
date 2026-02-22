---
sidebar_position: 9
---

# Utilities

Utility functions located in `src/utils/`.

---

## formatTime

**File:** `src/utils/format.utils.ts`

Converts a duration in seconds to a human-readable `MMm SSs` format.

### Signature

```typescript
function formatTime(seconds: number): string
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `seconds` | `number` | Duration in seconds |

### Return Value

A formatted string like `"02m 30s"` or `"00m 05s"`.

### Examples

| Input | Output |
|---|---|
| `0` | `"00m 00s"` |
| `5` | `"00m 05s"` |
| `65` | `"01m 05s"` |
| `150` | `"02m 30s"` |
| `3600` | `"60m 00s"` |