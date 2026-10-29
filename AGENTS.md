# Agent Operating Guide — Andersseen Portfolio

You are working on a personal portfolio site built with Astro. This file is your
entry point. Read it fully before touching code.

## Session bootstrap (do this first, every session)

1. Read [docs/CONTEXT.md](docs/CONTEXT.md) — what this project is and why it exists.
2. Read [docs/STATE.md](docs/STATE.md) — where the project is right now.
3. For any non-trivial task (new feature, refactor, anything touching >2 files),
   follow the OpenSpec workflow in [docs/SDD.md](docs/SDD.md). Create and review
   proposal/spec/design/tasks artifacts before writing implementation code.
4. Before writing code, read [docs/CONVENTIONS.md](docs/CONVENTIONS.md) and the
   relevant sections of [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Project snapshot

- **What:** Personal portfolio (bento grid + shared-element modals), live at https://andersseen.dev/
- **Stack:** Astro 5 (hybrid output, Vercel adapter) + Preact islands + Lit + Angular (selected components) + Tailwind CSS v4
- **Package manager:** pnpm (Node 20+). Never use npm or yarn.
- **i18n:** en (default), es, ua — JSON locale files with enforced key parity.
- **No test framework.** Verification = `pnpm check` + `pnpm build` + manual check in dev server.

## Commands

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `pnpm dev`        | Dev server at localhost:4321                          |
| `pnpm check`      | i18n key parity check + `astro check` (TypeScript)    |
| `pnpm check:i18n` | Key parity check of the Glossa catalogs               |
| `pnpm build`      | Production build (must pass before considering done)  |
| `pnpm preview`    | Preview the production build                          |
| `pnpm openspec:status` | List active OpenSpec changes                     |
| `pnpm openspec:validate` | Validate every OpenSpec spec/change             |

## Hard rules (violating these breaks the build or the site)

1. **Never import from `react` or `react-dom` directly, and never add React-only
   dependencies.** `react` is aliased to `preact/compat` in `astro.config.mjs`.
   Interactive components are Preact.
2. **Angular components live ONLY in `src/components/angular/`.** The Angular
   integration compiles only that directory (`transformFilter`), and the Preact
   integration excludes it. An Angular component placed anywhere else silently
   fails; a Preact component placed inside it won't compile.
3. **Translations live only in Glossa** (project `portfolio`; the site's `ua`
   is Glossa's `uk`). There are no locale files in the repo: pages load the
   catalog via `loadMessages()` (`src/i18n/glossa.ts`) at build/render time.
   Every new key goes into Glossa (the `glossa` MCP server or its UI) for all
   three locales; `pnpm check:i18n` checks parity there. Missing keys render
   as the raw key string. The build needs `GLOSSA_TOKEN` unless Glossa public
   delivery is enabled, and fails if Glossa is unreachable.
4. **Path aliases** (`@componentes`, `@i18n`, `@layouts`, `@scripts`, `@styles`,
   `@assets`, `@/`) are defined in **two places** that must stay in sync:
   `astro.config.mjs` (vite.resolve.alias) and `tsconfig.json` (paths).
   Note the alias is `@componentes` (Spanish spelling), not `@components`.
5. **API routes** (`src/pages/api/*`) must declare `export const prerender = false;`
   or they get statically prerendered and break.
6. **Tailwind v4:** there is NO `tailwind.config.js`. Design tokens live in the
   `@theme` block of `src/styles/global.css`. Use semantic tokens
   (`bg-background`, `text-foreground`, `text-primary`, `border-border`, …),
   never hardcoded colors — the runtime theme randomizer overrides these
   CSS variables.
7. **Never commit `.env`** (contains `THEME_API_BASE_URL`, `RESEND_API_KEY`, `GLOSSA_TOKEN`).

## Definition of done (check before reporting a task complete)

- [ ] `pnpm check` passes (i18n parity + TypeScript).
- [ ] `pnpm build` passes.
- [ ] Verified visually/behaviorally in `pnpm dev` (both light and dark theme if UI changed; all 3 locales if text changed).
- [ ] New UI is keyboard-operable with proper ARIA (project standard).
- [ ] [docs/STATE.md](docs/STATE.md) updated with what changed.
- [ ] Relevant OpenSpec change tasks are complete and validation passes.

## Agent harness (Agentyx)

Project-local Skills and MCP servers are managed by
[Agentyx](https://github.com/Andersseen/agentyx) from `.agentyx.json`
(packs: technical, typescript, angular, testing, creative-web, ui-ux,
accessibility, performance, git; `playwright` enabled; targets Claude Code and
Codex). Skills live in `.claude/skills/` and `.agents/skills/`; MCP servers in
`.mcp.json` and `.codex/config.toml`. Do not hand-edit generated Skills —
change `.agentyx.json` and run `pnpm dlx @agentyx/cli@0.24.0 install`, then
commit the updated `.agentyx.lock.json`. `agentyx doctor` checks the setup.
The OpenSpec skills in `.codex/skills/` are separate and not managed by Agentyx.

## Git workflow

- Branch from `main` as `feature/<name>`, merge via PR.
- Commit style: `feat: ...`, `refactor: ...`, `fix: ...` (imperative, lowercase prefix).
- Never commit directly to `main` unless explicitly asked.

## Documentation map

| File                                             | Read when                                        |
| ------------------------------------------------ | ------------------------------------------------ |
| [docs/CONTEXT.md](docs/CONTEXT.md)               | Start of session — purpose and goals             |
| [docs/STATE.md](docs/STATE.md)                   | Start of session — current status; update at end |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)     | Before modifying any subsystem                   |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md)       | Before writing any code                          |
| [docs/SDD.md](docs/SDD.md)                       | Before starting a non-trivial task               |
| [openspec/](openspec/)                           | Canonical current specs and change artifacts      |
| [docs/specs/](docs/specs/)                       | Historical pre-OpenSpec change records only       |
