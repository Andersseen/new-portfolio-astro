## Why

A downloadable CV is a common portfolio conversion path (finding #9 in
`docs/plan/PLAN.md`). The user has provided `public/andrii-pap.pdf`, so the site
should expose a clear download action.

## What Changes

- Add a "Download CV" button to the hero section in `BentoGrid.astro`.
- Add i18n labels for the button to `en.json`, `es.json` and `ua.json`.
- Link to `/andrii-pap.pdf` with the `download` attribute.
- Add a Playwright test verifying the link exists, points to the PDF and has the
  download attribute.

## Capabilities

### New Capabilities

- `cv-download`: visitors can download the CV directly from the hero.

### Modified Capabilities

- `hero-cta`: the hero section now includes a secondary action alongside the
  headline text.

## Impact

- `src/components/BentoGrid.astro` — new download link.
- `src/i18n/locales/*.json` — new `cv.download` key.
- `tests/cv.spec.ts` — new test file.
- `docs/STATE.md`, `docs/plan/PLAN.md` — progress tracking.
- No new dependencies.
