# Current State

> **Maintenance contract:** this file is the session-to-session memory of the
> project. Read it at the START of every session. Update it at the END of every
> session in which anything changed: move finished work to "Recently completed",
> update "In progress", add discoveries to "Known issues". Keep it short —
> delete stale entries instead of letting them pile up. Update the date below.

**Last updated:** 2026-07-07 · **Branch state:** `main` with uncommitted Lighthouse/SEO/a11y/security improvements

## Status: ✅ Stable, build passes

`pnpm check` and `pnpm build` pass. Local Lighthouse scores (Python `http.server`) are
**Performance ~93, Accessibility 100, Best Practices 96, SEO 92**. Best Practices 96 is
only because `/api/theme` 404s locally (no serverless runtime); SEO 92 is due to an
Astro dev-toolbar "Learn more" link that only appears in local runs — both should be
100 on Vercel.

## Recently completed (last few cycles)

- **First-load skeleton loader**
  - New `src/components/PageLoader.astro` renders a full-screen skeleton
    (mirrors navbar + hero + bento grid) on first paint, mounted as the first
    element in `Layout.astro` body. Fades out and removes itself on
    `window.load` (min 600ms visible, 6s max fallback).
  - Styles `.page-loader` / `.pl-block` / `.pl-card` added to `global.css`,
    reusing the existing `@keyframes shimmer`; theme-token driven (follows
    light/dark) and disabled under `prefers-reduced-motion`.
  - **Screenshot hold mode:** load with `?loader` (or `#loader`) to keep the
    skeleton on screen until a click/keypress — solves "the load is too fast to
    screenshot".
  - Verified: `pnpm check` + `pnpm build` pass; Playwright confirms it shows on
    load, removes after load, and holds+dismisses in `?loader` mode.
- **"Water drop" theme transition (Phase 1)**
  - New helper `src/scripts/theme-transition.ts` wraps theme mutations in the
    View Transitions API and reveals the new theme with an expanding
    `clip-path: circle()` originating at the click point.
  - Wired into `theme-toggle.ts` (`setTheme` accepts an `origin`) and
    `theme-randomizer.ts` (`randomizeTheme` accepts an `origin`; `applyColors`
    routes through the reveal when clicked, applies instantly otherwise).
  - `originFromEvent()` uses pointer coords, falling back to the button center
    for keyboard activation.
  - CSS in `global.css` disables the default view-transition cross-fade and
    honors `prefers-reduced-motion`. Graceful fallback when
    `startViewTransition` is unsupported (colors just swap, no animation).
  - Verified: `pnpm check` + `pnpm build` pass; Playwright confirms the toggle
    still lands on dark, randomize doesn't revert, and `startViewTransition`
    fires on toggle.
  - Phase 2 (water ripple / waves layered on the reveal) still pending.
- **Fix portfolio domain mismatch**
  - Regenerated `public/og-image.png` to show `andriipap.dev` instead of
    `andersseen.dev`.
  - Changed `site` in `astro.config.mjs` from `https://andersseen.dev` to
    `https://andriipap.dev` so canonical URLs, sitemap and `og:image` are correct.
  - Updated `public/robots.txt` sitemap URL to `https://andriipap.dev/sitemap-index.xml`.
- **Theme toggle / randomizer reliability**
  - Refactored `src/scripts/theme-toggle.ts` to register the click listener
    immediately and not block on IndexedDB; added defensive error handling.
  - Refactored `src/scripts/theme-randomizer.ts` to register listeners upfront
    and handle IDB/API failures gracefully.
  - Added `resetThemeColors()` in `src/scripts/theme-apply.ts` and used it in
    `theme-toggle.ts` so inline colors from a previous mode don't override the
    static `[data-theme="dark"]` CSS rules when toggling.
  - Added `skipFallback` option to `randomizeTheme()`; mode changes and initial
    load no longer apply a light fallback if the API is down, so the static
    dark CSS stays in place.
  - Installed `@playwright/test` and added `tests/theme.spec.ts` to verify the
    toggle switches to dark and remains dark after async regeneration.
  - Cleaned `.astro`, `.vercel/output/static`, `dist`, `node_modules/.vite` caches.
- **Security headers hardening**
  - Added `Strict-Transport-Security` (HSTS, 2 years, includeSubDomains, preload).
  - Added `Cross-Origin-Opener-Policy: same-origin`.
  - Tightened `Permissions-Policy` with `payment`, `usb`, `bluetooth`, `fullscreen`.
  - Refined CSP with `object-src 'none'`, `frame-src 'none'`, `manifest-src 'self'`,
    `media-src 'self'`, `worker-src 'self'` and `upgrade-insecure-requests`.
- **Lighthouse / SEO / accessibility push**
  - Added `site`, `trailingSlash: "always"`, `@astrojs/sitemap`, `og-image.png`,
    canonical/Open Graph/Twitter/hreflang metadata in `BaseHead.astro`.
  - Fixed `hreflang` for Ukrainian: code is now `uk` while URL path stays `/ua/`.
  - Fixed residual color contrast: badges use `text-foreground`, article card link
    no longer uses `text-primary` on `bg-background-secondary`.
  - Fixed card accessible names: removed `aria-label` from `PortfolioCard` buttons
    so visible text becomes the accessible name.
  - Improved Preact `AboutDrawer` with `role="dialog"`, `aria-modal`,
    `aria-labelledby`, initial focus and focus trap.
  - Replaced fake `div role="button"` navbar logo with a real `<button>`.
  - Added CSP/security headers in `vercel.json`, replaced `atob` with
    `Buffer.from`, added `noopener` to external links, fixed `fetchpriority` case.
- **Theme system overhaul** (PRs #14, #15 — `feature/theme`): Palette Crafter
  API integration via `/api/theme` proxy, primary/secondary color *scales*
  (50–950), dark-mode-aware palettes, IndexedDB persistence, refined UI colors
  and interactive states.
- **Blog link** added to portfolio data / social card.
- **Angular migration of selected components** (PR #13): navbar, about-drawer
  (signals + computed), github-activity, footer — replacing the Preact header.
- **Shared-element modal** (`feature/morph`, PR #12): FLIP-style card→modal
  transition with phase state machine in `modalStore.ts`.

## In progress / next up

- (empty — pick from Backlog or the user's request)

## Backlog / known intentions

- Fill in `image: ""` fields for projects in `src/data/portfolio.ts`
  (project cards have no images yet).
- Contact form UI for `/api/send-email` (endpoint exists and is validated;
  no form component is wired to it yet — verify before building).
- Type-narrow `PortfolioItem.details` (currently `any` per card type).
- Language selector keyboard UX (arrow navigation, focus return) is still basic.

## Known issues / tech debt

- `PortfolioItem.details: any` — each card type casts its own shape.
- Old feature branches `feature/morph`, `feature/theme` still exist locally
  (already merged); safe to delete.
- No automated tests; regressions are caught only by `pnpm check` + manual review.
- `src/components/ui/README.md` may drift from the actual component props —
  trust the code, then fix the README.
- Large JS bundles for Angular/Lit web components (`and-*`, `client.*`) inflate
  the client payload. Consider lazy-loading non-critical islands or auditing
  component imports if Performance needs to improve beyond ~93 locally.

## Environment notes

- `.env` exists locally with `THEME_API_BASE_URL` (Palette Crafter) — required
  for the theme randomizer. `RESEND_API_KEY` optional (email returns 500 without it).
- Deploys happen from `main` via Vercel Git integration; env vars are set in
  the Vercel dashboard.

## Session log (append newest first, keep ~10 entries, one line each)

- 2026-07-07 — Fixed theme API calls in dev: `src/utils/theme-api.ts` now calls
  `PUBLIC_THEME_API_BASE_URL/api/v1/theme` directly when `import.meta.env.DEV`
  is true, instead of the unavailable local `/api/theme` proxy.
- 2026-07-07 — Made `randomizeTheme()` fallback mode-aware via
  `getFallbackColors(mode)` so a failed API call no longer reverts dark mode
  to light colors.
- 2026-07-07 — Fixed theme toggle reverting after 2s: `randomizeTheme()` skips
  fallback on mode changes; Playwright tests confirm dark mode persists after
  toggle and randomize.
- 2026-07-07 — Installed `@playwright/test` and added e2e tests:
  `tests/theme.spec.ts`, `tests/home.spec.ts`, `tests/navigation.spec.ts`.
- 2026-07-07 — Installed `vitest`, `@vitest/ui`, `jsdom` and added
  `src/scripts/theme-apply.test.ts`. Added test scripts to `package.json`.
- 2026-07-07 — Updated `.env` `THEME_API_BASE_URL` from
  `https://palette-crafter.pages.dev` to `https://palette-forge.pages.dev`.
- 2026-07-07 — Added `.gitignore` entries for Playwright/Vitest artifacts.
- 2026-07-07 — Fixed portfolio domain: regenerated `og-image.png` with `andriipap.dev`, updated `astro.config.mjs` `site` and `robots.txt` sitemap. Verified `pnpm check` and `pnpm build` pass.
- 2026-07-07 — Hardened security headers in `vercel.json` (HSTS, COOP, CSP refinements). Verified `pnpm check` and `pnpm build` pass; Lighthouse Best Practices remains 96 local / 100 on Vercel.
- 2026-07-07 — Lighthouse/SEO/accessibility improvements: sitemap, meta tags, hreflang, contrast, card a11y, Preact drawer focus, security headers. Build passes.
- 2026-07-06 — Created agent documentation set (AGENTS.md, CLAUDE.md, docs/*). No app code changed.
