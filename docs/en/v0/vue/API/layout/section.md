---
title: API useSectionLayout
description: Reference for useSectionLayout to wrap a FormField in a rendering section with specific props and template behavior.
---

# useSectionLayout

`useSectionLayout(...)` wraps a `FormField` in a rendering section.

## Signature

```ts [ts]
useSectionLayout(formField, {
	title?: string,
	class?: string,
	template?: Templates["section"],
});
```

## Parameters

- `formField`: child field to wrap.
- `title`: optional section title.
- `class`: CSS class added to the `section` template.
- `template`: local override of the `section` template.

## Produced value

- `currentValue`: same as the child field value.
- `check()`: same as the child field result.

## `section` template contract

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
	title?: string;
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
<!--@include: @/examples/v0/vue/API/layout/section/sectionTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/section/sectionTemplate.ts-->
```

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/section/sectionExample.ts-->
```

## Use cases

- visual grouping;
- logical separation inside a form;
- adding a title to a block.
