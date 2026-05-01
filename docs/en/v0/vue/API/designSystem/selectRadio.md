---
title: designSystem Select and radio API
description: Reference for the design system select and radio components, with their props, behavior, and theme CSS variables.
---

# Select and radio

This page covers:

- `SelectInput`
- `RadioGroup`

## Props

### `SelectInput`

- `fieldKey?: string`
- `options: { value: string; label: string }[]`

### `RadioGroup`

- `name?: string`
- `options: { value: string; label: string; description?: string }[]`

## Exposed CSS variables

### `SelectInput`

- `--DFV-select-input-width`
- `--DFV-select-input-background`
- `--DFV-select-input-foreground`
- `--DFV-select-input-border-color`
- `--DFV-select-input-hover-border-color`
- `--DFV-select-input-focus-border-color`
- `--DFV-select-input-focus`
- `--DFV-select-input-icon-color`
- `--DFV-select-input-icon-size`

### `RadioGroup` / `Radio`

- `--DFV-radio-group-gap`
- `--DFV-radio-background`
- `--DFV-radio-border-color`
- `--DFV-radio-hover-border-color`
- `--DFV-radio-checked-background`
- `--DFV-radio-checked-border-color`
- `--DFV-radio-indicator`
- `--DFV-radio-focus`
- `--DFV-radio-label-color`
- `--DFV-radio-description-color`
- `--DFV-radio-content-gap`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/selectRadio/SelectRadioUsage.vue-->
```
