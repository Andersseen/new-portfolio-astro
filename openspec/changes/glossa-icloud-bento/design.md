## Context

The site imports the locale JSON files statically in both server and client
code (`src/i18n/utils.ts`, dynamic imports from the navbar), so translations
must exist as files at build time.

## Decisions

### Glossa sync at build time, not at runtime

`scripts/glossa.mjs pull` rewrites `src/i18n/locales/*.json` before
`astro build`. Runtime fetching was rejected: it would add a network dependency
to every page view and to client bundles that import the JSON directly.

- Source order: public delivery URL (`/i18n/portfolio/<locale>.json`, no auth)
  → MCP `get_catalog` when `GLOSSA_TOKEN` is set.
- Safety: the pull refuses to write unless every locale has exactly the source
  locale's key set and every value is a string. With `--soft` the failure is a
  warning and the committed files are used, so a Glossa outage never breaks a
  deploy.
- `push` writes only changed values with `set_translation` and the catalog
  revision, so concurrent edits in Glossa are never overwritten silently.
- Locale mapping: the site keeps `ua` in URLs and file names; Glossa uses the
  ISO code `uk`.

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
- Translation edits in Glossa reach production only on the next build (the
  Glossa deploy hook targets Cloudflare; this site is on Vercel).

## Rollback

Revert the PR. The committed locale files remain the fallback, so removing
the pull step from `build` alone fully detaches Glossa.
