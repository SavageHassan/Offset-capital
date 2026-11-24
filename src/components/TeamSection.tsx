'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { team } from '@/data/team';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * Principals. Portraits sit in a row of tall frames; selecting one opens the
 * full published biography beneath, in an editorial two-column measure. The
 * portrait of the selected principal stays in colour while the others recede,
 * which keeps the focus without hiding anyone.
 */
export default function TeamSection() {
  const [open, setOpen] = useState<string | null>(team[0].slug);
  const current = team.find((m) => m.slug === open) ?? null;

  return (
    <div>
      <div className="grid gap-px bg-navy-900/10 sm:grid-cols-3">
        {team.map((member, i) => {
          const isOpen = open === member.slug;
          return (
            <motion.button
              key={member.slug}
              type="button"
              onClick={() => setOpen(isOpen ? null : member.slug)}
              aria-expanded={isOpen}
              aria-controls="principal-bio"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              className="group relative bg-white text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-navy-900/5">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role} at Offset Capital`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className={`object-cover object-top transition-all duration-[1100ms] ease-offset group-hover:scale-[1.04] ${
                    isOpen ? 'grayscale-0' : 'grayscale-[0.55] group-hover:grayscale-0'
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isOpen ? 'opacity-0' : 'bg-navy-900/20 opacity-100 group-hover:opacity-0'
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 h-[3px] bg-gold-400 transition-all duration-700 ease-offset ${
                    isOpen ? 'w-full' : 'w-0 group-hover:w-1/3'
                  }`}
                />
              </div>
              <div className="flex items-end justify-between gap-4 px-5 py-6 sm:px-6">
                <div>
                  <h3 className="font-display text-[1.4rem] font-normal leading-tight text-navy-900">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-400">
                    {member.role}
                  </p>
                </div>
                <span
                  aria-hidden
                  className={`relative mb-1 block h-3 w-3 shrink-0 text-navy-700 transition-transform duration-500 ease-offset ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div id="principal-bio">
        <AnimatePresence initial={false} mode="wait">
          {current && (
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 border-b border-navy-900/10 py-12 lg:grid-cols-[18rem_1fr] lg:gap-16">
                <div>
                  <p className="eyebrow text-navy-700">{current.name}</p>
                  <p className="mt-5 max-w-[22ch] font-display text-[1.35rem] font-light leading-snug text-navy-900">
                    {current.focus}
                  </p>
                </div>
                <div className="prose-editorial max-w-measure-lg">
                  {current.bio.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
