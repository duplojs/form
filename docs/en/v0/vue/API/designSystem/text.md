---
title: designSystem Text and number inputs API
description: Reference for the design system text, textarea, and number components, with their props and exposed CSS variables.
---

# Text and number inputs

This page covers:

- `TextInput`
- `TextareaInput`
- `NumberInput`

## Props

### `TextInput`

- `placeholder?: string`

### `TextareaInput`

- `placeholder?: string`

### `NumberInput`

- `placeholder?: string`
- `min?: number`
- `max?: number`
- `step?: number`

## Exposed CSS variables

### `TextInput`

- `--DFV-text-input-width`
- `--DFV-text-input-background`
- `--DFV-text-input-foreground`
- `--DFV-text-input-border-color`
- `--DFV-text-input-hover-border-color`
- `--DFV-text-input-focus-border-color`
- `--DFV-text-input-focus`
- `--DFV-text-input-placeholder`

### `TextareaInput`

- `--DFV-text-area-width`
- `--DFV-text-area-background`
- `--DFV-text-area-foreground`
- `--DFV-text-area-border-color`
- `--DFV-text-area-hover-border-color`
- `--DFV-text-area-focus-border-color`
- `--DFV-text-area-focus`
- `--DFV-text-area-placeholder`

### `NumberInput`

- `--DFV-number-input-width`
- `--DFV-number-input-background`
- `--DFV-number-input-foreground`
- `--DFV-number-input-border-color`
- `--DFV-number-input-hover-border-color`
- `--DFV-number-input-focus-border-color`
- `--DFV-number-input-focus`
- `--DFV-number-input-placeholder`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/text/TextUsage.vue-->
```

## Theme advice

To keep a consistent look, override these three components together if you are changing the primary text input style.
