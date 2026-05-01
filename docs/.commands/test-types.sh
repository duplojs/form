#!/bin/bash

set -e

tsc -p tsconfig.app.json
vue-tsc -p tsconfig.v0.json