---
title: designSystem Theme API
description: Documentation of the design system tokens and CSS variables to understand and cleanly override the default theme.
---

# Tokens and theme

The default theme is defined in `designSystem.scss` and `colors.scss`.

## Main global tokens

### Intent colors

- `--DFV-primary`
- `--DFV-primary-foreground`
- `--DFV-primary-border`
- `--DFV-primary-hover`
- `--DFV-primary-active`
- `--DFV-primary-focus`
- `--DFV-muted`
- `--DFV-muted-foreground`
- `--DFV-muted-foreground-soft`
- `--DFV-muted-border`
- `--DFV-muted-border-strong`
- `--DFV-muted-border-stronger`
- `--DFV-muted-hover`
- `--DFV-muted-active`
- `--DFV-muted-focus`
- `--DFV-destructive`
- `--DFV-destructive-foreground`
- `--DFV-destructive-border`
- `--DFV-destructive-hover`
- `--DFV-destructive-active`
- `--DFV-destructive-focus`

### Radius, spacing, typography, transition

- `--DFV-radius-sm`
- `--DFV-radius-md`
- `--DFV-radius-lg`
- `--DFV-radius-xl`
- `--DFV-radius-2xl`
- `--DFV-spacing-xs`
- `--DFV-spacing-sm`
- `--DFV-spacing-md`
- `--DFV-spacing-lg`
- `--DFV-spacing-xl`
- `--DFV-font-size-sm`
- `--DFV-font-size-md`
- `--DFV-font-weight-medium`
- `--DFV-font-weight-semibold`
- `--DFV-line-height-tight`
- `--DFV-line-height-normal`
- `--DFV-transition-fast`
- `--DFV-opacity-disabled`

## Override example

```css [css]
<!--@include: @/examples/v0/vue/API/designSystem/theme/tokens.css-->
```

## Recommendation

Always start with the global tokens.
Local component variables should mostly be used for targeted adjustments.
