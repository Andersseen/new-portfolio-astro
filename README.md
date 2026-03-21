# Astro Starter Kit: Basics

## Theme API Integration

This portfolio now consumes Palette Crafter as the single source of truth for theme generation.

### Required environment variable

Set this in your environment (used by the Astro API proxy at `/api/theme`):

```bash
THEME_API_BASE_URL=https://palette-crafter.pages.dev
```

Optional for visibility in client builds:

```bash
PUBLIC_THEME_API_BASE_URL=https://palette-crafter.pages.dev
```

### Local verification

1. Run `pnpm install`
2. Run `PUBLIC_THEME_API_BASE_URL=http://localhost:3000 pnpm dev`
3. Click the randomize button in the navbar and verify:
   - Loading state appears
   - New theme is applied from API
   - If API is unavailable, last valid theme is reused
4. Toggle dark/light mode and confirm theme is re-fetched for the new mode

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https:

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https:
