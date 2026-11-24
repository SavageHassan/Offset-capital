/**
 * Principals — names, titles, portraits and biographies exactly as published
 * on offsetcap.com/company. Nothing has been added or embellished.
 */

export type Member = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  /** Biography paragraphs, verbatim from the live site. */
  bio: string[];
  /** A single pulled line used in the editorial layout, drawn from the bio. */
  focus: string;
};

export const team: Member[] = [
  {
    slug: 'kamau-coleman',
    name: 'Kamau Coleman',
    role: 'Principal',
    photo:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1750930656/kamau-coleman_ygs6iq.jpg',
    focus: 'Originations, structuring, execution and capital partner relationships',
    bio: [
      'Kamau has been a real estate investment professional for over 20 years with extensive experience in structured and entrepreneurial finance. At Offset Capital he is focused on deal originations, structuring, execution and capital partner relationships.',
      'Previously, Kamau served for 15 years as Director of Investments at GreenLake Asset Management, a commercial real estate debt fund, where he was responsible for originating more than $1.1B of loans. During this tenure, Kamau was instrumental in growing the fund from a nascent venture into a nationally recognized bridge lender with over $800M of AUM. Before GreenLake, Kamau worked at various venture capital portfolio companies and was a senior consultant at PwC.',
    ],
  },
  {
    slug: 'renee-volaric',
    name: 'Renee Volaric',
    role: 'Principal',
    photo:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1707461601/RENEE_hwnmnm.jpg',
    focus: 'Fundraising, originations and strategic oversight',
    bio: [
      'Renee has worked in financial services for more than 20 years and brings extensive business development and client management experience from senior positions at firms throughout the industry. At Offset, Renee focuses on fundraising, originations, and strategic oversight of organizational activities and relationships.',
      'Before Offset, Renee led national origination efforts at GreenLake Asset Management, a commercial real estate debt fund. Additionally, she launched and ran the New York office of a West Coast private real estate fund where she headed nationwide origination efforts.',
    ],
  },
  {
    slug: 'adam-frank',
    name: 'Adam Frank',
    role: 'Principal',
    photo:
      'https://res.cloudinary.com/dm7i2mhsn/image/upload/v1709771489/Persons/ADAM_2_iojznx.jpg',
    focus: 'Portfolio management, investment structure, underwriting and asset management',
    bio: [
      'Adam has over ten years of experience in finance with a focus on commercial real estate debt. At Offset Capital, he focuses on portfolio management, investment structure, underwriting, and asset management. Before joining Offset, Adam served for three years as Vice President of originations at GreenLake Asset Management, a commercial real estate debt fund. Prior to that, he was an Associate Director at Ladder Capital for six years, where he contributed to originating $4.4 billion in loans. He also worked for APC Funds, focusing on the acquisition and management of nonperforming commercial loans.',
      'Adam currently serves as a Director and Credit Committee member for Metro Credit Union, the largest state-chartered credit union in Massachusetts.',
    ],
  },
];
