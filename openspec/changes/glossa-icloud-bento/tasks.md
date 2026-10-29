## 1. Glossa

- [x] 1.1 Remove the unused numeric `footer.year` key from all locales.
- [x] 1.2 Add `scripts/glossa.mjs` with `pull [--soft]` and `push`.
- [x] 1.3 Seed Glossa with all 135 keys × 3 locales; verify pull round-trip.
- [x] 1.4 Wire `i18n:pull`, `i18n:push` and the pre-build pull in `package.json`; document `GLOSSA_TOKEN` in `.env.example`.

## 2. Hero → about dialog

- [x] 2.1 Replace the visible hero in `BentoGrid.astro` with a visually hidden `h1`.
- [x] 2.2 Show role/headline/subheadline in `AboutDrawer.tsx`; translate Close/Philosophy/Mission/Connect.
- [x] 2.3 Remove the hero skeleton from `PageLoader.astro`.

## 3. Logo

- [x] 3.1 Crop `public/logo.svg` to the glyph (`viewBox="10 11 780 780"`).
- [x] 3.2 Render it as a `bg-foreground` CSS mask in a solid circle with a 1px ring.

## 4. iCloud-style bento

- [x] 4.1 Page on `background-secondary`, tiles on `background` with `--shadow-tile`.
- [x] 4.2 Rewrite `Card.tsx` with an app-style icon tile; map card types in `PortfolioCard.tsx`.
- [x] 4.3 Flatten inner rows in card contents; hide extra project tags on mobile.
- [x] 4.4 Fix the low-contrast hover color on project titles exposed by the new layout.

## 5. Verification

- [x] 5.1 `pnpm check` and `pnpm build` pass.
- [x] 5.2 Update `tests/home.spec.ts`; full `pnpm test:e2e` passes (23/23).
- [x] 5.3 Visual check in light/dark, desktop and mobile.
