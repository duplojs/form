---
title: Introduction
description: Découvrez l'approche structure-first de @duplojs/form pour Vue, ainsi que les bases des layouts, templates, slots et classes de formulaire.
---

# Introduction
La librairie `@duplojs/form` est structure-first. En imbriquant les différents layouts et inputs, vous construisez une structure de données logique, inspirée de structures possibles en TypeScript.

Pour personnaliser le design, il suffit de créer des templates pour chaque élément. Ces templates doivent être pensés de manière générique, ce qui permet, une fois utilisés, de ne penser qu'à la structure.

Si vous rencontrez des cas spécifiques, il est toujours possible d'utiliser des slots permettant de s'insérer n'importe où et de définir des classes manuellement. Chaque champ est d'ailleurs fourni avec des classes par défaut, ce qui permet de le cibler précisément. Vous pouvez également ajouter des classes supplémentaires au besoin sur certains éléments.
