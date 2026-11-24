'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';
import type { Post } from '@/data/posts';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * Selected transactions, presented as an editorial index rather than a grid of
 * cards. Hovering a row brings up that deal's photograph, which trails the
 * cursor on a spring. On touch and at small sizes the image sits inline
 * instead, so nothing depends on a pointer.
 */
export default function TransactionIndex({ items }: { items: Post[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.4 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const box = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - box.left);
        y.set(e.clientY - box.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      {/* Cursor-following preview — desktop pointers only. */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative h-[16rem] w-[22rem] overflow-hidden bg-navy-900">
                <Image
                  src={items[active].image}
                  alt=""
                  fill
                  sizes="352px"
                  className="object-cover"
                />
              </div>
              <span aria-hidden className="absolute -bottom-px left-0 h-px w-20 bg-gold-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ul className="relative z-10 border-t border-navy-900/10">
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
                className={`group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 py-7 transition-opacity duration-500 ease-offset md:grid-cols-[7.5rem_1fr_9rem_8.5rem] md:gap-x-8 md:py-8 ${
                  dim ? 'opacity-35' : 'opacity-100'
                }`}
              >
                <span className="tnum font-display text-[1.75rem] font-normal leading-none text-navy-700 transition-colors duration-500 group-hover:text-gold-600 md:text-[2.125rem]">
                  {deal.amount}
                </span>

                <span className="col-span-full md:col-span-1 md:col-start-2">
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

                <span className="hidden items-center justify-between font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-stone-500 md:flex">
                  {deal.location}
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="ml-3 h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-500 ease-offset group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="#C6A15B" strokeWidth="1.6" strokeLinecap="square" />
                  </svg>
                </span>

                {/* Inline image for touch / small screens. */}
                <span className="col-span-full mt-2 block overflow-hidden lg:hidden">
                  <span className="relative block aspect-[16/9] w-full bg-navy-900/5">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 320px"
                      className="object-cover"
                    />
                  </span>
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
