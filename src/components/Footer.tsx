import Link from 'next/link';
import { Logo, OffsetMark } from './Logo';
import MailingList from './MailingList';
import { nav, site } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white">
      {/* Oversized brand watermark, cropped by the viewport edge. */}
      <div aria-hidden className="pointer-events-none absolute -bottom-[14%] right-[-6%] w-[58%] text-white/[0.035]">
        <Logo className="h-auto w-full" />
      </div>

      <div className="shell relative py-section">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <OffsetMark className="h-9 w-9 text-white/30" />
            <p className="mt-9 max-w-measure font-display text-display-sm font-light leading-[1.18] text-white">
              Have a transaction that needs speed, flexibility and certainty of execution?
            </p>
            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${site.email}`}
                className="link-underline block font-sans text-lg text-white/90 hover:text-white"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="link-underline tnum block font-sans text-lg text-white/90 hover:text-white"
              >
                {site.phone}
              </a>
            </div>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 font-sans text-label font-medium uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-gold-400"
            >
              <svg viewBox="0 0 448 512" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
              LinkedIn
            </a>
          </div>

          <div className="grid gap-14 sm:grid-cols-2 lg:gap-10">
            <div>
              <p className="eyebrow text-white/40">Navigate</p>
              <ul className="mt-7 space-y-3.5">
                <li>
                  <Link href="/" className="link-underline font-sans text-sm text-white/70 hover:text-white">
                    Home
                  </Link>
                </li>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline font-sans text-sm text-white/70 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/privacy" className="link-underline font-sans text-sm text-white/70 hover:text-white">
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/40">Join our mailing list</p>
              <div className="mt-7">
                <MailingList />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-base italic text-gold-400/80">{site.motto}</p>
            <p className="font-sans text-xs text-white/35">
              © {year} {site.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
