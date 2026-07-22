#!/usr/bin/env bash
set -eo pipefail

cat > env-config.js << EOF
window._env_ = {
  VITE_API_URL: "${VITE_API_URL:-}",
  VITE_AUTH_MODE: ${VITE_AUTH_MODE:-true},
  VITE_API_KEY: "${VITE_API_KEY:-}",
  VITE_AUTH_DOMAIN: "${VITE_AUTH_DOMAIN:-}",
  VITE_PROJECT_ID: "${VITE_PROJECT_ID:-}",
  VITE_STORAGE_BUCKET: "${VITE_STORAGE_BUCKET:-}",
  VITE_MSG_SENDER_ID: "${VITE_MSG_SENDER_ID:-}",
  VITE_APP_ID: "${VITE_APP_ID:-}",
  VITE_IMAGE_URL: "${VITE_IMAGE_URL:-}",
  VITE_GAME_VERSION: "${VITE_GAME_VERSION:-}",
};
EOF

echo "env-config.js generated"
