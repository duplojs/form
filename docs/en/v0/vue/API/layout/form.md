---
title: Form layout API
description: Documentation for createForm as the root form shape, including its signature, parameters, behavior, and associated template.
---

# Form

The form is not a layout exported as `useXLayout(...)`, but it plays the same role as the root shape.

The relevant API is `createForm(...)`.

## Signature

```ts [ts]
import { createForm } from "@form/v0/vue";

const useForm = createForm(templates);
```

Then:

```ts [ts]
const {
	component,
	check,
	currentValue,
	reset,
	dispose,
} = useForm(rootField, params);
```

## Parameters of `createForm(...)`

- `templates`: a `Templates` object containing the rendering templates to use.

## Parameters of `useForm(...)`

```ts [ts]
useForm(formField, {
	class?: string,
	template?: Templates["form"],
});
```

- `formField`: the root `FormField` to instantiate.
- `class`: CSS class added to the form template.
- `template`: local override of the `form` template.

## Returned value

`useForm(...)` returns:

- `component`: the Vue component to render.
- `check()`: full form validation.
- `currentValue`: `Ref` holding the raw current value.
- `reset()`: reset from the `defaultValue` values.
- `dispose()`: destroy the internal effects of the instance.

## `form` template contract

The `form` template receives:

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
}
```

### Emits

```ts [ts]
{
	submit: [];
}
```

### Slots

```ts [ts]
{
	formField(): any;
	submitter(): any;
}
```

## Small template example

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/form/formTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/form/formTemplate.ts-->
```

## Minimal example

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/API/layout/form/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/API/layout/form/singleFieldForm.ts-->
```

## What to remember

- the form instantiates a root `FormField`;
- it delegates all rendering to the `form` template;
- it exposes the highest lifecycle API: `check`, `currentValue`, `reset`, `dispose`.
