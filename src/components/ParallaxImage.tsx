'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/motion';

/**
 * Image that reveals from a clip-path mask on entry, then drifts slowly
 * against the scroll. Both effects collapse to nothing under reduced motion
 * (handled globally in globals.css).
 */
export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  aspect = 'aspect-[4/5]',
  sizes = '(max-width: 1024px) 100vw, 50vw',
  distance = 12,
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  distance?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.3, ease: EASE }}
      className={`relative overflow-hidden bg-navy-900/5 ${aspect} ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.18]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
