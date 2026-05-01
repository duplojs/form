---
title: API layout Formulaire
description: Documentation de createForm comme forme racine de formulaire, avec sa signature, ses paramètres, son comportement et son template associé.
---

# Formulaire

Le formulaire n'est pas un layout exporté sous la forme `useXLayout(...)`, mais il joue le même rôle de forme racine.

L'API concernée est `createForm(...)`.

## Signature

```ts [ts]
import { createForm } from "@duplojs/form/vue";

const useForm = createForm(templates);
```

Puis :

```ts [ts]
const {
	component,
	check,
	currentValue,
	reset,
	dispose,
} = useForm(rootField, params);
```

## Paramètres de `createForm(...)`

- `templates`: objet `Templates` contenant les templates de rendu à utiliser.

## Paramètres de `useForm(...)`

```ts [ts]
useForm(formField, {
	class?: string,
	template?: Templates["form"],
});
```

- `formField`: le `FormField` racine à instancier.
- `class`: classe CSS ajoutée au template du formulaire.
- `template`: surcharge locale du template `form`.

## Valeur retournée

`useForm(...)` retourne :

- `component`: composant Vue à rendre.
- `check()`: validation complète du formulaire.
- `currentValue`: `Ref` de la valeur courante brute.
- `reset()`: remise à zéro à partir des `defaultValue`.
- `dispose()`: destruction des effets internes de l'instance.

## Contrat du template `form`

Le template `form` reçoit :

### Props

```ts [ts]
{
	fieldKey: string;
	getCurrentValue(): unknown;
}
```

### Emits

```ts [ts]
{
	submit: [];
}
```

### Slots

```ts [ts]
{
	formField(): any;
	submitter(): any;
}
```

## Petit exemple de template

```vue [vue]
<!--@include: @/examples/v0/vue/API/layout/form/formTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/form/formTemplate.ts-->
```

## Exemple minimal

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/API/layout/form/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/API/layout/form/singleFieldForm.ts-->
```

## À retenir

- le formulaire instancie un `FormField` racine ;
- il délègue tout le rendu au template `form` ;
- il expose l'API de cycle de vie la plus haute : `check`, `currentValue`, `reset`, `dispose`.
