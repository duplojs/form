---
title: API createGridTemplates
description: Documentation for createGridTemplates to build a consistent set of grid templates with centralized component overrides.
---

# `createGridTemplates(...)`

`createGridTemplates(...)` builds a consistent set of grid template factories.

## Signature

```ts [ts]
createGridTemplates(params)
```

## Parameters

The `params` object can contain:

- `form?`
- `input?`
- `multi?`
- `check?`
- `section?`
- `repeat`
- `step`
- `union`

The `repeat`, `step`, and `union` keys are required because their grid templates depend on concrete components such as buttons and the kind selector.

## Example

```ts [ts]
<!--@include: @/examples/v0/vue/API/templatesGrid/createGridTemplates/createGridTemplates.ts-->
```

## Returned value

The function returns:

- `useFormTemplate`
- `useInputTemplate`
- `useMultiTemplate`
- `useCheckTemplate`
- `useRepeatTemplate`
- `useUnionTemplate`
- `useStepByStepTemplate`
- `useSectionTemplate`
- `useTemplates()`

`useTemplates()` directly returns a `Templates` object compatible with `createForm(...)`.

## Use cases

- quickly initialize a form environment;
- define a shared grid across the application;
- override one or several templates while keeping the others by default.
