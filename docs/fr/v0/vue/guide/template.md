---
title: Les templates
description: Comprenez le rôle des templates dans @duplojs/form, leur création avec createTemplate et leur utilisation pour personnaliser le rendu Vue.
---

# Les templates

Les templates définissent le rendu des formulaires, des inputs et des layouts.

Ils ne changent pas la structure de vos données.
Ils ne changent pas non plus la logique métier de validation.
Leur rôle consiste uniquement à transformer les propriétés système et les slots fournis par la librairie en interface Vue.

Autrement dit :

- les `FormField` décrivent la structure ;
- les layouts composent cette structure ;
- les templates rendent cette structure.

## À quoi sert un template

Un template sert à choisir :

- où afficher un label ;
- où afficher un message d'erreur ;
- comment disposer un slot d'input ou de sous-formulaire ;
- quelles classes ou variantes visuelles appliquer ;
- comment encapsuler un bloc `form`, `input`, `multi`, `repeat`, `section`, `step`, `union` ou `check`.

Le point important est le suivant : un template ne connaît pas votre schéma métier.
Il reçoit simplement des props système et des slots, puis retourne un `VNode`.

## Le contrat de `createTemplate`

La fonction `createTemplate(...)` fabrique une factory de templates.

Son rôle est de :

- lier un type de template, comme `input` ou `form` ;
- associer ce type à un composant Vue ;
- injecter des props par défaut ;
- fusionner ensuite les surcharges locales au moment de l'utilisation.

En interne, la librairie ajoute aussi automatiquement :

- `fieldKey` ;
- `class` ;
- une classe `DFV-template_<type>` ;
- une classe `DFV-deep_<fieldKey>`.

Ces classes sont utiles si vous voulez cibler finement un rendu sans modifier la structure du formulaire.

## Créer un template d'input personnalisé

Un template d'input est un composant Vue qui reçoit les props système d'un input et le slot `input`.

```vue [vue]
<!--@include: @/examples/v0/vue/guide/template/HeroInputTemplate.vue-->
```

Dans cet exemple :

- `getLabel()` permet d'afficher le libellé ;
- `getErrorMessage()` permet d'afficher l'erreur courante ;
- `fieldKey` reste disponible pour les attributs ou les hooks CSS ;
- le slot `input` contient le vrai composant de saisie.

Ensuite, vous transformez ce composant en factory avec `createTemplate(...)`.

```ts [ts]
<!--@include: @/examples/v0/vue/guide/template/customInputTemplate.ts-->
```

Ici, `useHeroInputTemplate(...)` est une factory de template.
Elle pourra être utilisée globalement ou localement.

## Surcharge globale d'un template

La façon la plus simple de changer tout le rendu d'un type donné consiste à remplacer ce template dans l'objet passé à `createForm(...)`.

```ts [ts]
<!--@include: @/examples/v0/vue/guide/template/init.ts-->
```

Dans cet exemple :

- `createGridTemplates(...)` fournit une base complète ;
- `templatesGrid.useTemplates()` retourne l'ensemble des templates prêts à l'emploi ;
- la clé `input` est remplacée par `useHeroInputTemplate({ tone: "accent" })`.

Conséquence : tous les inputs de ce `useForm` utiliseront ce template par défaut.

## Surcharge locale d'un template

Vous pouvez aussi changer le template d'un seul champ, sans toucher au reste du formulaire.

```ts [ts]
<!--@include: @/examples/v0/vue/guide/template/templateForm.ts-->
```

Dans cet exemple :

- `title` utilise le template d'input global défini dans `init.ts` ;
- `subtitle` surcharge localement ce rendu avec `useHeroInputTemplate({ tone: "default" })` ;
- `summary` revient explicitement sur le template grid standard avec `templatesGrid.useInputTemplate(...)`.

Cela montre bien que les templates sont interchangeables à plusieurs niveaux :

- globalement, lors de l'initialisation ;
- localement, sur un field ou un layout précis.

## Implémentation Vue

```vue [vue]
<!--@include: @/examples/v0/vue/guide/template/TemplateFormImplement.vue-->
```

## Résultat
<script setup lang="ts">
import TemplateFormImplement from '@/examples/v0/vue/guide/template/TemplateFormImplement.vue'
</script>

<TemplateFormImplement />

## Les templates fournis par défaut

Les templates grid fournis par `@duplojs/form/vueGrid` couvrent les types suivants :

- `form`
- `input`
- `multi`
- `check`
- `repeat`
- `union`
- `step`
- `section`

Ils servent de base pratique, mais ne sont pas spéciaux.
Vous pouvez les remplacer un par un, les mélanger avec vos propres templates, ou les réutiliser partiellement.

## Comment penser les templates

Un bon template doit rester générique.

Il doit :

- afficher ce que la librairie lui transmet ;
- exposer clairement les slots ;
- éviter de dépendre d'un formulaire métier précis ;
- rester réutilisable pour plusieurs formulaires.

En pratique, si vous sentez que votre composant doit connaître `firstName`, `age` ou une structure de données spécifique, vous êtes probablement en train d'écrire de la logique de formulaire, pas un template.

## Ce qu'il faut retenir

- un template contrôle le rendu, pas la structure ;
- `createTemplate(...)` fabrique une factory de templates ;
- cette factory peut être utilisée globalement ou localement ;
- les templates grid sont seulement des implémentations par défaut ;
- les props système et les slots sont le vrai contrat d'un template.
