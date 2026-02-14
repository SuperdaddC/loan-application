/**
 * MISMO 3.4 XML Export for Loan Applications
 * Generates Fannie Mae ULAD-compliant XML for Desktop Underwriter (DU) submission.
 * 
 * Usage:
 *   const xml = generateMISMO34XML(loanApplication);
 * 
 * @param {Object} app - Loan application object (matching loan_applications table schema)
 * @returns {string} MISMO 3.4 XML string
 */

function generateMISMO34XML(app) {
  const esc = (val) => {
    if (val == null || val === '') return '';
    return String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  };

  const tag = (name, value) => {
    if (value == null || value === '') return '';
    return `<${name}>${esc(value)}</${name}>`;
  };

  const amount = (name, value) => {
    if (value == null || value === '') return '';
    return `<${name}>${Number(value).toFixed(2)}</${name}>`;
  };

  // Map loan_purpose to MISMO LoanPurposeType
  const mapLoanPurpose = (p) => {
    if (!p) return 'Purchase';
    const lower = p.toLowerCase();
    if (lower.includes('cash') || lower.includes('cashout')) return 'CashOutRefinance';
    if (lower.includes('refi') || lower.includes('refinance')) return 'Refinance';
    return 'Purchase';
  };

  // Map intended_use to MISMO PropertyUsageType
  const mapPropertyUsage = (u) => {
    if (!u) return 'PrimaryResidence';
    const lower = u.toLowerCase();
    if (lower.includes('invest')) return 'Investor';
    if (lower.includes('second') || lower.includes('vacation')) return 'SecondHome';
    return 'PrimaryResidence';
  };

  // Map property_type to MISMO PropertyType (FNM enum)
  const mapPropertyType = (t) => {
    if (!t) return '';
    const lower = t.toLowerCase();
    if (lower.includes('condo')) return 'Condominium';
    if (lower.includes('town')) return 'Attached';
    if (lower.includes('multi')) return 'ManufacturedHousing';
    if (lower.includes('attach')) return 'Attached';
    return 'Detached';
  };

  // Map marital_status to MISMO MaritalStatusType
  const mapMaritalStatus = (m) => {
    if (!m) return '';
    const lower = m.toLowerCase();
    if (lower.includes('married')) return 'Married';
    if (lower.includes('separated')) return 'Separated';
    return 'Unmarried';
  };

  // Map housing_status to MISMO BorrowerResidencyType
  const mapResidencyBasis = (h) => {
    if (!h) return '';
    const lower = h.toLowerCase();
    if (lower.includes('own')) return 'Own';
    if (lower.includes('rent')) return 'Rent';
    return 'LivingRentFree';
  };

  // Build declarations from JSONB
  const buildDeclarations = (decl) => {
    if (!decl || typeof decl !== 'object') return '';
    const mapping = [
      ['outstanding_judgments', 'IntentToOccupyIndicator', false],
      ['bankruptcy', 'BankruptcyIndicator', true],
      ['foreclosure', 'PriorPropertyForeclosureCompletedIndicator', true],
      ['lawsuit', 'PartyToLawsuitIndicator', true],
      ['delinquent_federal_debt', 'DelinquentIndicator', true],
      ['alimony', 'AlimonyOwedIndicator', true],
      ['down_payment_borrowed', 'BorrowedDownPaymentIndicator', true],
      ['co_maker_note', 'CoMakerEndorserOfNoteIndicator', true],
      ['us_citizen', 'CitizenshipResidencyType', false],
    ];
    let xml = '';
    for (const [key, mismoField, isBool] of mapping) {
      if (decl[key] !== undefined) {
        if (isBool) {
          xml += `\n                        <DECLARATION>
                          <DECLARATION_DETAIL>
                            <${mismoField}>${decl[key] ? 'true' : 'false'}</${mismoField}>
                          </DECLARATION_DETAIL>
                        </DECLARATION>`;
        }
      }
    }
    return xml;
  };

  // Build assets
  const buildAssets = () => {
    let xml = '';
    if (app.checking_balance != null) {
      xml += `
          <ASSET>
            <ASSET_DETAIL>
              <AssetAccountIdentifier>Checking</AssetAccountIdentifier>
              <AssetType>CheckingAccount</AssetType>
              ${amount('AssetCashOrMarketValueAmount', app.checking_balance)}
            </ASSET_DETAIL>
          </ASSET>`;
    }
    if (app.savings_balance != null) {
      xml += `
          <ASSET>
            <ASSET_DETAIL>
              <AssetAccountIdentifier>Savings</AssetAccountIdentifier>
              <AssetType>SavingsAccount</AssetType>
              ${amount('AssetCashOrMarketValueAmount', app.savings_balance)}
            </ASSET_DETAIL>
          </ASSET>`;
    }
    return xml ? `
        <ASSETS>${xml}
        </ASSETS>` : '';
  };

  // Build liabilities
  const buildLiabilities = () => {
    const debts = [
      ['AutoLoan', app.monthly_car_payment],
      ['StudentLoan', app.monthly_student_payment],
      ['RevolvingAccount', app.monthly_cc_payment],
      ['Other', app.monthly_other_debt],
    ];
    let xml = '';
    for (const [type, payment] of debts) {
      if (payment != null && Number(payment) > 0) {
        xml += `
            <LIABILITY>
              <LIABILITY_DETAIL>
                <LiabilityType>${type}</LiabilityType>
                ${amount('LiabilityMonthlyPaymentAmount', payment)}
              </LIABILITY_DETAIL>
            </LIABILITY>`;
      }
    }
    return xml ? `
        <LIABILITIES>${xml}
        </LIABILITIES>` : '';
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:ULAD="http://www.datamodelextension.org/Schema/ULAD"
         xsi:schemaLocation="http://www.mismo.org/residential/2009/schemas MISMO_3.4.0_B341.xsd">
  <ABOUT_VERSIONS>
    <ABOUT_VERSION>
      <CreatedDatetime>${new Date().toISOString()}</CreatedDatetime>
      <DataVersionIdentifier>201703</DataVersionIdentifier>
    </ABOUT_VERSION>
  </ABOUT_VERSIONS>
  <DEAL_SETS>
    <DEAL_SET>
      <DEALS>
        <DEAL>
          <ABOUT_VERSIONS>
            <ABOUT_VERSION>
              <DataVersionIdentifier>201703</DataVersionIdentifier>
            </ABOUT_VERSION>
          </ABOUT_VERSIONS>${buildAssets()}
          <COLLATERALS>
            <COLLATERAL>
              <SUBJECT_PROPERTY>
                <ADDRESS>
                  ${tag('AddressLineText', app.property_address)}
                  ${tag('CityName', app.property_city)}
                  ${tag('StateCode', app.property_state)}
                  ${tag('PostalCode', app.property_zip)}
                  ${tag('CountryCode', 'US')}
                </ADDRESS>
                <PROPERTY_DETAIL>
                  ${amount('PropertyEstimatedValueAmount', app.estimated_value)}
                  ${tag('PropertyUsageType', mapPropertyUsage(app.intended_use))}
                  ${tag('FinancedUnitCount', '1')}
                  ${mapPropertyType(app.property_type) ? tag('PropertyType', mapPropertyType(app.property_type)) : ''}
                </PROPERTY_DETAIL>
              </SUBJECT_PROPERTY>
            </COLLATERAL>
          </COLLATERALS>${buildLiabilities()}
          <LOANS>
            <LOAN>
              <LOAN_DETAIL>
                ${tag('LoanPurposeType', mapLoanPurpose(app.loan_purpose))}
              </LOAN_DETAIL>
              <TERMS_OF_LOAN>
                ${tag('LoanPurposeType', mapLoanPurpose(app.loan_purpose))}
              </TERMS_OF_LOAN>
            </LOAN>
          </LOANS>
          <PARTIES>
            <PARTY>
              <INDIVIDUAL>
                <CONTACT_POINTS>
                  ${app.email ? `<CONTACT_POINT>
                    <CONTACT_POINT_EMAIL>
                      ${tag('ContactPointEmailValue', app.email)}
                    </CONTACT_POINT_EMAIL>
                  </CONTACT_POINT>` : ''}
                  ${app.phone ? `<CONTACT_POINT>
                    <CONTACT_POINT_TELEPHONE>
                      ${tag('ContactPointTelephoneValue', app.phone)}
                    </CONTACT_POINT_TELEPHONE>
                  </CONTACT_POINT>` : ''}
                </CONTACT_POINTS>
                <NAME>
                  ${tag('FirstName', app.first_name)}
                  ${tag('LastName', app.last_name)}
                </NAME>
              </INDIVIDUAL>
              <ROLES>
                <ROLE>
                  <BORROWER>
                    ${app.dob ? tag('BirthDate', app.dob) : ''}
                    ${app.dependents != null ? `<DEPENDENTS>
                      ${tag('DependentCount', app.dependents)}
                    </DEPENDENTS>` : ''}${buildDeclarations(app.declarations)}
                    <EMPLOYERS>
                      ${app.employer ? `<EMPLOYER>
                        <EMPLOYER_DETAIL>
                          ${tag('EmployerName', app.employer)}
                          ${tag('EmploymentPositionDescription', app.job_title)}
                          ${tag('EmploymentTimeInLineOfWorkYearsCount', app.years_employed)}
                          ${app.employer_phone ? tag('EmployerTelephoneNumber', app.employer_phone) : ''}
                        </EMPLOYER_DETAIL>
                        <EMPLOYMENT>
                          ${amount('EmploymentMonthlyIncomeAmount', app.monthly_income)}
                          ${tag('EmploymentStatusType', 'Current')}
                          ${tag('EmploymentClassificationType', 'Primary')}
                        </EMPLOYMENT>
                      </EMPLOYER>` : ''}
                      ${app.previous_employer ? `<EMPLOYER>
                        <EMPLOYER_DETAIL>
                          ${tag('EmployerName', app.previous_employer)}
                        </EMPLOYER_DETAIL>
                        <EMPLOYMENT>
                          ${tag('EmploymentStatusType', 'Previous')}
                        </EMPLOYMENT>
                      </EMPLOYER>` : ''}
                    </EMPLOYERS>
                    ${tag('MaritalStatusType', mapMaritalStatus(app.marital_status))}
                    <RESIDENCES>
                      ${app.current_address ? `<RESIDENCE>
                        <ADDRESS>
                          ${tag('AddressLineText', app.current_address)}
                          ${tag('CityName', app.current_city)}
                          ${tag('StateCode', app.current_state)}
                          ${tag('PostalCode', app.current_zip)}
                          ${tag('CountryCode', 'US')}
                        </ADDRESS>
                        <RESIDENCE_DETAIL>
                          ${tag('BorrowerResidencyBasisType', mapResidencyBasis(app.housing_status))}
                          ${tag('BorrowerResidencyDurationYearsCount', app.years_at_address)}
                          ${tag('BorrowerResidencyType', 'Current')}
                        </RESIDENCE_DETAIL>
                      </RESIDENCE>` : ''}
                      ${app.previous_address ? `<RESIDENCE>
                        <ADDRESS>
                          ${tag('AddressLineText', app.previous_address)}
                        </ADDRESS>
                        <RESIDENCE_DETAIL>
                          ${tag('BorrowerResidencyType', 'Prior')}
                        </RESIDENCE_DETAIL>
                      </RESIDENCE>` : ''}
                    </RESIDENCES>
                    ${app.ssn_last4 ? `<TAXPAYER_IDENTIFIERS>
                      <TAXPAYER_IDENTIFIER>
                        ${tag('TaxpayerIdentifierValue', 'XXX-XX-' + esc(app.ssn_last4))}
                        ${tag('TaxpayerIdentifierType', 'SocialSecurityNumber')}
                      </TAXPAYER_IDENTIFIER>
                    </TAXPAYER_IDENTIFIERS>` : ''}
                  </BORROWER>
                  <ROLE_DETAIL>
                    ${tag('PartyRoleType', 'Borrower')}
                  </ROLE_DETAIL>
                </ROLE>
              </ROLES>
            </PARTY>
          </PARTIES>
        </DEAL>
      </DEALS>
    </DEAL_SET>
  </DEAL_SETS>
</MESSAGE>`;

  return xml;
}

// Node.js / CommonJS export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateMISMO34XML };
}

// Browser: attach to window
if (typeof window !== 'undefined') {
  window.generateMISMO34XML = generateMISMO34XML;
}
