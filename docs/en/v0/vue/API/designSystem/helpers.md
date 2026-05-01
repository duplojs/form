---
title: designSystem Helpers API
description: Reference for the design system template helpers that plug into createGridTemplates to reuse the provided components.
---

# Template helpers

The design system also exports helpers intended to be plugged into `createGridTemplates(...)`.

## Available helpers

- `templateFormAddButton`
- `templateFormRemoveButton`
- `templateFormResetButton`
- `templateFormNextButton`
- `templateFormPreviousButton`
- `templateFormSelect`

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/designSystem/helpers/templateHelpers.ts-->
```

## Usefulness

- quickly wire the actions of `repeat`
- wire the navigation of `step`
- wire the selector of `union`

These helpers do not replace the components themselves.
They simply provide ready-to-use adapters for the grid templates.
