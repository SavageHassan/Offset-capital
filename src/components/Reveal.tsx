'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { VIEWPORT, ease } from '@/lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'span' | 'section';
};

/** Scroll-triggered fade-and-rise. The workhorse reveal of the site. */
export default function Reveal({ children, className, delay = 0, y = 22, as = 'div' }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...ease, delay }}
    >
      {children}
    </Tag>
  );
}
