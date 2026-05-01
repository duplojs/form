---
title: API designSystem
description: Référence du design system Vue fourni par défaut, avec ses composants de formulaire, ses helpers et ses variables CSS de thème.
---

# API `designSystem`

Cette section documente les composants fournis par `@duplojs/form/vueDesignSystem`.

L'objectif est double :

- décrire les composants et helpers exportés ;
- lister clairement les variables CSS exposées pour construire un thème sans casser les composants.

## Structure de la section

- [Tokens et thème](/fr/v0/vue/API/designSystem/theme)
- [Boutons](/fr/v0/vue/API/designSystem/buttons)
- [Inputs texte et nombre](/fr/v0/vue/API/designSystem/text)
- [Select et radio](/fr/v0/vue/API/designSystem/selectRadio)
- [Checkbox](/fr/v0/vue/API/designSystem/checkbox)
- [Date](/fr/v0/vue/API/designSystem/date)
- [Heure](/fr/v0/vue/API/designSystem/time)
- [Range](/fr/v0/vue/API/designSystem/range)
- [Fichier](/fr/v0/vue/API/designSystem/file)
- [Helpers de templates](/fr/v0/vue/API/designSystem/helpers)

## Principe de personnalisation

Le design system repose sur deux niveaux :

- des tokens globaux déclarés dans `:root` ;
- des variables locales propres à chaque composant, généralement préfixées par le nom du composant.

En pratique :

- si vous voulez changer toute l'identité visuelle, surchargez les tokens globaux ;
- si vous voulez ajuster un composant précis, surchargez ses variables locales.
