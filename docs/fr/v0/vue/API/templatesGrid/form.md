---
title: API GridFormTemplate
description: Référence du composant GridFormTemplate, le template grid par défaut pour le type form, avec ses props système et ses usages.
---

# `GridFormTemplate`

Template grid par défaut pour le type `form`.

## Props système

- `fieldKey`
- `getCurrentValue()`

## Props grid

- `maxColumns?: number`
- `gap?: number`

## Slots

- `formField`
- `submitter`

## Emits

- `submit`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/form/GridFormTemplateExample.vue-->
```

## Ce que fait ce template

- crée un `<form>` ;
- encapsule les champs dans un conteneur grid ;
- laisse la zone de soumission en dehors de la grille principale.
