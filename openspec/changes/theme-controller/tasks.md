## 1. Controller

- [x] 1.1 Reproduce on production with Playwright (fast toggles / randomize / reload).
- [x] 1.2 Add `themeColorsToVars` / `applyThemeVars` to `theme-apply.ts`.
- [x] 1.3 Write `theme-controller.ts` (generation counter, per-mode palette cache, prefetch, localStorage, legacy migration); delete `theme-toggle.ts` and `theme-randomizer.ts`.
- [x] 1.4 Restart the reveal on clicks during a running transition (`theme-transition.ts`).
- [x] 1.5 Synchronous `<head>` restore script in `BaseHead.astro`.
- [x] 1.6 Use `/api/theme/` to avoid the 308.

## 2. Verification

- [x] 2.1 Mocked-API race tests in `tests/theme.spec.ts`; confirmed they fail on the old code and pass on the new one.
- [x] 2.2 Fix low-contrast hover titles surfaced by the a11y audit.
- [x] 2.3 `pnpm check`, `pnpm build`, unit tests and full `pnpm test:e2e` pass.
