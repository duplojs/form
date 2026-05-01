---
title: API useStepLayout
description: Référence de useStepLayout pour répartir un formulaire en étapes successives avec navigation, état courant et template dédié.
---

# useStepLayout

`useStepLayout(...)` découpe un formulaire en étapes successives.

## Signature

```ts [ts]
useStepLayout(
	[
		stepA,
		stepB,
		stepC,
	],
	{
		errorMessageNotAtLastStep: string,
		class?: string,
		template?: Templates["step"],
	},
);
```

## Paramètres

- `formFields`: tuple de `FormField`, un par étape.
- `errorMessageNotAtLastStep`: message affiché si `check()` est appelé avant la dernière étape.
- `class`: classe CSS ajoutée au template `step`.
- `template`: surcharge locale du template `step`.

## Valeur produite

### Valeur courante

```ts [ts]
{
	currentStep: number;
	steps: unknown[];
}
```

### Valeur validée

```ts [ts]
unknown[]
```

Si une erreur est détectée lors du `check()`, le layout repositionne automatiquement `currentStep` sur la première étape en erreur.

## Contrat du template `step`

### Props

```ts [ts]
{
	fieldKey: string;
	stepQuantity: number;
	isLastStep(): boolean;
	getFormFields(): (() => VNode)[];
	getCurrentValue(): unknown;
	getCurrentStep(): number;
	getErrorMessageNotAtLastStep(): null | string;
}
```

### Emits

```ts [ts]
{
	nextStep: [];
	previousStep: [];
	resetStep: [];
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
<!--@include: @/examples/v0/vue/API/layout/step/stepTemplate.vue-->
```

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/step/stepTemplate.ts-->
```

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/layout/step/stepExample.ts-->
```

## Cas d'usage

- onboarding ;
- tunnel de souscription ;
- formulaires longs à progression séquentielle.
