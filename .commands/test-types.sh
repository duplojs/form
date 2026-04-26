#!/bin/bash

set -e

# vue
vue-tsc -p tests/vue/tsconfig.json

npm -w integration/vue run test:types

npm -w docs run test:types