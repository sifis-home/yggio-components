#!/bin/bash

set -e

echo Entrypoint script for portal
echo Got args: \"$@\"

exec $@

echo Nothing left to do
