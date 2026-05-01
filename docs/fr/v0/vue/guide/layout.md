---
title: Les layouts
description: Découvrez comment les layouts composent les FormField, structurent les données du formulaire et pilotent le rendu, le flux et la validation.
---

# Les layouts

Un `layout` sert à composer des `FormField` pour construire un formulaire plus riche.

Un input crée déjà un `FormField`, mais un layout crée lui aussi un `FormField`.
La différence est la suivante :

- un input gère une unité de saisie ;
- un layout organise, transforme ou conditionne un ou plusieurs `FormField` ;
- le formulaire final reste toujours piloté par un unique `FormField` racine.

Autrement dit, un layout est une brique de composition. Il permet de décrire la structure d'un formulaire sans sortir du modèle principal de la librairie.

## Ce qu'apporte un layout

Un layout peut servir à :

- grouper plusieurs champs dans un objet ;
- répéter un même champ ou un même bloc ;
- alterner entre plusieurs sous-formulaires ;
- découper un formulaire en étapes ;
- injecter du rendu personnalisé avec un slot ;
- encapsuler un bloc avec un titre ou une présentation ;
- ajouter une validation transverse ;
- désactiver conditionnellement une partie du formulaire.

L'idée clé est la suivante : la structure du formulaire reste lisible et stable dans le code, mais le comportement peut devenir très dynamique.

## Les layouts fournis

- `useMultiLayout` compose plusieurs champs sous des clés connues.
- `useRepeatLayout` répète un champ ou un sous-formulaire dans un tableau.
- `useUnionLayout` permet de choisir une variante active parmi plusieurs branches.
- `useStepLayout` découpe un formulaire en plusieurs étapes successives.
- `useSectionLayout` encapsule un bloc dans une section avec titre.
- `useSlotLayout` délègue une partie du rendu à un slot Vue.
- `useCheckLayout` ajoute une validation supplémentaire autour d'un champ existant.
- `useDisabledLayout` masque et neutralise conditionnellement un champ.

Pour la référence détaillée de chaque layout, consultez aussi [l'index API des layouts](/fr/v0/vue/API/layout/).

## Structure fixe, comportement dynamique

`useMultiLayout` est souvent le point d'entrée le plus utile, parce qu'il permet de définir une structure stable avec des clés explicites.

Dans l'exemple suivant, les clés `identity`, `contacts`, `preferredChannel` et `message` existent toujours.
Ensuite, chaque clé peut contenir un input simple ou un autre layout.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/layout/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/layout/profileLayoutForm.ts-->
```

Dans ce même exemple :

- `useSectionLayout` encapsule tout le formulaire dans une section `Profile` ;
- `useMultiLayout` structure les données par blocs ;
- `useRepeatLayout` rend `contacts` dynamique ;
- `useUnionLayout` fait varier le champ actif entre `email` et `phone` ;
- `useSlotLayout` laisse reprendre précisément le rendu de `message`.

Ce modèle est utile pour les formulaires évolués : on garde une architecture prévisible, mais chaque bloc peut devenir adaptatif.

## Implémentation Vue

```vue [vue]
<!--@include: @/examples/v0/vue/guide/layout/ProfileLayoutImplement.vue-->
```

Le slot `#customMessage` montre bien le rôle de `useSlotLayout` :

- la valeur courante est disponible dans `value` ;
- vous pouvez la modifier avec `update(...)` ;
- vous pouvez réinjecter le champ d'origine via `formField`.

## Résultat
<script setup lang="ts">
import ProfileLayoutForm from '@/examples/v0/vue/guide/layout/ProfileLayoutImplement.vue'
</script>

<ProfileLayoutForm />

## Layouts de contrôle

Tous les layouts ne servent pas seulement à la structure. Certains servent plutôt à contrôler le comportement du formulaire.

L'exemple suivant montre trois cas :

- `useStepLayout` impose une progression par étapes ;
- `useCheckLayout` ajoute une validation supplémentaire sur un champ existant ;
- `useDisabledLayout` neutralise un champ tant qu'une condition externe n'est pas remplie.

```ts twoslash [ts]
// @version: 0
// @filename: init.ts
<!--@include: @/examples/v0/vue/guide/layout/init.ts-->
// @filename: main.ts
// ---cut---
<!--@include: @/examples/v0/vue/guide/layout/flowLayoutForm.ts-->
```

Ici :

- `email` reste un simple input texte, mais `useCheckLayout` lui ajoute une règle métier locale ;
- `company` reste dans la structure du formulaire, mais `useDisabledLayout` le masque et le retire du flux tant que `hasCompany` vaut `false` ;
- `useStepLayout` transforme deux blocs en parcours séquentiel avec contrôle du changement d'étape.

## Comment choisir un layout

- Utilisez `useMultiLayout` quand la forme de l'objet final est connue à l'avance.
- Utilisez `useRepeatLayout` quand vous avez une liste d'éléments homogènes.
- Utilisez `useUnionLayout` quand une seule branche doit être active à la fois.
- Utilisez `useStepLayout` quand l'ordre de saisie fait partie de l'expérience.
- Utilisez `useSectionLayout` quand vous voulez clarifier visuellement un bloc.
- Utilisez `useSlotLayout` quand le rendu standard ne suffit plus.
- Utilisez `useCheckLayout` quand la validation dépend de plusieurs règles autour d'un champ déjà existant.
- Utilisez `useDisabledLayout` quand un champ doit temporairement disparaître du formulaire.

## Ce qu'il faut retenir

- un layout retourne lui aussi un `FormField` ;
- les layouts sont donc librement imbriquables ;
- ils servent autant à structurer les données qu'à piloter le comportement ;
- le formulaire final reste toujours défini par un seul arbre de `FormField`.
