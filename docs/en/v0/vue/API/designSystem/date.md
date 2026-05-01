---
title: designSystem Date API
description: Reference for the design system date components, with their props and the CSS variables involved in their appearance.
---

# Date

This page covers:

- `DateInput`
- `RangeDateInput`

## Props

### `DateInput`

- `min?: TheDate | SerializedTheDate`
- `max?: TheDate | SerializedTheDate`

### `RangeDateInput`

- `min?: TheDate | SerializedTheDate`
- `max?: TheDate | SerializedTheDate`

## Exposed CSS variables

### `DateInput`

- `--DFV-date-input-width`
- `--DFV-date-input-background`
- `--DFV-date-input-foreground`
- `--DFV-date-input-border-color`
- `--DFV-date-input-hover-border-color`
- `--DFV-date-input-focus-border-color`
- `--DFV-date-input-focus`

### `RangeDateInput`

- `--DFV-range-date-input-gap`
- `--DFV-range-date-input-separator-color`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/date/DateUsage.vue-->
```
