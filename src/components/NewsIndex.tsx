'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import ArticleCard, { CategoryTag } from './ArticleCard';
import { categories, type Post } from '@/data/posts';
import { EASE } from '@/lib/motion';

/**
 * Editorial news index: a full-bleed featured article, then a filterable grid.
 * Filtering is client-side over the full set — the list re-flows with a short
 * stagger so the change reads as intentional rather than as a page jump.
 */
export default function NewsIndex({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [featured, ...rest] = posts;

  const visible = useMemo(
    () => (filter === 'All' ? rest : rest.filter((p) => p.category === filter)),
    [filter, rest],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: rest.length };
    for (const c of categories) map[c] = rest.filter((p) => p.category === c).length;
    return map;
  }, [rest]);

  return (
    <>
      {/* ─── Featured ─────────────────────────────────────────────────── */}
      <motion.article
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="group"
      >
        <Link href={`/news/${featured.slug}`} className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
          <div className="relative overflow-hidden bg-navy-900/5">
            <div className="aspect-[16/10]">
              <Image
                src={featured.image}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[1200ms] ease-offset group-hover:scale-[1.04]"
              />
            </div>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-[900ms] ease-offset group-hover:scale-x-100"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 bg-navy-700 px-3 py-1.5 font-sans text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-white">
                Latest
              </span>
              <CategoryTag category={featured.category} />
              <time
                dateTime={featured.date}
                className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-stone-400"
              >
                {featured.dateLabel}
              </time>
            </div>
            <h2 className="mt-7 max-w-[26ch] font-display text-display-sm font-light leading-[1.12] text-navy-900 transition-colors duration-500 group-hover:text-navy-700">
              {featured.title}
            </h2>
            <p className="prose-editorial mt-6 max-w-measure">{featured.excerpt}</p>
            <span className="mt-9 inline-flex items-center gap-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-navy-700">
              Read the article
              <span
                aria-hidden
                className="block h-px w-9 bg-gold-400 transition-all duration-500 ease-offset group-hover:w-16"
              />
            </span>
          </div>
        </Link>
      </motion.article>

      {/* ─── Filters ─────────────────────────────────────────────────── */}
      <div className="mt-section flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-navy-900/10 py-6">
        <span className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-400">
          Filter
        </span>
        {['All', ...categories].map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={active}
              className={`group relative font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                active ? 'text-navy-700' : 'text-stone-400 hover:text-navy-700'
              }`}
            >
              {c}
              <span className="ml-2 tnum text-[0.5625rem] text-stone-300">{counts[c] ?? 0}</span>
              <span
                aria-hidden
                className={`absolute -bottom-2 left-0 h-px bg-gold-400 transition-all duration-500 ease-offset ${
                  active ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* ─── Grid ────────────────────────────────────────────────────── */}
      <div className="mt-16 min-h-[24rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((post, i) => (
              <ArticleCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <p className="font-sans text-sm text-stone-400">No posts in this category yet.</p>
        )}
      </div>
    </>
  );
}
