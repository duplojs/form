---
title: API GridInputTemplate
description: Référence du composant GridInputTemplate, le template grid par défaut pour le type input, avec ses props système et son rendu.
---

# `GridInputTemplate`

Template grid par défaut pour le type `input`.

## Props système

- `getLabel?()`
- `getCurrentValue()`
- `getErrorMessage?()`
- `fieldKey`

## Props grid

- `columns?: number`

## Props spécifiques

- `hideEmptyMessageError?: boolean`

## Slots

- `input`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/input/GridInputTemplateExample.vue-->
```

## Ce que fait ce template

- affiche le label au-dessus du champ ;
- rend le slot `input` ;
- affiche la zone d'erreur sous le champ.
