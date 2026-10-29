## Why

With the live Palette Crafter API, fast clicks on the theme toggle left the
page in `data-theme="dark"` with a light palette, persisted the wrong mode,
and from then on randomize generated light palettes. Reproduced on
production: five toggles 350ms apart settle as dark mode + `#faf9fa`
background, and IndexedDB stores `mode: light`.

## What Changes

- Replace `theme-toggle.ts` + `theme-randomizer.ts` with one
  `theme-controller.ts` that owns mode and palette and drops stale async work.
- Mode and colors are committed together in one reveal transition; a click
  during a running reveal skips it and starts a new one.
- Palettes are `{ baseHue, harmony }`, re-requested per mode (opposite mode
  prefetched), so toggling keeps the randomized palette.
- Persist to localStorage; the inline `<head>` script restores mode + colors
  synchronously (it was async IndexedDB and wrote `[object Object]` into
  `--color-primary`). Legacy IndexedDB state is migrated once.
- First visit uses the static design tokens instead of fetching a
  route-seeded palette (no request, no post-load color snap).
- Call `/api/theme/` directly (avoids a 308 per request).
- Replace low-contrast `group-hover:text-primary` titles in the Community,
  Stack and Design modals (failed the a11y audit intermittently).

## Impact

`src/scripts/theme-*.ts`, `src/components/BaseHead.astro`,
`src/layouts/Layout.astro`, `src/utils/theme-api.ts`, `tests/theme.spec.ts`,
`src/components/details/{CommunityList,StackDetails,DesignGallery}.tsx`.
