# Written Information Security Program (WISP)

**The Colyer Team / Five M Realty Group, Inc.**
**Effective Date:** 2026-04-16
**Next Review:** 2027-04-16 (annual)
**Qualified Individual:** Michael Colyer, Broker Associate, NMLS# 276626, DRE# 01842442

---

## 1. Purpose & Scope

This Written Information Security Program ("WISP") satisfies the requirements of the **FTC Safeguards Rule (16 CFR Part 314)** as amended effective June 2023 and May 2024, and addresses applicable obligations under the Gramm-Leach-Bliley Act (GLBA), California Civil Code § 1798.81.5 (reasonable security), and the California Financial Information Privacy Act (SB-1).

**Scope:** This WISP applies to all Customer Information ("NPI") collected, processed, transmitted, stored, or disposed of by The Colyer Team / Five M Realty Group, Inc. ("Company"), including through:
- `apply.thecolyerteam.com` (online loan application)
- `los.thecolyerteam.com` (loan origination system / LOS)
- Supabase database (project: apuctuqlmykeemtcasji)
- All employee/contractor workstations and devices handling NPI
- All third-party service providers that process NPI on Company's behalf

**NPI includes:** borrower name, SSN (and last-4), date of birth, address, phone, email, employment, income, assets, debts, credit information, property information, supporting documents (paystubs, W-2s, tax returns, bank statements, IDs), and any other information that identifies a financial customer.

---

## 2. Qualified Individual

**Designated Qualified Individual:** Michael Colyer, Broker Associate.

The Qualified Individual is responsible for overseeing, implementing, and enforcing this WISP. Responsibilities include:
- Conducting and documenting annual risk assessments
- Approving changes to security controls
- Coordinating incident response
- Reporting to leadership at least annually on the state of the information security program
- Maintaining vendor security attestations
- Ensuring employee security training

## 3. Risk Assessment

### 3.1 Initial Risk Assessment (completed 2026-04-16)

| Asset | Threats | Likelihood | Impact | Controls |
|---|---|---|---|---|
| `apply.thecolyerteam.com` intake form | Bot submissions, form abuse, XSS | Medium | Medium | Turnstile, rate limiting, CSP, HSTS, input validation, honeypot |
| Supabase DB (PII at rest) | Unauthorized access, misconfigured RLS | Medium | High | RLS insert-only for anon, SECURITY DEFINER triggers, Vault-stored secrets, Supabase encryption at rest |
| Supabase anon key in client | Key abuse | Medium | Low (RLS restricts to INSERT) | RLS enforcement, rate limiting trigger (3/email/24h) |
| Admin accounts (Supabase/GitHub/Netlify) | Credential theft | Medium | Critical | MFA required on all admin accounts (see §4.3) |
| Employee workstations | Malware, physical loss | Low | High | Full-disk encryption, OS patching, endpoint AV |
| Email (mjcolyer@gmail.com, judy@vip.thecolyerteam.com) | Phishing, takeover | Medium | Critical | MFA, TLS transport, phishing awareness training |
| Document storage (Supabase Storage) | Unauthorized access | Low | High | Signed URLs, path-based access controls |
| Vendors (Supabase, Netlify, Cloudflare) | Vendor breach | Low | High | SOC 2 attestations, data processing agreements (§9) |

### 3.2 Ongoing Risk Assessment

- **Annual:** Full risk assessment refresh each April; update this table.
- **On material change:** Any new data flow, new vendor, or new service triggers a mini-assessment.

## 4. Safeguards (Required Technical Controls)

### 4.1 Encryption In Transit
- All public-facing endpoints (apply.thecolyerteam.com, los.thecolyerteam.com) use **TLS 1.2+**, enforced by Netlify.
- **HSTS** enabled: `max-age=31536000; includeSubDomains; preload`.
- `upgrade-insecure-requests` directive in CSP prevents any mixed-content load.
- Internal SSH / remote access uses SSH keys, not passwords.

### 4.2 Encryption At Rest
- Supabase provides AES-256 encryption at rest on all databases and storage buckets (AWS RDS + S3 backends).
- Secrets (Turnstile, service role keys) stored in **Supabase Vault** (AES-GCM encrypted).
- Local workstations: full-disk encryption (BitLocker on Windows, FileVault on macOS) enabled.

### 4.3 Multi-Factor Authentication
MFA is **required** on all systems granting access to NPI:
- [ ] Supabase (console.supabase.com) — TOTP enabled for Mike
- [ ] GitHub (github.com/SuperdaddC) — TOTP + hardware key
- [ ] Netlify (app.netlify.com) — TOTP enabled
- [ ] Google Workspace / Gmail (mjcolyer@gmail.com) — TOTP + backup codes
- [ ] Cloudflare (dash.cloudflare.com) — TOTP enabled
- [ ] Any LOS vendor portal — enforce at vendor level

**Verification:** Qualified Individual confirms MFA enabled on all of the above quarterly.

### 4.4 Access Controls
- **Principle of least privilege:** staff get only the access required for their role.
- Supabase service role key and admin credentials are restricted to the Qualified Individual.
- Anon role can only INSERT into `loan_applications`, `loan_documents`, `page_views` (enforced by RLS).
- Authenticated users see only their own records or records assigned to them (see DB policies `lo_view_own_loans`, `borrower_view_own_app`).
- Terminated employees: access revoked within 24 hours of separation.

### 4.5 Change Management
- All production code changes go through git (SuperdaddC/loan-application, SuperdaddC/oneMLS, etc.) with commits tracked.
- Database schema changes follow the Schema Add-Only Rule (see `DEPLOY.md`): never rename/drop columns while older frontend versions may be cached.
- Material security changes (RLS policies, triggers, CSP, auth) require Qualified Individual approval, documented in commit messages.

### 4.6 Monitoring & Logging
- Supabase audit log captures all DB access and admin actions.
- `loan_activity_log` table captures all loan application state changes.
- `page_views` captures site traffic (anon INSERT only; authenticated SELECT).
- Netlify deploy log retained for all production deploys.
- Cloudflare Turnstile logs for bot challenges.

### 4.7 Vulnerability Management
- **Semi-annual vulnerability assessments** (every 6 months): scan public endpoints using a recognized tool (e.g., OWASP ZAP, Mozilla Observatory, securityheaders.com).
- **Annual penetration test:** engage a qualified third party or conduct documented internal testing of the full application stack.
- Track findings in `PEN_TEST_LOG.md` (to be created; confidential).
- Remediate Critical findings within 30 days, High within 60, Medium within 90.

### 4.8 Input Validation & Output Encoding
- All form inputs validated client-side and server-side (DB trigger `validate_loan_application`).
- `upload.html` HTML-escapes all database-sourced values before rendering to prevent stored XSS.
- File uploads restricted to PDF/JPG/PNG/GIF/WebP, max 10MB per file.

### 4.9 Secure Disposal
- PII disposed of per data retention schedule (§7).
- Deleted Supabase records are removed from backups within the backup retention window (7 days for point-in-time recovery on current Supabase plan).
- Paper documents: cross-cut shredding before disposal.
- Workstation decommissioning: full-disk wipe (DBAN or manufacturer tool) before disposal.

## 5. Service Provider Oversight

### 5.1 Vendor Inventory

| Vendor | Service | NPI Access | Attestation |
|---|---|---|---|
| Supabase (supabase.com) | DB, storage, auth | Yes — all NPI stored here | SOC 2 Type II — available at supabase.com/security |
| Netlify (netlify.com) | Static site hosting, edge | No (no NPI flows through) | SOC 2 Type II — available at netlify.com/trust-center |
| Cloudflare (cloudflare.com) | Turnstile bot protection | Minimal (token only) | SOC 2 Type II — available at cloudflare.com/trust-hub |
| Google Workspace | Email | Yes — copies of correspondence | SOC 2 + ISO 27001 |
| GitHub (Microsoft) | Source code hosting | No (no NPI in repos) | SOC 2 Type II |

### 5.2 Vendor Requirements
All vendors processing NPI on Company's behalf must:
- Maintain a current SOC 2 Type II attestation (or equivalent such as ISO 27001)
- Provide a Data Processing Agreement (DPA) or equivalent contractual commitment
- Notify Company of any security incident affecting Company data within 72 hours
- Maintain reasonable technical and organizational security measures

Qualified Individual reviews and refreshes vendor attestations annually.

## 6. Incident Response

See `INCIDENT_RESPONSE.md` for the full incident response plan, including notification timelines (CA consumers 30 days, CA AG 15 days after consumer notice for 500+, FTC 30 days for 500+, DFPI 48 hours voluntary).

## 7. Data Retention Schedule

| Data Type | Minimum Retention | Maximum Retention | Source |
|---|---|---|---|
| Loan application records (approved or denied) | 25 months after action | 7 years | ECOA/Reg B; GSE requirements |
| TRID disclosures (Loan Estimate, Closing Disclosure) | 3-5 years | 7 years | 12 CFR 1026.25 |
| BSA/AML CIP records | 5 years after account closed | 5 years | 31 CFR 1020.220 |
| HMDA LAR data | 3 years | 3 years | Reg C |
| Credit report data | As long as needed for transaction | Destroy per FCRA Disposal Rule once no longer needed | FCRA |
| Advertising/marketing records | 3 years | 5 years | State best practice |
| Page views / analytics | 90 days | 1 year | Operational |
| Security logs / audit trails | 1 year | 3 years | Safeguards Rule |

Data past maximum retention is purged via scheduled cleanup (quarterly review).

## 8. Employee Training

- **Onboarding:** All new employees/contractors complete security awareness training before accessing NPI.
- **Annual refresher:** All staff complete annual security training covering:
  - Phishing / social engineering recognition
  - Password hygiene and MFA
  - Handling of SSN, credit data, and other sensitive PII
  - Incident reporting procedures
  - Clean-desk policy for physical documents
- **Training log:** Maintain a signed acknowledgment for each training session.

## 9. Program Review & Updates

- Qualified Individual reviews this WISP at least **annually** (next: 2027-04-16).
- Material changes to business, systems, vendors, or applicable law trigger an interim review.
- All changes are tracked in the git history of this file.
- Report on the state of the program delivered to leadership annually.

## 10. Breach Notification Quick Reference

| Authority | Deadline | Trigger |
|---|---|---|
| Affected California consumers | 30 calendar days from discovery | Any breach of CA resident PII (SB-446, effective Jan 1, 2026) |
| California Attorney General | 15 calendar days after notifying consumers | Breach affecting 500+ CA residents |
| FTC (via reportbreach.ftc.gov) | 30 days from discovery | Breach affecting 500+ consumers nationally (Safeguards Rule) |
| DFPI | 48 hours (encouraged) | Reportable cyber incident with CA nexus |

## 11. Acknowledgment

The Qualified Individual has reviewed and approves this WISP.

**Signed:** Michael Colyer
**Date:** 2026-04-16
**Role:** Broker Associate / Qualified Individual
