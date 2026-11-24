import type { ReactNode } from 'react';

export function Section({
  children,
  className = '',
  tone = 'white',
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'white' | 'stone' | 'navy' | 'deep';
  id?: string;
}) {
  const tones = {
    white: 'bg-white text-navy-900',
    stone: 'bg-stone-50 text-navy-900',
    navy: 'bg-navy-900 text-white',
    deep: 'bg-navy-950 text-white',
  } as const;
  return (
    <section id={id} className={`relative ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionLabel({
  children,
  tone = 'light',
  className = '',
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <p className={`eyebrow ${tone === 'dark' ? 'text-gold-400' : 'text-navy-700'} ${className}`}>
      {children}
    </p>
  );
}
