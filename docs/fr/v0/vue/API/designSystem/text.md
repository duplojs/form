---
title: API designSystem Inputs texte et nombre
description: Référence des composants texte, textarea et nombre du design system, avec leurs props et variables CSS exposées.
---

# Inputs texte et nombre

Cette page couvre :

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

## Variables CSS exposées

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

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/text/TextUsage.vue-->
```

## Conseil de thème

Pour garder un rendu homogène, surchargez ces trois composants ensemble si vous changez les champs de saisie principaux.
