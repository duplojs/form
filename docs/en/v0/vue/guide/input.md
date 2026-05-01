---
title: Create an input
description: Learn how to create an input with createInput, define its props, template, dataParser, and integrate it into a Vue form.
---

# Create an input

An input in `@duplojs/form` is not directly a Vue component.

The exact sequence is:

1. you write a Vue component compatible with the input contract;
2. you turn it into a factory with `createInput(...)`;
3. you call that factory to get a `FormField`;
4. that `FormField` is then composed into a form.

This separation matters:

- the Vue component handles the UI and, if needed, local validation;
- `createInput(...)` builds a reusable factory;
- `useMyInput(...)` returns a `FormField`, which means a form building block.

## The minimal contract of an input component

A compatible component must at least:

- accept `modelValue`;
- emit `update:modelValue`;
- let the library inject an `id`.

In practice, with Vue, the easiest way is to use `defineModel(...)`.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/input/BasicTextInput.vue-->
```

This component is intentionally minimal:

- it does not validate anything by itself;
- it only relays the value;
- validation can be added later through `dataParser` or `defineExpose`.

## Turn the component into an input with `createInput`

```ts [ts]
<!--@include: @/examples/v0/vue/guide/input/basicTextInput.ts-->
```

`createInput(component, defaultParams)` returns a function of type `useBasicTextInput(...)`.

The important `defaultParams` entries are:

- `defaultValue`: default value of the input. This is required.
- `props`: default props injected into the component.
- `template`: default input template to use for rendering.

`defaultValue` can be a direct value or a function.
Use a function whenever the value is dynamic or should be recreated cleanly.

## Instantiate an input

Once the factory is created, you call it to produce a `FormField`.

```ts [ts]
import { DP } from "@duplojs/utils";
import { useBasicTextInput } from "./basicTextInput";

export const emailField = useBasicTextInput({
	label: "Email",
	props: {
		placeholder: "math@duplojs.dev",
	},
	dataParser: DP.string()
		.addChecker(
			DP.checkerStringMin(
				5,
				{ errorMessage: "Email is too short." },
			),
		),
});
```

The important `useBasicTextInput(...)` parameters are:

- `label`: label forwarded to the input template.
- `defaultValue`: local override for the default value.
- `props`: props passed to the component.
- `dataParser`: validation and transformation of the value.
- `class`: CSS class added to the input template.
- `template`: local override of the rendering template.

## Where validation happens

There are two possible levels of validation.

### External validation with `dataParser`

If your component already emits the right value shape, let `dataParser` handle business validation.

Common example:

- a text component emits a `string`;
- `dataParser` checks length, format, then returns the validated value.

When `dataParser` fails:

- `check()` returns an error;
- the message of the first issue is exposed to the template through `getErrorMessage()`.

### Internal validation with `defineExpose`

If the component needs to control its own validity, it can expose `check`, `reset`, and `dispose`.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/input/PolicyCheckbox.vue-->
```

Here, the component:

- keeps its own local error message;
- blocks `check()` until the required checkbox is checked;
- clears its error state in `reset()`.

Then the input factory remains very simple:

```ts [ts]
<!--@include: @/examples/v0/vue/guide/input/policyCheckbox.ts-->
```

## What `createInput` really does

When an input is instantiated, the library:

- determines the effective `defaultValue`;
- mounts the Vue component with `modelValue` and `update:modelValue`;
- applies the input template;
- calls the `check()` exposed by the component if it exists;
- then applies `dataParser` if one is provided;
- manages a reactive error message for the template;
- and finally exposes a `FormField`.

The important point is the order:

1. local component validation, if it exists;
2. validation/transformation through `dataParser`, if it exists.

## Use inputs inside a form

```ts [ts]
<!--@include: @/examples/v0/vue/guide/input/contactForm.ts-->
```

In this example:

- `email` is a simple input validated by `dataParser`;
- `terms` is an input exposing its own validation through `defineExpose`;
- the form composes both without any difference, because both return a `FormField`.

## Implementation

```vue [vue]
<!--@include: @/examples/v0/vue/guide/input/ContactFormImplement.vue-->
```

## Result
<script setup lang="ts">
import ContactFormImplement from '@/examples/v0/vue/guide/input/ContactFormImplement.vue'
</script>

<ContactFormImplement />

## Parameters to remember

For `createInput(...)`:

- `defaultValue` is required.
- `props` defines the component's default props.
- `template` changes the default rendering of the input.

For `useMyInput(...)`:

- `label` feeds the template.
- `defaultValue` overrides the initial value.
- `props` configures the local component instance.
- `dataParser` validates or transforms the value.
- `class` adds a class to the template container.
- `template` locally replaces the input template.

## What to remember

- a Vue input component is not yet a `FormField`;
- `createInput(...)` builds a factory;
- calling that factory returns a `FormField`;
- `dataParser` is for business validation;
- `defineExpose` is for component-specific behavioral validation;
- both mechanisms can be combined.
