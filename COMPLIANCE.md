# Compliance Reference -- apply.thecolyerteam.com

**Operator:** Mike Colyer, NMLS# 276626, DRE# 01842442
**Broker:** Five M Realty Group Inc., DRE# 02253302
**Location:** Carlsbad, CA
**Last Updated:** 2026-04-18

> This is an internal reference document, not legal advice. Consult compliance counsel for binding guidance.

---

## Data Collected by This Application

| Category | Fields |
|---|---|
| Identity | Full name, SSN (last 4 transmitted), DOB |
| Contact | Email, phone, mailing address |
| Financial | Employment/income, assets, debts, credit score range |
| Demographic | Race/ethnicity, sex (voluntary, per HMDA) |
| Co-borrower | All of the above for co-borrower if applicable |
| Documents | Pay stubs, W-2s, tax returns, bank statements, ID |

---

## FEDERAL LAWS

### 1. Gramm-Leach-Bliley Act (GLBA)

**Citation:** 15 U.S.C. 6801-6809; 12 CFR 1016 (Reg P)

**What it requires:** Financial institutions must provide initial and annual privacy notices explaining what personal information is collected, how it is shared, and how it is protected. Consumers must be given the right to opt out of certain third-party sharing.

**Compliance Checklist:**
- [ ] Initial privacy notice delivered at or before data collection
- [ ] Annual privacy notice delivered (or qualify for the exception if sharing practices have not changed)
- [ ] Notice describes categories of NPI collected, categories of parties it is shared with, and consumer opt-out rights
- [ ] Opt-out mechanism is clear and functional
- [ ] Privacy notice is conspicuously linked on the application site
- [ ] Information security program is in place (see Safeguards Rule below)

---

### 2. FTC Safeguards Rule

**Citation:** 16 CFR 314 (amended June 2023)

**What it requires:** Non-bank financial institutions must implement a Written Information Security Program (WISP) with specific technical, administrative, and physical safeguards for customer information.

**Compliance Checklist:**
- [ ] Designated Qualified Individual responsible for the security program
- [ ] Written Information Security Plan (WISP) documented and maintained
- [ ] Risk assessment performed and documented
- [ ] Encryption of customer information in transit (TLS 1.2+)
- [ ] Encryption of customer information at rest
- [ ] Multi-factor authentication for any individual accessing customer information
- [ ] Annual penetration testing; semi-annual vulnerability assessments
- [ ] Written incident response plan
- [ ] Service provider / vendor oversight program with contractual security requirements
- [ ] Access controls limiting who can view customer data
- [ ] Activity logging and monitoring
- [ ] Employee security awareness training
- [ ] Annual report from Qualified Individual to board/ownership
- [ ] Breach notification to FTC within 30 days if 500+ consumers affected
- [ ] Secure disposal of customer information no longer needed

---

### 3. Equal Credit Opportunity Act (ECOA) / Regulation B

**Citation:** 15 U.S.C. 1691; 12 CFR 1002

**What it requires:** Creditors may not discriminate on the basis of race, color, religion, national origin, sex, marital status, age, or because an applicant receives public assistance. Demographic data may be collected on a voluntary basis for HMDA monitoring, but only with the required disclosure language.

**Compliance Checklist:**
- [ ] No application fields or logic that discriminate on prohibited bases
- [ ] Demographic monitoring questions (race, ethnicity, sex) are clearly marked as voluntary
- [ ] Standard HMDA disclosure language accompanies demographic questions: "The Federal Government requests this information to monitor compliance with federal statutes..."
- [ ] Adverse action notices provided within 30 days of denial, stating specific reasons or offering the right to request reasons
- [ ] Credit score disclosure included with adverse action notices
- [ ] Applications and all related records retained for 25 months after action taken
- [ ] Fair lending analysis performed periodically

---

### 4. Fair Housing Act

**Citation:** 42 U.S.C. 3601-3619

**What it requires:** Prohibits discrimination in housing-related transactions including mortgage lending. Requires display of the Equal Housing Lender logo and language.

**Compliance Checklist:**
- [ ] Equal Housing Lender logo displayed on the website
- [ ] Equal Housing Lender statement included in communications
- [ ] No discriminatory advertising, targeting, or steering
- [ ] No discriminatory use of algorithms or automated decisioning
- [ ] Marketing materials reviewed for fair housing compliance

---

### 5. Home Mortgage Disclosure Act (HMDA) / Regulation C

**Citation:** 12 U.S.C. 2801; 12 CFR 1003

**What it requires:** Covered institutions must collect, record, and report data about mortgage applications to identify possible discriminatory lending patterns. Demographic information must be collected from the applicant.

**Compliance Checklist:**
- [ ] Demographic data fields (race, ethnicity, sex) included on application with disaggregated categories per 2018 rule
- [ ] Visual observation or surname basis noted when applicant declines to provide demographic data (in-person or telephone); for internet applications, mark as "not provided by applicant in mail, internet, or telephone application"
- [ ] Loan Application Register (LAR) maintained with all required data points
- [ ] Annual LAR filing submitted to CFPB by March 1
- [ ] Unique Loan Identifier (ULI) generated for each application
- [ ] Data retained for 3 years after LAR submission

---

### 6. Truth in Lending Act (TILA) / Regulation Z / TRID

**Citation:** 15 U.S.C. 1601; 12 CFR 1026

**What it requires:** Once a lender or broker receives the 6 data points that constitute an "application" (borrower name, income, SSN, property address, estimated property value, and loan amount), a Loan Estimate must be provided within 3 business days.

**Compliance Checklist:**
- [ ] Application workflow identifies when all 6 TRID trigger data points are collected
- [ ] Loan Estimate delivered within 3 business days of receiving 6th data point
- [ ] Advertising on the site avoids trigger terms (specific rate, monthly payment, down payment amount, or finance charge) unless full Reg Z disclosures accompany them
- [ ] "Not a commitment to lend" disclaimer visible on site
- [ ] Application records retained for 2 years (TILA general); 3 years for Loan Estimates; 5 years for Closing Disclosures
- [ ] E-SIGN consent obtained before electronic delivery of Loan Estimate

---

### 7. Real Estate Settlement Procedures Act (RESPA) / Regulation X

**Citation:** 12 U.S.C. 2601; 12 CFR 1024

**What it requires:** Prohibits kickbacks and unearned fees in real estate settlement services. Requires disclosure of affiliated business arrangements.

**Compliance Checklist:**
- [ ] Affiliated Business Arrangement (AfBA) disclosure provided if referring to affiliated service providers
- [ ] No referral fees, kickbacks, or fee-splitting with settlement service providers
- [ ] Servicing transfer notices delivered on time if applicable
- [ ] Good Faith Estimate requirements met (now merged into TRID Loan Estimate)

---

### 8. Fair Credit Reporting Act (FCRA) / Regulation V

**Citation:** 15 U.S.C. 1681; 12 CFR 1022

**What it requires:** Establishes rules for accessing and using consumer credit reports. Requires permissible purpose, consumer consent, adverse action notices, and secure disposal.

**Compliance Checklist:**
- [ ] Clear disclosure and written consent obtained before pulling credit (permissible purpose authorization)
- [ ] Credit score disclosure provided to consumer (including score, range, key factors, and source)
- [ ] Adverse action notice provided if application denied or terms less favorable, citing the credit reporting agency used
- [ ] Consumer right to dispute inaccurate information communicated
- [ ] Disposal Rule: credit reports and derived data destroyed securely when no longer needed
- [ ] Furnisher accuracy obligations met if reporting to CRAs

---

### 9. E-SIGN Act

**Citation:** 15 U.S.C. 7001-7006

**What it requires:** Electronic signatures and disclosures are legally valid, but only if the consumer affirmatively consents to receive records electronically after being informed of their rights.

**Compliance Checklist:**
- [ ] E-SIGN consent form presented before any electronic disclosures
- [ ] Consent form includes: hardware/software requirements to access records, right to receive paper copies, how to withdraw consent, and any fees for paper copies
- [ ] Consumer affirmatively consents (not pre-checked box)
- [ ] Right to withdraw consent explained and mechanism provided
- [ ] If hardware/software requirements change, consumer re-consented
- [ ] Electronic records retained in accessible format for required retention periods
- [ ] Audit trail of consent captured (timestamp, IP, browser)

---

### 10. SAFE Act / Regulation G-H

**Citation:** 12 U.S.C. 5101-5116; 12 CFR 1008

**What it requires:** Mortgage loan originators must be registered through NMLS. The unique identifier must be displayed on all communications and advertising.

**Compliance Checklist:**
- [ ] NMLS# 276626 displayed on every page of the application site
- [ ] NMLS Consumer Access link provided (https://www.nmlsconsumeraccess.org)
- [ ] NMLS ID included in all advertising, email signatures, and business cards
- [ ] Individual MLO registration current and in good standing

---

### 11. CAN-SPAM Act

**Citation:** 15 U.S.C. 7701-7713

**What it requires:** Commercial email must include identification, opt-out mechanism, and a physical postal address.

**Compliance Checklist:**
- [ ] All marketing emails include physical mailing address
- [ ] Functional opt-out / unsubscribe mechanism in every commercial email
- [ ] Opt-out requests honored within 10 business days
- [ ] From/Reply-To and subject lines are accurate and not misleading
- [ ] Transactional emails (application confirmations) distinguished from marketing

---

### 12. Telephone Consumer Protection Act (TCPA)

**Citation:** 47 U.S.C. 227; 47 CFR 64.1200

**What it requires:** Prior express written consent is required before sending marketing texts or making marketing calls using an autodialer. One-to-one consent rules apply (FCC 2025 rule).

**Compliance Checklist:**
- [ ] One-to-one prior express written consent obtained for marketing calls/texts (consent must be for a single, identified seller)
- [ ] Consent language is clear and conspicuous, not buried in terms
- [ ] STOP / opt-out keyword processing implemented for all SMS
- [ ] Opt-out honored immediately
- [ ] Records of consent retained (timestamp, source, language consented to)
- [ ] Internal Do Not Call list maintained
- [ ] Consent is not a condition of purchasing goods or services

---

### 13. ADA Title III

**Citation:** 42 U.S.C. 12181-12189

**What it requires:** Websites of places of public accommodation must be accessible to individuals with disabilities. Courts and DOJ consistently apply WCAG 2.1 AA as the standard.

**Compliance Checklist:**
- [ ] Site meets WCAG 2.1 Level AA standards
- [ ] All form fields have associated labels (programmatically linked)
- [ ] All interactive elements are keyboard navigable
- [ ] Screen reader compatibility tested (NVDA, VoiceOver, JAWS)
- [ ] Sufficient color contrast ratios (4.5:1 for text, 3:1 for large text)
- [ ] Error messages are descriptive and associated with the relevant field
- [ ] Focus indicators visible on all interactive elements
- [ ] Accessibility statement published on site
- [ ] Periodic accessibility audits conducted

---

### 14. Dodd-Frank Act / UDAAP

**Citation:** 12 U.S.C. 5531; 12 U.S.C. 5536

**What it requires:** Prohibits unfair, deceptive, or abusive acts or practices (UDAAP) in consumer financial products and services.

**Compliance Checklist:**
- [ ] No misleading claims about rates, terms, or approval likelihood
- [ ] All material terms disclosed clearly
- [ ] No buried or hidden fees
- [ ] Application process does not exploit consumer lack of understanding
- [ ] Marketing materials reviewed for UDAAP compliance
- [ ] Ability-to-repay assessment conducted before origination
- [ ] Complaint handling process in place

---

### 15. Bank Secrecy Act / Anti-Money Laundering (BSA/AML)

**Citation:** 31 U.S.C. 5311; 31 CFR 1010, 1020

**What it requires:** Financial institutions must implement an AML compliance program, perform Customer Identification Program (CIP) verification, file Suspicious Activity Reports, and retain records.

**Compliance Checklist:**
- [ ] AML compliance program documented (policies, procedures, internal controls)
- [ ] BSA compliance officer designated
- [ ] Customer Identification Program (CIP): verify name, DOB, address, and ID number
- [ ] Identity verification methods documented (documentary and non-documentary)
- [ ] OFAC screening performed on all applicants
- [ ] Suspicious Activity Reports (SARs) filed within 30 days of detection
- [ ] Currency Transaction Reports (CTRs) filed for transactions exceeding $10,000
- [ ] Records retained for 5 years
- [ ] Ongoing employee BSA/AML training

---

## CALIFORNIA STATE LAWS

### 16. California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA)

**Citation:** Cal. Civ. Code 1798.100-1798.199.100

**What it requires:** California residents have rights to know what personal information is collected, request deletion, opt out of sale/sharing, and limit use of sensitive personal information. Mortgage brokers have a partial GLBA exemption -- the exemption applies at the data level (to NPI governed by GLBA) but the entity is not wholly exempt. Non-GLBA data (marketing data, website analytics, etc.) remains subject to CCPA/CPRA.

**Compliance Checklist:**
- [ ] Privacy policy discloses categories of PI collected, purposes, and third-party sharing
- [ ] "Do Not Sell or Share My Personal Information" link on homepage
- [ ] "Limit the Use of My Sensitive Personal Information" link on homepage
- [ ] Consumer request intake mechanism for access, deletion, and correction
- [ ] Identity verification process for consumer requests
- [ ] Respond to consumer requests within 45 days (extendable to 90)
- [ ] Data processing agreements with all vendors/service providers
- [ ] Data inventory distinguishing GLBA-covered NPI from non-GLBA PI
- [ ] Annual CPRA risk assessment for high-risk processing (SSN, financial data)
- [ ] Sensitive PI (SSN, financial info, race/ethnicity) processing limited to disclosed purposes

---

### 17. California Financial Information Privacy Act (SB-1)

**Citation:** Cal. Fin. Code 4050-4060

**What it requires:** California law imposes stricter requirements than federal GLBA: affirmative opt-IN consent is required before sharing financial information with non-affiliated third parties (GLBA only requires opt-out).

**Compliance Checklist:**
- [ ] Opt-IN consent obtained before sharing financial information with non-affiliated third parties
- [ ] Consent form is clear and specific about what data is shared and with whom
- [ ] Consent mechanism is separate from general terms acceptance
- [ ] Records of opt-in consent retained

---

### 18. California Online Privacy Protection Act (CalOPPA)

**Citation:** Cal. Bus. & Prof. Code 22575-22579

**What it requires:** Any commercial website collecting PI from California residents must post a conspicuous privacy policy and disclose how the site responds to Do Not Track signals.

**Compliance Checklist:**
- [ ] Privacy policy is conspicuously linked from the homepage (word "Privacy" in the link)
- [ ] Privacy policy identifies categories of PI collected and third parties with whom it is shared
- [ ] Privacy policy describes how consumers can review and request changes to their PI
- [ ] Privacy policy states its effective date and describes how changes will be communicated
- [ ] Do Not Track (DNT) disclosure included in privacy policy
- [ ] Privacy policy accessible without requiring account creation

---

### 19. California Data Breach Notification (SB-446)

**Citation:** Cal. Civ. Code 1798.29, 1798.82 (as amended effective Jan 1, 2026)

**What it requires:** Businesses must notify affected California residents of a data breach involving unencrypted personal information. As of January 1, 2026, notification to consumers must occur within 30 days, and notification to the Attorney General within 15 days of consumer notice for breaches affecting 500+ residents.

**Compliance Checklist:**
- [ ] Breach response plan includes California-specific timelines
- [ ] Consumer notification within 30 days of discovering breach
- [ ] AG notification within 15 days of consumer notice if 500+ CA residents affected
- [ ] Notification includes: description of incident, types of information involved, steps taken, contact information, and resources for identity theft protection
- [ ] Substitute notice procedures defined if direct notice is not feasible
- [ ] Breach detection and investigation capabilities in place

---

### 20. California Reasonable Security

**Citation:** Cal. Civ. Code 1798.81.5

**What it requires:** Businesses that own or license personal information of California residents must implement and maintain reasonable security procedures and practices. The CA AG has identified CIS Controls as a baseline. Failure to implement reasonable security can result in statutory damages of $100-$750 per consumer per incident in data breach litigation.

**Compliance Checklist:**
- [ ] Security program aligned with CIS Controls (or equivalent framework: NIST CSF, ISO 27001)
- [ ] Regular security assessments conducted
- [ ] Employee security training program in place
- [ ] Vulnerability management and patching process documented
- [ ] Access control policies enforced
- [ ] Statutory damages exposure understood ($100-$750 per consumer per incident)

---

### 21. California SSN Confidentiality

**Citation:** Cal. Civ. Code 1798.85-1798.89

**What it requires:** SSNs must not be publicly displayed, printed on mailings visible through windows, or transmitted over the internet without encryption. Additional restrictions on requiring SSNs.

**Compliance Checklist:**
- [ ] SSN transmitted only over TLS 1.2+ encrypted connections
- [ ] SSN not displayed in full on any screen (mask to last 4)
- [ ] SSN not included in unencrypted emails
- [ ] SSN not printed on materials mailed to the consumer (unless required by law)
- [ ] SSN stored encrypted at rest
- [ ] Access to full SSN restricted to personnel with documented business need

---

### 22. CA DRE Advertising Requirements

**Citation:** Bus. & Prof. Code 10140.6, 10235.5

**What it requires:** All advertising by real estate licensees must include the license number of the broker and/or salesperson. Websites are considered advertising.

**Compliance Checklist:**
- [ ] Individual DRE# 01842442 displayed on website
- [ ] Broker DRE# 02253302 (Five M Realty Group Inc.) displayed on website
- [ ] License numbers included in all digital advertising (email, social, paid ads)
- [ ] Broker identity clearly stated

---

### 23. DFPI Cybersecurity Incident Reporting

**Citation:** DFPI guidance (voluntary reporting program)

**What it requires:** The California Department of Financial Protection and Innovation requests that licensees voluntarily report cybersecurity incidents within 48 hours. While currently voluntary, reporting demonstrates good faith and may become mandatory.

**Compliance Checklist:**
- [ ] DFPI reporting included in incident response plan
- [ ] 48-hour voluntary reporting timeline documented
- [ ] DFPI contact information on file for incident response team

---

## INDUSTRY STANDARDS

### 24. Uniform Residential Loan Application (URLA) / Form 1003

**What it requires:** The redesigned URLA (effective since March 2021) is the standard application form for conventional mortgage loans. All data collected through the online application should map to the fields on the 1003 and its demographic addendum.

**Compliance Checklist:**
- [ ] All application fields mapped to corresponding URLA/1003 sections
- [ ] Demographic Information Addendum fields match disaggregated race/ethnicity categories
- [ ] Co-borrower sections mirror borrower sections per form structure
- [ ] Data validation rules align with GSE requirements
- [ ] Application data can be exported to complete a 1003

---

### 25. MISMO v3.4

**What it requires:** The Mortgage Industry Standards Maintenance Organization (MISMO) v3.4 XML format is required for automated underwriting submission to Desktop Underwriter (DU) and Loan Product Advisor (LPA).

**Compliance Checklist:**
- [ ] Application data structure supports MISMO v3.4 XML export
- [ ] Field mappings validated against MISMO data dictionary
- [ ] XML output validated against MISMO schemas before submission
- [ ] Version compatibility confirmed with DU/LPA requirements

---

### 26. Fannie Mae / Freddie Mac Electronic Records Standards

**What it requires:** GSEs accept electronic records and signatures when they comply with E-SIGN and UETA. Audit trails must demonstrate the integrity and authenticity of electronic documents.

**Compliance Checklist:**
- [ ] E-SIGN consent obtained before electronic document delivery
- [ ] Audit trail captures: signer identity, timestamp, IP address, document hash
- [ ] Electronic records stored in tamper-evident format
- [ ] Records accessible for the full retention period in their original electronic format
- [ ] eNote requirements met if using electronic promissory notes (MERS eRegistry)

---

## DATA RETENTION REQUIREMENTS

| Data Type | Minimum Retention | Source |
|---|---|---|
| General loan records | 2 years | TILA / Reg Z (12 CFR 1026.25) |
| Loan Estimates | 3 years | TRID / Reg Z (12 CFR 1026.19(f)(4)) |
| Closing Disclosures | 5 years | TRID / Reg Z (12 CFR 1026.25(c)(1)) |
| BSA/AML records (CIP, SARs, CTRs) | 5 years | BSA (31 CFR 1010.430) |
| ECOA / adverse action records | 25 months | Reg B (12 CFR 1002.12) |
| HMDA / LAR data | 3 years after submission | Reg C (12 CFR 1003.5(a)) |
| RESPA / settlement records | 5 years | Reg X (12 CFR 1024.21) |
| Credit reports and consent | 5 years (recommended) | FCRA best practice |
| TCPA consent records | 5 years (recommended) | Litigation statute of limitations |
| E-SIGN consent records | Duration of relationship + retention period | E-SIGN Act |

> Recommendation: Retain all application records for a minimum of 5 years to satisfy the longest federal requirement and reduce litigation risk.

---

## BREACH NOTIFICATION TIMELINE

| Recipient | Deadline | Trigger | Authority |
|---|---|---|---|
| CA consumers | 30 days from discovery | Breach of unencrypted PI | Cal. Civ. Code 1798.29, 1798.82 (SB-446, eff. Jan 1, 2026) |
| CA Attorney General | 15 days after consumer notice | 500+ CA residents affected | Cal. Civ. Code 1798.29(e) |
| FTC | 30 days from discovery | 500+ consumers affected | FTC Safeguards Rule (16 CFR 314.4(w)) |
| DFPI | 48 hours from discovery (voluntary) | Any cybersecurity incident | DFPI voluntary reporting guidance |
| Credit reporting agencies | 60 days (if required) | 1,000+ consumers notified | State law triggers |
| HUD / CFPB | As required by supervisory guidance | Material incidents | Supervisory relationship |

---

## WEBSITE DISCLOSURE CHECKLIST

Items that must be visible or accessible on apply.thecolyerteam.com:

| Disclosure | Requirement Source | Status |
|---|---|---|
| NMLS# 276626 on every page | SAFE Act / Reg G | Required |
| DRE# 01842442 (individual) | CA Bus. & Prof. Code 10140.6 | Required |
| DRE# 02253302 (Five M Realty Group Inc.) | CA Bus. & Prof. Code 10140.6 | Required |
| Equal Housing Lender logo | Fair Housing Act | Required |
| Broker identity: Five M Realty Group Inc. | SAFE Act, DRE regs | Required |
| Privacy Policy link (conspicuous) | GLBA, CalOPPA, CCPA/CPRA | Required |
| Do Not Sell/Share link | CCPA/CPRA | Required |
| Terms of Service | General best practice | Required |
| NMLS Consumer Access link | SAFE Act | Required |
| Accessibility statement | ADA Title III / WCAG 2.1 AA | Required |
| Physical mailing address | CAN-SPAM, GLBA | Required |
| "Not a commitment to lend" disclaimer | TILA / UDAAP | Required |
| E-SIGN consent disclosure | E-SIGN Act | Required (before e-delivery) |
| Credit authorization consent | FCRA | Required (before credit pull) |
| Demographic data voluntary disclosure | ECOA / HMDA | Required (on demographic section) |

---

## QUICK REFERENCE: KEY NUMBERS

| Item | Value |
|---|---|
| Operator NMLS# | 276626 |
| Operator DRE# | 01842442 |
| Broker | Five M Realty Group Inc. |
| Broker DRE# | 02253302 |
| NMLS Consumer Access | https://www.nmlsconsumeraccess.org |
| TRID trigger data points | 6 (name, income, SSN, property address, property value, loan amount) |
| Loan Estimate deadline | 3 business days after 6th data point received |
| CA breach notice to consumers | 30 days |
| CA breach notice to AG (500+) | 15 days after consumer notice |
| FTC breach notice (500+) | 30 days |
| DFPI incident report | 48 hours (voluntary) |
| TCPA consent type | One-to-one, prior express written |
| CCPA response deadline | 45 days (extendable to 90) |
| SSN display | Last 4 only; TLS required for transmission |
