#!/bin/bash

set -e
curl http://localhost/control-panel-v2/api/health
exit $?


