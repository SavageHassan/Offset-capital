'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE, VIEWPORT } from '@/lib/motion';

type Props = {
  lines: readonly string[];
  className?: string;
  /** Render immediately rather than on scroll — used in hero mastheads. */
  immediate?: boolean;
  delay?: number;
  as?: 'h1' | 'h2' | 'p';
};

const TAGS = { h1: motion.h1, h2: motion.h2, p: motion.p } as const;

const line = (delay: number, i: number): Variants => ({
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.05, ease: EASE, delay: delay + i * 0.11 } },
});

/**
 * Editorial headline that reveals one line at a time from behind a mask.
 *
 * The scroll trigger lives on the heading element itself, never on the masked
 * line: a line starts translated fully below its own `overflow: hidden` box, so
 * it is clipped out of the layout and an IntersectionObserver attached to it
 * would never report it as visible. Observing the (always visible) heading and
 * propagating a variant avoids that deadlock.
 */
export default function SplitHeading({
  lines,
  className = '',
  immediate = false,
  delay = 0,
  as = 'h2',
}: Props) {
  const Tag = TAGS[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: VIEWPORT })}
    >
      {lines.map((text, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={line(delay, i)}>
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
