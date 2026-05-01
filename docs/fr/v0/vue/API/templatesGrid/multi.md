---
title: API GridMultiTemplate
description: Référence du composant GridMultiTemplate, le template grid par défaut pour le type multi, avec ses props et son agencement.
---

# `GridMultiTemplate`

Template grid par défaut pour le type `multi`.

## Props système

- `fieldKey`
- `getCurrentValue()`
- `getFormFields()`

## Props grid

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Slots

- `formField`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/multi/GridMultiTemplateExample.vue-->
```

## Ce que fait ce template

- crée un conteneur grid imbriqué ;
- laisse chaque sous-champ gérer sa propre largeur dans la grille.
