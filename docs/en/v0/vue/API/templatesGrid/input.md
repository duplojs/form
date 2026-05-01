---
title: API GridInputTemplate
description: Reference for the GridInputTemplate component, the default grid template for the input type, with its system props and rendering behavior.
---

# `GridInputTemplate`

Default grid template for the `input` type.

## System props

- `getLabel?()`
- `getCurrentValue()`
- `getErrorMessage?()`
- `fieldKey`

## Grid props

- `columns?: number`

## Specific props

- `hideEmptyMessageError?: boolean`

## Slots

- `input`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/input/GridInputTemplateExample.vue-->
```

## What this template does

- displays the label above the field;
- renders the `input` slot;
- displays the error area below the field.
