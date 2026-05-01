---
title: API GridStepByStepTemplate
description: Référence du composant GridStepByStepTemplate, le template grid par défaut pour le type step, avec sa navigation par étapes.
---

# `GridStepByStepTemplate`

Template grid par défaut pour le type `step`.

## Props système

- `fieldKey`
- `stepQuantity`
- `isLastStep()`
- `getFormFields()`
- `getCurrentValue()`
- `getCurrentStep()`
- `getErrorMessageNotAtLastStep()`

## Props spécifiques

- `nextButton`
- `nextLabel?: string`
- `previousButton`
- `previousLabel?: string`
- `resetButton`
- `resetLabel?: string`
- `hideEmptyMessageError?: boolean`

## Emits

- `nextStep`
- `previousStep`
- `resetStep`

## Slots

- `formField`

## Exemple

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/step/GridStepTemplateExample.vue-->
```

## Ce que fait ce template

- rend uniquement l'étape courante ;
- affiche un message d'erreur si la dernière étape n'est pas atteinte ;
- expose une zone d'actions de navigation.
