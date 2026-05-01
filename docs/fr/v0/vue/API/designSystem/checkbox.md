---
title: API designSystem Checkbox
description: Référence des composants checkbox du design system, avec leurs props et les variables CSS à surcharger pour le thème.
---

# Checkbox

Cette page couvre :

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

`CheckboxPolicy` expose aussi une validation locale via `check()` et `reset()`.

## Variables CSS exposées

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

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/checkbox/CheckboxUsage.vue-->
```
