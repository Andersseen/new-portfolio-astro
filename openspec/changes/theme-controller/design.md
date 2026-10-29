## Decisions

- **Generation counter over request cancellation.** Every toggle, randomize
  or system change increments `generation`; any awaited result compares its
  captured value before painting. This also covers the palette cache and the
  init fetch, without threading AbortControllers through `theme-api.ts`.
- **Commit = mode + vars + persist, synchronously.** `vars` and `mode` are
  computed before `runThemeTransition`, whose update callback runs a frame
  later, so persistence never records the previous colors.
- **Toggle waits ≤1.5s for an uncached palette**, then falls back to the
  static tokens and drops the palette. The opposite mode is prefetched after
  every commit, so this wait is normally zero.
- **API failure on randomize keeps the current theme.** The old fallback
  applied the last snapshot regardless of its mode (the "always white" bug).
- **localStorage instead of IndexedDB** for theme state: the `<head>` script
  must read it synchronously before first paint. Grid order stays in IDB.
- Mode follows the system until the user toggles (`userSetMode`).

## Framework ownership

Plain client scripts loaded by `Layout.astro`; the Preact navbar only renders
the buttons and observes `data-theme` for its icon. No new dependencies.

## Rollback

Revert the commit; legacy IndexedDB state is deleted on migration, so users
start from system mode with static tokens after a rollback.
