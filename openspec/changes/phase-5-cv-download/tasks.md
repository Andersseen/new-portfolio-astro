## 1. i18n labels

- [x] 1.1 Add `cv.download` key to `src/i18n/locales/en.json`.
- [x] 1.2 Add `cv.download` Spanish translation to `src/i18n/locales/es.json`.
- [x] 1.3 Add `cv.download` Ukrainian translation to `src/i18n/locales/ua.json`.
- [x] 1.4 Run `pnpm check:i18n` to confirm key parity.

## 2. Hero download button

- [x] 2.1 Add a "Download CV" link to the hero in
      `src/components/BentoGrid.astro`.
- [x] 2.2 Set `href="/andrii-pap.pdf"` and `download` attributes.
- [x] 2.3 Style the link to match the primary button theme.
- [x] 2.4 Add an `aria-label` for accessibility.

## 3. Verification

- [x] 3.1 Run `pnpm check` and `pnpm build`; fix any errors.
- [x] 3.2 Add `tests/cv.spec.ts` with a Playwright test for the CV link.
- [x] 3.3 Run `pnpm exec playwright test`.
- [x] 3.4 Visually verify the hero in all 3 locales and both themes.
- [x] 3.5 Update `docs/STATE.md` and `docs/plan/PLAN.md`.
- [x] 3.6 Run `pnpm openspec:validate`.
