#!/bin/bash

set -e

echo Entrypoint script for cs 
echo Got args: \"$@\"

function checkEnvStrict {
	var=$1

	if [[ -z "${!var}" ]]; then
		echo "ERROR: Environment variable $var is missing"
		echo "Terminating"
		exit 1
	fi

	return 0
}

function checkEnv {
	var=$1

	if [[ -z "${!var}" ]]; then
		echo "WARNING: Environment variable $var is missing"
		return 1
	fi

	return 0
}

function sanitizeUrl {
	var=$1
	url=${!var}		# parameter expansion to access the contents of varname

	if [[ $url != http://* ]] && [[ $url != https://* ]]; then
		echo "WARNING: Environment variable $var does not start with http/https, will add https"
		url="https://"$url
		eval "$var=$url"	# Set the variable $var to $url
	fi
}

checkEnvStrict YGGIO_REST_API_URL && sanitizeUrl YGGIO_REST_API_URL

function write_config(){
  rm -f "$1/env.sh" || true
  cat << EOF > "$1/env.sh"
export REACT_APP_YGGIO_REST_API_URL=$YGGIO_REST_API_URL
export REACT_APP_YGGIO_CONTROL_PANEL_URL=$YGGIO_CONTROL_PANEL_URL
export REACT_APP_DOMAIN=$DOMAIN
export REACT_APP_IS_FIWARE=$YGGIO_IS_FIWARE
EOF
}

if [ "$1" = "nginx" ]; then
	write_config "/usr/share/nginx/html"
	# TODO use a config file for frontend instead of relying on ugly sed commands
	# sed
	whatFile=$(sed -nE '/main.js/{s/.*:\s*"(.*)",/\1/p;q}' /usr/share/nginx/html/asset-manifest.json)

	[[ -n "$YGGIO_REST_API_URL" ]] && sed -i "s|http://localhost:9000|${YGGIO_REST_API_URL}|g" /usr/share/nginx/html/${whatFile}
	[[ -n "$YGGIO_CONTROL_PANEL_URL" ]] && sed -i "s|http://localhost:9002|${YGGIO_CONTROL_PANEL_URL}|g" /usr/share/nginx/html/${whatFile}
	[[ -n "$DOMAIN" ]] && sed -i "s|local.yggio|${DOMAIN}|g" /usr/share/nginx/html/${whatFile}
	echo "Starting nginx"
	exec nginx -g "daemon off;"
else
	write_config "dist/storm/services/component-supplier"
	exec $@
fi

echo Nothing left to do
