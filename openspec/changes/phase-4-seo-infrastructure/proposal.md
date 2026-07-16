## Why

The site already has solid meta tags and a sitemap, but it is missing a few
infrastructure basics: a branded 404 page, structured data for search engines,
and visitor analytics. Phase 4 closes these gaps with low-risk, high-value
changes.

## What Changes

1. Add an on-brand `src/pages/404.astro` with a link back home (English copy
   for this iteration).
2. Inject JSON-LD (`Person` + `WebSite`) into `BaseHead.astro` using the
   configured site URL and locale.
3. Add `@vercel/analytics` to the layout, update the CSP, and document that
   Web Analytics must be enabled in the Vercel dashboard.

## Capabilities

### New Capabilities

- `custom-404`: branded not-found experience in English, Spanish and Ukrainian.
- `structured-data`: machine-readable `Person` and `WebSite` schema on every
  page.
- `vercel-analytics`: visitor and Web Vitals tracking via Vercel Analytics.

### Modified Capabilities

- None removed; existing SEO meta tags remain unchanged.

## Impact

- `src/pages/404.astro` — new page.
- `src/pages/404.astro` — new serverless fallback page.
- `src/components/BaseHead.astro` — JSON-LD script block.
- `src/layouts/Layout.astro` — `<Analytics />` component.
- `package.json` + `pnpm-lock.yaml` — new dependency `@vercel/analytics`.
- `vercel.json` — CSP updates for Vercel Analytics origins.
- `docs/STATE.md`, `docs/plan/PLAN.md` — progress tracking.
- No runtime behavior changes for end users beyond analytics loading.
