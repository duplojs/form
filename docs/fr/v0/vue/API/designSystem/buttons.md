---
title: API designSystem Boutons
description: Référence des composants de boutons du design system, de leurs props et des variables CSS utilisées pour les personnaliser.
---

# Boutons

Le design system exporte :

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

Les variantes spécialisées reprennent le même contrat, sauf `variant` qui est fixé.

## Variables CSS exposées

### Variables communes

- `--DFV-button-gap`
- `--DFV-button-radius`
- `--DFV-button-font-size`
- `--DFV-button-font-weight`
- `--DFV-button-line-height`
- `--DFV-button-shadow`
- `--DFV-button-height`
- `--DFV-button-padding`
- `--DFV-button-width`

### Variables de couleur par variante

- `--DFV-button-background`
- `--DFV-button-foreground`
- `--DFV-button-border-color`
- `--DFV-button-hover-background`
- `--DFV-button-hover-border-color`
- `--DFV-button-active-background`
- `--DFV-button-focus`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/designSystem/buttons/ButtonsUsage.vue-->
```

## Conseil de thème

Pour recolorer toutes les variantes, changez d'abord les tokens globaux `--DFV-primary`, `--DFV-muted` et `--DFV-destructive`.
Ne surchargez les variables `--DFV-button-*` que si vous avez besoin d'un comportement spécifique aux boutons.
