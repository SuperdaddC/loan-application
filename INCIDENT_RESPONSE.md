# Incident Response Plan

**The Colyer Team / Five M Realty Group, Inc.**
**Effective Date:** 2026-04-16
**Next Review:** 2027-04-16
**Incident Commander:** Michael Colyer, NMLS# 276626

---

## Quick Reference — Who to Call

| # | Role | Name | Contact |
|---|---|---|---|
| 1 | Incident Commander | Mike Colyer | mjcolyer@gmail.com |
| 2 | Legal counsel | [TBD — add firm] | [phone] |
| 3 | Cyber insurance carrier | [TBD — add carrier] | [claims line] |
| 4 | External IT / forensics | [TBD if retained] | [phone] |
| 5 | FTC breach reporting | — | https://reportbreach.ftc.gov |
| 6 | CA Attorney General breach reporting | — | https://oag.ca.gov/ecrime/databreach/report-a-breach |
| 7 | DFPI cybersecurity incident reporting | — | https://dfpi.ca.gov/regulated-industries/report-a-cybersecurity-incident/ |
| 8 | Supabase support | — | support@supabase.com |
| 9 | Netlify support | — | support@netlify.com |

## 1. Purpose

This plan defines how the Company detects, contains, eradicates, recovers from, and reports security incidents involving Customer Information (NPI). It satisfies the FTC Safeguards Rule (16 CFR § 314.4(h)) and California data breach notification law (Cal. Civ. Code §§ 1798.29, 1798.82, as amended by SB-446 effective 2026-01-01).

## 2. Scope

Applies to any event that compromises — or has a reasonable likelihood of compromising — the confidentiality, integrity, or availability of NPI stored, processed, or transmitted by the Company, including:
- Unauthorized access to Supabase, Netlify, or Cloudflare accounts
- Compromise of `apply.thecolyerteam.com`, `los.thecolyerteam.com`, or related infrastructure
- Malware, ransomware, or DDoS affecting Company systems
- Lost or stolen devices containing NPI
- Accidental exposure of NPI (misdirected email, public cloud bucket)
- Vendor breach affecting Company data

## 3. Incident Severity Levels

| Level | Definition | Example | Max Response Time |
|---|---|---|---|
| **SEV-1 (Critical)** | Confirmed unauthorized access to NPI; active exfiltration; ransomware | Attacker has Supabase service role key; database dump public | 1 hour |
| **SEV-2 (High)** | Strong indicators of compromise; NPI at risk but not confirmed exfiltrated | Phishing succeeded on Gmail admin; suspicious DB queries; RLS misconfiguration discovered | 4 hours |
| **SEV-3 (Medium)** | Security event with limited NPI exposure risk | Brute-force attempts against login; isolated malware on workstation; failed phishing attempt | 24 hours |
| **SEV-4 (Low)** | Security event without NPI exposure | Bot flooding page_views table; failed Turnstile challenges surging | 72 hours |

## 4. Response Phases

### Phase 1 — Detect (0 to 1 hour)

**Triggers for detection:**
- Alert from Supabase, Netlify, Cloudflare, or Google admin console
- Suspicious query pattern in `loan_activity_log` or Supabase audit log
- User/staff report of suspicious email, login, or behavior
- External notification (law enforcement, vendor, security researcher)
- Failed audit or pen test finding requiring immediate response

**Immediate actions:**
1. Log the discovery: date/time, who reported, what was observed.
2. Incident Commander assigns a severity level (§3).
3. Open an incident log (new entry in `INCIDENT_LOG.md` — confidential, not committed to public repo; store encrypted).

### Phase 2 — Contain (within 1-4 hours)

**Goal:** Stop the bleeding without destroying forensic evidence.

**Containment checklist (adapt to incident):**
- [ ] Rotate affected credentials (Supabase service/anon keys, GitHub PATs, Netlify tokens, Gmail app passwords)
- [ ] Revoke active sessions (Supabase → Authentication → Users; Google admin → session management)
- [ ] Disable compromised user accounts
- [ ] Pull affected records into quarantine if needed
- [ ] Block IPs at Cloudflare WAF if source is identifiable
- [ ] Take system offline if ongoing active compromise (redirect `apply.thecolyerteam.com` to maintenance page via Netlify)
- [ ] Preserve logs: export Supabase audit log, Netlify deploy log, Cloudflare analytics, Gmail audit log to encrypted archive before anything is rotated/wiped

### Phase 3 — Investigate (hours to days)

**Establish:**
- **What** happened (technical root cause)
- **When** it happened (first compromise, detection time)
- **What was accessed** (specific records, columns, tables; count of affected individuals)
- **How** access was obtained (phishing, credential theft, misconfiguration, vulnerability)
- **Whether** data was exfiltrated vs. only accessed
- **Whether** CA residents are affected, and how many

**Sources to review:**
- Supabase audit log and `loan_activity_log`
- Netlify edge logs and deploy history
- Cloudflare analytics and Turnstile logs
- Gmail audit log (if email involved)
- Local workstation logs (Windows Event Viewer, macOS unified log)
- Vendor-provided incident details

**Engage external forensics if:** SEV-1 confirmed, attacker presence unclear, or exfiltration volume uncertain.

### Phase 4 — Eradicate & Recover (days)

- Apply patches / reconfigure controls that allowed the incident
- Restore from clean backups if data integrity compromised
- Reset ALL credentials in the blast radius, not just the known compromised ones
- Force password + MFA re-enrollment for all staff
- Re-verify all RLS policies and triggers
- Re-enable services only when Incident Commander confirms containment

### Phase 5 — Notify (see §5 for legal deadlines)

### Phase 6 — Post-Incident Review (within 30 days of resolution)

- Root cause analysis (RCA) document
- Timeline of events from first compromise to resolution
- What worked, what didn't
- Action items to prevent recurrence — assign owners and due dates
- Update WISP and this plan if gaps identified
- Training refresher for staff if relevant

## 5. Notification Requirements & Timelines

### 5.1 Affected Individuals (California Residents)

**Deadline:** 30 calendar days from discovery of breach (Cal. Civ. Code § 1798.82, as amended by SB-446, effective 2026-01-01).

**Method:** Written notice (mail) or electronic notice (if consumer has consented to electronic delivery and such consent hasn't been withdrawn). Substitute notice (email + website post + statewide media) if cost of direct notice exceeds $250,000 or number of affected persons exceeds 500,000.

**Content required:**
- Name and contact info of notifier
- Types of PII believed compromised
- Date or date range of breach (or that it is unknown)
- Whether notification delayed by law enforcement
- General description of the incident
- Toll-free numbers and addresses of major credit reporting agencies (if SSN, driver's license, or CA ID compromised)
- Advice to contact law enforcement and report identity theft

### 5.2 California Attorney General

**Deadline:** 15 calendar days after notifying affected consumers (if breach affects 500+ California residents).

**Method:** Online submission at https://oag.ca.gov/ecrime/databreach/report-a-breach.

### 5.3 Federal Trade Commission

**Deadline:** 30 days from discovery (if breach affects 500+ consumers nationally). Required under FTC Safeguards Rule (16 CFR § 314.5(b), effective May 2024).

**Method:** Online submission at https://reportbreach.ftc.gov.

### 5.4 California DFPI (Voluntary but Encouraged)

**Deadline:** 48 hours after discovery for reportable cybersecurity incidents.

**Method:** https://dfpi.ca.gov/regulated-industries/report-a-cybersecurity-incident/.

### 5.5 Other Potential Reports

- **NMLS / state regulators:** May require reporting depending on state. Check current NMLS guidance.
- **DRE:** Notify if incident affects licensed real estate activity or triggers consumer harm.
- **Cyber insurance carrier:** Notify per policy terms (typically within 24-72 hours).
- **Law enforcement:** Contact FBI IC3 (ic3.gov) for ransomware, financial fraud, or nation-state activity.

## 6. Communication Plan

### Internal
- Staff: Incident Commander issues a brief statement describing what happened, what's being done, and what staff should do (e.g., reset passwords, be alert for social engineering).
- Do not discuss active incidents outside authorized channels.

### External — Affected Consumers
- Prepare a single consumer notification letter approved by counsel.
- Include required CA § 1798.82 content (§5.1 above).
- Provide a hotline or email for questions.
- Offer credit monitoring if SSN or financial account info compromised.

### External — Media / Public
- Only the Incident Commander or designated spokesperson speaks publicly.
- Use prepared statements reviewed by counsel.
- Don't speculate. Don't downplay. Don't blame the victim (consumer).

## 7. Evidence Preservation

- Export and hash all relevant logs before any remediation rotates or destroys them.
- Store evidence on encrypted offline storage for at least 3 years (longer if litigation or regulatory action ongoing).
- Chain of custody: document who touched evidence, when, and why.

## 8. Tabletop Exercise

Run a tabletop exercise **at least annually** to practice this plan. Scenarios to rotate through:
- Phishing → Gmail takeover → NPI exfiltration from Supabase via service role key
- Supabase RLS misconfiguration exposing `loan_applications` to anon read
- Lost laptop containing cached customer data
- Vendor breach (Supabase notifies us of unauthorized access)
- Ransomware on Mac Mini / Windows workstation

Document the exercise in `INCIDENT_LOG.md` (drills section) including date, participants, scenario, findings, and action items.

## 9. Plan Updates

Incident Commander reviews this plan at least annually (next: 2027-04-16) and after every real incident or tabletop exercise. All changes tracked in git history.
