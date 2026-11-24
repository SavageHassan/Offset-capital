'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 font-sans text-label-lg font-medium uppercase no-underline transition-colors duration-500 ease-offset';

const variants = {
  solid: 'bg-navy-700 text-white hover:text-navy-900',
  outline: 'border border-navy-700/25 text-navy-800 hover:text-navy-900',
  ghost: 'border border-white/25 text-white hover:text-navy-900',
  /** Highest-emphasis action on a dark field. */
  gold: 'bg-gold-400 text-navy-900 hover:text-white',
} as const;

const sweep = {
  solid: 'bg-gold-400',
  outline: 'bg-gold-200',
  ghost: 'bg-white',
  gold: 'bg-navy-900',
} as const;

type Props = {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * Primary action. A gold panel sweeps in from the left on hover and the label
 * flips to navy — restrained, but unmistakably a considered interaction.
 */
export default function Button({
  children,
  href,
  variant = 'solid',
  className = '',
  type = 'button',
  disabled,
  onClick,
}: Props) {
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -translate-x-full transition-transform duration-[650ms] ease-offset group-hover:translate-x-0 ${sweep[variant]}`}
      />
      <span className="relative z-10 tracking-[0.16em]">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 ease-offset group-hover:translate-x-1"
      >
        <path
          d="M4 12h15M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
      </svg>
    </>
  );

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');
    if (external) {
      return (
        <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
