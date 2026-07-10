## 1. Foundation

- [x] 1.1 Import `@andersseen/layout` once in the global stylesheet.
- [x] 1.2 Add strict Preact JSX typing for the `and-layout` attribute.

## 2. Core Grid Migration

- [x] 2.1 Migrate the portfolio grid's columns and responsive gaps to `and-layout`.
- [x] 2.2 Migrate dynamic desktop card spans to responsive `and-layout` tokens while preserving Swapy slots and auto rows.
- [x] 2.3 Run `pnpm check` after the core grid migration.

## 3. Representative Framework-Agnostic Usage

- [x] 3.1 Migrate supported layout responsibilities in the shared Preact card shell and card-content components.
- [x] 3.2 Migrate supported layout responsibilities in representative Preact detail/modal components.
- [x] 3.3 Migrate supported layout responsibilities in representative Astro components.
- [x] 3.4 Review migrated markup and remove duplicate Tailwind layout responsibilities where equivalent.
- [x] 3.5 Run `pnpm check` after the component migration.

## 4. Automated Verification

- [x] 4.1 Add Playwright coverage for computed package flex styles in production markup.
- [x] 4.2 Add Playwright coverage for mobile/desktop grid columns, gaps, and spans.
- [x] 4.3 Verify keyboard modal open/close and focus restoration remain covered.
- [x] 4.4 Run the full Playwright suite.

## 5. Documentation and Completion

- [x] 5.1 Update `AGENTS.md` and `docs/SDD.md` to make OpenSpec canonical while preserving project gates and historical specs.
- [x] 5.2 Update `docs/STATE.md`, the OpenSpec adoption record, and the historical layout spec.
- [x] 5.3 Confirm tracked Markdown documentation contains no Spanish prose outside locale-specific content.
- [x] 5.4 Run `openspec validate --all`, `pnpm check`, and `pnpm build`.
- [x] 5.5 Visually verify desktop/mobile and light/dark layouts, then record results.
