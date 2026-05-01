---
title: Layouts
description: Discover how layouts compose FormField instances, structure form data, and drive rendering, flow, and validation.
---

# Layouts

A `layout` is used to compose `FormField` instances in order to build a richer form.

An input already creates a `FormField`, but a layout also creates a `FormField`.
The difference is:

- an input handles a single unit of input;
- a layout organizes, transforms, or conditions one or more `FormField` instances;
- the final form is always driven by a single root `FormField`.

In other words, a layout is a composition building block. It lets you describe the structure of a form without leaving the main model of the library.

## What a layout adds

A layout can be used to:

- group several fields into an object;
- repeat the same field or block;
- switch between several subforms;
- split a form into steps;
- inject custom rendering with a slot;
- wrap a block with a title or presentation;
- add cross-field validation;
- conditionally disable part of the form.

The key idea is this: the structure of the form stays readable and stable in code, while the behavior can become highly dynamic.

## Built-in layouts

- `useMultiLayout` composes several fields under known keys.
- `useRepeatLayout` repeats a field or subform in an array.
- `useUnionLayout` lets you choose one active variant among several branches.
- `useStepLayout` splits a form into several successive steps.
- `useSectionLayout` wraps a block in a titled section.
- `useSlotLayout` delegates part of the rendering to a Vue slot.
- `useCheckLayout` adds extra validation around an existing field.
- `useDisabledLayout` hides and neutralizes a field conditionally.

For detailed reference on each layout, see also [the layout API index](/en/v0/vue/API/layout/).

## Fixed structure, dynamic behavior

`useMultiLayout` is often the most useful entry point because it lets you define a stable structure with explicit keys.

In the following example, the keys `identity`, `contacts`, `preferredChannel`, and `message` always exist.
Then each key can contain either a simple input or another layout.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/layout/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/layout/profileLayoutForm.ts-->
```

In this same example:

- `useSectionLayout` wraps the whole form in a `Profile` section;
- `useMultiLayout` structures the data into blocks;
- `useRepeatLayout` makes `contacts` dynamic;
- `useUnionLayout` switches the active field between `email` and `phone`;
- `useSlotLayout` gives you full control over the rendering of `message`.

This model is useful for advanced forms: you keep a predictable architecture, but each block can become adaptive.

## Vue implementation

```vue [vue]
<!--@include: @/examples/v0/vue/guide/layout/ProfileLayoutImplement.vue-->
```

The `#customMessage` slot clearly shows the role of `useSlotLayout`:

- the current value is available in `value`;
- you can update it with `update(...)`;
- you can re-inject the original field through `formField`.

## Result
<script setup lang="ts">
import ProfileLayoutForm from '@/examples/v0/vue/guide/layout/ProfileLayoutImplement.vue'
</script>

<ProfileLayoutForm />

## Control layouts

Not all layouts are only about structure. Some are mostly there to control form behavior.

The following example shows three cases:

- `useStepLayout` enforces a step-by-step flow;
- `useCheckLayout` adds extra validation on an existing field;
- `useDisabledLayout` neutralizes a field until an external condition is met.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/layout/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/layout/flowLayoutForm.ts-->
```

Here:

- `email` remains a simple text input, but `useCheckLayout` adds a local business rule;
- `company` remains part of the form structure, but `useDisabledLayout` hides it and removes it from the flow while `hasCompany` is `false`;
- `useStepLayout` turns two blocks into a sequential flow with step control.

## How to choose a layout

- Use `useMultiLayout` when the final object shape is known in advance.
- Use `useRepeatLayout` when you have a list of homogeneous items.
- Use `useUnionLayout` when only one branch must be active at a time.
- Use `useStepLayout` when input order is part of the experience.
- Use `useSectionLayout` when you want to clarify a block visually.
- Use `useSlotLayout` when the standard rendering is no longer enough.
- Use `useCheckLayout` when validation depends on extra rules around an existing field.
- Use `useDisabledLayout` when a field must temporarily disappear from the form.

## What to remember

- a layout also returns a `FormField`;
- layouts can therefore be nested freely;
- they are used both to structure data and to drive behavior;
- the final form is always defined by a single `FormField` tree.
