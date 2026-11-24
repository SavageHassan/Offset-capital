'use client';

import type { Post } from '@/data/posts';

/**
 * Closed-transaction ticker running beneath the hero. Every entry is a real
 * closing announced by Offset Capital; the list is duplicated once so the
 * CSS translation loops seamlessly.
 */
export default function DealTicker({ items }: { items: Post[] }) {
  const entries = items.map((p) => ({
    amount: p.deal!.amount,
    asset: p.deal!.assetType,
    location: p.deal!.location,
  }));
  const doubled = [...entries, ...entries];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy-950/60 py-5 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
        {doubled.map((e, i) => (
          <div key={i} className="flex shrink-0 items-center gap-4" aria-hidden={i >= entries.length}>
            <span aria-hidden className="block h-1 w-1 rotate-45 bg-gold-400" />
            <span className="tnum font-display text-lg font-normal text-white">{e.amount}</span>
            <span className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-white/45">
              {e.asset}
            </span>
            <span className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-white/30">
              {e.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
