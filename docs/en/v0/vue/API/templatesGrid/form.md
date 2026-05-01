---
title: API GridFormTemplate
description: Reference for the GridFormTemplate component, the default grid template for the form type, with its system props and usages.
---

# `GridFormTemplate`

Default grid template for the `form` type.

## System props

- `fieldKey`
- `getCurrentValue()`

## Grid props

- `maxColumns?: number`
- `gap?: number`

## Slots

- `formField`
- `submitter`

## Emits

- `submit`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/form/GridFormTemplateExample.vue-->
```

## What this template does

- creates a `<form>`;
- wraps fields in a grid container;
- keeps the submit area outside the main grid.
