'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { Post } from '@/data/posts';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * The complete transaction record, grouped by year.
 *
 * Deliberately a different object from the homepage's `TransactionIndex`: that
 * one is a showcase of selected closings with a cursor-tracking photograph,
 * this is the full ledger — typographic, dense, scannable, no imagery. Same
 * underlying data, two jobs.
 */
export default function TransactionTable({ items }: { items: Post[] }) {
  const years = useMemo(() => {
    const map = new Map<string, Post[]>();
    for (const post of items) {
      const year = post.date.slice(0, 4);
      map.set(year, [...(map.get(year) ?? []), post]);
    }
    return [...map.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [items]);

  return (
    <div>
      {years.map(([year, rows], groupIndex) => (
        <section key={year} className="mt-14 first:mt-0">
          <div className="flex items-baseline gap-6">
            <h3 className="tnum font-display text-[2rem] font-extralight leading-none text-navy-900">
              {year}
            </h3>
            <span aria-hidden className="h-px flex-1 bg-navy-900/15" />
            <span className="tnum font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-400">
              {rows.length} {rows.length === 1 ? 'transaction' : 'transactions'}
            </span>
          </div>

          <ul className="mt-6">
            {rows.map((post, i) => {
              const deal = post.deal!;
              return (
                <motion.li
                  key={post.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 5) * 0.05 + groupIndex * 0.04 }}
                  className="border-b border-navy-900/10"
                >
                  <Link
                    href={`/news/${post.slug}`}
                    className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-1.5 py-5 md:grid-cols-[9rem_9rem_minmax(0,1fr)_10rem_1.5rem]"
                  >
                    <span className="tnum font-display text-[1.3rem] font-normal leading-none text-navy-700 transition-colors duration-400 group-hover:text-gold-600 md:text-[1.45rem]">
                      {deal.amount}
                    </span>

                    <span className="font-sans text-[0.625rem] uppercase tracking-[0.16em] text-stone-400">
                      {deal.kind === 'equity'
                        ? 'Preferred equity'
                        : deal.kind === 'advisory'
                          ? 'Advisory — sale'
                          : 'Loan'}
                    </span>

                    <span className="min-w-0 font-sans text-[0.9375rem] leading-snug text-navy-900 transition-colors duration-400 group-hover:text-navy-700">
                      {deal.detail}
                    </span>

                    <span className="min-w-0 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-stone-500 md:text-[0.6875rem]">
                      {deal.location}
                    </span>

                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="hidden h-3.5 w-3.5 shrink-0 -translate-x-1 self-center opacity-0 transition-all duration-400 ease-offset group-hover:translate-x-0 group-hover:opacity-100 md:block"
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="#C6A15B" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
