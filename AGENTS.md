# AGENTS.md

## Stack & repo map

Static HTML/CSS/JS mortgage loan application hosted on Netlify (site: enchanting-semolina-788344). No build step — files deploy as-is. Backend is Supabase (project: apuctuqlmykeemtcasji) with PostgREST API, storage, and database triggers.

- `index.html` — 9-step multi-page form, submits directly to Supabase PostgREST using anon key. Collects borrower PII (SSN last-4, DOB, income, assets, employment), property info, declarations, and supporting documents.
- `upload.html` — borrower document upload checklist, accessed via token-based URL from confirmation email
- `mismo-export.js` — MISMO 3.4 XML export for Fannie Mae Desktop Underwriter (DU) submission
- `netlify.toml` — security headers (HSTS, CSP, X-Frame-Options), build config
- `fonts/` — self-hosted Inter woff2 files (no external Google Fonts dependency)
- `COMPLIANCE.md` — regulatory reference covering 32 CA/federal laws applicable to online loan applications
- `DEPLOY.md` — deploy flow, staging/prod URLs, rollback procedures

**Database triggers on loan_applications (INSERT):**
1. `validate_loan_application` (BEFORE) — field validation, rate limiting, Turnstile server-side verification via Vault secret + http extension
2. `fn_client_on_loan_application` (BEFORE) — deduplicate/create clients record
3. `fn_lead_on_loan_application` (AFTER) — upsert into leads table
4. `fn_log_web_app_submission` (AFTER) — write to loan_activity_log
5. `fn_drip_auto_switch_on_loan_app` (AFTER) — switch drip campaigns
6. `notify_loan_application` (AFTER) — HTTP webhook for confirmation + notification emails
7. `sync_loan_app_to_person_activity` (AFTER) — person activity sync

All AFTER triggers are SECURITY DEFINER to work with anon role inserts.

## Commands

- Deploy staging: `bash ./deploy.sh staging` (Git Bash, requires NETLIFY_AUTH_TOKEN in env)
- Deploy prod: `bash ./deploy.sh prod` (Git Bash)
- No build step, no test suite, no backend server
- DB changes: Supabase SQL Editor at https://supabase.com/dashboard/project/apuctuqlmykeemtcasji/sql/new
- Turnstile secret: stored in Supabase Vault (name: `turnstile_secret`)

## Must not break

- Form submission → Supabase insert (anon role, RLS insert-only, no SELECT for anon)
- `Prefer: return=minimal` on the POST — anon has no SELECT policy, so `return=representation` causes RLS violation
- File uploads after submit depend on client-generated UUID (`_clientLoanId`) sent as the row `id`
- Turnstile verification happens server-side in the `validate_loan_application` DB trigger, not client-side
- All 6 AFTER INSERT triggers must be SECURITY DEFINER or they fail on anon inserts
- Confirmation emails fire via pg_net webhook in `notify_loan_application` trigger
- `cf_turnstile_response` is set to NULL by the trigger after verification — never persisted
- The `purchase_price` column was added manually; anon has INSERT grant on it
- Upload.html token is read from URL then stripped via `history.replaceState` — do not re-add token to URL

## Never without approval

- Changing `Prefer` header or PostgREST response format
- Modifying RLS policies or DB triggers
- Changing security headers or CSP directives
- Altering Supabase anon key, Turnstile site key, or Vault secrets
- Destructive DB changes (column renames/drops) — see Schema Add-Only Rule in DEPLOY.md
- Changing how SSN, DOB, or other PII is collected, transmitted, or stored
- Modifying compliance disclosures (privacy policy, TOS, Equal Housing, NMLS/DRE numbers)
- Broad refactors or dependency additions
- File moves affecting deploy paths (Netlify serves from repo root)

## Preferred patterns

- Single-file HTML with inline CSS/JS (no framework, no bundler)
- Direct Supabase PostgREST calls from client with anon key (RLS enforces security)
- Server-side validation/logic lives in Postgres triggers, not client code
- Currency fields: `inputmode="numeric"`, auto-format with `$` and commas on input event
- Date fields: `inputmode="numeric"`, auto-format MM/DD/YYYY
- Option selection: `.option-card` radio cards with `.selected` class toggle
- Form steps: `.step` divs shown/hidden with `.active` class, `currentStep` counter
- Error display: `.error-msg` spans with `role="alert"`, toggled via `.invalid` class on input
- File uploads: client-side type/size validation → Supabase Storage POST → `loan_documents` record INSERT
- Secrets go in Supabase Vault, never in code or env files committed to git

## Open issues / fragile areas

- `_headers` file was deleted (contained a Netlify 404 page, not actual headers) — all headers come from `netlify.toml` now
- CSP still allows `'unsafe-inline'` for scripts — moving to nonces requires extracting all inline JS to external files (post-launch enhancement)
- Full SSN is collected client-side but only last-4 is transmitted — full value exists in browser memory temporarily. Moving to a tokenization vault (VGS/Basis Theory) is a future enhancement.
- `.netlify/netlify.toml` has a local machine path in `publish` — artifact of running `netlify deploy` from different machines, not harmful
- The `page_views` INSERT fires on every load with no bot protection — low priority but could be abused for log spam
- Supabase anon key is in client HTML — acceptable with RLS but a serverless function proxy would be more secure (future enhancement)
- upload.html uses anon key to query `loan_needs_list` and `loan_applications` — RLS must restrict reads to token-matched rows only
