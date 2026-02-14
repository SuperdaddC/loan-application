#!/bin/bash
# Process incoming loan application — called by the webhook server
# Input: JSON on stdin
set -euo pipefail

source /home/ubuntu/.openclaw/workspace/.env.supabase
export GOG_KEYRING_PASSWORD=judybot2026
export GOG_KEYRING_BACKEND=file

LO_UUID="57f82d21-31e6-45b9-aa0d-c7b8764f464a"
JSON=$(cat)

# Parse key fields
FIRST=$(echo "$JSON" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('firstName',''))")
LAST=$(echo "$JSON" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('lastName',''))")
EMAIL=$(echo "$JSON" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('email',''))")
PHONE=$(echo "$JSON" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('phone',''))")
PURPOSE=$(echo "$JSON" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('loanPurpose',''))")

echo "Processing application from $FIRST $LAST ($EMAIL)..."

# Insert into Supabase
python3 << PYEOF
import json, subprocess, os

data = json.loads('''$JSON''')
db_url = os.environ.get('SUPABASE_DB_URL', '$SUPABASE_DB_URL')

# Build SQL - only store last 4 of SSN
ssn = data.get('ssn', '')
ssn_last4 = ssn[-4:] if len(ssn) >= 4 else ''

sql = """
INSERT INTO loan_applications (
  loan_purpose, property_type,
  property_address, property_city, property_state, property_zip, estimated_value, intended_use,
  first_name, last_name, email, phone, dob, marital_status, dependents, ssn_last4,
  current_address, current_city, current_state, current_zip, housing_status, years_at_address,
  employer, job_title, employer_phone, years_employed, monthly_income,
  declarations, documents,
  credit_auth_consent, e_signature, consent_timestamp,
  loan_officer_id
) VALUES (
  '{loan_purpose}', '{property_type}',
  '{prop_address}', '{prop_city}', '{prop_state}', '{prop_zip}', {est_value}, '{intended_use}',
  '{first}', '{last}', '{email}', '{phone}', '{dob}', '{marital}', {dependents}, '{ssn4}',
  '{cur_addr}', '{cur_city}', '{cur_state}', '{cur_zip}', '{housing}', '{years_addr}',
  '{employer}', '{job_title}', '{emp_phone}', '{years_emp}', {income},
  '{decl}'::jsonb, '{docs}'::jsonb,
  {consent}, '{esig}', NOW(),
  '{lo_uuid}'
) RETURNING id;
""".format(
  loan_purpose=data.get('loanPurpose','').replace("'","''"),
  property_type=data.get('propertyType','').replace("'","''"),
  prop_address=data.get('propertyAddress','').replace("'","''"),
  prop_city=data.get('propertyCity','').replace("'","''"),
  prop_state=data.get('propertyState','').replace("'","''"),
  prop_zip=data.get('propertyZip','').replace("'","''"),
  est_value=data.get('estimatedValue',0) or 0,
  intended_use=data.get('intendedUse','').replace("'","''"),
  first=data.get('firstName','').replace("'","''"),
  last=data.get('lastName','').replace("'","''"),
  email=data.get('email','').replace("'","''"),
  phone=data.get('phone','').replace("'","''"),
  dob=data.get('dob','').replace("'","''"),
  marital=data.get('maritalStatus','').replace("'","''"),
  dependents=data.get('dependents',0) or 0,
  ssn4=ssn_last4,
  cur_addr=data.get('currentAddress','').replace("'","''"),
  cur_city=data.get('currentCity','').replace("'","''"),
  cur_state=data.get('currentState','').replace("'","''"),
  cur_zip=data.get('currentZip','').replace("'","''"),
  housing=data.get('housingStatus','').replace("'","''"),
  years_addr=data.get('yearsAtAddress','').replace("'","''"),
  employer=data.get('employer','').replace("'","''"),
  job_title=data.get('jobTitle','').replace("'","''"),
  emp_phone=data.get('employerPhone','').replace("'","''"),
  years_emp=data.get('yearsEmployed','').replace("'","''"),
  income=data.get('monthlyIncome',0) or 0,
  decl=json.dumps(data.get('declarations',{})).replace("'","''"),
  docs=json.dumps(data.get('files',[])).replace("'","''"),
  consent='true' if data.get('creditAuthConsent') else 'false',
  esig=data.get('eSignature','').replace("'","''"),
  lo_uuid='$LO_UUID'
)

result = subprocess.run(['psql', db_url, '-t', '-c', sql], capture_output=True, text=True)
if result.returncode == 0:
    app_id = result.stdout.strip()
    print(f"Application saved: {app_id}")
else:
    print(f"DB error: {result.stderr}")
PYEOF

# Send confirmation email
if [[ -n "$EMAIL" && "$EMAIL" != *"test"* ]]; then
  SIG=$(cat /home/ubuntu/.openclaw/workspace/email-signature.html)
  
  CONFIRM_HTML="<p>Hi $FIRST,</p>
<p>Thank you for submitting your loan application with The Colyer Team! We've received your information and will begin reviewing it right away.</p>
<p><strong>What happens next:</strong></p>
<ul>
<li>I'll personally review your application within 1 business day</li>
<li>If we need any additional documents, I'll send you a clear list of exactly what's needed</li>
<li>Once everything is in order, we'll get you pre-approved and moving forward</li>
</ul>
<p>If you have any questions in the meantime, don't hesitate to reach out — I'm here to help.</p>
<p>Best,</p>
$SIG
<p style=\"font-size:12px;color:#9ca3af;margin-top:20px\">Equal Housing Lender · DRE 01842442 · NMLS #276626 · 2214 Faraday Ave, Carlsbad, CA 92008<br>Rates subject to change. Not an offer to lend.</p>"

  TMPFILE=$(mktemp)
  echo "$CONFIRM_HTML" > "$TMPFILE"

  gog gmail send \
    --account mike@vip.thecolyerteam.com \
    --to "$EMAIL" \
    --subject "Application Received — The Colyer Team" \
    --body-html "$(cat "$TMPFILE")" \
    --no-input 2>&1

  rm "$TMPFILE"
  echo "Confirmation email sent to $EMAIL"
fi

echo "Done processing application from $FIRST $LAST"
