---
title: API GridRepeatTemplate
description: Reference for the GridRepeatTemplate component, the default grid template for the repeat type, with its add and remove controls.
---

# `GridRepeatTemplate`

Default grid template for the `repeat` type.

## System props

- `fieldKey`
- `max`
- `min`
- `getFormFieldsQuantity()`
- `getCurrentValue()`
- `getFormFields()`

## Grid props

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Specific props

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

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/repeat/GridRepeatTemplateExample.vue-->
```

## What this template does

- renders each repeated element in its own block;
- displays reset and remove actions for each element;
- displays a global add action.
