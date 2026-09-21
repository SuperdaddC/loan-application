# AGENTS.md

## Stack & repo map

Static HTML/CSS/JS mortgage loan application hosted on Netlify (site: enchanting-semolina-788344). No build step — the `site/` folder deploys as-is, and nothing outside it is published. Backend is Supabase (project: apuctuqlmykeemtcasji): the `submit-loan-application` edge function (source in SuperdaddC/RealtorCRM), storage, and database triggers.

- `site/index.html` — multi-step form. POSTs to the `submit-loan-application` edge function, which verifies Turnstile, allowlists every field and generates the row id. Collects borrower PII (SSN last-4, DOB, income, assets, employment), property info, current-URLA (1/2021) declarations, military service and demographics for borrower and co-borrower, and supporting documents.
- `site/upload.html` — borrower document upload checklist, accessed via token-based URL from confirmation email
- `site/fonts/` — self-hosted Inter woff2 files (no external Google Fonts dependency)
- `netlify.toml` — `publish = "site"`, security headers (HSTS, CSP, X-Frame-Options)
- MISMO 3.4 / ULAD export lives in SuperdaddC/RealtorCRM `tooling/mismo` (schema-validated); the old `mismo-export.js` here was removed
- `COMPLIANCE.md` — regulatory reference covering 32 CA/federal laws applicable to online loan applications
- `DEPLOY.md` — deploy flow, staging/prod URLs, rollback procedures

**Database triggers on loan_applications.** Do not trust a copy of this list; regenerate it with
`select tgname, proname from pg_trigger t join pg_proc p on p.oid = t.tgfoid where tgrelid = 'public.loan_applications'::regclass and not tgisinternal`.
As of 2026-09-21 the INSERT path is: `validate_loan_application` (BEFORE; field checks, rate limit; re-verifies
Turnstile only for non-service_role callers, because the edge function already spent the single-use token),
`fn_client_on_loan_application` (BEFORE; links clients/people, fill-only), then AFTER: `fn_lead_on_loan_application`,
`fn_log_loan_app_interaction`, `fn_log_web_app_submission`, `fn_notify_new_loan_application` (queues Michael's
Outlook task and notification email), `sync_loan_app_to_person_activity`, `audit_domain_write`.

## Commands

- Deploy staging: `bash ./deploy.sh staging` (Git Bash)
- Deploy prod: `bash ./deploy.sh prod` (Git Bash). Publishes `site/` only; never deploy with `--dir=.`
- No build step, no test suite, no backend server
- DB changes: Supabase SQL Editor at https://supabase.com/dashboard/project/apuctuqlmykeemtcasji/sql/new
- Turnstile secret: the `TURNSTILE_SECRET` edge-function secret (verification at the edge) and Supabase Vault `turnstile_secret` (the trigger's check for non-service_role inserts)

## Must not break

- Form submission → `submit-loan-application` edge function → insert as service_role. A field the function does not allowlist is dropped, so a new form field needs a matching server change first
- File uploads after submit use the application `id` the function returns
- Turnstile verification happens server-side (edge function), not client-side; a token is single-use
- `cf_turnstile_response` is set to NULL by the trigger — never persisted
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
- File moves affecting deploy paths (Netlify serves `site/`)

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
- upload.html uses anon key to query `loan_needs_list` and `loan_applications` — RLS must restrict reads to token-matched rows only
