# Andersseen Portfolio

Personal frontend portfolio built with Astro. It showcases client work, open-source projects, technical articles and a growing design-system ecosystem through an interactive bento grid with shared-element modal transitions.

Live site: [andersseen.dev](https://andersseen.dev/)

## Stack

- **Framework:** [Astro](https://astro.build/) with static + server hybrid output
- **UI islands:** [Preact](https://preactjs.com/) for interactive components
- **Web Components / Lit:** custom elements and the `@andersseen/*` design-system showcase
- **Angular:** selected components via `@analogjs/astro-angular`
- **Styling:** Tailwind CSS v4 with CSS custom properties generated from an external theme API
- **Animations:** Motion, GSAP (via project demos) and `@andersseen/motion`
- **Drag & reorder:** [Swapy](https://swapy.framer.wiki/) with IndexedDB persistence
- **Deployment:** Vercel (serverless adapter)

## Features

- **Interactive bento grid** — cards can be reordered on desktop and persist their order in IndexedDB.
- **Shared-element modals** — clicking a card morphs it into a detailed modal using FLIP-style transitions.
- **i18n** — English, Spanish and Ukrainian content via JSON locale files.
- **Theme randomizer** — generates harmonious color palettes through a Palette Crafter API proxy, with light/dark mode support.
- **Medium RSS integration** — latest articles are pulled from the Medium RSS feed at build time.
- **Design-system showcase** — live demo of the `@andersseen/web-components`, `@andersseen/icon`, `@andersseen/motion` and `@andersseen/layout` packages inside a dedicated card/modal.
- **Accessible interactions** — cards and modals are keyboard-operable, with focus management and ARIA attributes.

## Requirements

- Node.js 20+
- pnpm 10+

## Installation

```bash
pnpm install
```

## Available scripts

| Command            | Action                                              |
| :----------------- | :-------------------------------------------------- |
| `pnpm dev`         | Start the dev server at `localhost:4321`            |
| `pnpm build`       | Build the production site to `./dist/`              |
| `pnpm preview`     | Preview the production build locally                |
| `pnpm check:i18n`  | Validate that all locale files have the same keys   |
| `pnpm check`       | Run i18n validation + Astro TypeScript check        |
| `pnpm typecheck`   | Run Astro TypeScript check only                     |
| `pnpm astro ...`   | Run Astro CLI commands                              |

## Environment variables

Create a `.env` file at the project root with the variables you need:

### Theme API (required for theme randomizer)

```bash
THEME_API_BASE_URL=https://palette-crafter.pages.dev
PUBLIC_THEME_API_BASE_URL=https://palette-crafter.pages.dev
```

`THEME_API_BASE_URL` is used server-side by the Astro API proxy at `/api/theme`. `PUBLIC_THEME_API_BASE_URL` is exposed to the client build if the randomizer needs to call the API directly.

### Email endpoint (optional)

The contact email endpoint at `/api/send-email` uses Resend. If you want to enable it, add:

```bash
RESEND_API_KEY=re_xxxxxxxx
```

If `RESEND_API_KEY` is missing, the endpoint returns a 500 configuration error.

## Validation

Before deploying, run the quality commands:

```bash
pnpm run check
pnpm run build
```

`pnpm run check` currently runs:

1. `pnpm run check:i18n` — ensures `en.json`, `es.json` and `ua.json` share the same key structure.
2. `astro check` — TypeScript type checking for Astro/Preact components.

## Architecture notes

- `src/data/portfolio.ts` defines the grid data and uses a `tr()` helper so every label is i18n-ready.
- `src/components/PortfolioGrid.tsx` manages Swapy initialization, saved order hydration and modal orchestration.
- `src/store/modalStore.ts` is a small Nanostores-based state slice for the modal lifecycle.
- `src/scripts/theme-*.ts` handles theme loading, dark/light toggling and palette randomization.
- `src/pages/api/theme.ts` proxies requests to the Palette Crafter API to avoid exposing the API key.
- `src/pages/api/send-email.ts` sends contact emails via Resend with HTML escaping and basic input validation.

## Deploy

This project is configured for Vercel. Connect the repository and deploy from the `main` (or current) branch. Make sure the environment variables above are set in the Vercel dashboard.

## License

MIT — feel free to use the structure as inspiration, but replace the personal content and brand assets with your own.
