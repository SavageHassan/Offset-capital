import Link from 'next/link';
import { Logo } from './Logo';
import MailingList from './MailingList';
import { nav, site } from '@/data/site';

/**
 * Footer. Deliberately compact: the closing call to action directly above it
 * already carries the contact details at display size, so this is a utility
 * band — three columns, one line of legal, nothing oversized.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white">
      {/* Cropped brand watermark, held well back. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[18%] right-[-4%] hidden w-[34%] text-white/[0.03] lg:block"
      >
        <Logo className="h-auto w-full" />
      </div>

      <div className="shell relative py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.7fr_1fr] lg:gap-14">
          {/* Identity + contact */}
          <div>
            <Link href="/" aria-label="Offset Capital — home" className="block w-[8.5rem] text-white">
              <Logo className="h-auto w-full" />
            </Link>
            <div className="mt-6 space-y-1.5">
              <a
                href={`mailto:${site.email}`}
                className="link-underline block font-sans text-sm text-white/80 hover:text-white"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="link-underline tnum block font-sans text-sm text-white/80 hover:text-white"
              >
                {site.phone}
              </a>
            </div>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-gold-400"
            >
              <svg viewBox="0 0 448 512" className="h-3 w-3 fill-current" aria-hidden>
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="eyebrow text-white/40">Navigate</p>
            <ul className="mt-5 space-y-2.5">
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
            </ul>
          </nav>

          {/* Mailing list */}
          <div>
            <p className="eyebrow text-white/40">Join our mailing list</p>
            <div className="mt-5">
              <MailingList />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-sm italic text-gold-400/75">{site.motto}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans text-xs text-white/40 transition-colors hover:text-white/70">
              Privacy policy
            </Link>
            <p className="font-sans text-xs text-white/35">
              © {year} {site.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
