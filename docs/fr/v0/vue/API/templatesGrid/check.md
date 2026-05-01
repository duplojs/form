---
title: API GridCheckTemplate
description: Référence du composant GridCheckTemplate, le template grid par défaut pour le type check, avec ses props et sa structure.
---

# `GridCheckTemplate`

Template grid par défaut pour le type `check`.

## Props système

- `fieldKey`
- `getCurrentValue()`
- `getErrorMessage()`

## Props grid

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Props spécifiques

- `hideEmptyMessageError?: boolean`

## Slots

- `formField`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/check/GridCheckTemplateExample.vue-->
```

## Ce que fait ce template

- encapsule le field validé dans une grille ;
- affiche l'erreur de validation sous le bloc.
