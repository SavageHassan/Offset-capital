'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline gold reading-progress bar pinned under the navigation. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-[var(--nav-h)] z-40 h-[2px] origin-left bg-gold-400"
    />
  );
}
