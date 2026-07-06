# Project Context

## What this is

The personal portfolio of **Andrii Pap (Andersseen)**, a frontend developer.
Live at **https://andersseen.dev/**. It presents client work, open-source
projects, technical articles (Medium), services, tech stack and a design-system
ecosystem — all inside a single-page **interactive bento grid**.

## Why it exists

1. **Professional showcase** — the primary channel for potential clients and
   employers to evaluate Andrii's work. Quality bar is high: this site *is* the
   proof of skill.
2. **Technical playground / demonstration** — it deliberately mixes multiple UI
   frameworks (Preact, Angular, Lit, Astro) in one Astro site to demonstrate
   breadth. The multi-framework setup is a *feature*, not accidental complexity.
   Do not "simplify" it away by consolidating to one framework.
3. **Design-system showcase** — the site consumes and demos Andrii's own npm
   packages: `@andersseen/web-components`, `@andersseen/icon`,
   `@andersseen/motion`, `@andersseen/layout`.

## What it wants to achieve (goals, in priority order)

1. **Impress on first load** — smooth shared-element modal transitions,
   drag-and-drop grid reordering, dynamic theme randomization. Interactions
   must feel polished; janky animation is worse than no animation.
2. **Performance** — Astro islands keep JS minimal; heavy libs (Swapy) are
   dynamically imported; static-first with server endpoints only where needed.
3. **Accessibility** — cards and modals are keyboard-operable with focus
   management and ARIA. Every new interactive element must keep this bar.
4. **Multilingual reach** — full content parity in English, Spanish, Ukrainian.
5. **Personal brand consistency** — the theme system (oklab palettes from the
   Palette Crafter API, another of Andrii's projects) plus Inter/Outfit fonts.

## Non-goals

- No CMS, no database, no auth. Content is code (`src/data/portfolio.ts` + locale JSONs).
- No SEO-driven blog inside this repo — articles live on Medium and the blog at andersseen.dev; this site links out.
- No React. (React types exist only because `react` is aliased to `preact/compat`.)
- No test suite (for now) — verification is type checks + build + manual review.

## Key external services

| Service                 | Role                                              | Config                                     |
| ----------------------- | ------------------------------------------------- | ------------------------------------------ |
| Vercel                  | Hosting + serverless functions                    | `@astrojs/vercel` adapter                  |
| Palette Crafter API     | Generates harmonious color palettes for the theme randomizer (also Andrii's project) | `THEME_API_BASE_URL`, proxied via `/api/theme` |
| Resend                  | Contact email sending                             | `RESEND_API_KEY`, used by `/api/send-email` |
| Medium RSS              | Latest articles, fetched at render time           | Feed of `@andriipap`                       |
| GitHub API              | README/activity data for the community card       | Public, unauthenticated                    |

## The one-paragraph mental model

An Astro page renders a hero plus a `PortfolioGrid` Preact island (`client:idle`).
The grid data comes from `src/data/portfolio.ts`, translated per-locale at render
time. On desktop the grid is drag-reorderable (Swapy) with the order persisted
in IndexedDB. Clicking a card opens a shared-element modal (FLIP-style morph)
orchestrated through a Nanostores state machine. Theming is Tailwind v4 CSS
variables that a client-side randomizer can overwrite at runtime with palettes
fetched from the Palette Crafter API (persisted in IndexedDB, dark/light aware).
A few components (navbar drawer, GitHub activity) are Angular; a design-system
demo card uses Lit/web components.
