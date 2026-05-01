---
title: designSystem Range API
description: Reference for the design system range components, with their props and the CSS variables useful to adjust their theme.
---

# Range

This page covers:

- `RangeInput`
- `DualRangeInput`

## Props

### `RangeInput`

- `min?: number`
- `max?: number`
- `step?: number`
- `manual?: boolean`
- `manualDebounce?: number`

### `DualRangeInput`

- `min?: number`
- `max?: number`
- `step?: number`
- `manual?: boolean`
- `manualDebounce?: number`

## Exposed CSS variables

### `RangeInput`

- `--DFV-range-track-color`
- `--DFV-range-track-hover-color`
- `--DFV-range-track-active-color`
- `--DFV-range-thumb-color`
- `--DFV-range-thumb-border-color`
- `--DFV-range-focus`
- `--DFV-range-track-height`
- `--DFV-range-thumb-size`
- `--DFV-range-progress`
- `--DFV-range-manual-gap`
- `--DFV-range-manual-width`
- `--DFV-range-manual-justify`

### `DualRangeInput`

- `--DFV-dual-range-track-color`
- `--DFV-dual-range-track-hover-color`
- `--DFV-dual-range-track-active-color`
- `--DFV-dual-range-thumb-color`
- `--DFV-dual-range-thumb-border-color`
- `--DFV-dual-range-focus`
- `--DFV-dual-range-track-height`
- `--DFV-dual-range-thumb-size`
- `--DFV-dual-range-start`
- `--DFV-dual-range-width`
- `--DFV-dual-range-gap`
- `--DFV-dual-range-manual-width`
- `--DFV-dual-range-manual-justify`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/range/RangeUsage.vue-->
```
