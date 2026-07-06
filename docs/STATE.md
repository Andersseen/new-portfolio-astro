# Current State

> **Maintenance contract:** this file is the session-to-session memory of the
> project. Read it at the START of every session. Update it at the END of every
> session in which anything changed: move finished work to "Recently completed",
> update "In progress", add discoveries to "Known issues". Keep it short —
> delete stale entries instead of letting them pile up. Update the date below.

**Last updated:** 2026-07-06 · **Branch state:** `main` clean at `b42241d`

## Status: ✅ Stable, deployed

Live on Vercel at https://andersseen.dev/. Build and checks pass.

## Recently completed (last few cycles)

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

- (empty — pick from Backlog or the user's request)

## Backlog / known intentions

- Fill in `image: ""` fields for projects in `src/data/portfolio.ts`
  (project cards have no images yet).
- Contact form UI for `/api/send-email` (endpoint exists and is validated;
  no form component is wired to it yet — verify before building).
- Type-narrow `PortfolioItem.details` (currently `any` per card type).

## Known issues / tech debt

- `PortfolioItem.details: any` — each card type casts its own shape.
- Old feature branches `feature/morph`, `feature/theme` still exist locally
  (already merged); safe to delete.
- No automated tests; regressions are caught only by `pnpm check` + manual review.
- `src/components/ui/README.md` may drift from the actual component props —
  trust the code, then fix the README.

## Environment notes

- `.env` exists locally with `THEME_API_BASE_URL` (Palette Crafter) — required
  for the theme randomizer. `RESEND_API_KEY` optional (email returns 500 without it).
- Deploys happen from `main` via Vercel Git integration; env vars are set in
  the Vercel dashboard.

## Session log (append newest first, keep ~10 entries, one line each)

- 2026-07-06 — Created agent documentation set (AGENTS.md, CLAUDE.md, docs/*). No app code changed.
