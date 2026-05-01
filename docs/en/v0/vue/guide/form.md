---
title: Initialize a form
description: Understand how form initialization works with createForm, the role of the root FormField, currentValue, check, reset, and dispose.
---

# Initialize a form

Form initialization happens in two steps:

1. you create a `useForm` function with `createForm(...)`;
2. you pass a root `FormField` to that function, which can be a simple input or a composed layout.

This is the key point of the library:

- an input returns a `FormField`;
- a layout also returns a `FormField`;
- a form is therefore nothing more than the instantiation of a root `FormField` on Vue state.

In other words, `createForm` does not know your business schema. It only knows how to take a `FormField`, clone its `defaultValue`, instantiate the whole tree, and expose a rendering, validation, and reset API.

## Global initialization

The global step is to prepare the templates that will be used by all forms.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/vue/guide/form/init.ts-->
```

`createForm(templatesGrid.useTemplates())` returns an already configured `useForm` function.

This function, closed over your templates, becomes the single entry point used to initialize all your forms.

::: info
The `vueGrid` templates and the `vueDesignSystem` components are only default values.
You can replace all or part of the rendering without changing the structure of your forms.
:::

## The fundamental principle

When you call `useForm(rootField)`, the library:

- clones `rootField.defaultValue` to create `currentValue`;
- instantiates the root `FormField` and all its children;
- builds a Vue component ready to render the form template;
- returns `check`, `reset`, `dispose`, and `currentValue`.

This implies an essential distinction:

- `currentValue` represents the raw current state of the form;
- `check()` returns the validated and parsed value.

If an input uses a `dataParser`, the `currentValue` may still be raw, while the value returned by `check()` is already transformed and validated.

## The root field can be minimal

The root field does not need to be a complex object. A form can be initialized directly from a single input.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/form/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/form/singleFieldForm.ts-->
```

Here, the form value is simply a `string`, because the root field is a `useTextInput(...)`.

## Declare a structured form

As soon as you need several fields, you compose a root `FormField` with a layout such as `useMultiLayout`.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/form/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/form/profileForm.ts-->
```

In this example:

- `firstName` and `age` define the shape of `currentValue`;
- the `dataParser` on `age` defines the shape of the value returned by `check()`;
- the `ProfileFormSubmitValue` type can be derived automatically from `check`.

So the form is not described by a separate schema.
Its structure and type come directly from the `FormField` tree you compose.

## Use the form in a Vue component

The component returned by `useForm` acts as the rendering container.
Its default slot matches the submit area.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/form/ProfileFormImplement.vue-->
```

In this implementation:

- `@submit` explicitly triggers `checkProfileForm()`;
- `currentProfileValue` lets you observe the current state live;
- `resetProfileForm()` restores the default values;
- `disposeProfileForm()` is called on unmount to release internal scopes.

## Result
<script setup lang="ts">
import ProfileFormImplement from '@/examples/v0/vue/guide/form/ProfileFormImplement.vue'
</script>

<ProfileFormImplement />

## API returned by `useForm`

`useForm(...)` always returns an object with the following properties:

- `component`: the Vue component to render.
- `currentValue`: a `Ref` holding the raw current value.
- `check()`: validates the whole tree and returns either errors or the output value.
- `reset()`: restores the form from the `defaultValue` values.
- `dispose()`: destroys the internal effects tied to the form instance.

## What to remember

- the form is initialized from a single root `FormField`;
- layouts are only used to compose that root `FormField`;
- `currentValue` shows the live state of the form;
- `check()` produces the validated business value;
- templates define the rendering, not the structure.
