---
title: API GridMultiTemplate
description: Reference for the GridMultiTemplate component, the default grid template for the multi type, with its props and layout behavior.
---

# `GridMultiTemplate`

Default grid template for the `multi` type.

## System props

- `fieldKey`
- `getCurrentValue()`
- `getFormFields()`

## Grid props

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Slots

- `formField`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/multi/GridMultiTemplateExample.vue-->
```

## What this template does

- creates a nested grid container;
- lets each child field manage its own width in the grid.
