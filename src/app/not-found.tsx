import Link from 'next/link';
import Button from '@/components/Button';
import { OffsetMark } from '@/components/Logo';
import { nav } from '@/data/site';

export default function NotFound() {
  return (
    <section className="grain flex min-h-[100svh] items-center bg-navy-950 text-white">
      <div className="shell py-section">
        <OffsetMark className="h-11 w-11 text-white/55" />
        <p className="eyebrow mt-10 text-gold-400">404</p>
        <h1 className="mt-7 max-w-[20ch] font-display text-display-lg font-extralight leading-[1.04]">
          This page could not be found.
        </h1>
        <p className="mt-8 max-w-measure font-sans text-[1.0625rem] leading-[1.75] text-white/60">
          The page you were looking for has moved or no longer exists. The sections below cover
          everything on the site.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/" variant="ghost">
            Return home
          </Button>
        </div>
        <ul className="mt-16 grid gap-px border-t border-white/15 pt-px sm:grid-cols-2 lg:grid-cols-4">
          {nav.map((item, i) => (
            <li key={item.href}>
              <Link href={item.href} className="group block py-7 pr-6">
                <span className="tnum font-sans text-[0.625rem] uppercase tracking-[0.18em] text-gold-400">
                  {`0${i + 1}`}
                </span>
                <span className="mt-3 block font-display text-[1.35rem] font-light transition-colors group-hover:text-gold-400">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
