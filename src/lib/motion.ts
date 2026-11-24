import type { Transition, Variants } from 'framer-motion';

/** Shared easing — a long, settled ease-out used across the whole site. */
export const EASE = [0.19, 1, 0.22, 1] as const;

export const ease: Transition = { duration: 0.9, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: ease },
};

/** Stagger container — children declare `fadeUp` or `maskUp`. */
export const stagger = (delay = 0, each = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** Clip-path reveal used for headline lines and images. */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.05, ease: EASE } },
};

export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.12 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1.35, ease: EASE },
  },
};

export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;
