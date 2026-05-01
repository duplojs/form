---
title: API designSystem Date
description: Référence des composants de date du design system, avec leurs props et les variables CSS impliquées dans leur apparence.
---

# Date

Cette page couvre :

- `DateInput`
- `RangeDateInput`

## Props

### `DateInput`

- `min?: TheDate | SerializedTheDate`
- `max?: TheDate | SerializedTheDate`

### `RangeDateInput`

- `min?: TheDate | SerializedTheDate`
- `max?: TheDate | SerializedTheDate`

## Variables CSS exposées

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

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/date/DateUsage.vue-->
```
