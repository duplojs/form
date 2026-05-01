---
title: API useSectionLayout
description: Référence de useSectionLayout pour encapsuler un FormField dans une section de rendu avec props et template spécifiques.
---

# useSectionLayout

`useSectionLayout(...)` encapsule un `FormField` dans une section de rendu.

## Signature

```ts [ts]
useSectionLayout(formField, {
	title?: string,
	class?: string,
	template?: Templates["section"],
});
```

## Paramètres

- `formField`: field enfant à envelopper.
- `title`: titre facultatif de la section.
- `class`: classe CSS ajoutée au template `section`.
- `template`: surcharge locale du template `section`.

## Valeur produite

- `currentValue`: identique à celle du field enfant.
- `check()`: identique à celui du field enfant.

## Contrat du template `section`

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
	title?: string;
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
<!--@include: @/examples/v0/vue/API/layout/section/sectionTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/section/sectionTemplate.ts-->
```

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/section/sectionExample.ts-->
```

## Cas d'usage

- regroupement visuel ;
- séparation logique d'un formulaire ;
- ajout d'un titre à un bloc.
