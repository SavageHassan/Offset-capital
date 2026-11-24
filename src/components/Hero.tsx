'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitHeading from './SplitHeading';
import Button from './Button';
import DealTicker from './DealTicker';
import { EASE } from '@/lib/motion';
import { media, site } from '@/data/site';
import type { Post } from '@/data/posts';

/**
 * Homepage hero.
 *
 * Full-bleed architectural photograph from Offset Capital's own asset library,
 * dropped behind a navy gradient so the type carries the composition. The
 * headline reveals line by line from behind masks; the photograph drifts and
 * dims as the page scrolls away.
 *
 * The lower band is a three-part bottom line: the positioning sentence, the
 * two actions beneath it, and — balancing the right edge — the headline
 * lending terms, so the first screen states what the firm does *and* the size
 * of cheque it writes. A ticker of real closings anchors the frame.
 */

/** Headline terms, taken from the published senior bridge parameter sheet. */
const AT_A_GLANCE = [
  { label: 'Loan size', value: '$10MM–$50MM' },
  { label: 'Leverage', value: 'Up to 75% LTV' },
  { label: 'Coverage', value: 'Nationwide' },
];

export default function Hero({ deals }: { deals: Post[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950">
      {/* Photograph */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10 scale-[1.15]">
        <Image
          src={media.heroCity}
          alt="Commercial real estate skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* Two washes, written inline rather than as arbitrary Tailwind values:
          multi-stop rgba gradients are brittle as generated class names, and a
          hero that silently loses its scrim is unreadable. The vertical wash
          seats the type; the wash from the left keeps the headline legible over
          the busiest part of the photograph without flattening the frame. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(7,19,31,0.80) 0%, rgba(13,32,57,0.40) 40%, rgba(7,19,31,0.90) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(7,19,31,0.66) 0%, rgba(7,19,31,0.18) 48%, rgba(7,19,31,0) 74%)',
        }}
      />
      {/* Hairline grid — a quiet structural underlay. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '12.5% 100%',
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="shell flex flex-1 flex-col justify-end pb-12 pt-[calc(var(--nav-h)+4.5rem)]"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="eyebrow text-gold-400"
        >
          <span>
            Nationwide direct lender
            <span className="hidden sm:inline"> · Middle market</span>
          </span>
        </motion.p>

        <SplitHeading
          as="h1"
          immediate
          delay={0.3}
          lines={site.hero.headline}
          className="mt-7 max-w-[17ch] font-display text-display-xl font-extralight text-white"
        />

        <div className="mt-11 grid gap-10 lg:grid-cols-[1.25fr_auto] lg:items-end lg:gap-16">
          {/* Positioning + actions */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.75 }}
              className="max-w-measure-lg font-sans text-[1.0625rem] leading-[1.75] text-white/75"
            >
              {site.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.88 }}
              className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-5"
            >
              <Button href="/contact" variant="gold">
                Submit a deal
              </Button>
              <Link
                href="/strategies"
                className="group inline-flex items-center gap-3 font-sans text-label-lg font-medium uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:text-gold-400"
              >
                Financing capabilities
                <span
                  aria-hidden
                  className="block h-px w-9 bg-gold-400 transition-all duration-500 ease-offset group-hover:w-16"
                />
              </Link>
            </motion.div>
          </div>

          {/* Headline terms */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="grid grid-cols-3 gap-px bg-white/15 lg:w-[32rem]"
          >
            {AT_A_GLANCE.map((item) => (
              <div key={item.label} className="bg-navy-950/55 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-5">
                <dt className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.16em] text-white/45">
                  {item.label}
                </dt>
                <dd className="tnum mt-2.5 whitespace-normal font-display text-[0.95rem] font-light leading-tight text-white sm:whitespace-nowrap sm:text-[1.1rem]">
                  {item.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.15 }}
      >
        <DealTicker items={deals} />
      </motion.div>
    </section>
  );
}
