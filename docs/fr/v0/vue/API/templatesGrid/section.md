---
title: API GridSectionTemplate
description: Référence du composant GridSectionTemplate, le template grid par défaut pour le type section, avec ses props de structure.
---

# `GridSectionTemplate`

Template grid par défaut pour le type `section`.

## Props système

- `fieldKey`
- `getCurrentValue()`
- `title?`

## Props grid

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Slots

- `formField`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/section/GridSectionTemplateExample.vue-->
```

## Ce que fait ce template

- affiche un titre de section si présent ;
- encapsule le contenu dans un bloc compatible avec la grille.
