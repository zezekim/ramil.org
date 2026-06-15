# ramil.org

Personal portfolio site for **Ramil** — an AI-native developer. A single-page,
dark "terminal/cyberpunk" experience that showcases production systems, client work, and
tools, built with the Next.js App Router.

> **Tagline:** _I build systems that know what to do next._

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Sections & components](#sections--components)
- [Featured work](#featured-work)
- [Design system](#design-system)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Search-engine indexing](#search-engine-indexing)
- [License](#license)

---

## Overview

`ramil.org` is a statically-composed marketing/portfolio site. It renders a hero with an
animated terminal "status dashboard", an auto-scrolling tech marquee, a grid of project
cards (each opening a detail modal), a "how I work" process section, a capabilities grid,
and a contact section.

The aesthetic is a near-black background (`#02020a`) with cyan (`#00f5ff`) and purple
(`#7c3aed`) accents, monospace headings (JetBrains Mono), a grid background, scanline
overlay, a mouse-following spotlight, and a scroll-progress bar.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI runtime | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 + custom CSS design system (`app/globals.css`) |
| Animation | Framer Motion, CSS keyframes / styled-jsx |
| Icons | lucide-react |
| Fonts | Inter (sans) + JetBrains Mono (mono) via `next/font` |
| Analytics | `@vercel/analytics` |

## Project structure

```
.
├── app/
│   ├── globals.css        # design system: glass cards, glow, terminal, badges, buttons
│   ├── layout.tsx         # fonts, metadata/SEO, robots noindex, Analytics
│   └── page.tsx           # composes all sections
├── components/
│   ├── Nav.tsx            # fixed nav, scroll state, active-section highlighting
│   ├── Hero.tsx           # animated terminal dashboard, Manila clock, headline reveal
│   ├── TechMarquee.tsx    # dual-row auto-scrolling tech badges
│   ├── Work.tsx           # project data + cards + detail modal
│   ├── Process.tsx        # "how I work" steps with code snippets
│   ├── Skills.tsx         # capabilities grid
│   ├── Contact.tsx        # CTA + footer
│   ├── Stats.tsx          # animated counters (currently not mounted in page.tsx)
│   ├── MouseSpotlight.tsx # cursor-following radial glow
│   └── ScrollProgress.tsx # top scroll-progress bar
├── hooks/
│   ├── useCounter.ts      # eased count-up animation
│   └── useInView.ts       # IntersectionObserver wrapper
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## Sections & components

- **Nav** — fixed top bar that gains a blurred background on scroll, highlights the active
  section via `IntersectionObserver`, and collapses to a hamburger menu on mobile.
- **Hero** — a typed terminal "status dashboard" that reveals rows on a timer, a live
  Manila clock (UTC+8), a staggered headline reveal, mini-stats, and an "Available for
  Remote Work" floating badge.
- **TechMarquee** — two infinite marquee rows (opposite directions) of tech badges with
  faded edges.
- **Work** — the project catalogue. Projects are defined as data and rendered as a
  featured card plus a responsive grid; clicking a card opens a modal with stats, a
  description, technical bullets, and the stack.
- **Process** — three steps ("Think before you build", "Multiply, don't shortcut",
  "Ship for the long run") paired with illustrative code snippets, revealed on scroll.
- **Skills** — six capability cards (AI & Automation, Backend, Real-Time, Frontend &
  Mobile, Infrastructure, Approach).
- **Contact** — closing CTA and footer.

## Featured work

The project grid is data-driven (`components/Work.tsx`). Current entries, in order:

1. **Seoul.fm** _(flagship)_ — a 17-year K-pop streaming platform: multi-bitrate
   spatial-audio HLS, pitch-scored karaoke, real-time chat, Chromecast, a Flutter Android
   app, a self-hosted FFmpeg/CMAF encoder, and a dual REST/SSE API.
2. **MX Sentinel** — a 19-service Go mesh for email-infrastructure observability,
   correlating SMTP telemetry, DNS auth state, and DMARC reports into AI root-cause
   diagnostics.
3. **dmarcparser** — a DMARC reporting suite: a Go parser + viewer and a multi-tenant
   WHMCS client module.
4. **AI CX System** — a luxury retailer's customer-experience layer: RAG knowledge base,
   reply generation, and n8n orchestration.
5. **InboxAI** — Gmail triage and draft generation in the user's voice via Claude + n8n.
6. **ListingLaunch** — a real-estate marketing-kit generator (email, captions, PDF flyer,
   9:16 Remotion video).
7. **ZoomTranscribe** — self-hosted Zoom-recording transcription with Whisper and AI notes.
8. **PlumbingBros AI Quote Builder** — an AI quoting tool with deterministic server-side
   maths and forced-tool-call structured output.
9. **Help2Move** — a Dutch moving-service landing page with a Google Places-powered,
   multi-step quote form.
10. **Test Tools** — a 3-in-1 utility (AI email drafts, Telegram voice logger, live radio
    dashboard).

To add or edit a card, update the `PROJECTS` array in `components/Work.tsx`. Each entry
follows the `Project` type (`id`, `status`, `emoji`, `title`, `tagline`, `description`,
`tags`, `stats`, `bullets`, `tech`, optional `featured`).

## Design system

Reusable classes live in `app/globals.css` and the theme is extended in
`tailwind.config.ts`:

- **Surfaces:** `.glass-card`, `.terminal`, `.terminal-header`
- **Glow:** `.glow-cyan`, `.glow-purple`, `.text-glow-cyan`
- **Badges:** `.tech-badge`, `.badge-live`, `.badge-new`
- **Buttons:** `.btn-primary`, `.btn-secondary`
- **Type/decor:** `.section-label`, `.gradient-text`, `.divider`, `.grid-bg`, `.scanlines`
- **Animations:** `marquee-left/right`, `pulse-glow`, `cursor-blink`, `float`, `scan`

Theme tokens (colors, fonts, keyframes, background patterns) are defined under
`theme.extend` in `tailwind.config.ts`.

## Getting started

**Prerequisites:** Node.js 18.18+ (Node 20+ recommended) and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:3000)
npm run dev
```

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`eslint-config-next`) |

## Configuration

- **Path alias:** `@/*` maps to the project root (see `tsconfig.json`).
- **Fonts:** configured in `app/layout.tsx` and exposed as the `--font-sans` /
  `--font-mono` CSS variables.
- **Analytics:** Vercel Analytics is mounted in `app/layout.tsx`; it activates
  automatically when deployed on Vercel.
- No environment variables are required to run the site.

## Deployment

Optimised for [Vercel](https://vercel.com/) (zero-config Next.js). It also runs anywhere
Next.js 15 is supported:

```bash
npm run build
npm run start
```

## Search-engine indexing

This site is intentionally **excluded from search engines**. The root layout sets
`robots: { index: false, follow: false, nocache: true }` in its metadata, which renders:

```html
<meta name="robots" content="noindex, nofollow, nocache" />
```

A `robots.txt` `Disallow` is deliberately **not** used, because blocking crawlers would
prevent them from reading the `noindex` tag. To allow indexing later, remove the `robots`
block from `app/layout.tsx`.

## License

Personal project — all rights reserved. © Ramil Sususco.
