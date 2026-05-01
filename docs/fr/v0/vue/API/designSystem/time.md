---
title: API designSystem Heure
description: Référence des composants d'heure du design system, avec leurs props et les variables CSS exposées pour la personnalisation.
---

# Heure

Cette page couvre :

- `TimeInput`
- `RangeTimeInput`

## Props

### `TimeInput`

- `min?: TheTime | SerializedTheTime`
- `max?: TheTime | SerializedTheTime`

### `RangeTimeInput`

- `min?: TheTime | SerializedTheTime`
- `max?: TheTime | SerializedTheTime`

## Variables CSS exposées

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

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/time/TimeUsage.vue-->
```
