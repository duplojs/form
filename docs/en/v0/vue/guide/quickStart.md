---
title: Quick start
description: Install @duplojs/form, create your first input, and mount a minimal Vue form with the default templates and components.
---

# Quick start

::: warning
Make sure you already have a Vue project set up before starting this quick start.
:::

## Install dependencies
::: code-group
```bash [npm]
npm install @duplojs/form@0 @duplojs/utils@1
```
```bash [yarn]
yarn add @duplojs/form@0 @duplojs/utils@1
```
```bash [pnpm]
pnpm add @duplojs/form@0 @duplojs/utils@1
```
:::

## Initialize with the default Grid templates
```ts twoslash
// @version: 0
<!--@include: @/examples/v0/vue/guide/quickStart/init.ts-->
```
::: info
Everything coming from `@duplojs/form/vueGrid` and `@duplojs/form/vueDesignSystem` is only a default implementation. Everything can be replaced or overridden. This lets you configure a working form environment quickly.

**Do not forget to import `@duplojs/form/vueGrid.css` and `@duplojs/form/vueDesignSystem.css` if you use them.**
:::

## Create an input
::: code-group
```ts [ts]
<!--@include: @/examples/v0/vue/guide/quickStart/firstInput.vue.ts-->
```
```vue [vue]
<!--@include: @/examples/v0/vue/guide/quickStart/FirstInput.vue-->
```
:::

## Declare a form
```ts twoslash [ts]
// @version: 0
// @filename: firstInput.ts
<!--@include: @/examples/v0/vue/guide/quickStart/firstInput.ts-->
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/quickStart/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/quickStart/firstForm.ts-->
```

## Implement the form
```vue [vue]
<!--@include: @/examples/v0/vue/guide/quickStart/FirstImplement.vue-->
```

## Result
<script setup lang="ts">
import FirstForm from '@/examples/v0/vue/guide/quickStart/FirstImplement.vue'
</script>

<FirstForm />
