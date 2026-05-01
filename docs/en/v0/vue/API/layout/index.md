---
title: Layout API
description: API reference for the Vue layouts of @duplojs/form, including their signatures, parameters, produced values, and template contracts.
---

# Layout API

This section documents the layouts provided by `@duplojs/form/vue` as API building blocks.

Here, the goal is no longer to explain the general philosophy, but to detail:

- the signature of each layout;
- the expected parameters;
- the shape of the produced value;
- the associated template contract;
- the typical use cases.

## What a layout is at the API level

In this library, a layout also returns a `FormField`.

This means that:

- a layout can be nested inside another layout;
- a layout can become the direct root of a form;
- a layout participates in rendering, validation, and final value computation.

## Pages in this section

- [Form](/en/v0/vue/API/layout/form)
- [Input](/en/v0/vue/API/layout/input)
- [useMultiLayout](/en/v0/vue/API/layout/multi)
- [useRepeatLayout](/en/v0/vue/API/layout/repeat)
- [useUnionLayout](/en/v0/vue/API/layout/union)
- [useStepLayout](/en/v0/vue/API/layout/step)
- [useSectionLayout](/en/v0/vue/API/layout/section)
- [useSlotLayout](/en/v0/vue/API/layout/slot)
- [useCheckLayout](/en/v0/vue/API/layout/check)
- [useDisabledLayout](/en/v0/vue/API/layout/disabled)

## Useful reminder

A layout does not impose a design.

Design always comes through the template associated with the relevant type:

- `form`
- `input`
- `multi`
- `repeat`
- `union`
- `step`
- `section`
- `check`

The following pages also detail, for each layout, the props, slots, and events expected by its dedicated template.
