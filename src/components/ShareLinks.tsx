'use client';

import { useState } from 'react';

/** Share row — mirrors the "Share this article" affordance on the live site. */
export default function ShareLinks({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window === 'undefined' ? `/news/${slug}` : window.location.href;

  const items = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
      <span className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-400">
        Share this article
      </span>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="link-underline font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-navy-700"
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
          } catch {
            setCopied(false);
          }
        }}
        className="link-underline font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-navy-700"
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}
