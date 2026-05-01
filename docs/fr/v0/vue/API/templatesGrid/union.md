---
title: API GridUnionTemplate
description: Référence du composant GridUnionTemplate, le template grid par défaut pour le type union, avec ses props de sélection de branche.
---

# `GridUnionTemplate`

Template grid par défaut pour le type `union`.

## Props système

- `fieldKey`
- `kinds`
- `getCurrentValue()`
- `getCurrentKind()`

## Props grid

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Props spécifiques

- `labels?: Record<string, string>`
- `selectInputKind`

## Emits

- `changeKind(kind)`

## Slots

- `formField`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/union/GridUnionTemplateExample.vue-->
```

## Ce que fait ce template

- affiche un sélecteur de variante ;
- rend ensuite le field actif dans la grille.
