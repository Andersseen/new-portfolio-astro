## Context

The portfolio uses Astro with hybrid output, `trailingSlash: "always"`, and the
Vercel adapter. Meta tags, sitemap, canonical URLs and hreflang are already in
place via `BaseHead.astro`. The remaining SEO/infrastructure items from
`docs/plan/PLAN.md` Phase 4 are:

- Custom 404 page.
- JSON-LD structured data.
- Analytics.

## Goals / Non-Goals

**Goals:**
- Render a branded 404 fallback for unknown paths.
- Provide valid `Person` + `WebSite` schema.org markup on every page.
- Load Vercel Analytics without CSP violations.

**Non-Goals:**
- Replacing existing meta/Open Graph tags.
- Adding a server-side analytics proxy.
- Complex 404 routing logic (Astro/Vercel handles fallback automatically).

## Decisions

- **404 page**: single `src/pages/404.astro` using `Layout.astro` and marked
  with `export const prerender = false;` so it is served as a serverless
  fallback for unmatched routes. The copy is in English for simplicity; locale
  detection can be added later if needed.
- **JSON-LD**: embedded directly in `BaseHead.astro` as a safe static object.
  `WebSite` uses `Astro.site`. `Person` uses the author's public name
  ("Andersseen Dev"), the site URL, and `sameAs` links to GitHub, GitLab and
  Medium already present in the portfolio data. `@language` matches the active
  page locale.
- **Analytics**: `@vercel/analytics` is the recommended Vercel-native solution.
  The component is rendered in `Layout.astro` so it loads on every page. The
  CSP is updated to allow the script endpoint (`https://va.vercel-scripts.com`)
  and the metrics endpoint (`https://vitals.vercel-insights.com`).

## Risks / Trade-offs

- **Vercel Analytics only reports if enabled in the dashboard** — the script
  will still load harmlessly if disabled, but no data will be collected. This
  must be flagged to the user.
- **404 routing with `trailingSlash: "always"`** — Astro generates a static
  `404.html` that Vercel serves for unmatched routes. `pnpm preview` may not
  fully emulate Vercel's behavior, so a deploy preview should be checked.
- **404 page is English-only** — acceptable for a first iteration; adding
  per-locale 404 pages requires explicit `src/pages/{es,ua}/404.astro` files
  or middleware.

## Migration Plan

No migration needed. After deploy, the user must enable Web Analytics in the
Vercel dashboard if they want data collection.

## Open Questions

- None.
