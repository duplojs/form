---
title: API GridUnionTemplate
description: Reference for the GridUnionTemplate component, the default grid template for the union type, with its branch selection props.
---

# `GridUnionTemplate`

Default grid template for the `union` type.

## System props

- `fieldKey`
- `kinds`
- `getCurrentValue()`
- `getCurrentKind()`

## Grid props

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Specific props

- `labels?: Record<string, string>`
- `selectInputKind`

## Emits

- `changeKind(kind)`

## Slots

- `formField`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/union/GridUnionTemplateExample.vue-->
```

## What this template does

- displays a variant selector;
- then renders the active field in the grid.
