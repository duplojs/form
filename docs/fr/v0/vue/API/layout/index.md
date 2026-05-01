---
title: API des layouts
description: Référence API des layouts Vue de @duplojs/form avec leur signature, leurs paramètres, leur valeur produite et leur contrat de template.
---

# API des layouts

Cette section documente les layouts fournis par `@duplojs/form/vue` comme des briques d'API.

Ici, l'objectif n'est plus d'expliquer la philosophie générale, mais de détailler :

- la signature de chaque layout ;
- les paramètres attendus ;
- la forme de valeur produite ;
- le contrat de template associé ;
- les cas d'usage typiques.

## Ce qu'est un layout dans l'API

Dans cette librairie, un layout retourne lui aussi un `FormField`.

Cela signifie que :

- un layout peut être imbriqué dans un autre layout ;
- un layout peut devenir la racine directe d'un formulaire ;
- un layout participe à la fois au rendu, à la validation et au calcul de la valeur finale.

## Pages de cette section

- [Formulaire](/fr/v0/vue/API/layout/form)
- [Input](/fr/v0/vue/API/layout/input)
- [useMultiLayout](/fr/v0/vue/API/layout/multi)
- [useRepeatLayout](/fr/v0/vue/API/layout/repeat)
- [useUnionLayout](/fr/v0/vue/API/layout/union)
- [useStepLayout](/fr/v0/vue/API/layout/step)
- [useSectionLayout](/fr/v0/vue/API/layout/section)
- [useSlotLayout](/fr/v0/vue/API/layout/slot)
- [useCheckLayout](/fr/v0/vue/API/layout/check)
- [useDisabledLayout](/fr/v0/vue/API/layout/disabled)

## Rappel utile

Un layout n'impose pas de design.

Le design passe toujours par le template associé au type concerné :

- `form`
- `input`
- `multi`
- `repeat`
- `union`
- `step`
- `section`
- `check`

Les pages suivantes détaillent également, pour chaque layout, les props, slots et events attendus par son template dédié.
