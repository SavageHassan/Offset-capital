# Offset Capital — Website Revamp

A complete redesign and rebuild of the digital presence for **Offset Capital, LLC**, a nationwide
commercial real estate direct lender serving the middle market.

This repository contains a **presentation concept**. It is an independent build that does not touch,
deploy to, or otherwise affect the live site at `offsetcap.com`.

---

## The brief, in one line

Same company, same business, same credibility — a dramatically better website.

Every fact on this site is taken from Offset Capital's existing public content (audited
24 November 2026). No service, capability, figure, transaction, statistic, credential or claim has
been invented. Where the company has not published something, it is left out and flagged rather
than filled in.

---

## Brand & design system

### The three-colour palette

| Role | Hex | Token | Provenance |
| --- | --- | --- | --- |
| **Blue** (primary) | `#1A4072` | `navy.700` | **Sampled from the live logo.** The wordmark on offsetcap.com is an inline `<svg>` whose path is filled with `currentColor`; the computed value resolves to `rgb(26, 64, 114)`. |
| **White** (core) | `#FFFFFF` | — | Dominant surface. Carries the spacious, editorial layouts. |
| **Gold** (accent) | `#C6A15B` | `gold.400` | Hairlines, eyebrow ticks, hover sweeps, active states, pull-quote rules. Used sparingly and never as a fill for large areas. |

Everything else in the palette is a tint or shade derived from the logo blue, plus a narrow set of
warm neutral greys for body copy and rules. There is no fourth brand colour.

### The logo is preserved, not redrawn

`src/components/Logo.tsx` holds the company's existing logo path data copied **verbatim** from the
live site's inline SVG. It has not been retraced, simplified or restyled; it simply inherits
`currentColor` so it can reverse to white on navy.

The `OffsetMark` in the same file is a separate, original graphic device for this design system —
two offset squares finding equilibrium, echoing the footer line *"Neutralize, counteract,
counterbalance."* It is a motif, not a logo variant.

### Typography

- **Newsreader** (variable serif) — editorial display, headlines, financial figures, pull quotes.
- **Inter** — navigation, eyebrow labels, body copy, parameter values, UI.

Financial figures use `font-variant-numeric: tabular-nums` (`.tnum`) so columns of numbers stay in
vertical register.

---

## Pages

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/company` | The company — positioning, philosophy, principals, broker partners |
| `/strategies` | Financing capabilities — all three products with full parameter sheets |
| `/news` | News & transactions — featured article, filterable index, transaction index |
| `/news/[slug]` | Article (19 statically generated) |
| `/contact` | Contact — validated form, direct details, what to include |
| `/privacy` | Privacy policy |
| `404` | Not found |

Plus `POST /api/contact` and `POST /api/subscribe`.

---

## Content provenance

| Content | Source |
| --- | --- |
| Hero headline, positioning paragraph | offsetcap.com homepage |
| Company lead, financing philosophy | offsetcap.com/company |
| Principal names, titles, portraits, biographies | offsetcap.com/company (bio modals), verbatim |
| Senior Bridge Loan parameters (12 terms) | offsetcap.com/investments, verbatim |
| Subordinate Financing parameters (11 terms) | offsetcap.com/investments, verbatim |
| Construction Lending criteria (4 terms) | Company announcement, 29 Sep 2026 |
| All 19 articles — headlines, dates, categories, bodies, quotes | offsetcap.com/posts, verbatim |
| Transaction metadata (amount, asset type, location, detail) | Extracted from each announcement |
| Contact details, privacy policy | offsetcap.com/contact-us, /privacy-policy |
| Photography | Offset Capital's own Cloudinary asset library |

### Deliberate omissions

- **Construction lending** publishes only four criteria. Term, fees, recourse and prepayment are
  *not* shown, with an on-page note explaining why, rather than being inferred from the bridge sheet.
- The **Del Cerro** entry is marked as a disposition Offset was retained to manage, not a loan, so
  the transaction index does not imply it was a financing.
- **Experience figures** ($1.1B, $4.4B, 20+ years) are labelled on-page as the principals'
  individual track records at prior firms — explicitly *not* Offset Capital's own origination volume.
- The On The Edge podcast episode links are described but not linked, because the destination URLs
  were not captured during the audit.

---

## Technology

- **Next.js 14** (App Router) · **React 18** · **TypeScript** (strict)
- **Tailwind CSS 3** — design tokens in `tailwind.config.ts`
- **Framer Motion** — reveals, masked headlines, scroll-linked parallax, layout transitions
- **Lenis** — inertial smooth scrolling
- `next/font` for self-hosted Google fonts; `next/image` for responsive, AVIF/WebP delivery

No Three.js: nothing in this brief justified a 3D scene, and it would have cost performance for
decoration.

---

## Animation & interaction

| Where | What |
| --- | --- |
| Hero | Line-by-line masked headline reveal, scroll-linked photo parallax and content fade |
| Deal ticker | Continuous marquee of real closings; pauses on hover |
| Section headings | Masked line reveals triggered on scroll |
| Capital stack | Bands build from the base up; hover/focus promotes a position and cross-fades its detail |
| Transactions | Editorial index; the hovered row's photograph trails the cursor on a spring, others dim |
| Strategy rows | Alternating asymmetric layouts, image scale on hover, gold rule wipe |
| Imagery | `clip-path` reveal plus slow counter-scroll drift |
| News | Filter re-flow with staggered entry |
| Team | Portraits desaturate until selected; biography expands in place |
| Articles | Gold reading-progress hairline under the navigation |
| Buttons | Gold panel sweeps in from the left, label flips to navy, arrow advances |
| Navigation | Transparent over the hero, solid on scroll, hides on scroll-down; full-screen mobile panel with a clip-path wipe |

**Reduced motion** is honoured globally: `prefers-reduced-motion: reduce` collapses every
transition and animation, and Lenis is not initialised at all.

---

## Form delivery — configuration required

Both form endpoints validate fully **server-side** (`src/app/api/contact/route.ts`,
`src/app/api/subscribe/route.ts`). They are not fake: an invalid submission is rejected with
per-field errors that the UI maps back onto the inputs.

Delivery is not connected, because the live site stores submissions in **HubSpot** (per its
published privacy policy) and that needs credentials only Offset Capital can issue. Until they are
supplied, a valid submission is logged server-side and the visitor is told plainly that the preview
environment received it and that email delivery is not connected.

To go live, set:

```bash
HUBSPOT_PORTAL_ID=...            # HubSpot account ID
HUBSPOT_FORM_GUID=...            # contact form GUID
HUBSPOT_NEWSLETTER_FORM_GUID=... # mailing-list form GUID
HUBSPOT_SUBSCRIPTION_ID=...      # optional: newsletter subscription type ID
```

Both routes detect these automatically and switch to live submission with no code change.

---

## Running locally

```bash
npm install
npm run dev     # http://localhost:4310
```

```bash
npm run build && npm start
```

---

## Project structure

```
src/
  app/              routes, API handlers, global stylesheet
  components/       design system + interactive pieces
  data/             site.ts · team.ts · strategies.ts · posts.ts  ← all company facts
  lib/motion.ts     shared easing, variants, viewport settings
```

All company content lives in `src/data/`. Nothing factual is hard-coded into a component, so copy
can be reviewed in one place.

---

## Production safety

The live site is untouched. No DNS change, no hosting change, no deployment to the production
domain. This is a standalone build intended for presentation.
