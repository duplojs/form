---
title: Input layout API
description: Documentation for createInput as the fundamental FormField shape, including its signature, parameters, and template contract.
---

# Input

An input is not a layout named `useInputLayout`, but it is still a fundamental `FormField` shape.

The relevant API is `createInput(...)`.

## Signature

```ts [ts]
import { createInput } from "@form/v0/vue";

const useMyInput = createInput(component, defaultParams);
```

Then:

```ts [ts]
const field = useMyInput(params);
```

## Parameters of `createInput(...)`

```ts [ts]
createInput(component, {
	defaultValue,
	props?,
	template?,
});
```

- `component`: Vue component compatible with the input contract.
- `defaultValue`: default value of the field. Required.
- `props`: default props injected into the component.
- `template`: default `input` template.

## Parameters of `useMyInput(...)`

```ts [ts]
useMyInput({
	label?,
	defaultValue?,
	props?,
	dataParser?,
	class?,
	template?,
});
```

- `label`: label forwarded to the template.
- `defaultValue`: local override of the initial value.
- `props`: local props passed to the component.
- `dataParser`: validation and transformation applied after the component.
- `class`: CSS class added to the template.
- `template`: local override of the `input` template.

## Vue input component contract

The component must:

- accept `modelValue`;
- emit `update:modelValue`;
- accept an `id` injected by the library.

It can also expose:

```ts [ts]
{
	check?(): Either;
	reset?(): void;
	dispose?(): void;
}
```

## `input` template contract

### Props

```ts [ts]
{
	getLabel?(): string;
	getCurrentValue(): unknown;
	getErrorMessage?(): string | null;
	fieldKey: string;
}
```

### Slots

```ts [ts]
{
	input(): any;
}
```

## Small template example

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/input/inputTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/input/inputTemplate.ts-->
```

## Minimal example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/input/basicTextInput.ts-->
```

## Example with local validation

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/input/PolicyCheckbox.vue-->
```

## What to remember

- an input is already a `FormField`;
- `createInput(...)` builds a field factory;
- validation can happen in the component, in `dataParser`, or in both.
