import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import SplitHeading from '@/components/SplitHeading';
import ParallaxImage from '@/components/ParallaxImage';
import CapitalStack from '@/components/CapitalStack';
import TransactionIndex from '@/components/TransactionIndex';
import ArticleCard from '@/components/ArticleCard';
import TeamSection from '@/components/TeamSection';
import Button from '@/components/Button';
import CTA from '@/components/CTA';
import { Section, SectionLabel } from '@/components/Section';
import { media, pillars, site } from '@/data/site';
import { propertyTypes, strategies, usesOfProceeds } from '@/data/strategies';
import { posts, transactions } from '@/data/posts';

export default function HomePage() {
  const tickerDeals = transactions.filter((p) => p.deal!.kind === 'loan').slice(0, 8);
  const featuredDeals = transactions.slice(0, 7);
  const latest = posts.slice(0, 3);

  return (
    <>
      <Hero deals={tickerDeals} />

      {/* ─── Positioning ─────────────────────────────────────────────── */}
      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionLabel>Offset Capital</SectionLabel>
              <SplitHeading
                lines={['A direct lender', 'built for the', 'middle market']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
              />
              <Reveal delay={0.2}>
                <p className="mt-10 max-w-[30ch] font-display text-lg italic text-stone-500">
                  {site.motto}
                </p>
                <div className="offset-rule mt-7 max-w-[12rem] text-navy-900" />
              </Reveal>
            </div>

            <div>
              <Reveal>
                <p className="max-w-measure-lg font-display text-[clamp(1.35rem,2.1vw,1.75rem)] font-light leading-[1.5] text-navy-900">
                  {site.positioning}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="prose-editorial mt-9 max-w-measure-lg">{site.company}</p>
              </Reveal>

              {/* Pillars */}
              <div className="mt-16 grid gap-px bg-navy-900/10 sm:grid-cols-3">
                {pillars.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.08} className="bg-white px-6 py-8">
                    <span className="tnum font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-gold-600">
                      {p.index}
                    </span>
                    <h3 className="mt-5 font-display text-[1.3rem] font-normal leading-tight text-navy-900">
                      {p.title}
                    </h3>
                    <p className="mt-3.5 font-sans text-[0.875rem] leading-relaxed text-stone-500">
                      {p.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Split-screen: the problem Offset solves ─────────────────── */}
      <Section tone="deep">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[26rem] lg:min-h-[44rem]">
            <ParallaxImage
              src={media.companyHero}
              alt="Urban commercial architecture"
              aspect="h-full min-h-[26rem] lg:min-h-[44rem]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              distance={9}
            />
          </div>
          <div className="flex items-center px-gutter py-section lg:px-[clamp(2.5rem,5vw,5.5rem)]">
            <div className="max-w-measure-lg">
              <SectionLabel tone="dark">Why borrowers come to us</SectionLabel>
              <SplitHeading
                lines={['When a financing', 'gap threatens', 'the business plan']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.07] text-white"
              />
              <Reveal delay={0.15}>
                <p className="mt-9 font-sans text-[1.0625rem] leading-[1.75] text-white/70">
                  Banks and other lenders have scaled back leverage or exited the market entirely.
                  Offset Capital was founded to meet the growing demand for gap financing — investing
                  the capital that balances volatility in the middle market, so a transaction can move
                  forward rather than being sidelined.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-12 space-y-7 border-t border-white/15 pt-10">
                  <div>
                    <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/40">
                      Property types we lend against
                    </p>
                    <p className="mt-3 font-display text-lg font-light leading-relaxed text-white/90">
                      {propertyTypes.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/40">
                      Use of proceeds
                    </p>
                    <p className="mt-3 font-display text-lg font-light leading-relaxed text-white/90">
                      {usesOfProceeds.join(' · ')}
                    </p>
                  </div>
                  <p className="font-sans text-[0.75rem] leading-relaxed text-white/35">
                    Per the published senior bridge and subordinate financing parameter sheets. No land.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Capital stack ───────────────────────────────────────────── */}
      <Section tone="stone" className="py-section" id="capital-stack">
        <div className="shell">
          <div className="mb-16 max-w-measure-lg">
            <SectionLabel>How we structure</SectionLabel>
            <SplitHeading
              lines={['Completing the', 'capital stack']}
              className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
            />
          </div>
          <CapitalStack />
        </div>
      </Section>

      {/* ─── Financing capabilities ──────────────────────────────────── */}
      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-measure-lg">
              <SectionLabel>Strategies</SectionLabel>
              <SplitHeading
                lines={['Three ways we', 'put capital to work']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
              />
            </div>
            <Reveal>
              <Button href="/strategies" variant="outline">
                All parameters
              </Button>
            </Reveal>
          </div>

          {/* Asymmetric rows rather than three identical cards. */}
          <div className="mt-20">
            {strategies.map((s, i) => {
              const key = s.params.filter((p) =>
                ['Loan Size', 'Loan Sizes', 'Leverage', 'Max Leverage', 'Pricing'].includes(p.label),
              );
              const flip = i % 2 === 1;
              return (
                <Reveal key={s.slug} className="border-t border-navy-900/12 py-12 lg:py-16">
                  <Link
                    href={`/strategies#${s.slug}`}
                    className="group grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10"
                  >
                    <div
                      className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'}`}
                    >
                      <div className="relative overflow-hidden bg-navy-900/5">
                        <div className="aspect-[16/10]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-offset group-hover:scale-[1.05]"
                          />
                        </div>
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-[900ms] ease-offset group-hover:scale-x-100"
                        />
                      </div>
                    </div>

                    <div className={`lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-7'}`}>
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <span className="tnum font-display text-[1.25rem] font-light text-gold-500">
                          {s.number}
                        </span>
                        <span className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-400">
                          {s.stackLabel}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-display-sm font-light leading-[1.1] text-navy-900 transition-colors duration-500 group-hover:text-navy-700">
                        {s.name}
                      </h3>
                      <p className="mt-5 max-w-measure font-sans text-[0.9375rem] leading-[1.75] text-stone-500">
                        {s.summary}
                      </p>
                      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                        {key.map((p) => (
                          <div key={p.label}>
                            <dt className="font-sans text-[0.5625rem] uppercase tracking-[0.18em] text-stone-400">
                              {p.label}
                            </dt>
                            <dd className="tnum mt-1.5 font-display text-[1.15rem] font-normal text-navy-900">
                              {p.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <span className="mt-9 inline-flex items-center gap-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-navy-700">
                        Full parameters
                        <span
                          aria-hidden
                          className="block h-px w-8 bg-gold-400 transition-all duration-500 ease-offset group-hover:w-14"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ─── Selected transactions ───────────────────────────────────── */}
      <Section tone="stone" className="py-section">
        <div className="shell">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-measure-lg">
              <SectionLabel>Selected transactions</SectionLabel>
              <SplitHeading
                lines={['Closings that', 'moved deals forward']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
              />
            </div>
            <Reveal>
              <Button href="/news" variant="outline">
                News &amp; transactions
              </Button>
            </Reveal>
          </div>
          <TransactionIndex items={featuredDeals} />
          <Reveal>
            <p className="mt-8 max-w-measure-lg font-sans text-[0.75rem] leading-relaxed text-stone-400">
              Each entry above links to the company announcement it is drawn from. Figures, property
              details and uses of proceeds are as published by Offset Capital.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ─── Experience ──────────────────────────────────────────────── */}
      <Section tone="navy" className="py-section">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <SectionLabel tone="dark">Experience</SectionLabel>
              <SplitHeading
                lines={['Decades of market', 'knowledge, and the', 'relationships to match']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.07] text-white"
              />
              <Reveal delay={0.15}>
                <p className="mt-9 max-w-measure font-sans text-[1.0625rem] leading-[1.75] text-white/65">
                  Our expertise in customizing financing solutions for the middle market is grounded in
                  decades of market knowledge and strong industry relationships, which enables us to be
                  fast and flexible when analyzing, underwriting, and structuring our investments.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/40">
                  What the principals bring
                </p>
              </Reveal>
              <dl className="mt-8">
                {[
                  {
                    figure: '20+ years',
                    label: 'Kamau Coleman — real estate investment professional',
                    note: 'Structured and entrepreneurial finance.',
                  },
                  {
                    figure: '$1.1B+',
                    label: 'Loans originated by Kamau at GreenLake Asset Management',
                    note: '15 years as Director of Investments.',
                  },
                  {
                    figure: '20+ years',
                    label: 'Renee Volaric — financial services',
                    note: 'Led national origination efforts at GreenLake.',
                  },
                  {
                    figure: '$4.4B',
                    label: 'Loans Adam Frank contributed to originating at Ladder Capital',
                    note: 'Six years as an Associate Director.',
                  },
                ].map((row, i) => (
                  <Reveal
                    key={row.label}
                    delay={i * 0.07}
                    className="grid grid-cols-1 gap-2 border-t border-white/15 py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
                  >
                    <dt className="tnum font-display text-[1.75rem] font-light leading-none text-gold-400">
                      {row.figure}
                    </dt>
                    <dd>
                      <p className="font-sans text-[0.9375rem] leading-snug text-white/90">{row.label}</p>
                      <p className="mt-1.5 font-sans text-[0.8125rem] text-white/45">{row.note}</p>
                    </dd>
                  </Reveal>
                ))}
              </dl>
              <Reveal>
                <p className="mt-7 font-sans text-[0.75rem] leading-relaxed text-white/35">
                  Figures above describe the principals’ individual track records at prior firms, as
                  published in their biographies. They are not Offset Capital’s own origination volume.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Team ────────────────────────────────────────────────────── */}
      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-measure-lg">
              <SectionLabel>The team</SectionLabel>
              <SplitHeading
                lines={['Three principals,', 'one credit view']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
              />
            </div>
            <Reveal>
              <Button href="/company" variant="outline">
                About the company
              </Button>
            </Reveal>
          </div>
          <TeamSection />
        </div>
      </Section>

      {/* ─── Latest ──────────────────────────────────────────────────── */}
      <Section tone="stone" className="py-section">
        <div className="shell">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-measure-lg">
              <SectionLabel>Latest</SectionLabel>
              <SplitHeading
                lines={['News, transactions', 'and credit commentary']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
              />
            </div>
            <Reveal>
              <Button href="/news" variant="outline">
                All posts
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {latest.map((post, i) => (
              <ArticleCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
