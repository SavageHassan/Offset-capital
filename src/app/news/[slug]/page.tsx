import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import SplitHeading from '@/components/SplitHeading';
import ArticleCard, { CategoryTag } from '@/components/ArticleCard';
import ReadingProgress from '@/components/ReadingProgress';
import ShareLinks from '@/components/ShareLinks';
import Button from '@/components/Button';
import CTA from '@/components/CTA';
import { Section, SectionLabel } from '@/components/Section';
import { getPost, posts, related } from '@/data/posts';
import { site } from '@/data/site';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: 'Not found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

/** Splits a headline into two balanced lines for the masked reveal. */
function splitTitle(title: string): string[] {
  const words = title.split(' ');
  if (words.length < 5) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const more = related(post.slug, 3);

  return (
    <>
      <ReadingProgress />

      {/* ─── Masthead ────────────────────────────────────────────────── */}
      <Section tone="deep" className="grain overflow-hidden">
        <div className="shell pb-[clamp(3.5rem,7vh,6rem)] pt-[calc(var(--nav-h)+clamp(4rem,9vh,7rem))]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-white/45">
            <Link href="/" className="transition-colors hover:text-gold-400">
              Offset Capital
            </Link>
            <span aria-hidden className="h-px w-5 bg-white/25" />
            <Link href="/news" className="transition-colors hover:text-gold-400">
              News &amp; transactions
            </Link>
          </nav>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <CategoryTag category={post.category} tone="dark" />
            <time dateTime={post.date} className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-white/50">
              {post.dateLabel}
            </time>
          </div>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            lines={splitTitle(post.title)}
            className="mt-8 max-w-[24ch] font-display text-display-md font-extralight leading-[1.07] text-white"
          />

          {/* Deal summary strip, for transaction announcements. */}
          {post.deal && (
            <Reveal delay={0.3}>
              <dl className="mt-14 grid gap-px border-t border-white/15 pt-px sm:grid-cols-3">
                {[
                  { label: post.deal.kind === 'equity' ? 'Investment' : post.deal.kind === 'advisory' ? 'Sale price' : 'Loan amount', value: post.deal.amount },
                  { label: 'Asset type', value: post.deal.assetType },
                  { label: 'Location', value: post.deal.location },
                ].map((row) => (
                  <div key={row.label} className="py-7 sm:pr-8">
                    <dt className="font-sans text-[0.5625rem] uppercase tracking-[0.18em] text-white/40">
                      {row.label}
                    </dt>
                    <dd className="tnum mt-3 font-display text-[1.5rem] font-light text-white">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </Section>

      {/* ─── Lead image ──────────────────────────────────────────────── */}
      <div className="relative bg-navy-950">
        <div className="shell">
          <div className="relative -mt-px aspect-[16/9] overflow-hidden bg-navy-900 lg:aspect-[21/9]">
            <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-white" style={{ zIndex: -1 }} />
      </div>

      {/* ─── Body ────────────────────────────────────────────────────── */}
      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,42rem)_1fr] lg:gap-10">
            {/* Left rail */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-400">
                Published
              </p>
              <p className="mt-2.5 font-display text-lg font-light text-navy-900">{post.dateLabel}</p>
              {post.category && (
                <>
                  <p className="mt-8 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-stone-400">
                    Category
                  </p>
                  <p className="mt-2.5 font-display text-lg font-light text-navy-900">{post.category}</p>
                </>
              )}
              <div className="offset-rule mt-8 max-w-[8rem] text-navy-900" />
            </aside>

            {/* Article */}
            <article className="prose-editorial">
              <Reveal>
                <p className="mb-10 font-display text-[1.35rem] font-light leading-[1.5] text-navy-900">
                  {post.excerpt}
                </p>
              </Reveal>

              {post.body.map((block, i) => {
                if (block.t === 'h2') {
                  return (
                    <Reveal key={i}>
                      <h2>{block.c}</h2>
                    </Reveal>
                  );
                }
                if (block.t === 'ul') {
                  return (
                    <Reveal key={i}>
                      <ul>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                }
                if (block.t === 'dl') {
                  return (
                    <Reveal key={i}>
                      <dl className="my-8 grid gap-px bg-navy-900/10 sm:grid-cols-2">
                        {block.items.map((item) => (
                          <div key={item.label} className="bg-white px-5 py-6">
                            <dt className="font-sans text-[0.5625rem] uppercase tracking-[0.18em] text-stone-400">
                              {item.label}
                            </dt>
                            <dd className="tnum mt-2.5 font-display text-[1.35rem] font-light text-navy-900">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </Reveal>
                  );
                }
                if (block.t === 'quote') {
                  return (
                    <Reveal key={i}>
                      <blockquote className="my-12 border-l-2 border-gold-400 pl-7">
                        <p className="font-display text-[1.4rem] font-light italic leading-[1.45] text-navy-900">
                          “{block.c}”
                        </p>
                        <footer className="mt-5 font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-stone-400">
                          {block.by}
                        </footer>
                      </blockquote>
                    </Reveal>
                  );
                }
                return (
                  <Reveal key={i}>
                    <p>{block.c}</p>
                  </Reveal>
                );
              })}

              <div className="mt-14 border-t border-navy-900/12 pt-9">
                <ShareLinks title={post.title} slug={post.slug} />
              </div>

              <Reveal>
                <div className="mt-12 bg-stone-50 px-7 py-9">
                  <p className="eyebrow text-navy-700">Discuss a transaction</p>
                  <p className="mt-5 font-display text-[1.3rem] font-light leading-snug text-navy-900">
                    Reach out to us directly to discuss your deal.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-4">
                    <Button href={`mailto:${site.email}`}>{site.email}</Button>
                    <Button href="/strategies" variant="outline">
                      Lending capabilities
                    </Button>
                  </div>
                </div>
              </Reveal>
            </article>

            <div aria-hidden className="hidden lg:block" />
          </div>
        </div>
      </Section>

      {/* ─── Related ─────────────────────────────────────────────────── */}
      <Section tone="stone" className="py-section">
        <div className="shell">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionLabel>Related reading</SectionLabel>
              <SplitHeading
                lines={['More from Offset']}
                className="mt-7 font-display text-display-sm font-light leading-[1.1] text-navy-900"
              />
            </div>
            <Button href="/news" variant="outline">
              All posts
            </Button>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {more.map((p, i) => (
              <ArticleCard key={p.slug} post={p} index={i} size="compact" />
            ))}
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
