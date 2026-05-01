---
title: API useRepeatLayout
description: Reference for useRepeatLayout to repeat a FormField dynamically in an array with bounds control and a dedicated template.
---

# useRepeatLayout

`useRepeatLayout(...)` repeats a `FormField` in a dynamic array.

## Signature

```ts [ts]
useRepeatLayout(formField, {
	max: number,
	min?: number,
	class?: string,
	template?: Templates["repeat"],
});
```

## Parameters

- `formField`: repeated field.
- `max`: maximum number of elements.
- `min`: minimum number of elements. Defaults to `0`.
- `class`: CSS class added to the `repeat` template.
- `template`: local override of the `repeat` template.

## Produced value

- `currentValue`: array of values.
- `check()`: array of validated values.

The layout `defaultValue` is initialized with `min` occurrences of the child field `defaultValue`.

## `repeat` template contract

### Props

```ts [ts]
{
	fieldKey: string;
	max: number;
	min: number;
	getFormFieldsQuantity(): number;
	getCurrentValue(): unknown;
	getFormFields(): VNode[];
}
```

### Emits

```ts [ts]
{
	addElement: [];
	removeElement: [index: number];
	resetElement: [index: number];
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
<!--@include: @/examples/v0/vue/API/layout/repeat/repeatTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/repeat/repeatTemplate.ts-->
```

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/repeat/repeatExample.ts-->
```

## Use cases

- list of emails;
- list of addresses;
- repetition of a homogeneous subform.
