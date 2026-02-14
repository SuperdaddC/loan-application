#!/usr/bin/env bash
# MISMO 3.4 XML Export — queries Supabase and generates XML
# Usage: ./mismo-export.sh <application-uuid>
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <application-uuid>" >&2
  exit 1
fi

APP_ID="$1"
ENV_FILE="/home/ubuntu/.openclaw/workspace/.env.supabase"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found" >&2
  exit 1
fi

source "$ENV_FILE"

if [ -z "${SUPABASE_DB_URL:-}" ]; then
  echo "Error: SUPABASE_DB_URL not set in .env.supabase" >&2
  exit 1
fi

# Query the loan application as JSON
ROW=$(psql "$SUPABASE_DB_URL" -t -A -c "SELECT row_to_json(la) FROM loan_applications la WHERE id = '${APP_ID}'" 2>&1)

if [ -z "$ROW" ] || [[ "$ROW" == *"ERROR"* ]]; then
  echo "Error: Could not find loan application $APP_ID" >&2
  echo "$ROW" >&2
  exit 1
fi

OUTFILE="/tmp/mismo-export-${APP_ID}.xml"

# Generate XML using Node.js with our export function
node -e "
const { generateMISMO34XML } = require('/home/ubuntu/.openclaw/workspace/loan-application/mismo-export.js');
const app = JSON.parse(process.argv[1]);
console.log(generateMISMO34XML(app));
" "$ROW" > "$OUTFILE"

echo "✅ MISMO 3.4 XML exported to: $OUTFILE"
echo "   Size: $(wc -c < "$OUTFILE") bytes"
