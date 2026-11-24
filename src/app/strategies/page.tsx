import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SplitHeading from '@/components/SplitHeading';
import ParamSheet from '@/components/ParamSheet';
import ParallaxImage from '@/components/ParallaxImage';
import Button from '@/components/Button';
import CTA from '@/components/CTA';
import { Section, SectionLabel } from '@/components/Section';
import { media, site } from '@/data/site';
import { propertyTypes, strategies, usesOfProceeds } from '@/data/strategies';

export const metadata: Metadata = {
  title: 'Strategies',
  description: site.strategies,
};

export default function StrategiesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Strategies"
        eyebrow="Financing capabilities"
        lines={['Full capital stack', 'solutions, tailored', 'to each situation']}
        intro={site.strategies}
        image={media.heroCity}
      />

      {/* ─── Index of the three products ─────────────────────────────── */}
      <Section tone="white" className="border-b border-navy-900/10 py-14">
        <div className="shell">
          <div className="grid gap-px bg-navy-900/10 md:grid-cols-3">
            {strategies.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.07} className="bg-white">
                <Link
                  href={`#${s.slug}`}
                  className="group flex h-full flex-col justify-between gap-7 px-6 py-8"
                >
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="tnum font-display text-[1.15rem] font-light text-gold-500">
                        {s.number}
                      </span>
                      <h2 className="font-display text-[1.45rem] font-normal leading-tight text-navy-900 transition-colors duration-500 group-hover:text-navy-700">
                        {s.name}
                      </h2>
                    </div>
                    <p className="mt-3 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-stone-400">
                      {s.stackLabel}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="block h-px w-10 bg-gold-400 transition-all duration-500 ease-offset group-hover:w-20"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Each strategy in full ───────────────────────────────────── */}
      {strategies.map((s, i) => {
        const dark = i === 1;
        return (
          <Section
            key={s.slug}
            id={s.slug}
            tone={dark ? 'navy' : i === 2 ? 'stone' : 'white'}
            className="scroll-mt-24 py-section"
          >
            <div className="shell">
              <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
                {/* Narrative column */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <span
                      className={`tnum font-display text-[1.35rem] font-light ${
                        dark ? 'text-gold-400' : 'text-gold-500'
                      }`}
                    >
                      {s.number}
                    </span>
                    <SectionLabel tone={dark ? 'dark' : 'light'} className="!text-current">
                      <span className={dark ? 'text-gold-400' : 'text-navy-700'}>{s.stackLabel}</span>
                    </SectionLabel>
                  </div>

                  <SplitHeading
                    as="h2"
                    lines={s.name.split(' ').length > 2 ? [s.name.split(' ').slice(0, -1).join(' '), s.name.split(' ').slice(-1)[0]] : [s.name]}
                    className={`mt-6 font-display text-display-md font-extralight leading-[1.06] ${
                      dark ? 'text-white' : 'text-navy-900'
                    }`}
                  />

                  <Reveal delay={0.12}>
                    <p
                      className={`mt-9 max-w-measure font-sans text-[1.0625rem] leading-[1.75] ${
                        dark ? 'text-white/70' : 'text-stone-600'
                      }`}
                    >
                      {s.summary}
                    </p>
                  </Reveal>

                  <div className="mt-12">
                    <ParallaxImage
                      src={s.image}
                      alt=""
                      aspect="aspect-[16/10]"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      distance={8}
                    />
                  </div>
                </div>

                {/* Parameters column */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <ParamSheet
                    params={s.params}
                    title={s.paramsTitle}
                    source={s.source}
                    tone={dark ? 'dark' : 'light'}
                  />

                  {s.slug === 'construction-lending' && (
                    <Reveal>
                      <p className="mt-10 border-l border-gold-400 pl-6 font-sans text-[0.8125rem] leading-relaxed text-stone-500">
                        These are the four criteria Offset Capital has published for construction
                        lending. Term, fees, recourse and prepayment have not been published for this
                        product and are therefore not shown — contact the team to discuss a specific
                        project.
                      </p>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      {/* ─── Eligibility at a glance ─────────────────────────────────── */}
      <Section tone="deep" className="py-section">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionLabel tone="dark">Property types</SectionLabel>
              <ul className="mt-9">
                {propertyTypes.map((t, i) => (
                  <Reveal
                    as="li"
                    key={t}
                    delay={i * 0.05}
                    className="flex items-baseline justify-between border-t border-white/15 py-5"
                  >
                    <span className="font-display text-[1.35rem] font-light text-white">{t}</span>
                    <span aria-hidden className="block h-1 w-1 rotate-45 bg-gold-400" />
                  </Reveal>
                ))}
              </ul>
              <Reveal>
                <p className="mt-7 font-sans text-[0.8125rem] text-white/40">No land.</p>
              </Reveal>
            </div>
            <div>
              <SectionLabel tone="dark">Use of proceeds</SectionLabel>
              <ul className="mt-9">
                {usesOfProceeds.map((t, i) => (
                  <Reveal
                    as="li"
                    key={t}
                    delay={i * 0.05}
                    className="flex items-baseline justify-between border-t border-white/15 py-5"
                  >
                    <span className="font-display text-[1.35rem] font-light text-white">{t}</span>
                    <span aria-hidden className="block h-1 w-1 rotate-45 bg-gold-400" />
                  </Reveal>
                ))}
              </ul>
              <Reveal>
                <p className="mt-7 font-sans text-[0.8125rem] leading-relaxed text-white/40">
                  No pre-development or ground-up construction under the bridge and subordinate
                  programs. Ground-up multifamily and industrial is financed under construction
                  lending.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal>
            <p className="mt-16 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-white/30">
              Geographic focus — nationwide
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ─── Broker partners ─────────────────────────────────────────── */}
      <Section tone="stone" className="scroll-mt-24 py-section" id="broker-partners">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-24">
            <div>
              <SectionLabel>Broker partners</SectionLabel>
              <SplitHeading
                lines={['We pay commissions', 'at closing. Simple.']}
                className="mt-7 font-display text-display-md font-extralight leading-[1.06] text-navy-900"
              />
              <Reveal delay={0.12}>
                <p className="prose-editorial mt-9 max-w-measure-lg">{site.brokers}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="/contact">Get in touch</Button>
                  <Button href={`mailto:${site.email}`} variant="outline">
                    Email the team
                  </Button>
                </div>
              </Reveal>
            </div>
            <ParallaxImage
              src={media.homeSecondary}
              alt=""
              aspect="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>
        </div>
      </Section>

      <CTA
        heading="Want to work with us?"
        body="Tell us the property, the proceeds you need and where the existing debt stands. We will come back with where we think this can be sized."
      />
    </>
  );
}
