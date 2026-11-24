'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitHeading from './SplitHeading';
import { EASE } from '@/lib/motion';

/**
 * Interior page masthead: a tall navy band with a parallaxed photograph held
 * at low opacity, the breadcrumb, and a masked headline reveal.
 */
export default function PageHero({
  eyebrow,
  lines,
  intro,
  image,
  breadcrumb,
}: {
  eyebrow: string;
  lines: readonly string[];
  intro?: string;
  image: string;
  breadcrumb: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <div ref={ref} className="grain relative isolate flex min-h-hero flex-col justify-end overflow-hidden bg-navy-900">
      <motion.div style={{ y, opacity: fade }} className="absolute inset-0 -z-10 scale-110">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-[0.45]" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/60 to-navy-950/90" />
      </motion.div>

      <div className="shell w-full pb-[clamp(3.5rem,7vh,5.5rem)] pt-[calc(var(--nav-h)+clamp(3.5rem,8vh,6rem))]">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-label="Breadcrumb"
          className="flex items-center gap-3 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/60"
        >
          <Link href="/" className="transition-colors hover:text-gold-400">
            Offset Capital
          </Link>
          <span aria-hidden className="h-px w-5 bg-white/25" />
          <span className="text-white/80">{breadcrumb}</span>
        </motion.nav>

        <p className="eyebrow mt-14 text-gold-400">{eyebrow}</p>

        <SplitHeading
          as="h1"
          immediate
          delay={0.1}
          lines={lines}
          className="mt-7 max-w-[26ch] font-display text-display-md font-light leading-[1.08] text-white"
        />

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="mt-8 max-w-measure-lg font-sans text-[1.0625rem] leading-[1.75] text-white/70"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </div>
  );
}
