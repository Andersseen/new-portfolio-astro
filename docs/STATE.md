# Current State

> **Maintenance contract:** this file is the session-to-session memory of the
> project. Read it at the START of every session. Update it at the END of every
> session in which anything changed: move finished work to "Recently completed",
> update "In progress", add discoveries to "Known issues". Keep it short —
> delete stale entries instead of letting them pile up. Update the date below.

**Last updated:** 2026-07-20 · **Branch state:** `feature/portfolio-phases` — language switcher trailing-slash fix after full a11y/theme fixes

## Status: ✅ Stable, build passes

`pnpm check` and `pnpm build` pass. Local Lighthouse scores (Python `http.server`) are
**Performance ~93, Accessibility 100, Best Practices 96, SEO 92**. Best Practices 96 is
only because `/api/theme` 404s locally (no serverless runtime); SEO 92 is due to an
Astro dev-toolbar "Learn more" link that only appears in local runs — both should be
100 on Vercel.

## Recently completed (last few cycles)

- **Language switcher trailing-slash fix**
  - Fixed `LanguageSelector.astro` links for Astro's `trailingSlash: "always"`
    routing. The selector now emits `/ua/` and `/es/` instead of `/ua`/`/es`,
    avoiding the Astro 404 page that suggested adding the slash manually.
  - English now links back to the default unprefixed route `/` instead of
    `/en/`, matching `prefixDefaultLocale: false` and the canonical
    x-default/default locale behavior.
  - Added Playwright coverage that clicks the real dropdown through English,
    Spanish, and Ukrainian and asserts routed, non-404 pages.
  - Verified: focused `tests/navigation.spec.ts`, `pnpm check`, `pnpm build`,
    and full `pnpm test:e2e` pass (22/22).

- **Full a11y audit follow-up + robust theme transition**
  - Extended OpenSpec change `audit-a11y-project-cards` after the first pass to
    cover the full portfolio surface, not only selected modals.
  - Hardened `theme-transition.ts` with a transition lock, reveal-animation
    timeout, and guaranteed cleanup of `data-theme-transition`, so rapid
    light/dark clicks cannot stack View Transition circles or leave the reveal
    layer stuck over the page.
  - Expanded `tests/a11y.spec.ts`: audits every portfolio grid card and every
    modal (`projects`, `community`, `design`, `social`, `services`, `stack`,
    `articles`) in light and dark themes; checks visible text contrast from
    computed browser colors; traverses open shadow roots for design-system
    web components; samples hover/focus states for visible controls; verifies
    keyboard modal focus restoration; and stress-tests rapid theme toggles.
  - Fixed additional contrast failures discovered by the expanded audit:
    `MockUIKit.ts` no longer uses primary text for small package names,
    section labels, inline code, or syntax tokens; `SocialCanvas.tsx` submit
    hover no longer switches to low-contrast primary; `ArticleList.tsx` article
    arrows and "View more" link no longer rely on primary text in light theme.
  - Verified: expanded `tests/a11y.spec.ts` passes (6/6), full `pnpm test:e2e`
    passes (21/21), `pnpm check`, `pnpm build`, and `pnpm openspec:validate`
    pass. Existing build still logs expected Medium DNS fallback warnings under
    restricted network.

- **Accessibility contrast audit + project card presentation**
  - Created OpenSpec change `audit-a11y-project-cards` with proposal, design,
    specs, and tasks.
  - Added `tests/a11y.spec.ts`, a dependency-free Playwright audit that opens
    real portfolio modals in light and dark themes, computes foreground and
    effective background colors in the browser, and enforces WCAG contrast
    ratios (4.5:1 normal text, 3:1 large text). It also verifies keyboard modal
    flow: focus enters the dialog, Escape closes, and focus returns to opener.
  - `ProjectList.tsx`: replaced the oversized full-width project screenshots
    with compact responsive media (side thumbnail on desktop, bounded image on
    mobile), removed the saturated full-card `bg-primary` hover overlay, and
    moved badges/tech metadata to higher-contrast semantic tokens.
  - `CommunityList.tsx`: fixed light-theme contrast failures caught by the new
    audit by removing `text-background` on `bg-primary` tabs and avoiding
    `text-primary` for small role labels/buttons.
  - Verified visually with a local dev server and Playwright measurements:
    desktop project images render at ~32% of card width; mobile images remain
    contained with no horizontal overflow.
  - Verified: focused `tests/a11y.spec.ts`, `pnpm check`, `pnpm build`, full
    `pnpm test:e2e` (18/18), and `pnpm openspec:validate` pass. Build still
    logs expected Medium DNS fallback warnings under restricted network.

- **About-drawer fixes round 3 (real-browser follow-up on round 2)**
  - `MockUIKit.ts` (the `<mock-ui-kit>` Lit component behind the "Design
    System" card's modal) — 2 of the 12 icons in its "Icons" showcase grid
    rendered broken: `"user"` renders as a mangled shoulders-only arc (the
    `@andersseen/icon` package's own `USER` SVG path is missing the head
    circle — a bug in that upstream icon, not fixable here) and `"camera"`
    isn't a registered icon name at all (renders blank). Swapped both for
    confirmed-valid, well-formed icons (`layers`, `monitor`) after checking
    every exported icon name in
    `node_modules/@andersseen/icon/dist/icons.d.ts`.
  - `CommunityList.tsx` sticky tabs — round 2 made them sticky, but a stray
    sliver of scrolled-past card content kept showing up above the tab bar.
    Root cause: `position: sticky; top: 0` on a child does **not** let the
    element stick past its scroll-container's own `padding-top` — Chrome
    clamps the stuck position to the padding box, so the container's
    `py-4 sm:py-6` (in `PortfolioModal.tsx`, shared by every modal type)
    always left a gap equal to that padding, no matter what negative
    `margin-top` was applied to the sticky child (confirmed empirically with
    a Playwright script measuring `getBoundingClientRect()` before/after —
    margin-based attempts left a consistent 24px gap). Fixed by setting a
    **negative `top` offset** instead (`top-[-1rem] sm:top-[-1.5rem]`,
    matching the container's padding exactly) — this cancels the clamp
    itself rather than fighting it with margin, verified gap=0px after the
    fix.
  - `AboutDrawer.tsx` "Download CV" button used `bg-primary-500
    hover:bg-primary-600` — a color-scale step pinned outside the semantic
    `bg-primary` token every other button/accent in the app uses. In the
    fallback theme (API unreachable, the common local-dev case) this
    happens to look close to `bg-primary`, but `-500`/`-600` aren't
    guaranteed to track the same contrast-tuned value the theme API returns
    for `theme.primary.DEFAULT`, so a live-generated theme could make this
    button visibly "off-palette" and risk poor contrast against its
    `text-background` label. Changed to `bg-primary hover:bg-primary/90`,
    matching the established pattern used everywhere else (`ProjectList`,
    `SocialCanvas`, `CommunityList`'s solid CTA buttons).
  - Verified via headless-Chromium Playwright (icons, CV button, and the
    sticky-tabs gap=0 measurement) in both light/dark. `pnpm check` and
    `pnpm build` pass.

- **About-drawer fixes round 2 (real-browser follow-up)**
  - `SocialCanvas.tsx` globe — found the actual root cause by reading cobe's
    fragment shader (`node_modules/.../cobe/dist/index.esm.js`): `isDark`
    defaulted to `useState(true)`, so on mount the globe briefly (or
    persistently, depending on when the theme-detection effect committed)
    rendered with the **dark**-theme config (`dark:1`) on a **light**-theme
    modal. Per the shader's math, `dark:1` makes landmass render bright and
    the ocean/unlit hemisphere render near-black — exactly the "black sphere
    with a scatter of white dots" the user saw. Fixed by lazily initializing
    `isDark` from `document.documentElement.getAttribute("data-theme")`
    instead of hardcoding `true`, so the first paint already uses the correct
    config. Also reset the color params to cobe's own documented example
    values (`diffuse:1.2`, `mapBrightness:6`, `baseColor:[0.3,0.3,0.3]`) for
    both themes, only toggling `dark`/`glowColor`/`opacity` — safer than
    guessed custom values.
  - `ServiceDetails.tsx` — cards were still flat/uniform (same icon tint,
    small icon, lots of dead space in the fixed-height modal). Enlarged the
    icon tile, cycled 4 accent colors across the cards (primary/secondary/
    accent/success — all pre-existing safe `text-{color}` on `bg-{color}/10`
    tokens, same pattern as `Card.tsx`'s `colorClasses`, so contrast holds
    under the theme randomizer), added a large faint index numeral
    (`text-foreground/5`, decorative/`aria-hidden`) per card, and hover
    lift/shadow. Note: the leftover blank space below the 2×2 grid is
    structural — `PortfolioModal.tsx` sizes every modal to
    `min(90vh, 800px)` regardless of content length — not something this
    pass changed.
  - `CommunityList.tsx` — the Projects/Games/Templates tabs lived inside the
    modal's `overflow-y-auto` body with no sticky positioning, so they
    scrolled out of view with the list. Wrapped the tabs in
    `sticky top-0 z-10` with a `bg-background` backing and negative margins
    bleeding to the modal's own horizontal padding, so they now stay pinned
    while the card list scrolls beneath them.
  - `DesignCardContent.tsx` — the "Gallery" action link was clipping at the
    bottom of the fixed-height bento tile in the real browser (fit in the
    headless check, not in practice). Shrunk the icon chips (24px → 20px),
    tightened row padding/gaps, confirmed it now fits with visible margin.
  - Re-verified via the same headless-Chromium Playwright script (no project
    run-skill exists yet for this app) in light/dark: Services, Design card,
    and Community sticky-scroll all confirmed visually. The globe still
    can't be pixel-verified in this sandbox (`swiftshader` renders cobe's
    canvas solid black regardless of correctness, confirmed earlier via
    `git stash` against the pre-fix code too) — the fix here is grounded in
    reading the actual shader source, not visual guessing, but a real-browser
    check is still worth it.
  - Verified: `pnpm check` and `pnpm build` pass.

- **About-drawer visual/accessibility fixes (Services, Social globe, Design System card)**
  - `ServiceDetails.tsx`: replaced the empty solid-color `bg-gradient-to-br
    from-primary to-primary` swatches (no icon, effectively decorative-only)
    with real lucide icons (Code/Monitor/Palette/Cloud) on a neutral
    `bg-background` surface, `text-primary` icon color — matches the existing
    icon-on-neutral-surface pattern used elsewhere so contrast holds up under
    any randomized theme. `ServiceItem.gradient` replaced with `icon` in
    `PortfolioGrid.tsx` and `src/data/portfolio.ts`.
  - `SocialCanvas.tsx`: the cobe globe was nearly invisible in light theme
    (`baseColor: [0.93,0.93,0.93]` on a near-white page — landmass dots had
    almost no contrast against the background). Darkened light-theme
    `baseColor`/tuned `mapBrightness`/`diffuse`/`glowColor`, and dropped the
    default `grayscale` filter (was permanently desaturating a globe that
    never had colored markers to reveal on hover).
  - `DesignCardContent.tsx`: the bento tile only rendered 3 hardcoded pill
    labels (`and-button`/`and-icon`/`and-motion`) that silently dropped the
    4th `@andersseen/layout` package and left most of the tile empty. Rewrote
    it to map over `item.details` (all 4 packages) with an icon + mono name
    per row, capped at 3 visible rows (matching `ProjectsCardContent`'s
    `.slice(0,3)` convention) so nothing clips inside the fixed-height card.
  - Added `code`, `monitor`, `palette`, `cloud`, `sparkles`, `zap`,
    `layoutGrid`, `component` to `IconMap.tsx` (lucide-preact).
  - Verified in `pnpm dev` via a headless-Chromium Playwright script (no
    project run-skill existed yet) across light/dark theme: Services and
    Design System card confirmed visually; the globe's WebGL canvas renders
    solid black under this sandbox's software (swiftshader) GL regardless of
    the fix — confirmed via `git stash` that this reproduces identically on
    the pre-fix code too, so it's a headless/software-GL limitation, not a
    regression. Real-browser verification of the globe still recommended.
  - Verified: `pnpm check` and `pnpm build` pass.

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

- **Phase 4 — SEO & infrastructure small wins**
  - Custom `src/pages/404.astro` (serverless fallback) with branded styling and
    a link back home.
  - JSON-LD `WebSite` + `Person` structured data in `BaseHead.astro`,
    locale-aware via `@language` and translated descriptions.
  - `@vercel/analytics` wired into `Layout.astro` with CSP updates in
    `vercel.json`. Web Analytics must be enabled in the Vercel dashboard for
    data collection.
  - Added `tests/404.spec.ts`.
  - Verified: `pnpm check`, `pnpm build`, and 15/15 Playwright tests pass.

- **Phase 5 — CV / resume download**
  - Added a "Download CV" button to the hero in `BentoGrid.astro`.
  - Linked to `public/andrii-pap.pdf` with the `download` attribute.
  - Added `cv.download` i18n keys to `en.json`, `es.json` and `ua.json`.
  - Added `tests/cv.spec.ts`.
  - Verified: `pnpm check`, `pnpm build`, and 15/15 Playwright tests pass.

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

- Phase 6 — Client testimonials (blocked on user-provided quotes).

## Backlog / known intentions

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

- 2026-07-16 — Second follow-up round on About-drawer feedback: fixed 2 broken icons in the Design System modal's icon showcase (`user`/`camera` → `layers`/`monitor`, one was an upstream `@andersseen/icon` bug, one wasn't a registered name), fixed the Community sticky tabs still showing a content sliver above them (the real fix was a negative `top` offset, not a negative margin — sticky ignores a scroll container's own padding via margin tricks), and swapped the CV button's hardcoded `bg-primary-500` for the semantic `bg-primary` token. `pnpm check` and `pnpm build` pass.
- 2026-07-16 — Follow-up round on About-drawer feedback: found the Social globe's real root cause (an `isDark` state race rendering the dark-theme cobe config on the light-theme modal — traced via the shader source, not guesswork), made Services cards visually richer (color-cycled icons, index numerals), made Community's tabs `sticky` so they stop scrolling away, and fixed the Design System card's clipped "Gallery" button by tightening row spacing. `pnpm check` and `pnpm build` pass.
- 2026-07-16 — Fixed 3 About-drawer issues from user screenshots: blank/uninformative Services icon swatches (now real icons on neutral bg), washed-out Social globe in light theme (contrast tuning in `SocialCanvas.tsx`), and the sparse/incomplete Design System bento card (now lists all 4 npm packages with icons). `pnpm check` and `pnpm build` pass.
- 2026-07-16 — Merged Phase 4 and Phase 5 into `feature/portfolio-phases`; Phase 5 added a "Download CV" button to the hero in `BentoGrid.astro`, linked to `public/andrii-pap.pdf`, with i18n labels in `en/es/ua.json` and `tests/cv.spec.ts`.
- 2026-07-15 — Implemented PLAN.md Phase 4 (SEO & infrastructure): custom `src/pages/404.astro` (serverless fallback), JSON-LD `WebSite` + `Person` in `BaseHead.astro`, `@vercel/analytics` wired into `Layout.astro` with CSP updates, and `tests/404.spec.ts`. Full e2e suite (13 tests) passes; `pnpm check` and `pnpm build` pass. Note: Vercel Web Analytics must be enabled in the dashboard for data collection.
- 2026-07-15 — Reverted the standalone contact bento card because it duplicated the existing contact form inside the Social modal and broke the grid layout. Removed `ContactCardContent`, `ContactDetails`, `portfolio.contact` i18n keys, and the `contact` portfolio item; adapted `tests/contact.spec.ts` to cover the SocialCanvas form instead. Full e2e suite (12 tests) passes; `pnpm check` and `pnpm build` pass.
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
