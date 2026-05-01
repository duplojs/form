---
title: API useMultiLayout
description: Référence de useMultiLayout pour composer plusieurs FormField sous des clés connues et produire une structure d'objet typée.
---

# useMultiLayout

`useMultiLayout(...)` compose plusieurs `FormField` sous des clés connues.

## Signature

```ts [ts]
useMultiLayout(formFields, {
	class?: string,
	template?: Templates["multi"],
});
```

`formFields` peut être :

- un objet `Record<string, FormField>` ;
- ou un tableau de tuples `[key, formField]`.

## Paramètres

- `formFields`: structure des sous-champs.
- `class`: classe CSS ajoutée au template `multi`.
- `template`: surcharge locale du template `multi`.

## Valeur produite

- `currentValue`: objet avec les mêmes clés que `formFields`.
- `check()`: objet validé avec les mêmes clés.

## Contrat du template `multi`

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
	getFormFields(): VNode[];
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
<!--@include: @/examples/v0/vue/API/layout/multi/multiTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/multi/multiTemplate.ts-->
```

## Exemple

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/API/layout/multi/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/API/layout/multi/multiExample.ts-->
```

## Cas d'usage

- structurer un objet stable ;
- composer plusieurs blocs imbriqués ;
- créer la racine d'un formulaire lisible.
