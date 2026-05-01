---
title: API useUnionLayout
description: Reference for useUnionLayout to activate one form branch among several based on a discriminant and a union template.
---

# useUnionLayout

`useUnionLayout(...)` lets you activate only one branch among several `FormField` instances.

## Signature

```ts [ts]
useUnionLayout(
	[
		["kindA", fieldA],
		["kindB", fieldB],
	],
	{
		defaultKind,
		class?: string,
		template?: Templates["union"],
	},
);
```

## Parameters

- `formFieldUnionElements`: array of `[kind, formField]` tuples.
- `defaultKind`: active branch at startup.
- `class`: CSS class added to the `union` template.
- `template`: local override of the `union` template.

## Produced value

### Current value

```ts [ts]
{
	kind: string;
	value: unknown;
	updateKind(kind: string, value?: unknown): void;
}
```

### Validated value

```ts [ts]
{
	kind: string;
	value: unknown;
}
```

## `union` template contract

### Props

```ts [ts]
{
	fieldKey: string;
	kinds: string[];
	getCurrentValue(): unknown;
	getCurrentKind(): string;
}
```

### Emits

```ts [ts]
{
	changeKind: [kind: string];
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
<!--@include: @/examples/v0/vue/API/layout/union/unionTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/union/unionTemplate.ts-->
```

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/union/unionExample.ts-->
```

## Use cases

- email or phone;
- individual or company;
- credit card or bank transfer.
