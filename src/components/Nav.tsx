'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { nav, site } from '@/data/site';
import { EASE } from '@/lib/motion';

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState(0);

  // On the homepage the bar starts transparent over the hero photograph.
  const overHero = pathname === '/' && !solid;

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 40);
    setHidden(y > 420 && y > last);
    setLast(y);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-offset ${
          overHero || open
            ? 'bg-transparent'
            : 'border-b border-navy-900/8 bg-white/88 backdrop-blur-xl'
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-8">
          <Link
            href="/"
            aria-label="Offset Capital — home"
            className={`block w-[8.5rem] shrink-0 transition-colors duration-500 lg:w-[9.75rem] ${
              overHero || open ? 'text-white' : 'text-navy-700'
            }`}
          >
            <Logo className="h-auto w-full" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline font-sans text-label font-medium uppercase transition-colors duration-300 ${
                    overHero
                      ? 'text-white/80 hover:text-white'
                      : active
                        ? 'text-navy-700'
                        : 'text-stone-600 hover:text-navy-700'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span aria-hidden className="ml-2 inline-block h-1 w-1 rotate-45 bg-gold-400 align-middle" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a
              href={`mailto:${site.email}`}
              className={`group inline-flex items-center gap-3 border px-5 py-3 font-sans text-label font-medium uppercase tracking-[0.16em] transition-all duration-500 ease-offset ${
                overHero
                  ? 'border-white/30 text-white hover:border-gold-400 hover:bg-gold-400 hover:text-navy-900'
                  : 'border-navy-700/20 text-navy-700 hover:border-gold-400 hover:bg-gold-400 hover:text-navy-900'
              }`}
            >
              Submit a deal
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`relative z-50 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden ${
              overHero || open ? 'text-white' : 'text-navy-800'
            }`}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block h-px w-6 bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block h-px w-6 bg-current"
            />
          </button>
        </div>
        <div
          aria-hidden
          className={`h-px origin-left bg-gold-400 transition-transform duration-700 ease-offset ${
            solid && !open ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </motion.header>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-navy-900 px-gutter pb-12 pt-[calc(var(--nav-h)+3rem)] lg:hidden"
          >
            <nav className="flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.6, ease: EASE }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline justify-between py-5 font-display text-[2rem] font-light text-white"
                  >
                    {item.label}
                    <span className="font-sans text-label text-gold-400">{`0${i + 1}`}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="space-y-1 font-sans text-sm text-white/60"
            >
              <p className="eyebrow mb-4 text-gold-400">Contact</p>
              <a href={`mailto:${site.email}`} className="block text-white">
                {site.email}
              </a>
              <a href={site.phoneHref} className="block text-white">
                {site.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
