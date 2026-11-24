import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SplitHeading from '@/components/SplitHeading';
import ParallaxImage from '@/components/ParallaxImage';
import TeamSection from '@/components/TeamSection';
import CTA from '@/components/CTA';
import { Section, SectionLabel } from '@/components/Section';
import { media, pillars, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'The Company',
  description: site.company,
};

export default function CompanyPage() {
  return (
    <>
      <PageHero
        breadcrumb="The company"
        eyebrow="Launched 2024 · New York"
        lines={['Small-balance debt', 'and equity, tailor-made', 'for entrepreneurs']}
        intro={site.company}
        image={media.companyHero}
      />

      {/* ─── Positioning ─────────────────────────────────────────────── */}
      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            <div>
              <SectionLabel>Who we are</SectionLabel>
              <Reveal>
                <p className="mt-8 max-w-measure-lg font-display text-[clamp(1.35rem,2.1vw,1.75rem)] font-light leading-[1.5] text-navy-900">
                  {site.positioning}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="prose-editorial mt-9 max-w-measure-lg">{site.boilerplate}</p>
              </Reveal>

              <Reveal delay={0.15}>
                <blockquote className="mt-14 border-l-2 border-gold-400 pl-8">
                  <p className="max-w-measure font-display text-[1.5rem] font-light italic leading-[1.4] text-navy-900">
                    “Having a capital partner who shares our investment approach, bolstered with a
                    robust balance sheet, helps ensure speed and certainty of execution, which are
                    critical in the current environment.”
                  </p>
                  <footer className="mt-6 font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-stone-400">
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
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[32ch] font-sans text-[0.8125rem] leading-relaxed text-stone-400">
                  Offset Capital, LLC — a commercial real estate lender launched in early 2024,
                  lending nationwide.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Philosophy ──────────────────────────────────────────────── */}
      <Section tone="navy" className="py-section">
        <div className="shell">
          <div className="max-w-measure-lg">
            <SectionLabel tone="dark">Financing philosophy</SectionLabel>
            <SplitHeading
              lines={['Speed, flexibility', 'and certainty of', 'execution']}
              className="mt-7 font-display text-display-md font-extralight leading-[1.07] text-white"
            />
            <Reveal delay={0.15}>
              <p className="mt-9 font-sans text-[1.0625rem] leading-[1.75] text-white/70">
                As your financing partner, we know that speed, flexibility, and certainty of execution
                are essential for the success of our partnership. The Offset team collaborates with real
                estate owners to develop full capital stack solutions, including senior bridge loans,
                mezzanine loans, and preferred equity.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-px bg-white/15 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="bg-navy-900 px-7 py-10">
                <span className="tnum font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-gold-400">
                  {p.index}
                </span>
                <h3 className="mt-6 font-display text-[1.5rem] font-light leading-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-white/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Team ────────────────────────────────────────────────────── */}
      <Section tone="white" className="py-section" id="team">
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

      {/* ─── Working with borrowers ──────────────────────────────────── */}
      <Section tone="stone" className="py-section">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionLabel>Working with borrowers</SectionLabel>
              <SplitHeading
                lines={['Structured around', 'your business plan']}
                className="mt-7 font-display text-display-sm font-light leading-[1.1] text-navy-900"
              />
              <Reveal delay={0.1}>
                <p className="prose-editorial mt-8 max-w-measure">
                  By blending and structuring preferred equity investments, mezzanine loans and senior
                  bridge loans, we help clients navigate market turbulence and stay on track with their
                  business plans, rather than being sidelined.
                </p>
              </Reveal>
            </div>
            <div>
              <SectionLabel>Broker partners</SectionLabel>
              <SplitHeading
                lines={['Relationships we', 'spend careers building']}
                className="mt-7 font-display text-display-sm font-light leading-[1.1] text-navy-900"
              />
              <Reveal delay={0.1}>
                <p className="prose-editorial mt-8 max-w-measure">{site.brokers}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <CTA heading="Want to meet?" />
    </>
  );
}
