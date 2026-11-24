import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import NewsIndex from '@/components/NewsIndex';
import TransactionTable from '@/components/TransactionTable';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import CTA from '@/components/CTA';
import { Section, SectionLabel } from '@/components/Section';
import { media } from '@/data/site';
import { posts, transactions } from '@/data/posts';

export const metadata: Metadata = {
  title: 'News & Transactions',
  description: 'Loan closings, company announcements, Credit Corner commentary and events from Offset Capital.',
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        breadcrumb="News & transactions"
        eyebrow={`${posts.length} posts · ${transactions.length} transactions`}
        lines={['Closings, commentary', 'and company news']}
        intro="Find out more about our latest activities — loan closings, Credit Corner commentary on what is driving deals, and where to meet the team."
        image={media.newsHero}
      />

      <Section tone="white" className="py-section">
        <div className="shell">
          <NewsIndex posts={posts} />
        </div>
      </Section>

      {/* ─── Transaction index ───────────────────────────────────────── */}
      <Section tone="stone" className="py-section">
        <div className="shell">
          <div className="mb-14 max-w-measure-lg">
            <SectionLabel>Transaction index</SectionLabel>
            <SplitHeading
              lines={['The complete', 'transaction record']}
              className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
            />
          </div>
          <TransactionTable items={transactions} />
          <Reveal>
            <p className="mt-8 max-w-measure-lg font-sans text-[0.75rem] leading-relaxed text-stone-500">
              Figures, property details and uses of proceeds are as published in each announcement.
              The Del Cerro entry is a disposition Offset Capital was retained to manage, not a loan.
            </p>
          </Reveal>
        </div>
      </Section>

      <CTA
        heading="Questions?"
        body="If something here is close to a situation you are working through, send it over — we are glad to talk it through."
      />
    </>
  );
}
