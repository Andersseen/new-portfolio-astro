## Why

Translations are maintained by hand in three JSON files, so every copy change
needs a code change. The owner now runs Glossa (glossa.andersseen.dev), a
translation service with an MCP endpoint for agents and public JSON delivery.

The home page also opens with a large hero block that pushes the bento grid
below the fold, and the navbar logo looks noisy: a black traced SVG, off
center, inside a translucent blurred circle with a 2px translucent border.

## What Changes

- Seed the Glossa `portfolio` project with every current key (local `ua` ↔
  Glossa `uk`) and make Glossa the only source: delete
  `src/i18n/locales/*.json`; pages load catalogs from Glossa at build/render
  time and the layout embeds the current locale's catalog for islands.
- `pnpm check:i18n` checks key parity in Glossa (`scripts/glossa.mjs check`).
- Remove the visible hero; keep a visually hidden `h1`. The hero role, headline
  and subheadline move to the top of the about dialog opened by the logo.
- Translate the remaining hard-coded about-dialog labels.
- Redraw the logo as a theme-colored CSS mask with a cropped viewBox inside a
  solid circle with a 1px ring.
- iCloud-web inspired bento: page on the secondary surface, tiles on the
  primary surface with a soft shadow (hairline edge in dark), app-style icon
  tile + title per card, flatter inner rows.
- Drop the unused numeric `footer.year` key (Glossa values are strings).

## Capabilities

- New: `glossa-icloud-bento` (translation sync, about dialog content, logo,
  bento tile presentation).

## Impact

- `src/i18n/{glossa,utils}.ts`, `src/layouts/Layout.astro`, `src/pages/**/index.astro`
- `scripts/glossa.mjs` (replaces `scripts/check-i18n.mjs`), `package.json`, `.env.example`
- `src/components/{BentoGrid.astro,PageLoader.astro,Navbar.tsx,AboutDrawer.tsx,Card.tsx,PortfolioCard.tsx}`
- `src/components/cards/*`, `src/components/details/ProjectList.tsx`
- `src/styles/global.css`, `public/logo.svg`, `src/i18n/locales/*` (deleted)
- `tests/home.spec.ts`
