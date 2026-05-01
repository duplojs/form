---
title: Créer un input
description: Apprenez à créer un input avec createInput, à définir ses props, son template, son dataParser et son intégration dans un formulaire Vue.
---

# Créer un input

Un input dans `@duplojs/form` n'est pas directement un composant Vue.

La séquence exacte est la suivante :

1. vous écrivez un composant Vue compatible avec le contrat des inputs ;
2. vous le transformez en factory avec `createInput(...)` ;
3. vous appelez cette factory pour obtenir un `FormField` ;
4. ce `FormField` est ensuite composé dans un formulaire.

Cette séparation est importante :

- le composant Vue gère l'interface et, si besoin, une validation locale ;
- `createInput(...)` fabrique une factory réutilisable ;
- `useMyInput(...)` retourne un `FormField`, donc une brique de formulaire.

## Le contrat minimal d'un composant d'input

Un composant compatible doit au minimum :

- accepter `modelValue` ;
- émettre `update:modelValue` ;
- laisser la librairie lui injecter un `id`.

Dans la pratique, avec Vue, le plus simple est d'utiliser `defineModel(...)`.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/input/BasicTextInput.vue-->
```

Ce composant est volontairement minimal :

- il ne valide rien lui-même ;
- il se contente de relayer la valeur ;
- la validation pourra être ajoutée plus tard via `dataParser` ou via `defineExpose`.

## Transformer le composant avec `createInput`

```ts [ts]
<!--@include: @/examples/v0/vue/guide/input/basicTextInput.ts-->
```

`createInput(component, defaultParams)` retourne une fonction du type `useBasicTextInput(...)`.

Les paramètres importants de `defaultParams` sont :

- `defaultValue`: valeur par défaut de l'input. C'est obligatoire.
- `props`: props par défaut injectées dans le composant.
- `template`: template d'input par défaut à utiliser pour le rendu.

`defaultValue` peut être une valeur directe ou une fonction.
Utilisez une fonction dès que la valeur est dynamique ou doit être recréée proprement.

## Instancier un input

Une fois la factory créée, vous l'appelez pour produire un `FormField`.

```ts [ts]
import { DP } from "@duplojs/utils";
import { useBasicTextInput } from "./basicTextInput";

export const emailField = useBasicTextInput({
	label: "Email",
	props: {
		placeholder: "math@duplojs.dev",
	},
	dataParser: DP.string()
		.addChecker(
			DP.checkerStringMin(
				5,
				{ errorMessage: "Email is too short." },
			),
		),
});
```

Les paramètres importants de `useBasicTextInput(...)` sont :

- `label`: libellé passé au template d'input.
- `defaultValue`: surcharge locale de la valeur par défaut.
- `props`: props passées au composant.
- `dataParser`: validation et transformation de la valeur.
- `class`: classe CSS ajoutée au template de l'input.
- `template`: surcharge locale du template de rendu.

## Où se fait la validation

Il y a deux niveaux possibles de validation.

### Validation externe avec `dataParser`

Si votre composant remonte déjà la bonne forme de valeur, laissez `dataParser` faire la validation métier.

Exemple courant :

- un composant texte remonte une `string` ;
- `dataParser` vérifie la longueur, le format, puis retourne la valeur validée.

Quand `dataParser` échoue :

- `check()` retourne une erreur ;
- le message de la première issue est exposé au template via `getErrorMessage()`.

### Validation interne avec `defineExpose`

Si le composant doit contrôler lui-même sa validité, il peut exposer `check`, `reset` et `dispose`.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/input/PolicyCheckbox.vue-->
```

Ici, le composant :

- garde son propre message d'erreur local ;
- bloque `check()` tant que la case obligatoire n'est pas cochée ;
- nettoie son état d'erreur dans `reset()`.

Puis la factory d'input reste très simple :

```ts [ts]
<!--@include: @/examples/v0/vue/guide/input/policyCheckbox.ts-->
```

## Ce que fait vraiment `createInput`

Quand un input est instancié, la librairie :

- détermine la `defaultValue` effective ;
- monte le composant Vue avec `modelValue` et `update:modelValue` ;
- applique le template d'input ;
- appelle le `check()` exposé par le composant s'il existe ;
- applique ensuite `dataParser` s'il est fourni ;
- gère un message d'erreur réactif pour le template ;
- expose enfin un `FormField`.

Le point important est l'ordre :

1. validation locale du composant, si elle existe ;
2. validation/transformation par `dataParser`, si elle existe.

## Utiliser les inputs dans un formulaire

```ts [ts]
<!--@include: @/examples/v0/vue/guide/input/contactForm.ts-->
```

Dans cet exemple :

- `email` est un input simple validé par `dataParser` ;
- `terms` est un input qui expose sa propre validation via `defineExpose` ;
- le formulaire compose les deux sans différence, parce qu'ils retournent tous les deux un `FormField`.

## Implémentation

```vue [vue]
<!--@include: @/examples/v0/vue/guide/input/ContactFormImplement.vue-->
```

## Résultat
<script setup lang="ts">
import ContactFormImplement from '@/examples/v0/vue/guide/input/ContactFormImplement.vue'
</script>

<ContactFormImplement />

## Paramètres à retenir

Pour `createInput(...)`:

- `defaultValue` est obligatoire.
- `props` sert à définir les props par défaut du composant.
- `template` sert à changer le rendu par défaut de l'input.

Pour `useMyInput(...)`:

- `label` alimente le template.
- `defaultValue` surcharge la valeur initiale.
- `props` configure l'instance locale du composant.
- `dataParser` valide ou transforme la valeur.
- `class` ajoute une classe au conteneur template.
- `template` remplace localement le template d'input.

## Ce qu'il faut retenir

- un composant Vue d'input n'est pas encore un `FormField` ;
- `createInput(...)` fabrique une factory ;
- appeler cette factory retourne un `FormField` ;
- `dataParser` sert à la validation métier ;
- `defineExpose` sert à la validation comportementale propre au composant ;
- les deux mécanismes peuvent se cumuler.
