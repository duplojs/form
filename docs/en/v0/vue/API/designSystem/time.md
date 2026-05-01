---
title: designSystem Time API
description: Reference for the design system time components, with their props and the CSS variables exposed for customization.
---

# Time

This page covers:

- `TimeInput`
- `RangeTimeInput`

## Props

### `TimeInput`

- `min?: TheTime | SerializedTheTime`
- `max?: TheTime | SerializedTheTime`

### `RangeTimeInput`

- `min?: TheTime | SerializedTheTime`
- `max?: TheTime | SerializedTheTime`

## Exposed CSS variables

### `TimeInput`

- `--DFV-time-input-width`
- `--DFV-time-input-background`
- `--DFV-time-input-foreground`
- `--DFV-time-input-border-color`
- `--DFV-time-input-hover-border-color`
- `--DFV-time-input-focus-border-color`
- `--DFV-time-input-focus`

### `RangeTimeInput`

- `--DFV-range-time-input-gap`
- `--DFV-range-time-input-separator-color`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/time/TimeUsage.vue-->
```
