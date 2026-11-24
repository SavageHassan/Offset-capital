/**
 * Financing capabilities.
 *
 * Senior Bridge Loans and Subordinate Financing parameters are transcribed
 * verbatim from offsetcap.com/investments.
 *
 * Construction Lending is transcribed from the company's own announcement,
 * "Offset Capital - Now Offering Construction Loans" (29 September 2026),
 * which states the platform has expanded to include construction loans. Its
 * four published criteria are reproduced exactly; the fields Offset has not
 * published for this product are omitted rather than assumed.
 */

export type Param = { label: string; value: string };

export type Strategy = {
  slug: string;
  number: string;
  name: string;
  /** Position in the capital stack, for the stack diagram. */
  stackLabel: string;
  summary: string;
  /** Heading used over the parameter list on the live site. */
  paramsTitle: string;
  params: Param[];
  /** Source of the figures, shown in the UI for traceability. */
  source: string;
  image: string;
};

export const strategies: Strategy[] = [
  {
    slug: 'senior-bridge-loans',
    number: '01',
    name: 'Senior Bridge Loans',
    stackLabel: 'Senior secured — first mortgage',
    summary:
      'Offset Capital originates bridge loans for multiple property types across the U.S. We focus on collaborating with middle-market investors and real estate owners to support their business plans with our flexible loan structures.',
    paramsTitle: 'Loan Parameters',
    source: 'offsetcap.com/investments',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1770106693/Floating-Rate_Loan_in_McLean_VA_qucisb.jpg',
    params: [
      { label: 'Position', value: 'First mortgage, senior secured' },
      { label: 'Loan Size', value: '$10MM–$50MM' },
      { label: 'Term', value: 'Six months to three years, fully extended' },
      { label: 'Leverage', value: 'Up to 75% LTV' },
      { label: 'Pricing', value: 'Starting at SOFR + 375 bps' },
      { label: 'Fees', value: '1.0%+ origination fee | 1.0% + exit fee' },
      { label: 'Prepayment', value: 'Flexible' },
      { label: 'Minimum Cashflow', value: 'None' },
      { label: 'Recourse', value: 'Typically non-recourse with standard carveouts' },
      {
        label: 'Property Types',
        value: 'Multifamily, hospitality, office, retail, industrial, and self-storage. No land.',
      },
      { label: 'Geographic Focus', value: 'Nationwide' },
      {
        label: 'Use of Proceeds',
        value:
          'Acquisition, refinance, partner buyout, lease-up, capex, light value-add or repositioning. No pre-development or ground-up construction.',
      },
    ],
  },
  {
    slug: 'subordinate-financing',
    number: '02',
    name: 'Subordinate Financing',
    stackLabel: 'Preferred equity & mezzanine debt',
    summary:
      'Offset Capital provides direct investments in real estate through preferred equity and mezzanine debt for a range of property types nationwide. We will often layer these structures behind our senior bridge loans to help complete the capital stack.',
    paramsTitle: 'Investment Parameters',
    source: 'offsetcap.com/investments',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1721043839/Broome_Hotel_g6l0al.jpg',
    params: [
      { label: 'Loan Size', value: '$2MM–$10MM' },
      { label: 'Term', value: 'Six months to three years' },
      { label: 'Leverage', value: 'Up to 85% LTV' },
      { label: 'Pricing', value: 'Starting at SOFR + 800 bps' },
      { label: 'Fees', value: '1.0%+ origination fee | 1.0%+ exit fee' },
      { label: 'Prepayment', value: 'Flexible' },
      { label: 'Minimum Cashflow', value: 'None' },
      { label: 'Recourse', value: 'Typically non-recourse with standard carveouts' },
      {
        label: 'Property Types',
        value: 'Multifamily, hospitality, office, retail, industrial, and self-storage. No land.',
      },
      { label: 'Geographic Focus', value: 'Nationwide' },
      {
        label: 'Use of Proceeds',
        value:
          'Acquisition, refinance, partner buyout, lease-up, capex, light value-add or repositioning. No pre-development or ground-up construction.',
      },
    ],
  },
  {
    slug: 'construction-lending',
    number: '03',
    name: 'Construction Lending',
    stackLabel: 'Ground-up construction',
    summary:
      'Offset Capital has expanded its lending capabilities and is now offering construction loans in addition to bridge loans. Our construction loans support multifamily and industrial developments from the ground up, with financing structured around the project and its goals.',
    paramsTitle: 'Construction Lending Criteria',
    source: 'Company announcement, 29 September 2026',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1790668302/construction_loans_ofrrcb.jpg',
    params: [
      { label: 'Asset Classes', value: 'Multifamily & Industrial' },
      { label: 'Loan Sizes', value: '$15MM–$50MM' },
      { label: 'Max Leverage', value: '70% LTC' },
      { label: 'Pricing', value: 'Starting at SOFR + 400' },
    ],
  },
];

/**
 * Capital stack diagram. Offset's own positions are the three financing
 * products above; sponsor equity sits beneath them and is shown for context
 * because the company describes "completing the capital stack".
 */
export const capitalStack = [
  {
    tier: 'Senior debt',
    name: 'Senior Bridge Loan',
    detail: 'First mortgage, senior secured · $10MM–$50MM · up to 75% LTV',
    offset: true,
    strategy: 'senior-bridge-loans',
  },
  {
    tier: 'Subordinate debt',
    name: 'Mezzanine Loan',
    detail: '$2MM–$10MM · up to 85% LTV · typically layered behind our senior loan',
    offset: true,
    strategy: 'subordinate-financing',
  },
  {
    tier: 'Hybrid',
    name: 'Preferred Equity',
    detail: 'Direct investment · structured to help complete the capital stack',
    offset: true,
    strategy: 'subordinate-financing',
  },
  {
    tier: 'Common',
    name: 'Sponsor Equity',
    detail: 'The borrower’s own capital, which our structures are built around',
    offset: false,
    strategy: null,
  },
] as const;

/** Property types Offset lends against, per both parameter sheets. */
export const propertyTypes = [
  'Multifamily',
  'Hospitality',
  'Office',
  'Retail',
  'Industrial',
  'Self-storage',
] as const;

/** Uses of proceeds, per both parameter sheets. */
export const usesOfProceeds = [
  'Acquisition',
  'Refinance',
  'Partner buyout',
  'Lease-up',
  'Capex',
  'Light value-add or repositioning',
] as const;
