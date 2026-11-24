'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Post } from '@/data/posts';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * Selected transactions, presented as an editorial index.
 *
 * Purely typographic: no photograph follows the cursor and none is inlined.
 * A floating preview covered the very rows the reader was trying to scan, and
 * the deal photography has a proper home on each article page. Hover now does
 * one quiet thing — it brings the hovered row forward and lets the others
 * recede.
 */
export default function TransactionIndex({ items }: { items: Post[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <ul className="border-t border-navy-900/10" onMouseLeave={() => setActive(null)}>
      {items.map((post, i) => {
        const deal = post.deal!;
        const dim = active !== null && active !== i;
        return (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 6) * 0.05 }}
            onMouseEnter={() => setActive(i)}
            className="border-b border-navy-900/10"
          >
            <Link
              href={`/news/${post.slug}`}
              className={`group grid grid-cols-1 items-baseline gap-x-10 gap-y-2 py-7 transition-opacity duration-500 ease-offset md:grid-cols-[11rem_minmax(0,1fr)_9.5rem_10rem] md:py-8 ${
                dim ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <span className="tnum font-display text-[1.75rem] font-normal leading-none text-navy-700 transition-colors duration-500 group-hover:text-gold-600 md:text-[2rem]">
                {deal.amount}
              </span>

              <span className="min-w-0">
                <span className="block font-sans text-[0.9375rem] leading-snug text-navy-900 transition-colors duration-500 group-hover:text-navy-700">
                  {deal.detail}
                </span>
                <span className="mt-1.5 block font-sans text-[0.8125rem] text-stone-400 md:hidden">
                  {deal.assetType} · {deal.location}
                </span>
              </span>

              <span className="hidden font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-stone-500 md:block">
                {deal.assetType}
              </span>

              <span className="hidden items-center justify-between gap-3 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-stone-500 md:flex">
                <span className="min-w-0">{deal.location}</span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-500 ease-offset group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="#C6A15B" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
