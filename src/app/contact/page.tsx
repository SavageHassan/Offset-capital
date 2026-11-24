import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { Section, SectionLabel } from '@/components/Section';
import { OffsetMark } from '@/components/Logo';
import { media, site } from '@/data/site';
import { strategies } from '@/data/strategies';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Offset Capital to discuss a commercial real estate financing transaction.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact us"
        eyebrow="Submit a deal"
        lines={['Send us the', 'transaction']}
        intro="If you are working through a complex situation or a deal facing timing pressure, we are always happy to take a look and talk through where proceeds can land."
        image={media.homeSecondary}
      />

      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.72fr] lg:gap-24">
            {/* Form */}
            <div>
              <SectionLabel>Complete the form below</SectionLabel>
              <h2 className="mt-7 max-w-[24ch] font-display text-display-sm font-light leading-[1.1] text-navy-900">
                Tell us about the deal and we will come back to you.
              </h2>
              <div className="mt-14">
                <ContactForm />
              </div>
            </div>

            {/* Direct details */}
            <aside className="lg:pt-4">
              <div className="bg-navy-900 px-8 py-10 text-white">
                <OffsetMark className="h-9 w-9 text-white/30" />
                <p className="eyebrow mt-8 text-gold-400">Direct</p>
                <div className="mt-7 space-y-7">
                  <div>
                    <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/40">Email</p>
                    <a href={`mailto:${site.email}`} className="link-underline mt-2 block font-display text-[1.4rem] font-light">
                      {site.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/40">Telephone</p>
                    <a href={site.phoneHref} className="link-underline tnum mt-2 block font-display text-[1.4rem] font-light">
                      {site.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/40">LinkedIn</p>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline mt-2 block font-display text-[1.4rem] font-light"
                    >
                      Offset Capital
                    </a>
                  </div>
                </div>
              </div>

              <Reveal delay={0.1}>
                <div className="mt-10 border-t border-navy-900/10 pt-9">
                  <p className="eyebrow text-navy-700">What to include</p>
                  <ul className="prose-editorial mt-6">
                    <li>Property type, location and current occupancy</li>
                    <li>Requested loan amount and use of proceeds</li>
                    <li>Existing debt, including any payoff discussions underway</li>
                    <li>Your business plan and intended exit</li>
                  </ul>
                  <p className="mt-6 font-sans text-[0.75rem] leading-relaxed text-stone-400">
                    The items above reflect what Offset Capital describes pressure-testing when sizing
                    a loan — the owner’s expectation, the appraisal, and where the asset could trade
                    today.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 border-t border-navy-900/10 pt-9">
                  <p className="eyebrow text-navy-700">Lending at a glance</p>
                  <dl className="mt-6 space-y-4">
                    {strategies.map((s) => {
                      const size = s.params.find((p) => p.label.startsWith('Loan Size'));
                      return (
                        <div key={s.slug} className="flex items-baseline justify-between gap-5 border-b border-navy-900/10 pb-4">
                          <dt className="font-sans text-[0.8125rem] text-stone-600">{s.name}</dt>
                          <dd className="tnum shrink-0 font-display text-[1.05rem] text-navy-900">
                            {size?.value ?? '—'}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
