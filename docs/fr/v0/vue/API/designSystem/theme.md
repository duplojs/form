---
title: API designSystem Theme
description: Documentation des tokens et variables CSS du design system pour comprendre et surcharger proprement le thème par défaut.
---

# Tokens et thème

Le thème par défaut est défini dans `designSystem.scss` et `colors.scss`.

## Tokens globaux principaux

### Couleurs d'intention

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

### Rayon, spacing, typo, transition

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

## Exemple de surcharge

```css [css]
<!--@include: @/examples/v0/vue/API/designSystem/theme/tokens.css-->
```

## Recommandation

Commencez toujours par les tokens globaux.
Les variables locales des composants doivent surtout servir à des ajustements ciblés.
