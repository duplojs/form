---
title: Initialiser un formulaire
description: Comprenez le principe d'initialisation d'un formulaire avec createForm, le rôle du FormField racine, currentValue, check, reset et dispose.
---

# Initialiser un formulaire

L'initialisation d'un formulaire se fait en deux temps :

1. vous fabriquez une fonction `useForm` avec `createForm(...)` ;
2. vous passez à cette fonction un `FormField` racine, qui peut être un input simple ou un layout composé.

Le point important de la librairie est là :

- un input retourne un `FormField` ;
- un layout retourne aussi un `FormField` ;
- un formulaire n'est donc rien d'autre que l'instanciation d'un `FormField` racine sur un état Vue.

Autrement dit, `createForm` ne connaît pas votre schéma métier. Il sait seulement prendre un `FormField`, cloner sa `defaultValue`, instancier toute l'arborescence, puis exposer une API de rendu, de validation et de reset.

## Initialisation globale

L'étape globale consiste à préparer les templates qui seront utilisés par tous les formulaires.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/vue/guide/form/init.ts-->
```

`createForm(templatesGrid.useTemplates())` retourne une fonction `useForm` déjà configurée.

Cette fonction fermée sur vos templates devient l'entrée unique pour initialiser tous vos formulaires.

::: info
Les templates `vueGrid` et les composants de `vueDesignSystem` sont seulement des valeurs par défaut.
Vous pouvez remplacer tout ou partie du rendu sans changer la structure de vos formulaires.
:::

## Le principe fondamental

Quand vous appelez `useForm(rootField)`, la librairie :

- clone `rootField.defaultValue` pour créer `currentValue` ;
- instancie le `FormField` racine et tous ses enfants ;
- construit un composant Vue prêt à rendre le template de formulaire ;
- vous retourne `check`, `reset`, `dispose` et `currentValue`.

Cela implique une distinction essentielle :

- `currentValue` représente l'état courant brut du formulaire ;
- `check()` retourne la valeur validée et parsée.

Si un input utilise un `dataParser`, la valeur de `currentValue` peut encore être brute, alors que la valeur retournée par `check()` est déjà transformée et contrôlée.

## Le champ racine peut être minimal

Le champ racine n'a pas besoin d'être un objet complexe. Un formulaire peut être initialisé directement à partir d'un seul input.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/form/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/form/singleFieldForm.ts-->
```

Ici, la valeur du formulaire est simplement une `string`, parce que le champ racine est un `useTextInput(...)`.

## Déclarer un formulaire structuré

Dès que vous avez besoin de plusieurs champs, vous composez un `FormField` racine avec un layout comme `useMultiLayout`.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/form/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/form/profileForm.ts-->
```

Dans cet exemple :

- `firstName` et `age` définissent la forme de `currentValue` ;
- le `dataParser` sur `age` définit la forme de la valeur retournée par `check()` ;
- le type `ProfileFormSubmitValue` peut être dérivé automatiquement à partir de `check`.

Le formulaire n'est donc pas décrit par un schéma séparé.
Sa structure et son type sortent directement de l'arbre de `FormField` que vous composez.

## Utiliser le formulaire dans un composant Vue

Le composant retourné par `useForm` sert de conteneur de rendu.
Son slot par défaut correspond à la zone de soumission.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/form/ProfileFormImplement.vue-->
```

Dans cette implémentation :

- `@submit` déclenche explicitement `checkProfileForm()` ;
- `currentProfileValue` permet d'observer l'état courant en direct ;
- `resetProfileForm()` remet les valeurs par défaut ;
- `disposeProfileForm()` est appelé au démontage pour libérer les scopes internes.

## Résultat
<script setup lang="ts">
import ProfileFormImplement from '@/examples/v0/vue/guide/form/ProfileFormImplement.vue'
</script>

<ProfileFormImplement />

## API retournée par `useForm`

`useForm(...)` retourne toujours un objet avec les propriétés suivantes :

- `component`: le composant Vue à rendre.
- `currentValue`: un `Ref` sur la valeur courante brute.
- `check()`: valide tout l'arbre et retourne soit les erreurs, soit la valeur de sortie.
- `reset()`: remet le formulaire à partir des `defaultValue`.
- `dispose()`: détruit les effets internes liés à l'instance du formulaire.

## Ce qu'il faut retenir

- le formulaire est initialisé à partir d'un unique `FormField` racine ;
- les layouts servent seulement à composer ce `FormField` racine ;
- `currentValue` montre l'état vivant du formulaire ;
- `check()` produit la valeur métier vérifiée ;
- les templates définissent le rendu, pas la structure.
