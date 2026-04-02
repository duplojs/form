#!/bin/bash

set -e

# vue
vue-tsc -p tests/vue/tsconfig.json

npm -w docs run test:types