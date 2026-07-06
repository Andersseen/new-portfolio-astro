# Conventions & Best Practices

Rules for writing code in this repo. "MUST" rules break the build or the site
if violated; "SHOULD" rules keep the codebase consistent.

## Choosing the right technology for a component

Decision table — follow it, do not improvise:

| You are building…                              | Use                                      |
| ---------------------------------------------- | ---------------------------------------- |
| Static/presentational markup                   | `.astro` component (zero JS shipped)     |
| Interactive component (state, events)          | Preact `.tsx` in `src/components/`       |
| Something explicitly requested as Angular      | `src/components/angular/` ONLY           |
| Design-system / web-component demo             | Lit (`.ts` with `lit` imports)           |

Default hydration directive: `client:idle` (used by the grid and navbar).
Use `client:visible` for below-the-fold islands. Never `client:only` unless
SSR is genuinely impossible.

## TypeScript

- `tsconfig` extends `astro/tsconfigs/strict`. Keep new code `any`-free
  (legacy `details: any` exists in `PortfolioItem` — do not spread the pattern;
  narrow it when you touch it).
- Import via aliases (`@componentes/...`, `@i18n/...`, `@scripts/...`, `@/...`),
  not deep relative paths. Remember: it is `@componentes` (Spanish spelling).
- New aliases must be added in BOTH `astro.config.mjs` and `tsconfig.json`.
- Shared types live next to their owner (e.g. `PortfolioItem` in
  `PortfolioGrid.tsx`, theme types in `src/utils/theme-api.ts`). Check for an
  existing type before creating one.

## Styling

- Tailwind v4 utility classes with **semantic tokens only**:
  `bg-background`, `bg-background-secondary`, `text-foreground`,
  `text-foreground-secondary`, `text-primary`, `border-border`, `text-danger`, …
- MUST NOT hardcode colors (`bg-blue-500`, hex, raw oklab in components) —
  the runtime theme randomizer overwrites CSS variables and hardcoded colors
  won't follow it, nor dark mode.
- New design tokens go in the `@theme` block of `src/styles/global.css` AND
  need a `[data-theme="dark"]` override AND (if theme-able) wiring in
  `src/scripts/theme-apply.ts`.
- Class merging in Preact components: `clsx` + `tailwind-merge`
  (see `src/components/ui/utils.ts`).
- Fonts: Inter (body, `font-sans`), Outfit (headings, `font-heading`) — via
  @fontsource imports in `global.css`. Don't add font `<link>` tags.

## i18n (applies to every user-visible string)

1. Add the key to `src/i18n/locales/en.json` first (en is the source of truth).
2. Add the SAME key to `es.json` and `ua.json` with real translations
   (Spanish and Ukrainian — translate properly, don't copy English).
3. Run `pnpm check:i18n` — it fails on missing or extra keys.
4. In `.astro` files: `const tr = (key) => t(lang, key)` with lang from
   `getLanguageFromPath(Astro.url.pathname)`. In grid content: strings flow
   through `getPortfolioItems(tr, …)` — never hardcode display text in
   components when it can live in `portfolio.ts` + locales.

Key naming: dot-nested by card/section, camelCase leaves —
`portfolio.<section>.<item>` (e.g. `portfolio.articles.viewMore`).

## Accessibility (non-negotiable, it's a portfolio selling point)

- Every interactive element: keyboard operable (Enter/Space), visible focus.
- Modals: focus trap in, focus restored to opener on close, Escape closes,
  `role="dialog"` + `aria-modal` + labelled by the title.
- Animations must not break usability; respect the existing pattern of
  phase-based transitions rather than blocking interaction.
- Icons without text need `aria-label`; decorative icons `aria-hidden="true"`.

## Client-side scripts & state

- Global page behaviors (theme, etc.): plain TS modules in `src/scripts/`,
  imported from `Layout.astro`'s `<script>` tag.
- Island-internal state: Preact hooks. Cross-island/shared state: Nanostores
  atoms in `src/store/` (pattern: `modalStore.ts`).
- Persistence: IndexedDB through the existing `idb` helpers
  (`src/scripts/db.ts`) — not raw localStorage (localStorage is only used as a
  cache inside the theme randomizer; follow existing patterns).
- Heavy browser-only libs: dynamic `import()` inside `useEffect`
  (see Swapy in `PortfolioGrid.tsx`), guarded by `typeof window` checks where
  code can run during SSR.

## API routes

- `export const prerender = false;` is mandatory.
- Validate and type-check all input; escape HTML before interpolating user
  input (see `send-email.ts`).
- Secrets stay server-side (`import.meta.env.X`); only `PUBLIC_`-prefixed vars
  may be read client-side. Proxy external APIs instead of exposing them
  (pattern: `api/theme.ts`).
- Always return JSON with a meaningful status; wrap upstream calls in
  try/catch with a 5xx fallback response.

## Error-handling philosophy

Fail soft on the client: features degrade, the page never blows up.
Examples to follow: Swapy load failure → grid still renders statically;
theme API down → hardcoded fallback palette; Medium feed down → fallback
article list; missing i18n key → key rendered (caught by `pnpm check:i18n`).

## Dependencies

- SHOULD NOT add new dependencies without explicit approval — the bundle is
  deliberately lean. Check whether Preact + existing libs (motion, nanostores,
  clsx, tailwind-merge, idb) already cover the need.
- MUST NOT add React-only libraries (react aliased to preact/compat).
- After changing deps: `pnpm install` (pnpm only), commit `pnpm-lock.yaml`.

## Git & PRs

- Branch: `feature/<topic>` off `main`; merge via PR (repo: Andersseen on GitHub).
- Commits: `feat: …` / `fix: …` / `refactor: …`, imperative, concise.
- Do not commit: `.env`, `dist/`, `.vercel/`, `.astro/`, `node_modules/`.

## Verification workflow (before saying "done")

```bash
pnpm check    # i18n parity + astro check (TypeScript)
pnpm build    # must complete without errors
pnpm dev      # manual check of the affected flow
```

Manual check matrix when UI changed: light + dark theme, randomized theme,
mobile width (<768px, no drag) + desktop, and en/es/ua if text changed.

## Known gotchas (learned the hard way — don't rediscover them)

- `@componentes` alias is Spanish — `@components` does not exist.
- The grid hides a card while its modal is open; if the modal never calls
  `finishExiting()`, the card stays invisible.
- `LAYOUT_PATTERN` in `PortfolioGrid.tsx` assigns col-spans by grid position,
  not by item — `colSpan` on the data item is effectively a hint only.
- Swapy must be destroyed before re-init (resize handler does this) or
  listeners leak.
- `aboutMeData` reads `window.location` — guard any similar code for SSR.
- Locale JSONs must match `en.json` exactly — *extra* keys fail the check too.
- `.env` currently exists locally with real values; never print or commit it.
