---
title: API useDisabledLayout
description: Reference for useDisabledLayout to conditionally disable a FormField, neutralize its rendering, and control its returned value.
---

# useDisabledLayout

`useDisabledLayout(...)` conditionally neutralizes a `FormField`.

When the layout is disabled:

- rendering returns `null`;
- `check()` returns `EE.success(undefined)`.

## Signature

```ts [ts]
useDisabledLayout(formField, {
	isDisabled(): boolean,
});
```

## Parameters

- `formField`: child field.
- `isDisabled()`: disabling condition.

## Produced value

- `currentValue`: keeps the internal value of the child field.
- `check()`: returns `undefined` when disabled, otherwise the child field result.

## Template

This layout has no dedicated template.

Its `getVNode()` directly returns:

- `null` if the field is disabled;
- the child field `VNode` otherwise.

So there is no `createTemplate(...)` example for this layout.

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/disabled/disabledExample.ts-->
```

## Use cases

- conditional optional field;
- hidden section until a checkbox is checked;
- form variation based on external state.
