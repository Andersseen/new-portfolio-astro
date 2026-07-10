# Spec: Production integration of `@andersseen/layout`

- **Date:** 2026-07-10
- **Status:** draft
- **Author session:** Codex session 2026-07-10

## Goal

Use `@andersseen/layout` as a real layout system on visible portfolio surfaces,
reducing flex/grid/gap utility classes without changing the design,
accessibility, or multi-framework architecture.

## Context

`@andersseen/layout@0.0.1` is already installed and advertised in the Design
System card, but its CSS is not imported and no production component uses the
`and-layout` attribute. The installed version provides horizontal/vertical
flex, 1–12-column grids, spans, alignment, distribution, wrapping, gaps, and
spacing with responsive variants. Tailwind remains necessary for colors,
unsupported sizes, positioning, states, animations, and other visual styles.

## Requirements

1. MUST import the published `@andersseen/layout` CSS exactly once in the
   site's global stylesheet.
2. MUST use `and-layout` in the main grid and a representative selection of
   visible Astro and Preact components.
3. MUST replace only layout classes that the library can represent
   equivalently; duplicate `flex/grid/gap` responsibilities must not remain
   unless documented as a required fallback.
4. MUST preserve the grid's responsive structure exactly: one mobile column,
   three columns from `md`, 16/24 px gaps, and dynamic one/two-column spans.
5. MUST add JSX typing for `and-layout` so strict TypeScript passes without
   `@ts-ignore` directives or casts.
6. MUST preserve card and modal accessibility, Swapy behavior, themes, and
   locales.
7. MUST include Playwright coverage proving that the library CSS is active and
   the grid retains its responsive columns, gaps, and spans.
8. SHOULD leave clear Astro and Preact examples demonstrating that the library
   is framework-agnostic.

### Non-goals / out of scope

- Migrating every Tailwind class in the project.
- Using `and-text` or replacing the current typography system.
- Modifying or publishing a new `@andersseen/layout` version.
- Changing visual appearance, breakpoints, or persisted card order.
- Adding dependencies.

## Affected surface

| File / area | Change |
| ----------- | ------ |
| `src/styles/global.css` | Import the package CSS. |
| `src/types.d.ts` | Type the `and-layout` JSX attribute. |
| `src/components/PortfolioGrid.tsx` | Migrate responsive grid, gap, and spans. |
| `src/components/cards/*.tsx` | Migrate repeated card-content layouts. |
| One or two `.astro` components | Demonstrate framework-agnostic use. |
| `tests/layout.spec.ts` | Verify real responsive styles with Playwright. |
| `docs/STATE.md` | Record integration and verification. |

- New i18n keys: none.
- New dependencies: none; `@andersseen/layout@0.0.1` is already installed.
- Framework for new components: none; existing Astro and Preact components.

## Plan

1. Import the package globally and extend the project's JSX types.
2. Migrate the main grid to `and-layout`, retaining only auto-row and sizing
   classes that the package does not cover.
3. Migrate equivalent layouts in selected Preact cards and Astro components,
   checking every attribute value against version `0.0.1`.
4. Add Playwright tests for computed desktop/mobile styles while preserving all
   existing functional tests.
5. Run `pnpm check`, `pnpm build`, the full Playwright suite, and a visual
   review; update this spec and `docs/STATE.md`.

## Verification

- `pnpm check`
- `pnpm build`
- `pnpm test:e2e`
- Playwright checks grid `display`, column count, gaps, and spans on desktop
  and mobile viewports, using elements that carry `and-layout`.
- Visual review on desktop/mobile and in light/dark themes.
- Keyboard walkthrough of a card and modal to catch regressions.

## Status log

- 2026-07-10 — created (draft)
- 2026-07-10 — translated to English before implementation
