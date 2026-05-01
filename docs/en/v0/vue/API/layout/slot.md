---
title: API useSlotLayout
description: Reference for useSlotLayout to delegate rendering to Vue slots and inject extension points into the form structure.
---

# useSlotLayout

`useSlotLayout(...)` delegates the rendering of a block to a named Vue slot.

There are two usage modes.

## Mode 1: slot around a `FormField`

### Signature

```ts [ts]
useSlotLayout(name, formField);
```

### Parameters

- `name`: name of the expected Vue slot.
- `formField`: field to re-inject into the slot.

### Produced value

- `currentValue`: same as the child field value.
- `check()`: validated child field value, or `undefined` if the slot does not re-inject the field depending on the chosen flow.

### Slot parameters

```ts [ts]
{
	fieldKey: string;
	value: unknown;
	update(value: unknown): void;
	formField(): any;
}
```

## Mode 2: standalone slot with its own value

### Signature

```ts [ts]
useSlotLayout(name, {
	defaultValue,
});
```

### Parameters

- `name`: name of the expected Vue slot.
- `defaultValue`: default value of the slot.

### Slot parameters

```ts [ts]
{
	fieldKey: string;
	value: unknown;
	update(value: unknown): void;
}
```

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/slot/slotExample.ts-->
```

## Use cases

- manual takeover of a rendering block;
- insertion of intermediate actions;
- integration inside an existing Vue structure.

## Template

`useSlotLayout(...)` does not have a dedicated template.

Rendering goes directly through the named slot you provide on the form component.
