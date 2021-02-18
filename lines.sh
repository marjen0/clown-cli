#!/bin/sh

LINES=`find . -name '*.php' | xargs cat | wc -l`
echo "$LINES"