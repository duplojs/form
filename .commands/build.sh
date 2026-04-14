#!/bin/bash

set -e

# vue
vite build --config scripts/vue/vite.config.js
vue-tsc -p scripts/vue/tsconfig.build.json
tsc-alias -p scripts/vue/tsconfig.build.json