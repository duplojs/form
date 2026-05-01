---
title: API designSystem Helpers
description: Référence des helpers de templates du design system à brancher dans createGridTemplates pour réutiliser les composants fournis.
---

# Helpers de templates

Le design system exporte aussi des helpers destinés à être branchés dans `createGridTemplates(...)`.

## Helpers disponibles

- `templateFormAddButton`
- `templateFormRemoveButton`
- `templateFormResetButton`
- `templateFormNextButton`
- `templateFormPreviousButton`
- `templateFormSelect`

## Exemple

```ts [ts]
<!--@include: @/examples/v0/vue/API/designSystem/helpers/templateHelpers.ts-->
```

## Utilité

- brancher rapidement les actions de `repeat`
- brancher la navigation de `step`
- brancher le sélecteur de `union`

Ces helpers ne remplacent pas les composants eux-mêmes.
Ils fournissent simplement des adaptateurs prêts à l'emploi pour les templates grid.
