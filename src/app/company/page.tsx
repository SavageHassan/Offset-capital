import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SplitHeading from '@/components/SplitHeading';
import ParallaxImage from '@/components/ParallaxImage';
import TeamSection from '@/components/TeamSection';
import CTA from '@/components/CTA';
import { Section, SectionLabel } from '@/components/Section';
import { media, milestones, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'The Company',
  description: site.company,
};

/**
 * The Company page owns the firm's identity and its people.
 *
 * The three pillars, the capital-stack diagram and the market-gap narrative
 * all live on the homepage and are deliberately not repeated here; this page
 * carries what the homepage does not — the record of what the firm has
 * actually done, and the principals behind it.
 */
export default function CompanyPage() {
  return (
    <>
      <PageHero
        breadcrumb="The company"
        eyebrow="Launched 2024 · New York"
        lines={['Small-balance debt and equity,', 'tailor-made for entrepreneurs']}
        intro="Small-balance debt and equity solutions, tailor-made for real estate entrepreneurs in the middle market."
        image={media.companyHero}
      />

      {/* ─── Who we are ──────────────────────────────────────────────── */}
      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
            <div>
              <SectionLabel>Who we are</SectionLabel>
              <Reveal>
                <p className="mt-8 max-w-measure-lg font-display text-[clamp(1.35rem,2.1vw,1.75rem)] font-light leading-[1.5] text-navy-900">
                  {site.boilerplate}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="prose-editorial mt-9 max-w-measure-lg">
                  As your financing partner, we know that speed, flexibility, and certainty of
                  execution are essential for the success of our partnership. The Offset team
                  collaborates with real estate owners to develop full capital stack solutions,
                  including senior bridge loans, mezzanine loans, and preferred equity.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <blockquote className="mt-14 border-l-2 border-gold-400 pl-8">
                  <p className="max-w-measure font-display text-[1.5rem] font-light italic leading-[1.4] text-navy-900">
                    “Having a capital partner who shares our investment approach, bolstered with a
                    robust balance sheet, helps ensure speed and certainty of execution, which are
                    critical in the current environment.”
                  </p>
                  <footer className="mt-6 font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-stone-500">
                    Adam Frank, Principal — Offset Capital
                  </footer>
                </blockquote>
              </Reveal>
            </div>

            <div className="lg:pt-16">
              <ParallaxImage
                src={media.building}
                alt="Commercial property"
                aspect="aspect-[3/4]"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[32ch] font-sans text-[0.8125rem] leading-relaxed text-stone-500">
                  Offset Capital, LLC — a commercial real estate lender launched in early 2024,
                  lending nationwide.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Milestones ──────────────────────────────────────────────── */}
      <Section tone="navy" className="py-section">
        <div className="shell">
          <div className="max-w-measure-lg">
            <SectionLabel tone="dark">The record</SectionLabel>
            <SplitHeading
              lines={['What the firm has', 'built since 2024']}
              className="mt-7 font-display text-display-md font-extralight leading-[1.07] text-white"
            />
          </div>

          <ol className="mt-16">
            {milestones.map((m, i) => (
              <Reveal
                as="li"
                key={m.date}
                delay={Math.min(i, 5) * 0.06}
                className="group border-t border-white/15 last:border-b"
              >
                <Link
                  href={`/news/${m.slug}`}
                  className="grid gap-x-10 gap-y-3 py-9 lg:grid-cols-[11rem_1fr_auto] lg:items-baseline"
                >
                  <span className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-gold-400">
                    {m.date}
                  </span>
                  <span>
                    <span className="block font-display text-[1.6rem] font-light leading-tight text-white transition-colors duration-500 group-hover:text-gold-200">
                      {m.title}
                    </span>
                    <span className="mt-3 block max-w-measure-lg font-sans text-[0.9375rem] leading-relaxed text-white/60">
                      {m.body}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 font-sans text-[0.5625rem] uppercase tracking-[0.18em] text-white/55 transition-colors duration-500 group-hover:text-white">
                    Read
                    <span
                      aria-hidden
                      className="block h-px w-6 bg-gold-400 transition-all duration-500 ease-offset group-hover:w-11"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ─── Team ────────────────────────────────────────────────────── */}
      <Section tone="white" className="scroll-mt-24 py-section" id="team">
        <div className="shell">
          <div className="mb-14 max-w-measure-lg">
            <SectionLabel>Offset Capital team</SectionLabel>
            <SplitHeading
              lines={['The principals']}
              className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
            />
            <Reveal delay={0.1}>
              <p className="prose-editorial mt-8">
                Select a principal to read their full biography. Each has spent their career
                originating, structuring and managing commercial real estate credit.
              </p>
            </Reveal>
          </div>
          <TeamSection />
        </div>
      </Section>

      <CTA
        heading="Want to meet?"
        body="We are always glad to talk through a transaction — whether it is live, still taking shape, or a situation you are trying to find a way around."
      />
    </>
  );
}
