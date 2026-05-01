---
title: API layout Input
description: Documentation de createInput comme forme fondamentale de FormField, avec sa signature, ses paramètres et son contrat de template.
---

# Input

L'input n'est pas un layout nommé `useInputLayout`, mais il reste une forme fondamentale de `FormField`.

L'API concernée est `createInput(...)`.

## Signature

```ts [ts]
import { createInput } from "@form/v0/vue";

const useMyInput = createInput(component, defaultParams);
```

Puis :

```ts [ts]
const field = useMyInput(params);
```

## Paramètres de `createInput(...)`

```ts [ts]
createInput(component, {
	defaultValue,
	props?,
	template?,
});
```

- `component`: composant Vue compatible avec le contrat des inputs.
- `defaultValue`: valeur par défaut du field. Obligatoire.
- `props`: props par défaut injectées dans le composant.
- `template`: template `input` par défaut.

## Paramètres de `useMyInput(...)`

```ts [ts]
useMyInput({
	label?,
	defaultValue?,
	props?,
	dataParser?,
	class?,
	template?,
});
```

- `label`: libellé transmis au template.
- `defaultValue`: surcharge locale de la valeur initiale.
- `props`: props locales passées au composant.
- `dataParser`: validation et transformation postérieures au composant.
- `class`: classe CSS ajoutée au template.
- `template`: surcharge locale du template `input`.

## Contrat du composant Vue d'input

Le composant doit :

- accepter `modelValue` ;
- émettre `update:modelValue` ;
- accepter un `id` injecté par la librairie.

Il peut aussi exposer :

```ts [ts]
{
	check?(): Either;
	reset?(): void;
	dispose?(): void;
}
```

## Contrat du template `input`

### Props

```ts [ts]
{
	getLabel?(): string;
	getCurrentValue(): unknown;
	getErrorMessage?(): string | null;
	fieldKey: string;
}
```

### Slots

```ts [ts]
{
	input(): any;
}
```

## Petit exemple de template

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/input/inputTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/input/inputTemplate.ts-->
```

## Exemple minimal

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/input/basicTextInput.ts-->
```

## Exemple avec validation locale

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/input/PolicyCheckbox.vue-->
```

## À retenir

- un input est déjà un `FormField` ;
- `createInput(...)` fabrique une factory de fields ;
- la validation peut se faire dans le composant, dans `dataParser`, ou dans les deux.
