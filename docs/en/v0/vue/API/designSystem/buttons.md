---
title: designSystem Buttons API
description: Reference for the design system button components, their props, and the CSS variables used to customize them.
---

# Buttons

The design system exports:

- `TheButton`
- `PrimaryButton`
- `OutlineButton`
- `GhostButton`
- `DestructiveButton`

## Props

### `TheButton`

- `label?: string`
- `variant?: "destructive" | "primary" | "ghost" | "outline"`
- `size?: "sm" | "md" | "lg" | "xl" | "2xl"`
- `icon?`
- `iconSize?`
- `iconPosition?: "start" | "end"`
- `type?: "button" | "submit" | "reset"`
- `disabled?: boolean`

The specialized variants use the same contract, except that `variant` is fixed.

## Exposed CSS variables

### Shared variables

- `--DFV-button-gap`
- `--DFV-button-radius`
- `--DFV-button-font-size`
- `--DFV-button-font-weight`
- `--DFV-button-line-height`
- `--DFV-button-shadow`
- `--DFV-button-height`
- `--DFV-button-padding`
- `--DFV-button-width`

### Color variables per variant

- `--DFV-button-background`
- `--DFV-button-foreground`
- `--DFV-button-border-color`
- `--DFV-button-hover-background`
- `--DFV-button-hover-border-color`
- `--DFV-button-active-background`
- `--DFV-button-focus`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/buttons/ButtonsUsage.vue-->
```

## Theme advice

To recolor all variants, start by changing the global tokens `--DFV-primary`, `--DFV-muted`, and `--DFV-destructive`.
Only override the `--DFV-button-*` variables when you need button-specific behavior.
