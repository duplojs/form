---
title: templatesGrid API
description: Reference for the default grid templates provided by @duplojs/form/vueGrid and their ready-to-use rendering components.
---

# API `templatesGrid`

This section documents the default grid templates provided by `@duplojs/form/vueGrid`.

They are ready-to-use implementations of the following templates:

- `form`
- `input`
- `multi`
- `check`
- `repeat`
- `union`
- `step`
- `section`

## What `vueGrid` is for

`vueGrid` provides:

- a `createGridTemplates(...)` factory;
- already implemented Vue template components;
- shared configuration props such as `columns`, `maxColumns`, and `gap`.

## Pages in this section

- [createGridTemplates](/en/v0/vue/API/templatesGrid/createGridTemplates)
- [GridFormTemplate](/en/v0/vue/API/templatesGrid/form)
- [GridInputTemplate](/en/v0/vue/API/templatesGrid/input)
- [GridMultiTemplate](/en/v0/vue/API/templatesGrid/multi)
- [GridCheckTemplate](/en/v0/vue/API/templatesGrid/check)
- [GridRepeatTemplate](/en/v0/vue/API/templatesGrid/repeat)
- [GridUnionTemplate](/en/v0/vue/API/templatesGrid/union)
- [GridStepByStepTemplate](/en/v0/vue/API/templatesGrid/step)
- [GridSectionTemplate](/en/v0/vue/API/templatesGrid/section)

## Shared props

### `GridTemplateContainerProps`

```ts [ts]
{
	maxColumns?: number;
	gap?: number;
}
```

### `GridTemplateLayoutProps`

```ts [ts]
{
	columns?: number;
}
```

### `GridTemplateLayoutContainerProps`

```ts [ts]
{
	maxColumns?: number;
	gap?: number;
	columns?: number;
}
```

## What to remember

- `vueGrid` is not required;
- these templates are only default implementations;
- each template can be replaced or overridden independently.
