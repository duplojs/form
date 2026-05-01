---
title: API useStepLayout
description: Reference for useStepLayout to split a form into successive steps with navigation, current state, and a dedicated template.
---

# useStepLayout

`useStepLayout(...)` splits a form into successive steps.

## Signature

```ts [ts]
useStepLayout(
	[
		stepA,
		stepB,
		stepC,
	],
	{
		errorMessageNotAtLastStep: string,
		class?: string,
		template?: Templates["step"],
	},
);
```

## Parameters

- `formFields`: tuple of `FormField` instances, one per step.
- `errorMessageNotAtLastStep`: message displayed when `check()` is called before the last step.
- `class`: CSS class added to the `step` template.
- `template`: local override of the `step` template.

## Produced value

### Current value

```ts [ts]
{
	currentStep: number;
	steps: unknown[];
}
```

### Validated value

```ts [ts]
unknown[]
```

If an error is detected during `check()`, the layout automatically resets `currentStep` to the first failing step.

## `step` template contract

### Props

```ts [ts]
{
	fieldKey: string;
	stepQuantity: number;
	isLastStep(): boolean;
	getFormFields(): (() => VNode)[];
	getCurrentValue(): unknown;
	getCurrentStep(): number;
	getErrorMessageNotAtLastStep(): null | string;
}
```

### Emits

```ts [ts]
{
	nextStep: [];
	previousStep: [];
	resetStep: [];
}
```

### Slots

```ts [ts]
{
	formField(): any;
}
```

## Small template example

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/step/stepTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/step/stepTemplate.ts-->
```

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/step/stepExample.ts-->
```

## Use cases

- onboarding;
- signup funnel;
- long forms with sequential progression.
