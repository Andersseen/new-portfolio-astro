# Architecture

How the site works, subsystem by subsystem. Read the section for whatever you
are about to modify. File paths are relative to the repo root.

## 1. Rendering model

- Astro 5, **hybrid output**: pages are static; API routes opt out with
  `export const prerender = false;`. Adapter: `@astrojs/vercel`.
- Pages: `src/pages/index.astro` (en, unprefixed) plus `src/pages/en|es|ua/index.astro`.
  All four render `Layout` + `BentoGrid.astro`. **A change to page structure must
  be applied to all locale pages** (they are thin wrappers, so this is rare).
- `src/layouts/Layout.astro`: html shell, sets `lang` from URL and
  `data-theme="light"` default, mounts Navbar (Preact island) + Footer, and
  loads `theme-controller.ts` as a client script (the inline theme script in
  `BaseHead.astro` sets the real `data-theme` before paint).

## 2. Multi-framework islands (the unusual part)

Three UI frameworks coexist. `astro.config.mjs` wires them so they don't clash:

| Framework | Where                            | How it's scoped                                            |
| --------- | -------------------------------- | ---------------------------------------------------------- |
| Preact    | All `.tsx` components            | `preact({ exclude: ["**/components/angular/**"] })`        |
| Angular   | `src/components/angular/` ONLY   | `transformFilter` compiles only files in that directory    |
| Lit       | `src/components/ui/LitButton.ts`, `details/MockUIKit.ts` | `@astrojs/lit` integration |

Critical alias (in `astro.config.mjs` vite config): `react`, `react-dom`, and
`react/jsx-runtime` → `preact/compat`. React-flavored code runs on Preact.
**Never add a dependency that needs real React internals.**

Current Angular components: `navbar.component.ts`, `about-drawer.component.ts`,
`github-activity.component.ts`, `footer.ts`. They use standalone components,
signals, and `lucide-angular` (which is in `vite.ssr.noExternal`).

## 3. Data flow (content)

```
Glossa catalogs (en/es/uk)           ← all user-visible strings
        │  loadMessages(lang) (src/i18n/glossa.ts, server-only)
        │  t(lang, key)  (src/i18n/utils.ts — returns key if missing)
        ▼
src/data/portfolio.ts                 ← getPortfolioItems(tr, articles): card definitions
        │                                (single source of truth for grid content)
        ▼
src/components/BentoGrid.astro        ← resolves lang from URL, fetches Medium RSS
        ▼
src/components/PortfolioGrid.tsx      ← Preact island (client:idle), owns grid + modal
        ▼
PortfolioCard.tsx → cards/*.tsx       ← per-type card content (CardContentRenderer)
PortfolioModal.tsx → details/*.tsx    ← per-type modal detail views
```

- `PortfolioItem` type is defined in `PortfolioGrid.tsx`. Card types:
  `projects | community | design | social | services | stack | articles | about`.
- To add/edit a card: edit `src/data/portfolio.ts` + add locale keys + (if a new
  type) add a renderer in `components/cards/` and a detail view in `components/details/`.
- Medium articles: `fetchMediumArticles("@andriipap")` in `src/utils/fetchers.ts`
  (rss-parser, top 4, HTML stripped). Fallback article list is hardcoded in
  `portfolio.ts` in case the feed fails.

## 4. Modal system (shared-element / FLIP)

State machine in `src/store/modalStore.ts` (Nanostores atoms):

```
closed → entering → open → exiting → closed
```

- `openModal(item, rect, opener)` stores the clicked card's `DOMRect` and the
  opener element (for focus restoration), sets phase `entering`.
- The modal component (`PortfolioModal.tsx`) animates from the stored rect to
  full size, then MUST call `finishEntering()`; on close it animates back and
  MUST call `finishExiting()`. Breaking this contract leaves the store stuck
  and the original card invisible (grid hides the card while its modal is open).
- Body scroll is locked by `PortfolioGrid` while open.
- Accessibility contract: focus moves into the modal on open and returns to the
  opener on close; Escape closes; ARIA dialog semantics.

## 5. Drag & reorder (Swapy + IndexedDB)

- In `PortfolioGrid.tsx`: Swapy is **desktop-only** (`window.innerWidth >= 768`)
  and **dynamically imported**. Re-initialized on resize; destroyed on unmount.
- On `onSwapEnd`, the DOM slot order is read and persisted via
  `src/scripts/idb-order.ts` → IndexedDB (`idb` wrapper in `src/scripts/db.ts`).
- On mount, saved order is loaded and items re-sorted; unknown ids go last.
- Column spans come from `LAYOUT_PATTERN` by *position* (index), not from the
  item, so cards adapt their size to wherever they are dropped.

## 6. Theme system (two layers)

**Layer 1 — static tokens (Tailwind v4):** `src/styles/global.css` defines all
design tokens in the `@theme` block using **oklab** colors: `--color-primary`
(+ 50–950 scale), `--color-secondary` (+ scale), accent/success/warning/danger,
background/foreground/border tiers, fonts (Inter body, Outfit headings).
`[data-theme="dark"]` overrides them. There is **no tailwind.config.js**.

**Layer 2 — runtime randomizer:** client scripts in `src/scripts/`:

- `theme-controller.ts` — single owner of mode + palette. Handles the toggle,
  randomize and system-preference changes. Every action bumps a generation
  counter and stale async results are dropped, so mode and colors are always
  committed together inside one `theme-transition.ts` reveal. A palette is
  `{ baseHue, harmony }`, re-requested per mode, so it survives toggling;
  the opposite mode is prefetched. State persists in localStorage
  (`portfolio:theme`, flattened CSS vars), which the inline script in
  `BaseHead.astro` re-applies synchronously before first paint. If the API
  fails, the current theme stays (static tokens when there is no palette).
- `theme-state.ts` — `ThemeColors` type plus a one-time read of the legacy
  IndexedDB state for migration.
- `src/pages/api/theme.ts` — server-side proxy (GET/POST) to
  `THEME_API_BASE_URL` so the upstream URL/key never reaches the client;
  returns 502 JSON on upstream failure.

**Consequence for all UI code:** semantic Tailwind tokens only
(`bg-background`, `text-foreground-secondary`, `text-primary`, `border-border`…).
A hardcoded color will not respond to the randomizer or dark mode and is a bug.

## 7. i18n

- Config: `src/i18n/config.ts` (`en` default, `es`, `ua`; locale codes en-US /
  es-ES / uk-UA). Astro i18n routing: `prefixDefaultLocale: false`, fallback
  es→en, ua→en.
- Source: Glossa (project `portfolio`, locales `en`/`es`/`uk`; site `ua` ↔
  Glossa `uk`). No locale files in the repo.
- Server: pages `await loadMessages(lang)` (`src/i18n/glossa.ts`) before any
  `t()`. It reads the public delivery URL, else MCP `get_catalog` with
  `GLOSSA_TOKEN`; cached for the build, ~5s in dev (Glossa edits show on
  reload). A prerendered page fails the build if Glossa is unreachable.
- Client: `Layout.astro` embeds the current locale's catalog as
  `<script type="application/json" id="i18n-messages">`; `t()` reads it in
  the browser, so islands use the same API and no catalog is bundled.
- Translation: `t(lang, key)` does dot-path lookup; **returns the key string
  on miss** (no crash — visible bug on page instead).
- Parity enforcement: `pnpm check:i18n` (`scripts/glossa.mjs check`) fails on
  missing OR extra keys vs Glossa `en`.
- Language switcher: `src/components/LanguageSelector.astro`.

## 8. API endpoints

| Route             | File                          | Notes                                                        |
| ----------------- | ----------------------------- | ------------------------------------------------------------ |
| `/api/theme`      | `src/pages/api/theme.ts`      | GET/POST proxy to Palette Crafter; `prerender = false`        |
| `/api/send-email` | `src/pages/api/send-email.ts` | POST only; Resend; validates types/lengths, escapes HTML; 500 if `RESEND_API_KEY` missing |

## 9. UI primitives

`src/components/ui/` — Preact atoms: `Button`, `Card`, `Badge`, `Input`
(+ `LitButton` as a Lit demo). Variants/sizes documented in
`src/components/ui/README.md`. Utilities: `clsx` + `tailwind-merge` via
`src/components/ui/utils.ts`. Prefer these primitives over ad-hoc markup.

## 10. Directory map

```
src/
├── assets/          SVGs
├── components/
│   ├── angular/     Angular-only zone (see §2)
│   ├── cards/       Per-type card content renderers (Preact)
│   ├── details/     Per-type modal detail views (Preact)
│   ├── ui/          Reusable atoms (Button, Card, Badge, Input)
│   ├── BentoGrid.astro, PortfolioGrid.tsx, PortfolioCard.tsx, PortfolioModal.tsx
│   ├── Navbar.tsx, ModalManager.tsx, AboutDrawer.tsx, …
│   └── *.astro      Static presentational components
├── data/portfolio.ts        Grid content (single source of truth)
├── i18n/            config.ts, utils.ts (t), glossa.ts (server-only loader)
├── layouts/Layout.astro
├── pages/           index.astro, {en,es,ua}/index.astro, api/{theme,send-email}.ts
├── scripts/         Client-side: theme-*, idb-order, db, swapy-grid, card-modal
├── store/modalStore.ts      Nanostores modal state machine
├── styles/global.css        Tailwind v4 @theme tokens + dark overrides
└── utils/           fetchers.ts (Medium/GitHub), theme-api.ts (API client + types)
scripts/glossa.mjs           Glossa key-parity checker (`pnpm check:i18n`)
```
