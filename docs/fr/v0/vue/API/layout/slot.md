---
title: API useSlotLayout
description: Référence de useSlotLayout pour déléguer le rendu à des slots Vue et injecter des points d'extension dans la structure du formulaire.
---

# useSlotLayout

`useSlotLayout(...)` délègue le rendu d'un bloc à un slot Vue nommé.

Il existe deux modes d'utilisation.

## Mode 1 : slot autour d'un `FormField`

### Signature

```ts [ts]
useSlotLayout(name, formField);
```

### Paramètres

- `name`: nom du slot Vue attendu.
- `formField`: champ à réinjecter dans le slot.

### Valeur produite

- `currentValue`: identique à celle du champ enfant.
- `check()`: valeur validée du champ enfant, ou `undefined` si le slot ne réinjecte pas le champ selon le flux choisi.

### Paramètres de slot

```ts [ts]
{
	fieldKey: string;
	value: unknown;
	update(value: unknown): void;
	formField(): any;
}
```

## Mode 2 : slot autonome avec valeur propre

### Signature

```ts [ts]
useSlotLayout(name, {
	defaultValue,
});
```

### Paramètres

- `name`: nom du slot Vue attendu.
- `defaultValue`: valeur par défaut du slot.

### Paramètres de slot

```ts [ts]
{
	fieldKey: string;
	value: unknown;
	update(value: unknown): void;
}
```

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/slot/slotExample.ts-->
```

## Cas d'usage

- reprise manuelle d'un rendu ;
- insertion d'actions intermédiaires ;
- intégration dans une structure Vue déjà existante.

## Template

`useSlotLayout(...)` n'a pas de template dédié.

Le rendu passe directement par le slot nommé que vous fournissez sur le composant de formulaire.
