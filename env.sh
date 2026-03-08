#!/bin/sh
# env.sh

ENV_FILE=/usr/share/nginx/html/env-config.js
echo "window._env_ = {" > $ENV_FILE

env | grep '^VITE_' | while IFS='=' read -r key value; do
  echo "Adding $key to env-config.js"
  echo "  $key: \"$value\"," >> $ENV_FILE
done

echo "};" >> $ENV_FILE