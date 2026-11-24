'use client';

import Image from 'next/image';
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
 * dims as the page scrolls away. A ticker of real closings anchors the frame.
 */
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
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(7,19,31,0.86)_0%,rgba(13,32,57,0.72)_42%,rgba(7,19,31,0.94)_100%)]"
      />
      {/* Hairline grid — a quiet structural underlay. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '12.5% 100%',
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="shell flex flex-1 flex-col justify-end pb-14 pt-[calc(var(--nav-h)+5rem)]"
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
          className="mt-8 max-w-[17ch] font-display text-display-xl font-extralight text-white"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
            className="max-w-measure-lg font-sans text-[1.0625rem] leading-[1.75] text-white/70"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4 lg:justify-end"
          >
            <Button href="/strategies" variant="ghost">
              Financing capabilities
            </Button>
            <Button href="/company" variant="ghost">
              The company
            </Button>
          </motion.div>
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
