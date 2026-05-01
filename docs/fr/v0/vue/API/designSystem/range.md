---
title: API designSystem Range
description: Référence des composants range du design system, avec leurs props et les variables CSS utiles pour ajuster leur thème.
---

# Range

Cette page couvre :

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

## Variables CSS exposées

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

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/range/RangeUsage.vue-->
```
