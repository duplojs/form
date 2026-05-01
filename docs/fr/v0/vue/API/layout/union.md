---
title: API useUnionLayout
description: Référence de useUnionLayout pour activer une branche de formulaire parmi plusieurs selon un discriminant et un template d'union.
---

# useUnionLayout

`useUnionLayout(...)` permet d'activer une seule branche parmi plusieurs `FormField`.

## Signature

```ts [ts]
useUnionLayout(
	[
		["kindA", fieldA],
		["kindB", fieldB],
	],
	{
		defaultKind,
		class?: string,
		template?: Templates["union"],
	},
);
```

## Paramètres

- `formFieldUnionElements`: tableau de tuples `[kind, formField]`.
- `defaultKind`: branche active au démarrage.
- `class`: classe CSS ajoutée au template `union`.
- `template`: surcharge locale du template `union`.

## Valeur produite

### Valeur courante

```ts [ts]
{
	kind: string;
	value: unknown;
	updateKind(kind: string, value?: unknown): void;
}
```

### Valeur validée

```ts [ts]
{
	kind: string;
	value: unknown;
}
```

## Contrat du template `union`

### Props

```ts [ts]
{
	fieldKey: string;
	kinds: string[];
	getCurrentValue(): unknown;
	getCurrentKind(): string;
}
```

### Emits

```ts [ts]
{
	changeKind: [kind: string];
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
<!--@include: @/examples/v0/vue/API/layout/union/unionTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/union/unionTemplate.ts-->
```

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/union/unionExample.ts-->
```

## Cas d'usage

- email ou téléphone ;
- personne physique ou entreprise ;
- carte bancaire ou virement.
