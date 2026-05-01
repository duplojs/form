---
title: API useDisabledLayout
description: Référence de useDisabledLayout pour désactiver conditionnellement un FormField, neutraliser son rendu et contrôler sa valeur retournée.
---

# useDisabledLayout

`useDisabledLayout(...)` neutralise conditionnellement un `FormField`.

Quand le layout est désactivé :

- le rendu retourne `null` ;
- `check()` retourne `EE.success(undefined)`.

## Signature

```ts [ts]
useDisabledLayout(formField, {
	isDisabled(): boolean,
});
```

## Paramètres

- `formField`: field enfant.
- `isDisabled()`: condition de désactivation.

## Valeur produite

- `currentValue`: conserve la valeur interne du field enfant.
- `check()`: retourne `undefined` si désactivé, sinon le résultat du field enfant.

## Template

Ce layout n'a pas de template dédié.

Son `getVNode()` retourne directement :

- `null` si le champ est désactivé ;
- le `VNode` du field enfant sinon.

Il n'y a donc pas d'exemple de `createTemplate(...)` pour ce layout.

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/disabled/disabledExample.ts-->
```

## Cas d'usage

- champ optionnel conditionnel ;
- section cachée tant qu'une case n'est pas cochée ;
- variation du formulaire selon un état externe.
