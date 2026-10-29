## Context

The site imported the locale JSON files statically in server and client code,
so Glossa could only be a copy of committed files. The goal is for Glossa to
be the single source of the copy.

## Decisions

### Glossa as the only source, loaded on the server

- `src/i18n/glossa.ts` (server-only) fetches one locale's catalog: public
  delivery URL first, then MCP `get_catalog` with `GLOSSA_TOKEN` (3 attempts).
  Cached for the whole build; in dev the cache lasts ~5s so edits in Glossa
  show on reload.
- Pages call `await loadMessages(lang)` before `t()`. A prerendered page
  fails the build when Glossa is unreachable. Shipping stale copy silently is
  worse than a failed deploy, which keeps the previous version live.
- `Layout.astro` embeds the current locale's catalog as JSON
  (`#i18n-messages`, `<` escaped); in the browser `t()` reads it. Islands keep
  the same `t()` API, and no catalog is bundled into client JS. The on-demand
  404 degrades to raw keys instead of a 500 if Glossa fails at runtime.
- `GLOSSA_TOKEN` is read via `import.meta.env` only in `glossa.ts`; verified
  absent from client and server build output.
- Locale mapping: the site keeps `ua` in URLs; Glossa uses the ISO code `uk`.

Alternatives considered: syncing JSON files into the repo before each build
(Glossa becomes a mirror; catalogs still bundled) and fetching from the
browser (needs public delivery, adds a request and a flash of keys).

### Framework ownership

No framework changes: Astro (`BentoGrid.astro`, `PageLoader.astro`) and Preact
(`Navbar`, `AboutDrawer`, `Card`, `PortfolioCard`). No new dependencies; icons
come from the existing `lucide-preact`.

### Theme tokens

Page background becomes `--color-background-secondary`; tiles use
`--color-background`. In both built-in themes this makes tiles lighter than the
page in light mode and slightly lighter in dark mode. Tile shadows are new
`--shadow-tile` / `--shadow-tile-hover` theme variables built with
`color-mix()` from `--color-foreground`/`--color-border`, so the randomizer
still drives them. The logo is a CSS mask filled with `bg-foreground`.

Tile radius stays at 24px (`rounded-3xl`) because the shared-element modal
morph starts from that radius.

## Risks

- A generated palette where `background-secondary` is lighter than
  `background` would invert the tile/page relation. The hairline/shadow keeps
  tiles distinguishable either way.
- Translation edits in Glossa reach production on the next build (the Glossa
  deploy hook targets Cloudflare; this site is on Vercel). Moving the pages to
  on-demand rendering with Vercel ISR would remove that step.
- Builds now depend on Glossa availability and on `GLOSSA_TOKEN` (or public
  delivery) being configured in Vercel.

## Rollback

Revert the PR; the locale JSON files come back from git history.
