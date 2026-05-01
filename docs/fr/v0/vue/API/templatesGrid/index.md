---
title: API templatesGrid
description: Référence des templates grid fournis par défaut par @duplojs/form/vueGrid et de leurs composants de rendu prêts à l'emploi.
---

# API `templatesGrid`

Cette section documente les templates grid fournis par défaut par `@duplojs/form/vueGrid`.

Ils correspondent à des implémentations prêtes à l'emploi des templates :

- `form`
- `input`
- `multi`
- `check`
- `repeat`
- `union`
- `step`
- `section`

## À quoi sert `vueGrid`

`vueGrid` fournit :

- une factory `createGridTemplates(...)` ;
- des composants Vue de templates déjà implémentés ;
- des props de configuration communes comme `columns`, `maxColumns` et `gap`.

## Pages de cette section

- [createGridTemplates](/fr/v0/vue/API/templatesGrid/createGridTemplates)
- [GridFormTemplate](/fr/v0/vue/API/templatesGrid/form)
- [GridInputTemplate](/fr/v0/vue/API/templatesGrid/input)
- [GridMultiTemplate](/fr/v0/vue/API/templatesGrid/multi)
- [GridCheckTemplate](/fr/v0/vue/API/templatesGrid/check)
- [GridRepeatTemplate](/fr/v0/vue/API/templatesGrid/repeat)
- [GridUnionTemplate](/fr/v0/vue/API/templatesGrid/union)
- [GridStepByStepTemplate](/fr/v0/vue/API/templatesGrid/step)
- [GridSectionTemplate](/fr/v0/vue/API/templatesGrid/section)

## Props communes

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

## À retenir

- `vueGrid` n'est pas obligatoire ;
- ces templates sont seulement des implémentations par défaut ;
- chaque template peut être remplacé ou surchargé indépendamment.
