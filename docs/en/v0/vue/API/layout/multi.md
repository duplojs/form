---
title: API useMultiLayout
description: Reference for useMultiLayout to compose several FormField instances under known keys and produce a typed object structure.
---

# useMultiLayout

`useMultiLayout(...)` composes several `FormField` instances under known keys.

## Signature

```ts [ts]
useMultiLayout(formFields, {
	class?: string,
	template?: Templates["multi"],
});
```

`formFields` can be:

- a `Record<string, FormField>` object;
- or an array of `[key, formField]` tuples.

## Parameters

- `formFields`: structure of the child fields.
- `class`: CSS class added to the `multi` template.
- `template`: local override of the `multi` template.

## Produced value

- `currentValue`: object with the same keys as `formFields`.
- `check()`: validated object with the same keys.

## `multi` template contract

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
	getFormFields(): VNode[];
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
<!--@include: @/examples/v0/vue/API/layout/multi/multiTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/multi/multiTemplate.ts-->
```

## Example

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/API/layout/multi/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/API/layout/multi/multiExample.ts-->
```

## Use cases

- structuring a stable object;
- composing several nested blocks;
- creating a readable form root.
