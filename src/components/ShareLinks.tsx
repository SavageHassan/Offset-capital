'use client';

import { useEffect, useState } from 'react';

/**
 * Share row — mirrors the "Share this article" affordance on the live site.
 *
 * The absolute URL is only known in the browser, so it is resolved after mount.
 * Reading `window.location` during render would make the server and client
 * markup disagree and trip a hydration mismatch; the relative path is a valid
 * target in the meantime.
 */
export default function ShareLinks({ title, slug }: { title: string; slug: string }) {
  const [url, setUrl] = useState(`/news/${slug}`);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, [slug]);

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
      <span className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-500">
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
