---
title: API useCheckLayout
description: Référence de useCheckLayout pour ajouter une validation supplémentaire autour d'un FormField existant et personnaliser son rendu.
---

# useCheckLayout

`useCheckLayout(...)` ajoute une validation supplémentaire autour d'un `FormField` existant.

## Signature

```ts [ts]
useCheckLayout(formField, {
	dataParser?,
	refine?,
	class?: string,
	template?: Templates["check"],
});
```

## Paramètres

- `formField`: champ enfant à valider.
- `dataParser`: validation et transformation supplémentaires appliquées après `check()` du champ enfant.
- `refine`: fonction de validation synchrone retournant `EE.ok()` ou `EE.error(message)`.
- `class`: classe CSS ajoutée au template `check`.
- `template`: surcharge locale du template `check`.

## Ordre de validation

`useCheckLayout(...)` exécute :

1. `check()` du champ enfant ;
2. `refine(...)`, si présent ;
3. `dataParser.parse(...)`, si présent.

## Contrat du template `check`

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
	getErrorMessage(): string | null;
}
```

### Slots

```ts [ts]
{
	formField(): any;
}
```

## Petit exemple de template

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/check/checkTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/check/checkTemplate.ts-->
```

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/check/checkExample.ts-->
```

## Cas d'usage

- validation transverse légère ;
- messages d'erreur additionnels ;
- ajout de règles sans réécrire le composant d'input.
