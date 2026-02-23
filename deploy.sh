#!/bin/bash
# Deploy script for apply.thecolyerteam.com
# Usage: ./deploy.sh [prod|staging]

set -e
SITE_ID="887c5623-64b3-495d-a3d1-520ba4e52893"

if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
  echo "Error: NETLIFY_AUTH_TOKEN not set"
  exit 1
fi

ENV="${1:-staging}"

if [ "$ENV" = "prod" ] || [ "$ENV" = "production" ]; then
  echo "🚀 Deploying to PRODUCTION..."
  npx netlify deploy --prod --dir=. --site="$SITE_ID"
elif [ "$ENV" = "staging" ]; then
  echo "🧪 Deploying to STAGING..."
  npx netlify deploy --alias=staging --dir=. --site="$SITE_ID"
else
  echo "Usage: ./deploy.sh [prod|staging]"
  exit 1
fi
