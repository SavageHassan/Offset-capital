import Link from 'next/link';
import Button from './Button';
import Reveal from './Reveal';
import { OffsetMark } from './Logo';
import { site } from '@/data/site';

/** Closing call to action, shared by every page. */
export default function CTA({
  heading = 'Let’s talk about your transaction.',
  body = 'Brokers and other referral sources are an essential part of our business. Send us the deal — we are always happy to take a look and talk through where proceeds can land.',
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-navy-700 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '7.5rem 7.5rem',
        }}
      />
      <div className="shell relative py-section">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-24">
          <div>
            <OffsetMark className="h-10 w-10 text-white/35" />
            <Reveal>
              <h2 className="mt-9 max-w-[22ch] font-display text-display-md font-extralight leading-[1.08]">
                {heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-measure font-sans text-[1.0625rem] leading-[1.75] text-white/70">
                {body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:pb-2">
            <div className="space-y-8 border-t border-white/20 pt-8">
              <div>
                <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/45">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline mt-2 block font-display text-[1.6rem] font-light text-white"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/45">Telephone</p>
                <a
                  href={site.phoneHref}
                  className="link-underline tnum mt-2 block font-display text-[1.6rem] font-light text-white"
                >
                  {site.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button href="/contact" variant="ghost">
                  Contact the team
                </Button>
              </div>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-white/45">
                Prefer a broker introduction?{' '}
                <Link href="/strategies#broker-partners" className="underline decoration-gold-400 underline-offset-4">
                  We pay commissions at closing.
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
