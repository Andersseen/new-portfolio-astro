# Current State

> **Maintenance contract:** this file is the session-to-session memory of the
> project. Read it at the START of every session. Update it at the END of every
> session in which anything changed: move finished work to "Recently completed",
> update "In progress", add discoveries to "Known issues". Keep it short —
> delete stale entries instead of letting them pile up. Update the date below.

**Last updated:** 2026-07-16 · **Branch state:** `feature/portfolio-phases` — Phases 4 & 5 merged

## Status: ✅ Stable, build passes

`pnpm check` and `pnpm build` pass. Local Lighthouse scores (Python `http.server`) are
**Performance ~93, Accessibility 100, Best Practices 96, SEO 92**. Best Practices 96 is
only because `/api/theme` 404s locally (no serverless runtime); SEO 92 is due to an
Astro dev-toolbar "Learn more" link that only appears in local runs — both should be
100 on Vercel.

## Recently completed (last few cycles)

- **Phase 1 — Content & i18n quick wins**
  - Moved hardcoded English service and design-system descriptions from
    `src/data/portfolio.ts` into i18n keys (`portfolio.services.*Description`,
    `portfolio.services.*Details`, `portfolio.design.*`).
  - Added natural Spanish and Ukrainian translations to `es.json` and `ua.json`;
    `pnpm check:i18n` passes.
  - Fixed `ProjectList.tsx` badge field mismatch (`category` → `role`) so each
    project modal shows the correct role again.
  - Article fallback URLs left pointing to the Medium profile
    (`https://medium.com/@andriipap`) as requested; specific per-article links
    can be swapped in later.
  - Verified: `pnpm check` and `pnpm build` pass.

- **Phase 2 — Project images**
  - Created OpenSpec change `project-images` with proposal, design, spec and
    tasks artifacts; `pnpm openspec:validate` passes.
  - Captured 1280×800 screenshots of the five client sites and compressed them
    to WebP (<100 KB each) under `src/assets/projects/`.
  - Wired images into `src/data/portfolio.ts` via `@assets/projects/...` imports;
    Vite hashes and optimizes them at build time.
  - Extended `src/components/details/ProjectList.tsx` with an `image` field and
    renders each screenshot with `loading="lazy"`, explicit `width`/`height`,
    `aspect-[16/10]`, `object-cover`, and project-title `alt` text.
  - Verified visually in all 3 locales, light/dark themes, and desktop/mobile
    widths; no layout shift and hover effect remains intact.
  - Verified: `pnpm check` and `pnpm build` pass.

- **OpenSpec adoption and production `@andersseen/layout` integration**
  - Initialized OpenSpec 1.5.0 with the core workflow and generated Codex skills;
    project context/rules preserve the existing architecture, i18n, accessibility,
    semantic-theme, pnpm, verification, and English-documentation requirements.
  - Made `openspec/` canonical for new non-trivial changes; `docs/specs/` is now
    a historical archive. Added package scripts for status and validation.
  - Loaded `@andersseen/layout@0.0.1` globally and added strict Preact JSX typing.
  - Migrated 39 production Astro/Preact markup sites across the portfolio grid,
    cards, modal/details, language selector, and loader to `and-layout` while
    retaining Tailwind for unsupported and visual responsibilities.
  - Added computed-style Playwright coverage for Astro flex behavior and
    mobile/desktop grid columns, gaps, and spans; full suite passes 9/9.
- **Accessible tags and Social card fixes**
  - Added the missing `blog` → RSS mapping in `IconMap`, fixing the blank Blog
    icon in both the Social card and its modal.
  - Removed nested social links from the grid card; it now exposes one clear
    card action while the real external links remain available in the modal.
  - Standardized project, design-system, service and shared badges on semantic
    surface/foreground tokens with larger, non-uppercase text for reliable
    readability across generated light and dark themes.
  - Added Playwright coverage for Blog icon visibility, invalid nested controls,
    dark theme, keyboard opening, Escape closing and focus restoration.
  - Verified: `pnpm check`, `pnpm build`, full Playwright suite (6/6) and local
    visual capture all pass.
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

- Decide whether to keep or merge the `feature/phase-1-content-i18n` branch
  (phases 1 & 2 are done; user prefers grouping additional phases on the same
  branch).
- Continue with the next phase from `docs/plan/PLAN.md`.

## Backlog / known intentions

- Type-narrow `PortfolioItem.details` (currently `any` per card type).
- Type-narrow `PortfolioItem.details` (currently `any` per card type).
- Language selector keyboard UX (arrow navigation, focus return) is still basic.

## Known issues / tech debt

- `PortfolioItem.details: any` — each card type casts its own shape.
- Old feature branches `feature/morph`, `feature/theme` still exist locally
  (already merged); safe to delete.
- Test coverage is focused rather than exhaustive: Playwright covers core UI
  flows/layout and Vitest covers selected theme utilities; most component-level
  behavior still relies on `pnpm check`, build, and manual review.
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

<<<<<<< HEAD
- 2026-07-16 — Implemented PLAN.md Phase 5 (CV download) on consolidated branch `feature/portfolio-phases`: added a "Download CV" button to the hero in `BentoGrid.astro`, linked to `public/andrii-pap.pdf`, with i18n labels in `en/es/ua.json` and `tests/cv.spec.ts`. Full e2e suite (14 tests) passes; `pnpm check` and `pnpm build` pass.
- 2026-07-15 — Implemented PLAN.md Phase 4 (SEO & infrastructure): custom `src/pages/404.astro` (serverless fallback), JSON-LD `WebSite` + `Person` in `BaseHead.astro`, `@vercel/analytics` wired into `Layout.astro` with CSP updates, and `tests/404.spec.ts`. Full e2e suite (13 tests) passes; `pnpm check` and `pnpm build` pass. Note: Vercel Web Analytics must be enabled in the dashboard for data collection.
- 2026-07-15 — Reverted the standalone contact bento card because it duplicated the existing contact form inside the Social modal and broke the grid layout. Removed `ContactCardContent`, `ContactDetails`, `portfolio.contact` i18n keys, and the `contact` portfolio item; adapted `tests/contact.spec.ts` to cover the SocialCanvas form instead. Full e2e suite (12 tests) passes; `pnpm check` and `pnpm build` pass.
=======
- 2026-07-15 — Implemented PLAN.md Phase 4 (SEO & infrastructure) on new branch `feature/phase-4-seo-infrastructure`: custom `src/pages/404.astro` (serverless fallback), JSON-LD `WebSite` + `Person` in `BaseHead.astro`, `@vercel/analytics` wired into `Layout.astro` with CSP updates, and `tests/404.spec.ts`. Full e2e suite (13 tests) passes; `pnpm check` and `pnpm build` pass. Note: Vercel Web Analytics must be enabled in the dashboard for data collection.
>>>>>>> feature/phase-4-seo-infrastructure
- 2026-07-15 — Audited the portfolio and created `docs/plan/PLAN.md` (7 phased
  improvements) + `docs/plan/CONTEXT.md` (execution briefing). Docs only.
- 2026-07-10 — Adopted OpenSpec as the canonical SDD workflow and integrated
  `@andersseen/layout` across 39 Astro/Preact markup sites with computed-style
  responsive tests; check/build/OpenSpec validation and 9 e2e tests pass.
- 2026-07-10 — Fixed the missing Blog icon and tag readability, removed nested
  controls from the Social card, and added Playwright accessibility coverage;
  check, build and all 6 e2e tests pass.
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
