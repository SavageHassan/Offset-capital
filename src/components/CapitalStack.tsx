'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { capitalStack } from '@/data/strategies';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * Capital stack diagram.
 *
 * Offset Capital describes "blending and structuring" senior bridge loans,
 * mezzanine loans and preferred equity to help borrowers complete the capital
 * stack. This renders that literally: the stack is built from the bottom up as
 * it scrolls into view, with the three positions Offset provides drawn in brand
 * blue and the sponsor's own equity left as an outline beneath them.
 */
export default function CapitalStack() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
      {/* Diagram */}
      <div className="flex flex-col gap-2" onMouseLeave={() => setActive(0)}>
        {/* Rendered top-down: sponsor equity at the top, senior debt at the
            base, which is how a capital stack is read. The bands taper upward
            as the positions get smaller and more junior. */}
        {[...capitalStack].reverse().map((layer, j) => {
          const i = capitalStack.length - 1 - j; // index back into source order
          const isActive = active === i;
          const widths = ['100%', '84%', '70%', '56%']; // by source index
          return (
            <motion.button
              key={layer.name}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={isActive}
              initial={{ opacity: 0, scaleY: 0.2, y: 16 }}
              whileInView={{ opacity: 1, scaleY: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE, delay: (capitalStack.length - 1 - j) * 0.12 }}
              style={{ width: widths[i], originY: 1 }}
              className={`group relative flex min-h-[4.5rem] items-center justify-between gap-6 px-6 text-left transition-all duration-500 ease-offset sm:min-h-[5.25rem] sm:px-8 ${
                layer.offset
                  ? isActive
                    ? 'bg-navy-700 text-white shadow-[0_18px_50px_-24px_rgba(26,64,114,0.75)]'
                    : 'bg-navy-700/[0.07] text-navy-800 hover:bg-navy-700/[0.13]'
                  : 'border border-dashed border-navy-700/30 bg-transparent text-stone-500'
              }`}
            >
              <span
                aria-hidden
                className={`absolute inset-y-0 left-0 w-[3px] transition-all duration-500 ease-offset ${
                  isActive && layer.offset ? 'bg-gold-400' : 'bg-transparent'
                }`}
              />
              <span>
                <span
                  className={`block font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ${
                    isActive && layer.offset ? 'text-gold-300' : 'text-stone-500'
                  }`}
                >
                  {layer.tier}
                </span>
                <span className="mt-1.5 block font-display text-xl font-normal leading-tight sm:text-[1.4rem]">
                  {layer.name}
                </span>
              </span>
              <span
                className={`hidden shrink-0 font-sans text-[0.625rem] uppercase tracking-[0.18em] transition-colors duration-500 sm:block ${
                  layer.offset
                    ? isActive
                      ? 'text-white/70'
                      : 'text-navy-700/75'
                    : 'text-stone-500'
                }`}
              >
                {layer.offset ? 'Offset' : 'Sponsor'}
              </span>
            </motion.button>
          );
        })}
        <p className="mt-3 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-500">
          Senior debt at the base · hover a position
        </p>
      </div>

      {/* Caption panel */}
      <div className="lg:pl-6">
        <p className="eyebrow text-navy-700">The full capital stack</p>
        <h3 className="mt-6 max-w-measure font-display text-display-sm font-light leading-[1.1] text-navy-900">
          Three instruments, blended and structured around one business plan.
        </h3>
        <div className="relative mt-9 min-h-[9.5rem] border-l border-navy-900/10 pl-7">
          {capitalStack.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                y: active === i ? 0 : 10,
                pointerEvents: active === i ? 'auto' : 'none',
              }}
              transition={{ duration: 0.5, ease: EASE }}
              className={i === 0 ? '' : 'absolute inset-0 pl-7'}
            >
              <p className="font-sans text-label font-medium uppercase tracking-[0.18em] text-gold-700">
                {layer.offset ? 'Offset Capital position' : 'Borrower position'}
              </p>
              <p className="mt-4 font-display text-[1.75rem] font-light leading-tight text-navy-900">
                {layer.name}
              </p>
              <p className="prose-editorial mt-3 max-w-measure">{layer.detail}</p>
              {layer.strategy && (
                <Link
                  href={`/strategies#${layer.strategy}`}
                  className="group mt-6 inline-flex items-center gap-3 font-sans text-label font-medium uppercase tracking-[0.18em] text-navy-700 transition-colors hover:text-gold-700"
                >
                  Full parameters
                  <span
                    aria-hidden
                    className="block h-px w-8 bg-current transition-all duration-500 ease-offset group-hover:w-12"
                  />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
