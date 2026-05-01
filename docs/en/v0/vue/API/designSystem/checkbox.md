---
title: designSystem Checkbox API
description: Reference for the design system checkbox components, with their props and the CSS variables to override in your theme.
---

# Checkbox

This page covers:

- `TheCheckbox`
- `CheckboxPolicy`

## Props

### `TheCheckbox`

- `id: string`
- `name?: string`
- `label?: string`

### `CheckboxPolicy`

- `id: string`
- `name?: string`
- `title?: string`
- `description?: string`
- `required?: boolean`
- `errorMessage?: string`

`CheckboxPolicy` also exposes local validation through `check()` and `reset()`.

## Exposed CSS variables

### `TheCheckbox`

- `--DFV-checkbox-background`
- `--DFV-checkbox-border-color`
- `--DFV-checkbox-hover-border-color`
- `--DFV-checkbox-checked-background`
- `--DFV-checkbox-checked-border-color`
- `--DFV-checkbox-indicator`
- `--DFV-checkbox-focus`
- `--DFV-checkbox-label-color`

### `CheckboxPolicy`

- `--DFV-checkbox-policy-background`
- `--DFV-checkbox-policy-border-color`
- `--DFV-checkbox-policy-title-color`
- `--DFV-checkbox-policy-description-color`
- `--DFV-checkbox-policy-required-color`
- `--DFV-checkbox-policy-error-color`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/checkbox/CheckboxUsage.vue-->
```
