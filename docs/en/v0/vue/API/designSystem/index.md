---
title: designSystem API
description: Reference for the default Vue design system, including its form components, helpers, and theme CSS variables.
---

# API `designSystem`

This section documents the components provided by `@duplojs/form/vueDesignSystem`.

It has two goals:

- describe the exported components and helpers;
- clearly list the CSS variables exposed to build a theme without breaking the components.

## Section structure

- [Tokens and theme](/en/v0/vue/API/designSystem/theme)
- [Buttons](/en/v0/vue/API/designSystem/buttons)
- [Text and number inputs](/en/v0/vue/API/designSystem/text)
- [Select and radio](/en/v0/vue/API/designSystem/selectRadio)
- [Checkbox](/en/v0/vue/API/designSystem/checkbox)
- [Date](/en/v0/vue/API/designSystem/date)
- [Time](/en/v0/vue/API/designSystem/time)
- [Range](/en/v0/vue/API/designSystem/range)
- [File](/en/v0/vue/API/designSystem/file)
- [Template helpers](/en/v0/vue/API/designSystem/helpers)

## Customization principle

The design system relies on two levels:

- global tokens declared in `:root`;
- local variables specific to each component, usually prefixed with the component name.

In practice:

- if you want to change the whole visual identity, override the global tokens;
- if you want to adjust a specific component, override its local variables.
