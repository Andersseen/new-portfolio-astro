# Execution Context — Portfolio Improvement Plan

> **Purpose:** this file is a pre-computed analysis of the repo so that an agent
> session can execute a phase from [PLAN.md](PLAN.md) **without re-analyzing the
> codebase**. Read this file fully, then read only the specific files the phase
> touches. Line numbers below were accurate as of 2026-07-15 — treat them as
> pointers, not gospel; re-verify before editing.

## What this repo is

Personal portfolio of **Andrii Pap (Andersseen)**, frontend developer.
Single-page **bento grid** of interactive cards; clicking a card opens a
shared-element modal (FLIP morph via a Nanostores state machine in
`src/store/modalStore.ts`). Desktop grid is drag-reorderable (Swapy, order
persisted in IndexedDB). Runtime theme randomizer fetches oklab palettes from
the Palette Crafter API and overwrites Tailwind CSS variables.

- **Stack:** Astro 5 (hybrid output, Vercel adapter) + Preact islands + Angular
  (only in `src/components/angular/`) + Lit. Tailwind CSS v4 (no config file —
  tokens live in the `@theme` block of `src/styles/global.css`).
- **Deliberate multi-framework setup** — it is a showcase feature. Never
  consolidate frameworks.
- **i18n:** en (default, served at `/` and `/en/`), es, ua. JSON files in
  `src/i18n/locales/`. `t()` falls back to the raw key string when missing.
- **Hosting:** Vercel, deploys from `main`. Site URL in config: `https://andriipap.dev`.

## Hard rules (breaking these breaks the build or the site)

1. **pnpm only** (Node 20+). Never npm/yarn.
2. **Never import from `react`/`react-dom`** — `react` is aliased to
   `preact/compat`. Interactive components are Preact (`.tsx`).
3. **Angular components ONLY in `src/components/angular/`** — anywhere else
   they silently fail; Preact files inside that dir won't compile.
4. **Every new i18n key goes into all three files:** `en.json`, `es.json`,
   `ua.json` — `pnpm check:i18n` fails otherwise.
5. **Path aliases** are defined in BOTH `astro.config.mjs` and `tsconfig.json`
   and must stay in sync. The components alias is `@componentes` (Spanish
   spelling), not `@components`. Others: `@i18n`, `@layouts`, `@scripts`,
   `@styles`, `@assets`, `@/`.
6. **API routes** (`src/pages/api/*`) must have `export const prerender = false;`.
7. **Tailwind v4 semantic tokens only** (`bg-background`, `text-foreground`,
   `text-primary`, `border-border`, `bg-background-secondary/-tertiary`,
   `text-foreground-secondary/-tertiary`…). Never hardcoded colors — the theme
   randomizer overwrites the CSS variables at runtime.
8. **Never commit `.env`** (`THEME_API_BASE_URL`, `RESEND_API_KEY`).

## Process rules (from AGENTS.md — follow them)

- Non-trivial tasks (touching >2 files) follow the **OpenSpec workflow**
  ([docs/SDD.md](../SDD.md)): create proposal/spec/design/tasks artifacts in
  `openspec/` before implementing. Every phase in PLAN.md except trivial fixes
  qualifies. `pnpm openspec:validate` must pass.
- Branch from `main` as `feature/<name>`; commit style `feat:`/`fix:`/`refactor:`
  (imperative, lowercase). Never commit directly to `main`.
- **Definition of done:** `pnpm check` passes, `pnpm build` passes, verified in
  `pnpm dev` (light + dark theme for UI changes; all 3 locales for text
  changes), keyboard-operable with ARIA for new UI,
  [docs/STATE.md](../STATE.md) updated, phase status updated in PLAN.md.

## Commands

| Command | What |
|---|---|
| `pnpm dev` | Dev server at localhost:4321 |
| `pnpm check` | i18n key parity + `astro check` (TS) |
| `pnpm build` | Production build |
| `pnpm test` | Vitest (unit, few tests) |
| `pnpm test:e2e` | Playwright (needs dev server assumptions in `playwright.config`) |
| `pnpm openspec:validate` | Validate OpenSpec artifacts |

## Architecture map (key files)

| File | Role |
|---|---|
| `src/pages/index.astro`, `en/ es/ ua/index.astro` | One page per locale, all render `Layout` + `BentoGrid` |
| `src/components/BentoGrid.astro` | Hero text + fetches Medium articles server-side + mounts `PortfolioGrid` island (`client:idle`) |
| `src/components/PortfolioGrid.tsx` | Preact island; owns grid, Swapy drag, exports `PortfolioItem` type |
| `src/data/portfolio.ts` | **All portfolio content** — `getPortfolioItems(tr, articles)` + `aboutMeData(tr)`. Text goes through `tr()` → locale JSONs |
| `src/components/PortfolioCard.tsx` | Card shell (button semantics, opens modal) |
| `src/components/cards/*.tsx` | Per-type card face content (`CardContentRenderer` dispatches by `item.type`) |
| `src/components/details/*.tsx` | Per-type modal content (`ProjectList`, `ServiceDetails`, `StackDetails`, `ArticleList`, `CommunityList`, `DesignGallery`, `SocialCanvas`, `GitHubActivity`) |
| `src/components/PortfolioModal.tsx` + `src/store/modalStore.ts` | Shared-element modal + phase state machine |
| `src/layouts/Layout.astro` | Page shell; mounts `PageLoader.astro` first, then navbar (Angular), footer (Angular) |
| `src/components/BaseHead.astro` | Meta: canonical, OG, Twitter, hreflang (`uk` code for `/ua/` path), sitemap link |
| `src/pages/api/theme.ts` | Proxy to Palette Crafter API (`THEME_API_BASE_URL`) |
| `src/pages/api/send-email.ts` | Resend contact endpoint (see contract below) |
| `src/i18n/utils.ts`, `src/i18n/config.ts` | `t(lang, key)`, `getLanguageFromPath` |
| `src/scripts/theme-*.ts` | Toggle, randomizer, apply, View-Transitions reveal |
| `vercel.json` | Security headers (CSP, HSTS, COOP…) — new external resources must be added to CSP |
| `scripts/check-i18n.mjs` | Key-parity checker across the 3 locale JSONs |

**Data flow:** `portfolio.ts` builds items server-side per locale →
`PortfolioGrid` renders cards → clicking opens modal → modal renders the
matching `details/*` component, casting `item.details` (typed `any` — known
tech debt).

## Contact endpoint contract (`POST /api/send-email`)

- Body (JSON): `{ name: string (1–100), email: string (valid, ≤254), message: string (1–5000) }`
- Responses: `200 {message, id}` · `400 {error}` (validation) · `500 {error}`
  (missing `RESEND_API_KEY` or Resend failure).
- Input is HTML-escaped server-side. Endpoint suggests adding honeypot/rate
  limiting if a public form is wired (comment at top of file).
- Sends via Resend from `onboarding@resend.dev` to `andriipap01@gmail.com`.
- **No UI form exists yet.** `RESEND_API_KEY` is optional locally (500 without it).

## Audit findings (what PLAN.md phases are based on)

1. **Project images missing:** all 5 client projects in
   `src/data/portfolio.ts` (`details` of the `projects` item) have `image: ""`.
   Additionally, `ProjectList.tsx`'s local `Project` interface has **no `image`
   field at all** — even with data present, nothing renders it.
2. **`ProjectList.tsx` field mismatch:** its interface expects
   `category: string` and renders `project.category` in a badge, but the data
   provides `role` — the badge renders empty today. Hidden because
   `details: any`.
3. **Hardcoded English bypassing i18n** in `src/data/portfolio.ts`:
   - `services` item: every `details` string in both `content[]` and
     `details[]` ("Building responsive…", "Scalable API design…", etc.).
   - `design` item: the four package `description` strings.
   These must become `tr()` keys added to all 3 locale JSONs.
4. **Article fallbacks point to the generic profile:** the 3 fallback articles
   in the `articles` item all link `https://medium.com/@andriipap` instead of
   the specific article URLs.
5. **No `404.astro`** in `src/pages/`.
6. **No structured data (JSON-LD)** in `BaseHead.astro`.
7. **No analytics** of any kind.
8. **No contact form UI** (endpoint ready — see contract above).
9. **No CV/resume download** anywhere on the site.
10. **No client testimonials** despite 5 real client projects.
11. **Domain ambiguity (open decision for the user):** `site`, sitemap, OG
    point to `andriipap.dev`; docs and "Blog" social links point to
    `andersseen.dev`. Do not "fix" without asking — the blog may intentionally
    live on the other domain.
12. **Known tech debt (docs/STATE.md):** `PortfolioItem.details: any`; heavy
    Angular/Lit bundles (`and-*`, `client.*`) — lazy-load candidates if
    performance work is requested.

## Gotchas

- `t()` returns the key string itself when a key is missing — a "working" page
  can still show raw keys; check all 3 locales visually.
- In dev, `src/utils/theme-api.ts` calls `PUBLIC_THEME_API_BASE_URL` directly
  (the `/api/theme` proxy needs the serverless runtime); theme API failures are
  handled gracefully — don't chase 404s on `/api/theme` locally.
- Markup increasingly uses `and-layout="…"` attributes (`@andersseen/layout`)
  for layout, with Tailwind kept for visual styling — follow that split in new
  markup where the surrounding code does.
- Playwright tests exist in `tests/` (theme, home, navigation, a11y, layout) —
  run them if your change touches those areas; add coverage for new UI flows.
- The loader (`PageLoader.astro`) is the first element in `<body>`; a `?loader`
  query param holds it on screen for screenshots.
