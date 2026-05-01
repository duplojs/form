---
title: Introduction
description: Discover the structure-first approach of @duplojs/form for Vue, along with the basics of layouts, templates, slots, and form classes.
---

# Introduction
The `@duplojs/form` library is structure-first. By nesting the different layouts and inputs, you build a logical data structure inspired by structures you could write in TypeScript.

To customize the design, you only need to create templates for each element. These templates are meant to stay generic, so once they are in place, you only need to think about the structure.

If you run into specific cases, you can always use slots to inject content anywhere, and you can also define classes manually. Each field already comes with default classes, which makes targeted styling possible. You can also add extra classes when needed on specific elements.
