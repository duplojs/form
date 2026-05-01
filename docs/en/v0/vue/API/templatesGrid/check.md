---
title: API GridCheckTemplate
description: Reference for the GridCheckTemplate component, the default grid template for the check type, with its props and structure.
---

# `GridCheckTemplate`

Default grid template for the `check` type.

## System props

- `fieldKey`
- `getCurrentValue()`
- `getErrorMessage()`

## Grid props

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Specific props

- `hideEmptyMessageError?: boolean`

## Slots

- `formField`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/check/GridCheckTemplateExample.vue-->
```

## What this template does

- wraps the validated field in a grid;
- displays the validation error below the block.
