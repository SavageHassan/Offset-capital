/**
 * News & Transactions.
 *
 * All nineteen posts published at offsetcap.com/posts, audited 24 Nov 2026.
 * Headlines, dates, categories, body copy, figures, property details and
 * quotations are reproduced as published. Deal metadata (`deal`) is extracted
 * from the body of each release — it is not estimated or supplemented.
 */

export type Block =
  | { t: 'p'; c: string }
  | { t: 'h2'; c: string }
  | { t: 'ul'; items: string[] }
  | { t: 'dl'; items: { label: string; value: string }[] }
  | { t: 'quote'; c: string; by: string };

export type Category = 'Press' | 'Credit Corner' | 'Events';

export type Deal = {
  amount: string;
  /** Sort key in millions, for ordering the transaction showcase. */
  value: number;
  assetType: string;
  location: string;
  /** `loan` for a financing Offset originated, `advisory` for a disposition. */
  kind: 'loan' | 'equity' | 'advisory';
  detail: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  category: Category | null;
  image: string;
  /** One-line standfirst for cards and the article page. */
  excerpt: string;
  deal?: Deal;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: 'offset-capital-announces-28mm-retail-loan',
    title: 'Offset Capital Announces $28MM Retail Loan',
    date: '2026-10-27',
    dateLabel: 'October 27, 2026',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1793116831/Offset_Capital_Announces_28MM_Retail_Loan_kezxdu.jpg',
    excerpt:
      'A $28MM floating-rate loan secured by a 75,000-square-foot grocery-anchored retail property in Colorado Springs, Colorado.',
    deal: {
      amount: '$28MM',
      value: 28,
      assetType: 'Retail',
      location: 'Colorado Springs, CO',
      kind: 'loan',
      detail: '75,000 sf grocery-anchored retail',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of a $28MM floating-rate loan secured by a 75,000-square-foot grocery-anchored retail property located in Colorado Springs, Colorado.',
      },
      {
        t: 'p',
        c:
          "Loan proceeds were used to refinance the existing construction debt and fund a tenant improvement and leasing commission (TI/LC) reserve to support the lease-up of the property's remaining vacant space.",
      },
      { t: 'h2', c: 'What could we do for your property?' },
      {
        t: 'p',
        c:
          'At Offset Capital, we understand the importance of creative financial solutions that preserve value for all stakeholders.',
      },
      {
        t: 'p',
        c:
          'Reach out to us directly to discuss your deal at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'credit-corner-whats-driving-deals-today',
    title: 'Credit Corner: What’s Driving Deals Today?',
    date: '2026-10-07',
    dateLabel: 'October 7, 2026',
    category: 'Credit Corner',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1791364591/credit_corner_ivcgaj.jpg',
    excerpt:
      'The first edition of the Offset Credit Corner: how the recent move in Treasury rates could reshape credit spreads, cap rates, property values and financing proceeds.',
    body: [
      { t: 'p', c: 'Welcome to the first edition of the Offset Credit Corner.' },
      {
        t: 'p',
        c:
          'Through our capital partner relationships, we have a window into how leading credit investors think about deals, underwrite risk, and read the broader economy to make investment decisions.',
      },
      {
        t: 'p',
        c:
          'We see shifts in what lenders are becoming more comfortable with, where they’re pulling back, and how those changes are influencing underwriting, often before they show up in broader market data.',
      },
      {
        t: 'p',
        c:
          'This time, we’re looking at how the recent move in Treasury rates could reshape credit spreads, cap rates, property values, and financing proceeds — and where flexibility around existing debt can still create a path to getting deals done.',
      },
      { t: 'h2', c: 'The Base Rate Moved, and Credit Spreads Appear Poised to Follow' },
      {
        t: 'p',
        c:
          'The 10-year Treasury has moved sharply higher over the past couple of weeks, rising from just under 5.00% in mid-September to above 5.25% at the end of the month, marking the highest level in over two decades. For borrowers, it’s a reminder that credit spreads, which in recent years have been the primary focus, are only half of the interest-rate equation.',
      },
      {
        t: 'p',
        c:
          'While benchmark CRE spreads have remained mostly unchanged thus far, we are starting to hear anecdotally of lenders and back-leverage providers gapping out pricing as higher rates begin to impact funding costs and risk appetites.',
      },
      {
        t: 'p',
        c:
          'This rise in rates is beginning to impact debt service coverage, particularly when modeling permanent takeout scenarios for bridge loans. As a result, some deals that a month ago were LTV or debt yield constrained are now DSCR constrained. That shift is making the exit increasingly important to how we size loans today. At the same time, we believe the move in rates may be just the beginning of a broader reset in valuations.',
      },
      { t: 'h2', c: 'The Impact on Valuation' },
      {
        t: 'p',
        c:
          'Historically, cap rates have tended to move in the same direction as the 10-year Treasury, although not one-for-one. Since 1995, a 100-basis-point move in the 10-year has corresponded with roughly 40 to 80 basis points of cap-rate movement, depending on property type.',
      },
      {
        t: 'p',
        c:
          "That means a sustained move higher in Treasuries can put upward pressure on cap rates — and downward pressure on values — even if the adjustment doesn't happen immediately.",
      },
      {
        t: 'p',
        c:
          'With the 10-year Treasury now around 5.36%, cap rates below that level imply a negative going-in spread to the risk-free rate. Investors may still accept that for assets with strong growth prospects, tax advantages, or other compelling attributes, but the hurdle for justifying that pricing has moved considerably higher.',
      },
      { t: 'h2', c: 'Identify What Value Is Driving the Deal' },
      {
        t: 'p',
        c:
          'NCREIF data over the past year shows transaction cap rates on properties that have actually sold generally running around 100 basis points higher than appraisal cap rates.',
      },
      {
        t: 'p',
        c:
          "With fewer trades closing, there are fewer recent comps to work with. That's creating a wider gap between what an owner believes a property is worth, where it appraises, and what a buyer would actually pay for it today. The recent move in interest rates could put further pressure on that disconnect before appraisals fully catch up.",
      },
      {
        t: 'p',
        c:
          "We're seeing that gap show up directly in financing conversations. An owner may still be working from the appraised value, while buyers and lenders are underwriting to what the market would actually support today.",
      },
      {
        t: 'p',
        c:
          "Before sizing the financing, we're pressure-testing all three: the owner's expectation, the appraisal, and where the asset could actually trade today. That gives everyone a more realistic starting point for proceeds.",
      },
      { t: 'h2', c: "It's All About the Exit" },
      {
        t: 'p',
        c:
          "LTV is usually one of the first things brokers ask about, but it's only part of how we're sizing a loan.",
      },
      {
        t: 'p',
        c:
          'In recent years debt yield was often the limiting factor. With rates moving higher, DSCR is increasingly becoming the guiding constraint — particularly when we look ahead to the permanent takeout.',
      },
      {
        t: 'p',
        c:
          "We're underwriting loans that we expect to be refinanced in two or three years, often by an agency or another permanent lender. So we're looking at what that takeout is likely to support, not just what the property can carry today.",
      },
      {
        t: 'p',
        c:
          'A deal can work on leverage and debt yield and still fall short once we underwrite DSCR at exit. Looking at all three from the start gives us a much better indication of where proceeds are actually likely to land.',
      },
      { t: 'h2', c: "A Shortfall Doesn't Necessarily Mean There Isn't a Deal" },
      {
        t: 'p',
        c:
          'Both borrowers and lenders are adjusting to the realities of today’s market. When a property doesn’t support enough new debt to pay off the existing loan in full, that doesn’t necessarily mean the conversation ends there.',
      },
      {
        t: 'p',
        c:
          'Existing lenders are putting more pressure on borrowers to pay off loans, while also showing a willingness to consider discounted payoffs. At the same time, borrowers are increasingly prepared to bring additional equity to the table to get a deal done.',
      },
      {
        t: 'p',
        c:
          "By the time these deals reach us, the borrower has often already had that conversation with the existing lender and has a clear picture of the gap. That gives us something concrete to work with and can open up structures that wouldn't be available in a straightforward refinance.",
      },
      {
        t: 'p',
        c:
          "A gap between loan balance and value isn't automatically a dead deal. What matters is whether the borrower and existing lender have enough flexibility to bridge the gap and make the new financing work.",
      },
      {
        t: 'p',
        c:
          "If you're working through one of these situations, send it our way. We're always happy to take a look at the deal, talk through where we think proceeds can land, and see whether there's a structure that works. Reach out to info@offsetcap.com to talk about your deal.",
      },
      { t: 'h2', c: 'About Offset Capital' },
      {
        t: 'p',
        c:
          'Offset Capital is a private credit lender providing $10MM–$50MM senior secured financing across the middle market, with a focus on downside protection and certainty of execution.',
      },
    ],
  },
  {
    slug: 'offset-capital-now-offering-construction-loans',
    title: 'Offset Capital — Now Offering Construction Loans',
    date: '2026-09-29',
    dateLabel: 'September 29, 2026',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1790668302/construction_loans_ofrrcb.jpg',
    excerpt:
      'The lending platform has expanded: construction loans supporting multifamily and industrial developments from the ground up.',
    body: [
      {
        t: 'p',
        c:
          'Offset Capital has expanded its lending capabilities and is now offering construction loans in addition to bridge loans.',
      },
      {
        t: 'p',
        c:
          'Our construction loans support multifamily and industrial developments from the ground up, with financing structured around the project and its goals.',
      },
      { t: 'h2', c: 'Construction Lending Criteria' },
      {
        t: 'dl',
        items: [
          { label: 'Asset Classes', value: 'Multifamily & Industrial' },
          { label: 'Loan Sizes', value: '$15MM–$50MM' },
          { label: 'Max Leverage', value: '70% LTC' },
          { label: 'Pricing', value: 'Starting at SOFR + 400' },
        ],
      },
      {
        t: 'p',
        c:
          'Having the right financing structure in place can make all the difference in moving a project from plans to completion. At Offset Capital, we take the time to understand the deal and the goals behind it.',
      },
      {
        t: 'p',
        c:
          'Need construction financing? Get in touch with the Offset Capital team at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'offset-capital-announces-13mm-industrial-loan',
    title: 'Offset Capital Announces $13MM Industrial Loan',
    date: '2026-07-21',
    dateLabel: 'July 21, 2026',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1784641545/Offset_Capital_-_Blog_Post_tjrgwo.jpg',
    excerpt:
      'A $13MM floating-rate loan secured by a 110,000-square-foot Class A industrial property in Temecula, California.',
    deal: {
      amount: '$13MM',
      value: 13,
      assetType: 'Industrial',
      location: 'Temecula, CA',
      kind: 'loan',
      detail: '110,000 sf Class A industrial',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of a $13MM floating-rate loan secured by a 110,000-square-foot Class A industrial property located in Temecula, California.',
      },
      {
        t: 'p',
        c:
          'Loan proceeds were used to refinance the existing debt and fund a tenant improvement and leasing commission (TI/LC) reserve to support upcoming lease rollover.',
      },
      {
        t: 'p',
        c:
          "Offset Capital specializes in structuring creative financing solutions that preserve value and help navigate complex commercial real estate transactions. Whether refinancing, acquisition, construction, or recapitalization, the team delivers tailored capital solutions designed to meet each project's unique needs.",
      },
      {
        t: 'p',
        c:
          'For more information on the transaction, please contact Offset Capital at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'lets-connect-at-icsc-las-vegas',
    title: 'Let’s Connect at ICSC Las Vegas',
    date: '2026-05-13',
    dateLabel: 'May 13, 2026',
    category: 'Events',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1778664101/Let_s_Connect_at_ICSC_Las_Vegas_n5vfz1.jpg',
    excerpt:
      'The Offset Capital team will be in Las Vegas, May 17–20, during ICSC Las Vegas 2026.',
    body: [
      {
        t: 'p',
        c:
          'The Offset Capital team will be in Las Vegas, May 17–20, during ICSC Las Vegas 2026 to discuss financing solutions for deals that need speed, flexibility, and creative structuring.',
      },
      {
        t: 'p',
        c:
          'If you’re working through a complex situation or a deal facing timing pressure, we’d be glad to connect while we’re in town.',
      },
      {
        t: 'p',
        c:
          'Our Principals, Renee Volaric and Kamau Coleman, will be available for meetings. If you’ll be there, let’s set up a time to connect.',
      },
      { t: 'h2', c: 'What the Offset Team Brings' },
      {
        t: 'ul',
        items: [
          'Loan Size: $10MM–$50MM+',
          'Senior debt and bridge financing',
          'Flexible structures for time-sensitive transactions',
          'Fast-moving execution',
          'Nationwide coverage',
          'Solutions across traditional and specialty asset classes',
        ],
      },
      { t: 'h2', c: 'Recently Closed Deals' },
      {
        t: 'ul',
        items: [
          '$8.75MM | Hospitality | Albany, GA',
          '$25.35MM | Condo Inventory | McLean, VA',
          '$29.8MM | Student Housing | Columbia, SC',
        ],
      },
      { t: 'p', c: 'We look forward to discussing your next deal.' },
    ],
  },
  {
    slug: 'offset-capital-featured-on-on-the-edge-podcast',
    title: 'Offset Capital Featured on “On The Edge Podcast”',
    date: '2026-02-11',
    dateLabel: 'February 11, 2026',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1770816067/On_The_Edge_Podcast_Offset_coatpr.png',
    excerpt:
      'Kamau Coleman joins Malcolm Davies of WAY Capital for a discussion on the mechanics of debt investing and the current commercial real estate landscape.',
    body: [
      {
        t: 'p',
        c:
          'Offset Capital recently joined the On The Edge podcast for a discussion on the mechanics of debt investing and the current commercial real estate landscape.',
      },
      {
        t: 'p',
        c:
          'Kamau Coleman, Principal Partner at Offset Capital, spoke with Malcolm Davies, Founder of WAY Capital, sharing insights drawn from over two decades of commercial real estate experience. The conversation explores debt as a strategic investment tool, the realities of capital formation, and the role of long-term partnerships in driving durable deal flow.',
      },
      {
        t: 'p',
        c:
          'Key topics discussed include why investors allocate to debt, Offset Capital’s market outlook and strategy, the challenges of raising capital, and the importance of building lasting relationships in today’s capital markets environment.',
      },
      {
        t: 'p',
        c:
          'Offset Capital continues to provide structured capital solutions across the full capital stack, with a focus on speed, certainty of execution, and customization for complex transactions.',
      },
      {
        t: 'p',
        c:
          'The full episode is available on YouTube, Spotify and Apple Podcasts.',
      },
      {
        t: 'p',
        c:
          'For more information about Offset Capital’s lending platform, please contact info@offsetcap.com or explore our financing capabilities.',
      },
    ],
  },
  {
    slug: 'offset-capital-announces-8-75mm-floating-rate-loan-in-albany-ga',
    title: 'Offset Capital Announces $8.75MM Floating-Rate Loan in Albany, GA',
    date: '2026-02-04',
    dateLabel: 'February 4, 2026',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1770213270/Floating-Rate_Loan_in_Albany_GA_fh2sju.jpg',
    excerpt:
      'An $8.75MM floating-rate loan secured by an 84-key hotel in Albany, GA, used to acquire the property and complete a change of ownership PIP.',
    deal: {
      amount: '$8.75MM',
      value: 8.75,
      assetType: 'Hospitality',
      location: 'Albany, GA',
      kind: 'loan',
      detail: '84-key hotel',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of an $8.75MM floating-rate loan secured by an 84-key hotel located in Albany, GA.',
      },
      {
        t: 'p',
        c: 'Loan proceeds were used to acquire the property and complete a change of ownership PIP.',
      },
      {
        t: 'p',
        c:
          'Working alongside real estate owners and investors, Offset Capital structures full capital stack solutions, including senior bridge loans, preferred equity, and mezzanine financing, customized to meet the specific needs of each deal.',
      },
      {
        t: 'p',
        c:
          'To discuss your next deal, reach out to Offset Capital at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'offset-capital-announces-25-35mm-floating-rate-loan-in-mclean-va',
    title: 'Offset Capital Announces $25.35MM Floating-Rate Loan in McLean, VA',
    date: '2026-02-03',
    dateLabel: 'February 3, 2026',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1770106693/Floating-Rate_Loan_in_McLean_VA_qucisb.jpg',
    excerpt:
      'A $25.35MM floating-rate loan secured by 23 condominium units within a recently delivered 44-unit building in McLean, VA.',
    deal: {
      amount: '$25.35MM',
      value: 25.35,
      assetType: 'Condo inventory',
      location: 'McLean, VA',
      kind: 'loan',
      detail: '23 units within a 44-unit building',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of a $25.35MM floating-rate loan secured by 23 condominium units within a recently delivered 44-unit building located in McLean, VA.',
      },
      {
        t: 'p',
        c:
          'The loan was structured at 82% as-is LTV and 75% of net sellout value. Loan proceeds were used to refinance existing senior and mezzanine construction debt and provide additional time for the remaining units to sell.',
      },
      {
        t: 'p',
        c:
          'The commercial real estate lender offers a range of full capital stack solutions, including senior bridge loans, mezzanine financing, and preferred equity investments. With a focus on speed, certainty of execution, and customization, Offset Capital is uniquely positioned to help borrowers navigate complex financing situations across asset classes.',
      },
      {
        t: 'p',
        c:
          'For more information on the transaction, please contact Offset Capital at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'offset-capital-announces-29-8mm-floatingrate-loan-in-columbia-sc',
    title: 'Offset Capital Announces $29.8MM Floating-Rate Loan in Columbia, SC',
    date: '2026-01-05',
    dateLabel: 'January 5, 2026',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1767599079/The_Roost_Deal_Announcement_1_rfyhrq.jpg',
    excerpt:
      'A $29.8MM floating-rate loan secured by a 1,002-bed student housing property in Columbia, SC.',
    deal: {
      amount: '$29.8MM',
      value: 29.8,
      assetType: 'Student housing',
      location: 'Columbia, SC',
      kind: 'loan',
      detail: '1,002-bed student housing',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of a $29.8MM floating-rate loan secured by a 1,002-bed student housing property located in Columbia, SC.',
      },
      {
        t: 'p',
        c:
          'Loan proceeds were used to refinance a defaulted loan and provide additional time for the property to prelease for the 2026-2027 school year.',
      },
      {
        t: 'p',
        c:
          'The commercial real estate lender offers a range of full capital stack solutions, including senior bridge loans, mezzanine financing, and preferred equity investments. With a focus on speed, certainty of execution, and customization, Offset Capital is uniquely positioned to help borrowers navigate the financial challenges of today’s real estate market.',
      },
      {
        t: 'p',
        c:
          'For more information on the transaction, please contact Offset Capital at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'offset-capital-announces-20-5mm-bridge-loan-in-the-inland-empire',
    title: 'Offset Capital Announces $20.5MM Bridge Loan in the Inland Empire',
    date: '2025-12-10',
    dateLabel: 'December 10, 2025',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1765359954/Offset_Capital_Announces_20.5MM_Bridge_Loan_in_the_Inland_Empire_nwoseh.jpg',
    excerpt:
      'A $20.5MM floating-rate loan secured by a 60-unit, townhome-style multifamily property in Ontario, CA.',
    deal: {
      amount: '$20.5MM',
      value: 20.5,
      assetType: 'Multifamily',
      location: 'Ontario, CA',
      kind: 'loan',
      detail: '60-unit townhome-style multifamily',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of a $20.5MM floating-rate loan secured by a 60-unit, townhome-style multifamily property in Ontario, CA.',
      },
      {
        t: 'p',
        c:
          'Proceeds will be used to pay off a defaulted loan, complete deferred maintenance and unit upgrades, construct five additional units, fund reserves, and cover closing costs.',
      },
      {
        t: 'p',
        c:
          'Offset Capital is a commercial real estate lender offering a range of full capital stack solutions, including senior bridge loans, mezzanine financing, and preferred equity investments.',
      },
      {
        t: 'p',
        c:
          'For more information on the transaction, please contact Offset Capital at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: '5-3mm-class-a-multifamily-development-site-in-del-cerro-san-diego',
    title: '$5.3MM Class-A Multifamily Development Site in Del Cerro, San Diego',
    date: '2025-07-25',
    dateLabel: 'July 25, 2025',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1753372243/class-A_multifamily_development_ar1pyl.jpg',
    excerpt:
      'Offset Capital was retained to revalue and sell a fully entitled Class-A multifamily development site in Del Cerro, San Diego.',
    deal: {
      amount: '$5.3MM',
      value: 5.3,
      assetType: 'Development site',
      location: 'San Diego, CA',
      kind: 'advisory',
      detail: 'Fully entitled Class-A multifamily site — sale',
    },
    body: [
      {
        t: 'p',
        c:
          'Offset Capital is pleased to announce the sale of a fully entitled class-A multifamily development site located in Del Cerro, San Diego for $5.3MM. Offset Capital was retained to help the seller navigate the complex challenge of selling a high-profile local project that ran into unfortunate economic headwinds, without appearing distressed and attracting vulture investors.',
      },
      {
        t: 'p',
        c:
          'Offset Capital performed extensive market research, primary rent studies and local expertise to properly revalue the project and then managed the marketing and ultimate disposition of the asset.',
      },
      {
        t: 'p',
        c:
          'At Offset Capital, we work closely with our clients to navigate complex real estate situations to make the most prudent economic decisions, in challenging times.',
      },
      {
        t: 'p',
        c:
          'Need help maximizing asset value in a complex market? Contact Offset Capital at info@offsetcap.com and let’s talk.',
      },
    ],
  },
  {
    slug: 'offset-capital-announces-21-3mm-multifamily-bridge-loan',
    title: 'Offset Capital Announces $21.3MM Multifamily Bridge Loan',
    date: '2025-05-19',
    dateLabel: 'May 19, 2025',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1747664410/Offset_Capital_Announces_21.3MM_Multifamily_Bridge_Loan_vlx7cp.jpg',
    excerpt:
      'A $21.3MM floating-rate loan secured by a 68-unit multifamily property in Chicago, IL, with the prior lender staying in the deal in a preferred equity position.',
    deal: {
      amount: '$21.3MM',
      value: 21.3,
      assetType: 'Multifamily',
      location: 'Chicago, IL',
      kind: 'loan',
      detail: '68-unit multifamily',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of a $21.3MM floating-rate loan secured by a 68-unit multifamily property located in Chicago, IL.',
      },
      {
        t: 'p',
        c:
          'Proceeds will be used to finance a discounted payoff, facilitate a partner buyout, complete ongoing renovations, fund reserves, and cover closing costs. The new capital stack includes the prior lender staying in the deal in a preferred equity position.',
      },
      {
        t: 'quote',
        c:
          'We’re thrilled to have the opportunity to partner with the sponsor and help them achieve success through a creative financing solution. We were able to address a complex ownership situation while preserving value for all stakeholders.',
        by: 'Adam Frank, Principal, Offset Capital',
      },
      {
        t: 'p',
        c:
          'The commercial real estate lender offers a range of full capital stack solutions, including senior bridge loans, mezzanine financing, and preferred equity investments. With a focus on speed, certainty of execution, and customization, Offset Capital is uniquely positioned to help borrowers navigate the financial challenges of today’s real estate market.',
      },
      {
        t: 'p',
        c:
          'For more information on the transaction, please contact Offset Capital at info@offsetcap.com or view Offset Capital’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'meet-with-offset-capital-at-icsc-las-vegas-2025',
    title: 'Meet with Offset Capital at ICSC Las Vegas 2025',
    date: '2025-04-14',
    dateLabel: 'April 14, 2025',
    category: 'Events',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1744601069/Meet_with_Offset_Capital_at_ICSC_Las_Vegas_2025_aw8xyn.jpg',
    excerpt:
      'The Offset Capital team will be at the ICSC Las Vegas conference, May 18–20.',
    body: [
      {
        t: 'p',
        c:
          "Are you attending the ICSC Las Vegas conference May 18-20? The Offset Capital team will be there, and we'd love to connect with you during the event.",
      },
      { t: 'h2', c: 'Why Meet With Us?' },
      {
        t: 'p',
        c:
          'If you have a real estate project that has run out of funding or needs flexible financing solutions to reach the finish line, this is the perfect opportunity to discuss how we can help.',
      },
      {
        t: 'p',
        c:
          "Don't miss this chance to meet face-to-face and explore how Offset Capital can support your project. Whether you're looking for immediate solutions or planning ahead for future developments, we're here to help.",
      },
      { t: 'h2', c: 'How to Connect' },
      {
        t: 'p',
        c:
          "Drop us a note to schedule a time to meet during the conference. We'll make sure to reserve time specifically for you to discuss your project needs in detail.",
      },
      { t: 'h2', c: 'Offset’s 2025 Lending Power for Senior Debt Opportunities' },
      {
        t: 'dl',
        items: [
          { label: 'Loans', value: '$10MM-$50MM+' },
          { label: 'Pricing', value: 'Starting at SOFR + 450' },
          { label: 'Leverage', value: 'Up to 75% LTV' },
          { label: 'Terms', value: '6 months - 3 years' },
          { label: 'Coverage', value: 'Nationwide across all traditional asset classes' },
        ],
      },
    ],
  },
  {
    slug: 'offset-capital-announces-14-2mm-loan-secured-by-chantilly-va-hotel',
    title: 'Offset Capital Announces $14.2MM Loan Secured by Chantilly, VA Hotel',
    date: '2025-03-21',
    dateLabel: 'March 21, 2025',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1742222197/VA_Hotel_c7wqpg.jpg',
    excerpt:
      'A $14.2MM floating-rate loan secured by a 232-key hotel in Chantilly, VA.',
    deal: {
      amount: '$14.2MM',
      value: 14.2,
      assetType: 'Hospitality',
      location: 'Chantilly, VA',
      kind: 'loan',
      detail: '232-key hotel',
    },
    body: [
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital is pleased to announce the closing of a $14.2MM floating-rate loan secured by a 232-key hotel in Chantilly, VA.',
      },
      {
        t: 'p',
        c:
          'Proceeds will be used to retire the existing bridge loan, complete the ongoing PIP, fund reserves and cover closing costs.',
      },
      {
        t: 'quote',
        c:
          "This investment underscores Offset Capital's commitment to providing flexible and innovative hospitality financing solutions.",
        by: 'Adam Frank, Principal, Offset Capital',
      },
      {
        t: 'p',
        c:
          'The commercial real estate lender offers a range of full capital stack solutions including senior bridge loans, mezzanine financing, and preferred equity investments. With a focus on speed, certainty of execution, and customization, Offset Capital is uniquely positioned to help borrowers navigate the financial challenges of today’s real estate market.',
      },
      {
        t: 'p',
        c:
          'For more information on the transaction, please contact Adam Frank at adam@offsetcap.com or view Offset’s lending capabilities.',
      },
    ],
  },
  {
    slug: 'meet-with-offset-capital-at-mba-2025',
    title: 'Meet With Offset Capital at MBA 2025',
    date: '2025-01-24',
    dateLabel: 'January 24, 2025',
    category: 'Events',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1737731120/Meet_With_Offset_Capital_at_MBA_2025_kjzsgs.jpg',
    excerpt:
      'All three Principals will be at MBA’s Commercial/Multifamily Finance Convention and Expo in San Diego, February 9–12.',
    body: [
      {
        t: 'p',
        c:
          "Connect with Offset Capital at MBA's Commercial/Multifamily Finance Convention and Expo 2025 in San Diego, February 9-12. Our Principals Renee Volaric, Kamau Coleman, and Adam Frank look forward to meeting with old friends and colleagues along with new connections to discuss your upcoming projects.",
      },
      { t: 'h2', c: 'Let’s Meet Up in San Diego' },
      {
        t: 'p',
        c:
          'Schedule a private meeting: Contact us to schedule a meeting with us at the event. We look forward to meeting with you.',
      },
      { t: 'h2', c: 'Offset’s 2025 Lending Power for Senior Debt Opportunities' },
      {
        t: 'dl',
        items: [
          { label: 'Loans', value: '$5MM-$50MM+' },
          { label: 'Pricing', value: 'Starting at SOFR + 450' },
          { label: 'Leverage', value: 'Up to 75% LTV' },
          { label: 'Terms', value: '6 months - 3 years' },
          { label: 'Coverage', value: 'Nationwide across all traditional asset classes' },
        ],
      },
      { t: 'h2', c: 'Why Attend CREF25?' },
      {
        t: 'p',
        c:
          "MBA's CREF25 is the industry’s largest event for commercial/multifamily real estate finance professionals. Connect with peers, gain insights from key industry leaders, and navigate changes in the economic and regulatory landscape. This is the must-attend MBA event of the year for networking, learning and business growth.",
      },
    ],
  },
  {
    slug: 'a-large-appetite-for-senior-bridge-loans-offset-capital-spotlighted-in-cma',
    title: '“A Large Appetite for Senior Bridge Loans” — Offset Capital Spotlighted in CMA',
    date: '2024-11-06',
    dateLabel: 'November 6, 2024',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1730913923/A_Large_Appetite_for_Senior_Bridge_Loans-CMA-Offset_csptpv.jpg',
    excerpt:
      'Commercial Mortgage Alert features Offset’s senior debt focus, and a partnership set to provide $150 million in debt funding in 2025.',
    body: [
      {
        t: 'p',
        c:
          'Offset Capital is evolving to meet the needs of the real estate middle market, and we’re getting noticed.',
      },
      {
        t: 'p',
        c:
          'Offset was featured in the November 1 edition of the Commercial Mortgage Alert, “Startup Prioritizes Senior Debt Focus.” The article highlights Offset’s adaptable approach to current market dynamics and an increasing demand for flexible senior financing solutions.',
      },
      {
        t: 'p',
        c:
          'A recent partnership with a leading institutional asset manager has significantly expanded our lending capacity.',
      },
      {
        t: 'p',
        c:
          'Through the joint venture, Offset Capital is set to provide $150 million in debt funding in 2025. We will close the partnership’s first origination later this month, which will finance the acquisition of a limited-service hotel in the Southwest U.S. Other senior bridge loans of $25 million+ are currently working their way through Offset’s pipeline for closes later this year.',
      },
    ],
  },
  {
    slug: 'offset-capital-strengthens-its-position-in-the-middle-market',
    title: 'Offset Capital Strengthens Its Position in The Middle Market',
    date: '2024-07-05',
    dateLabel: 'July 5, 2024',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1720194421/building_1_vioeo4.jpg',
    excerpt:
      'Expanded lending parameters for the senior bridge loan program, following a strategic partnership with an institutional asset manager.',
    body: [
      { t: 'h2', c: 'Offset Capital Announces Expanded Lending Parameters for its Senior Bridge Loan Program' },
      { t: 'p', c: 'New partnership readies significant capital to deploy.' },
      {
        t: 'p',
        c:
          'NEW YORK, NY — Offset Capital, LLC, a commercial real estate lender launched in early 2024, announces a strategic partnership with an institutional asset manager, significantly expanding its funding capabilities for middle-market real estate entrepreneurs.',
      },
      {
        t: 'p',
        c:
          "The partnership enhances Offset Capital's senior bridge loan program, which now provides loans ranging from $5 million to over $50 million across all asset classes nationwide. This expansion comes at a crucial time when banks and other lenders have scaled back leverage or exited the market entirely.",
      },
      {
        t: 'quote',
        c:
          'Having a capital partner who shares our investment approach, bolstered with a robust balance sheet, helps ensure speed and certainty of execution, which are critical in the current environment.',
        by: 'Adam Frank, Principal, Offset Capital',
      },
      {
        t: 'p',
        c:
          'In addition to senior bridge loans, Offset Capital provides small mezzanine and preferred equity financing with target check sizes of $2 million to $10 million. These customized products offer stretch financing and help neutralize the impact of rising rates for borrowers.',
      },
      {
        t: 'p',
        c:
          'The founders of Offset Capital identified a unique opportunity to meet the growing demand for gap financing. As market conditions have tightened over the past three years, making it more challenging for investors to buy or refinance commercial properties with the same returns, Offset aims to provide the necessary gap equity to balance volatility in the middle market.',
      },
      { t: 'h2', c: 'About Offset Capital' },
      {
        t: 'p',
        c:
          'Offset Capital is a commercial real estate bridge lender specializing in flexible financing solutions for middle-market real estate entrepreneurs. The company offers a range of full capital stack solutions including senior bridge loans, mezzanine financing, and preferred equity investments. With a focus on speed, certainty of execution, and customization, Offset Capital is uniquely positioned to help borrowers navigate the financial challenges of today’s real estate market.',
      },
    ],
  },
  {
    slug: 'offset-capital-completes-18mm-pref-equity-investment-in-the-broome-hotel-in-new-york',
    title: 'Offset Capital Completes $1.8MM Pref Equity Investment in The Broome Hotel in New York',
    date: '2024-05-29',
    dateLabel: 'May 29, 2024',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1721043839/Broome_Hotel_g6l0al.jpg',
    excerpt:
      'A $1,775,000 preferred equity investment in The Broome Hotel, a 14-key boutique hotel at 431 Broome Street in Manhattan.',
    deal: {
      amount: '$1.775MM',
      value: 1.775,
      assetType: 'Hospitality',
      location: 'New York, NY',
      kind: 'equity',
      detail: 'The Broome Hotel — 14-key boutique hotel, preferred equity',
    },
    body: [
      { t: 'h2', c: 'Offset Capital Announces $1,775,000 Pref Equity Investment in The Broome Hotel' },
      {
        t: 'p',
        c:
          "NEW YORK, NY — Offset Capital announced its latest transaction, a $1,775,000 pref equity investment in The Broome Hotel, located at 431 Broome Street in Manhattan. This investment underscores Offset Capital's commitment to innovative hospitality financing solutions.",
      },
      {
        t: 'p',
        c:
          "The Broome Hotel, an 8,803 square-foot boutique establishment featuring 14 keys, was seeking additional capital to convert under-utilized space into a new restaurant/bar on the property's ground floor, enhancing the hotel's guest experience and revenue potential.",
      },
      {
        t: 'p',
        c:
          "Despite the buildout of the food and beverage (F&B) space not being included in the initial business plan, the Offset team worked closely with the hotel's sponsor to tailor a comprehensive capital stack solution featuring a full accrual on the pref. In addition to the F&B buildout, the pref investment will fund senior debt service, working capital, and pre-dev costs related to adding four additional rooms to the hotel.",
      },
      {
        t: 'p',
        c:
          "The investment in the Broome Hotel is part of Offset Capital's broader strategy to provide flexible financing solutions for middle-market real estate entrepreneurs. The company offers a range of full capital stack solutions including senior bridge loans, mezzanine financing, and preferred equity investments. With a focus on speed, certainty of execution, and customization, Offset Capital is uniquely positioned to help borrowers navigate the financial challenges of today’s real estate market.",
      },
    ],
  },
  {
    slug: 'offset-capital-spotlight-in-cma',
    title: 'Offset Capital Featured in CMA',
    date: '2024-02-08',
    dateLabel: 'February 8, 2024',
    category: 'Press',
    image:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1708112392/1000017205_ydkdqm.jpg',
    excerpt:
      'Commercial Mortgage Alert covers the launch: “Bridge Loan Pros Launch New Shop.”',
    body: [
      {
        t: 'p',
        c:
          'The launch of Offset Capital Advisors has been spotlighted in the February 9 edition of the Commercial Mortgage Alert, “Bridge Loan Pros Launch New Shop.” As a new commercial real estate lender, Offset Capital is targeting middle market borrowers and aiming to originate up to $100 million of senior and subordinate debt by year end.',
      },
      {
        t: 'p',
        c:
          'The founders see a unique opportunity to fill a growing demand for gap financing, as borrowers face tougher market conditions compared to three years ago, making it harder to buy or refinance commercial properties with the same returns. By focusing on preferred-equity and mezzanine financing over the short term, Offset seeks to invest gap equity to help balance the volatility in the middle market.',
      },
      {
        t: 'p',
        c:
          'Offset is looking to lend roughly $2 million to $10 million per preferred-equity and mezzanine transaction, and $5 million to $15 million for senior bridge loans, to position itself as a key player in addressing the current financing gap in commercial real estate.',
      },
    ],
  },
];

export const categories: Category[] = ['Press', 'Credit Corner', 'Events'];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Transactions, newest first — every post that reports a closed deal. */
export const transactions = posts.filter((p) => p.deal);

/** Related posts: same category first, then most recent. */
export function related(slug: string, n = 3): Post[] {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, n);
  const sameCat = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...rest].slice(0, n);
}
