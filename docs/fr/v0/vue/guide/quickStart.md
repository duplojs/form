---
title: Démarrage rapide
description: Installez @duplojs/form, créez un premier input et montez un formulaire Vue minimal avec les templates et composants de base.
---

# Démarrage rapide

::: warning
Ayez déjà un projet Vue initialisé, puis commencez le démarrage rapide.
:::

## Installation des dépendances
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

## Initialisation avec templates Grid par défaut
```ts twoslash
// @version: 0
<!--@include: @/examples/v0/vue/guide/quickStart/init.ts-->
```
::: info
Tout ce qui provient de `@duplojs/form/vueGrid` et de `@duplojs/form/vueDesignSystem` ne sont que des valeurs fournies par défaut. Tout est interchangeable et surchargeable. Cela permet de configurer rapidement un environnement dans lequel les formulaires sont opérationnels.

**N'oubliez pas d'importer `@duplojs/form/vueGrid.css` et `@duplojs/form/vueDesignSystem.css` si vous les utilisez.**
:::

## Créer un input
::: code-group
```ts [ts]
<!--@include: @/examples/v0/vue/guide/quickStart/firstInput.vue.ts-->
```
```vue [vue]
<!--@include: @/examples/v0/vue/guide/quickStart/FirstInput.vue-->
```
:::

## Déclarer un formulaire
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

## Implémenter le formulaire
```vue [vue]
<!--@include: @/examples/v0/vue/guide/quickStart/FirstImplement.vue-->
```

## Résultat
<script setup lang="ts">
import FirstForm from '@/examples/v0/vue/guide/quickStart/FirstImplement.vue'
</script>

<FirstForm />
