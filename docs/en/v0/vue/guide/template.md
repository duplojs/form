---
title: Templates
description: Understand the role of templates in @duplojs/form, how they are created with createTemplate, and how to use them to customize Vue rendering.
---

# Templates

Templates define the rendering of forms, inputs, and layouts.

They do not change the structure of your data.
They do not change your business validation logic either.
Their only role is to turn the system props and slots provided by the library into a Vue interface.

In other words:

- `FormField` instances describe the structure;
- layouts compose that structure;
- templates render that structure.

## What a template is for

A template is used to choose:

- where to display a label;
- where to display an error message;
- how to position an input or subform slot;
- which classes or visual variants to apply;
- how to wrap a `form`, `input`, `multi`, `repeat`, `section`, `step`, `union`, or `check` block.

The important point is this: a template does not know your business schema.
It only receives system props and slots, then returns a `VNode`.

## The `createTemplate` contract

The `createTemplate(...)` function builds a template factory.

Its role is to:

- bind a template type such as `input` or `form`;
- associate that type with a Vue component;
- inject default props;
- then merge local overrides at usage time.

Internally, the library also automatically adds:

- `fieldKey`;
- `class`;
- a `DFV-template_<type>` class;
- a `DFV-deep_<fieldKey>` class.

These classes are useful if you want to target a specific rendering precisely without changing the form structure.

## Create a custom input template

An input template is a Vue component receiving the system props of an input and the `input` slot.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/template/HeroInputTemplate.vue-->
```

In this example:

- `getLabel()` lets you display the label;
- `getErrorMessage()` lets you display the current error;
- `fieldKey` remains available for attributes or CSS hooks;
- the `input` slot contains the actual input component.

Then you turn that component into a factory with `createTemplate(...)`.

```ts [ts]
<!--@include: @/examples/v0/vue/guide/template/customInputTemplate.ts-->
```

Here, `useHeroInputTemplate(...)` is a template factory.
It can be used globally or locally.

## Global template override

The simplest way to change the rendering of a given type everywhere is to replace that template in the object passed to `createForm(...)`.

```ts [ts]
<!--@include: @/examples/v0/vue/guide/template/init.ts-->
```

In this example:

- `createGridTemplates(...)` provides a complete base;
- `templatesGrid.useTemplates()` returns the full set of ready-to-use templates;
- the `input` key is replaced by `useHeroInputTemplate({ tone: "accent" })`.

As a result, every input using that `useForm` will use this template by default.

## Local template override

You can also change the template of a single field without touching the rest of the form.

```ts [ts]
<!--@include: @/examples/v0/vue/guide/template/templateForm.ts-->
```

In this example:

- `title` uses the global input template defined in `init.ts`;
- `subtitle` locally overrides that rendering with `useHeroInputTemplate({ tone: "default" })`;
- `summary` explicitly switches back to the standard grid template with `templatesGrid.useInputTemplate(...)`.

This clearly shows that templates are interchangeable at multiple levels:

- globally, during initialization;
- locally, on a specific field or layout.

## Vue implementation

```vue [vue]
<!--@include: @/examples/v0/vue/guide/template/TemplateFormImplement.vue-->
```

## Result
<script setup lang="ts">
import TemplateFormImplement from '@/examples/v0/vue/guide/template/TemplateFormImplement.vue'
</script>

<TemplateFormImplement />

## Default templates

The grid templates provided by `@duplojs/form/vueGrid` cover the following types:

- `form`
- `input`
- `multi`
- `check`
- `repeat`
- `union`
- `step`
- `section`

They are a practical starting point, but they are not special.
You can replace them one by one, mix them with your own templates, or reuse them partially.

## How to think about templates

A good template should stay generic.

It should:

- display what the library passes to it;
- expose the slots clearly;
- avoid depending on a specific business form;
- remain reusable across multiple forms.

In practice, if your component feels like it needs to know `firstName`, `age`, or a specific data structure, you are probably writing form logic, not a template.

## What to remember

- a template controls rendering, not structure;
- `createTemplate(...)` builds a template factory;
- that factory can be used globally or locally;
- grid templates are only default implementations;
- system props and slots are the real template contract.
