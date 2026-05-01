---
title: API useRepeatLayout
description: Référence de useRepeatLayout pour répéter dynamiquement un FormField dans un tableau avec contrôle des bornes et template dédié.
---

# useRepeatLayout

`useRepeatLayout(...)` répète un `FormField` dans un tableau dynamique.

## Signature

```ts [ts]
useRepeatLayout(formField, {
	max: number,
	min?: number,
	class?: string,
	template?: Templates["repeat"],
});
```

## Paramètres

- `formField`: field répété.
- `max`: nombre maximum d'éléments.
- `min`: nombre minimum d'éléments. Par défaut `0`.
- `class`: classe CSS ajoutée au template `repeat`.
- `template`: surcharge locale du template `repeat`.

## Valeur produite

- `currentValue`: tableau de valeurs.
- `check()`: tableau de valeurs validées.

Le `defaultValue` du layout est initialisé avec `min` occurrences du `defaultValue` du field enfant.

## Contrat du template `repeat`

### Props

```ts [ts]
{
	fieldKey: string;
	max: number;
	min: number;
	getFormFieldsQuantity(): number;
	getCurrentValue(): unknown;
	getFormFields(): VNode[];
}
```

### Emits

```ts [ts]
{
	addElement: [];
	removeElement: [index: number];
	resetElement: [index: number];
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
<!--@include: @/examples/v0/vue/API/layout/repeat/repeatTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/repeat/repeatTemplate.ts-->
```

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/repeat/repeatExample.ts-->
```

## Cas d'usage

- liste d'emails ;
- liste d'adresses ;
- répétition d'un sous-formulaire homogène.
