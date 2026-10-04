#!/usr/bin/env bash
# Build the site. Default is the shippable compressed output;
# pass --pretty for indented HTML (inspect only, not for deploy).
set -euo pipefail

cd "$(dirname "$0")"

PRETTY=0
for arg in "$@"; do
    if [ "$arg" = "--pretty" ]; then
        PRETTY=1
    else
        echo "Unknown argument: $arg (only --pretty is supported)" >&2
        exit 1
    fi
done

npm run build

if [ "$PRETTY" = "1" ]; then
    npx --yes prettier --write "../winter-boot/**/*.html"
    echo 'Done: pretty HTML in ../winter-boot (inspect only, not for deploy)'
else
    echo 'Done: compressed HTML in ../winter-boot (ready to deploy)'
fi
