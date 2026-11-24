'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/data/posts';
import { EASE, VIEWPORT } from '@/lib/motion';

export function CategoryTag({ category, tone = 'light' }: { category: string | null; tone?: 'light' | 'dark' }) {
  if (!category) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-sans text-[0.5625rem] font-medium uppercase tracking-[0.18em] ${
        tone === 'dark' ? 'border-white/25 text-white/75' : 'border-navy-900/15 text-navy-700'
      }`}
    >
      <span aria-hidden className="block h-1 w-1 rotate-45 bg-gold-400" />
      {category}
    </span>
  );
}

/** Editorial card used across the news grid and "related reading". */
export default function ArticleCard({
  post,
  index = 0,
  size = 'default',
}: {
  post: Post;
  index?: number;
  size?: 'default' | 'compact';
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay: Math.min(index, 5) * 0.07 }}
      className="group"
    >
      <Link href={`/news/${post.slug}`} className="block">
        <div className="relative overflow-hidden bg-navy-900/5">
          <div className={size === 'compact' ? 'aspect-[16/10]' : 'aspect-[4/3]'}>
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1100ms] ease-offset group-hover:scale-[1.06]"
            />
          </div>
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-[800ms] ease-offset group-hover:scale-x-100"
          />
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-4">
            <CategoryTag category={post.category} />
            <time dateTime={post.date} className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-stone-400">
              {post.dateLabel}
            </time>
          </div>
          <h3
            className={`mt-5 font-display font-light leading-[1.2] text-navy-900 transition-colors duration-500 group-hover:text-navy-700 ${
              size === 'compact' ? 'text-[1.3rem]' : 'text-[1.5rem]'
            }`}
          >
            {post.title}
          </h3>
          {size === 'default' && (
            <p className="mt-3.5 max-w-measure font-sans text-[0.9375rem] leading-relaxed text-stone-500">
              {post.excerpt}
            </p>
          )}
          <span className="mt-6 inline-flex items-center gap-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-navy-700">
            Read more
            <span
              aria-hidden
              className="block h-px w-7 bg-gold-400 transition-all duration-500 ease-offset group-hover:w-12"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
