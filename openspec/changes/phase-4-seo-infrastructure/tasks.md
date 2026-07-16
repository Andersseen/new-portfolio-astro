## 1. Custom 404 page

- [x] 1.1 Create `src/pages/404.astro` using `Layout.astro` with English copy and
      a link back home.
- [x] 1.2 Add `export const prerender = false;` so Vercel serves the page as a
      serverless fallback for unmatched routes.

## 2. JSON-LD structured data

- [x] 2.1 Build a `WebSite` schema object in `src/components/BaseHead.astro`.
- [x] 2.2 Build a `Person` schema object with `sameAs` links.
- [x] 2.3 Render both objects inside `<script type="application/ld+json">`.
- [x] 2.4 Set `@language` based on the active page locale.

## 3. Vercel Analytics

- [x] 3.1 Install `@vercel/analytics`.
- [x] 3.2 Import and render `<Analytics />` in `src/layouts/Layout.astro`.
- [x] 3.3 Update `vercel.json` CSP for `https://va.vercel-scripts.com` and
      `https://vitals.vercel-insights.com`.

## 4. Verification

- [x] 4.1 Run `pnpm check:i18n` and `pnpm check`.
- [x] 4.2 Run `pnpm build`.
- [x] 4.3 Run `pnpm exec playwright test`.
- [x] 4.4 Verify the 404 page renders in `pnpm preview`.
- [x] 4.5 Validate JSON-LD in the built HTML.
- [x] 4.6 Update `docs/STATE.md` and `docs/plan/PLAN.md`.
- [x] 4.7 Run `pnpm openspec:validate`.
