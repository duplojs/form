---
title: API GridSectionTemplate
description: Reference for the GridSectionTemplate component, the default grid template for the section type, with its structural props.
---

# `GridSectionTemplate`

Default grid template for the `section` type.

## System props

- `fieldKey`
- `getCurrentValue()`
- `title?`

## Grid props

- `columns?: number`
- `maxColumns?: number`
- `gap?: number`

## Slots

- `formField`

## Example

```vue [vue]
<!--@include: @/examples/v0/vue/API/templatesGrid/section/GridSectionTemplateExample.vue-->
```

## What this template does

- displays a section title when present;
- wraps the content in a grid-compatible block.
