#!/bin/bash
# Deploy script for apply.thecolyerteam.com
# Usage: ./deploy.sh [prod|staging]
#
# Publishes ONLY the site/ folder. The repo root holds internal documents (WISP, incident
# response, compliance notes); a deploy of "." served them publicly until 2026-09-21.
# Auth: NETLIFY_AUTH_TOKEN if set, otherwise the CLI's stored `netlify login`.
# If a stale token is exported in your shell, run `unset NETLIFY_AUTH_TOKEN` first.

set -e
SITE_ID="887c5623-64b3-495d-a3d1-520ba4e52893"
cd "$(dirname "$0")"

ENV="${1:-staging}"

if [ "$ENV" = "prod" ] || [ "$ENV" = "production" ]; then
  echo "Deploying site/ to PRODUCTION..."
  npx netlify deploy --prod --dir=site --site="$SITE_ID"
elif [ "$ENV" = "staging" ]; then
  echo "Deploying site/ to STAGING..."
  npx netlify deploy --alias=staging --dir=site --site="$SITE_ID"
else
  echo "Usage: ./deploy.sh [prod|staging]"
  exit 1
fi
