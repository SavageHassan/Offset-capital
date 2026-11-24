/**
 * Offset Capital — company facts.
 *
 * Every string in this file is taken from the live site at offsetcap.com
 * (audited 24 Nov 2026). Wording has been tightened for the new layouts in
 * places, but no fact, figure, service or claim has been added.
 */

export const site = {
  name: 'Offset Capital',
  legalName: 'Offset Capital, LLC',
  tagline: 'Precision-Tailored Debt and Equity for the Middle Market',
  // Footer line on the existing site — the meaning of the company's name.
  motto: 'Neutralize, counteract, counterbalance',
  email: 'info@offsetcap.com',
  phone: '(516) 202-4001',
  phoneHref: 'tel:+15162024001',
  linkedin: 'https://www.linkedin.com/company/offset-capital/about/',
  source: 'https://www.offsetcap.com/',

  /** Hero statement — existing homepage headline and sub-head. */
  hero: {
    headline: ['Precision-tailored', 'debt and equity for', 'the middle market'],
    sub:
      'Our customized debt and equity solutions enable entrepreneurial real estate investors to counteract shifting market tides and focus on what matters most — execution.',
  },

  /** Existing homepage "Offset Capital" positioning paragraph. */
  positioning:
    'As a nationwide direct lender focused on the middle market, Offset Capital provides commercial real estate Owners and Developers with customized financing solutions, including preferred equity investments, mezzanine loans, and senior bridge loans. By blending and structuring these financial tools, we help clients navigate market turbulence and stay on track with their business plans, rather than being sidelined.',

  /** Existing /company page lead paragraph. */
  company:
    'Offset Capital’s small-balance debt and equity solutions are tailor-made for real estate entrepreneurs in the middle market. As your financing partner, we know that speed, flexibility, and certainty of execution are essential for the success of our partnership. The Offset team collaborates with real estate owners to develop full capital stack solutions, including senior bridge loans, mezzanine loans, and preferred equity.',

  /** Existing /investments page lead paragraph. */
  strategies:
    'At Offset Capital, our expertise in customizing financing solutions for the middle market is grounded in decades of market knowledge and strong industry relationships, which enables us to be fast and flexible when analyzing, underwriting, and structuring our investments. We collaborate with real estate owners and investors, providing them with full capital stack solutions, including senior bridge loans, preferred equity, and mezzanine loans, tailored for each unique situation.',

  /** Short descriptor used in the company's own press releases. */
  boilerplate:
    'Offset Capital is a commercial real estate bridge lender specializing in flexible financing solutions for middle-market real estate entrepreneurs. The company offers a range of full capital stack solutions including senior bridge loans, mezzanine financing, and preferred equity investments. With a focus on speed, certainty of execution, and customization, Offset Capital is uniquely positioned to help borrowers navigate the financial challenges of today’s real estate market.',

  /** Broker partners section, /investments. */
  brokers:
    'Brokers and other referral sources are an essential part of our business. We respect these relationships that we spend our careers building. We pay commissions at closing. Simple.',
} as const;

export const nav = [
  { label: 'Company', href: '/company' },
  { label: 'Strategies', href: '/strategies' },
  { label: 'News & Transactions', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * The three pillars the existing site repeats in nearly every release:
 * speed, certainty of execution, customization.
 */
export const pillars = [
  {
    index: '01',
    title: 'Speed',
    body:
      'Decades of market knowledge and strong industry relationships let us analyze, underwrite and structure quickly — so a financing timeline does not become the reason a deal slips.',
  },
  {
    index: '02',
    title: 'Certainty of execution',
    body:
      'A capital partner who shares our investment approach, bolstered with a robust balance sheet, helps ensure speed and certainty of execution — critical in the current environment.',
  },
  {
    index: '03',
    title: 'Customization',
    body:
      'We blend and structure senior bridge loans, mezzanine debt and preferred equity around a borrower’s actual business plan, rather than fitting the plan to a product.',
  },
] as const;

/** Imagery — genuine assets served from Offset Capital's own Cloudinary account. */
export const media = {
  heroCity:
    'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1707412433/colton-duke-UExx0KnnkjY-unsplash_oae9eo.jpg',
  homeSecondary:
    'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1707461658/Screenshot_2024-02-08_at_8.19.09_PM_jqdxhx.jpg',
  companyHero:
    'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1706775795/final%20visuals/matteo-vistocco-Dph00R2SwFo-unsplash_1_auu6go.jpg',
  newsHero:
    'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1706775781/final%20visuals/andrew-nussbaum-jDhZSL2Y4nY-unsplash_n4wbxm.jpg',
  building:
    'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1720194421/building_1_vioeo4.jpg',
} as const;
