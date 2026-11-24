'use client';

import { motion } from 'framer-motion';
import type { Param } from '@/data/strategies';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * Financing parameter sheet.
 *
 * Deliberately typographic rather than tabular: each term is a label/value
 * pair on its own hairline row, with the headline figures (size, leverage,
 * pricing, term) promoted to large display numerals above. Values are rendered
 * exactly as Offset Capital publishes them.
 */

const HEADLINE_LABELS = ['Loan Size', 'Loan Sizes', 'Leverage', 'Max Leverage', 'Pricing', 'Term'];

export default function ParamSheet({
  params,
  title,
  source,
  tone = 'light',
}: {
  params: Param[];
  title: string;
  source: string;
  tone?: 'light' | 'dark';
}) {
  const headline = params.filter((p) => HEADLINE_LABELS.includes(p.label));
  const rest = params.filter((p) => !HEADLINE_LABELS.includes(p.label));

  const dark = tone === 'dark';

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h4
          className={`font-sans text-label font-medium uppercase tracking-[0.18em] ${
            dark ? 'text-gold-400' : 'text-navy-700'
          }`}
        >
          {title}
        </h4>
        <p className={`font-sans text-[0.625rem] uppercase tracking-[0.14em] ${dark ? 'text-white/35' : 'text-stone-400'}`}>
          Source: {source}
        </p>
      </div>

      {/* Promoted figures */}
      <dl className={`mt-8 grid gap-px sm:grid-cols-2 ${dark ? 'bg-white/10' : 'bg-navy-900/10'}`}>
        {headline.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            className={`px-6 py-7 ${dark ? 'bg-navy-900' : 'bg-white'}`}
          >
            <dt
              className={`font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] ${
                dark ? 'text-white/45' : 'text-stone-400'
              }`}
            >
              {p.label}
            </dt>
            <dd
              className={`tnum mt-3 font-display text-[1.6rem] font-light leading-[1.15] tracking-tight sm:text-[1.9rem] ${
                dark ? 'text-white' : 'text-navy-900'
              }`}
            >
              {p.value}
            </dd>
          </motion.div>
        ))}
      </dl>

      {/* Remaining terms */}
      <dl className="mt-10">
        {rest.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
            className={`grid grid-cols-1 gap-1 border-t py-4 sm:grid-cols-[11rem_1fr] sm:gap-8 ${
              dark ? 'border-white/10' : 'border-navy-900/10'
            }`}
          >
            <dt
              className={`font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] sm:pt-1 ${
                dark ? 'text-white/45' : 'text-stone-400'
              }`}
            >
              {p.label}
            </dt>
            <dd
              className={`font-sans text-[0.9375rem] leading-relaxed ${
                dark ? 'text-white/85' : 'text-stone-700'
              }`}
            >
              {p.value}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
