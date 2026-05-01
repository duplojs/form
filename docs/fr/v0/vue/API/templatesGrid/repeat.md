---
title: API GridRepeatTemplate
description: Référence du composant GridRepeatTemplate, le template grid par défaut pour le type repeat, avec ses contrôles d'ajout et de suppression.
---

# `GridRepeatTemplate`

Template grid par défaut pour le type `repeat`.

## Props système

- `fieldKey`
- `max`
- `min`
- `getFormFieldsQuantity()`
- `getCurrentValue()`
- `getFormFields()`

## Props grid

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Props spécifiques

- `repeatElementColumn?: number`
- `repeatElementMaxColumn?: number`
- `removeButton`
- `removeLabel?: string`
- `addButton`
- `addLabel?: string`
- `resetButton`
- `resetLabel?: string`

## Emits

- `addElement`
- `removeElement(index)`
- `resetElement(index)`

## Slots

- `formField`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/repeat/GridRepeatTemplateExample.vue-->
```

## Ce que fait ce template

- rend chaque élément répété dans son propre bloc ;
- affiche des actions de reset/suppression par élément ;
- affiche une action globale d'ajout.
