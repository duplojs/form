---
title: API createGridTemplates
description: Documentation de createGridTemplates pour fabriquer un ensemble cohérent de templates grid avec surcharge centralisée des composants.
---

# `createGridTemplates(...)`

`createGridTemplates(...)` fabrique un ensemble cohérent de factories de templates grid.

## Signature

```ts [ts]
createGridTemplates(params)
```

## Paramètres

L'objet `params` peut contenir :

- `form?`
- `input?`
- `multi?`
- `check?`
- `section?`
- `repeat`
- `step`
- `union`

Les clés `repeat`, `step` et `union` sont obligatoires, car leurs templates grid dépendent de composants concrets comme les boutons et le sélecteur de type.

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/templatesGrid/createGridTemplates/createGridTemplates.ts-->
```

## Valeur retournée

La fonction retourne :

- `useFormTemplate`
- `useInputTemplate`
- `useMultiTemplate`
- `useCheckTemplate`
- `useRepeatTemplate`
- `useUnionTemplate`
- `useStepByStepTemplate`
- `useSectionTemplate`
- `useTemplates()`

`useTemplates()` renvoie directement un objet `Templates` compatible avec `createForm(...)`.

## Cas d'usage

- initialiser rapidement un environnement de formulaires ;
- définir une grille commune à toute l'application ;
- surcharger un ou plusieurs templates tout en gardant les autres par défaut.
