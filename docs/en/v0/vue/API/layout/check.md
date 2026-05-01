---
title: API useCheckLayout
description: Reference for useCheckLayout to add extra validation around an existing FormField and customize its rendering.
---

# useCheckLayout

`useCheckLayout(...)` adds extra validation around an existing `FormField`.

## Signature

```ts [ts]
useCheckLayout(formField, {
	dataParser?,
	refine?,
	class?: string,
	template?: Templates["check"],
});
```

## Parameters

- `formField`: child field to validate.
- `dataParser`: extra validation and transformation applied after the child field `check()`.
- `refine`: synchronous validation function returning `EE.ok()` or `EE.error(message)`.
- `class`: CSS class added to the `check` template.
- `template`: local override of the `check` template.

## Validation order

`useCheckLayout(...)` runs:

1. the child field `check()`;
2. `refine(...)`, if present;
3. `dataParser.parse(...)`, if present.

## `check` template contract

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
	getErrorMessage(): string | null;
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
<!--@include: @/examples/v0/vue/API/layout/check/checkTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/check/checkTemplate.ts-->
```

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/check/checkExample.ts-->
```

## Use cases

- light cross-field validation;
- additional error messages;
- adding rules without rewriting the input component.
