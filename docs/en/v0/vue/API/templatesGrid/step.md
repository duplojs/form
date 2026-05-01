---
title: API GridStepByStepTemplate
description: Reference for the GridStepByStepTemplate component, the default grid template for the step type, with its step-by-step navigation.
---

# `GridStepByStepTemplate`

Default grid template for the `step` type.

## System props

- `fieldKey`
- `stepQuantity`
- `isLastStep()`
- `getFormFields()`
- `getCurrentValue()`
- `getCurrentStep()`
- `getErrorMessageNotAtLastStep()`

## Specific props

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

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/step/GridStepTemplateExample.vue-->
```

## What this template does

- renders only the current step;
- displays an error message if the last step has not been reached;
- exposes an area for navigation actions.
