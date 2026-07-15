## 1. Remove redundant standalone contact card

- [x] 1.1 Remove the `contact` item from `getPortfolioItems()` in `src/data/portfolio.ts`.
- [x] 1.2 Remove `contact` from the `PortfolioItem` type union in `src/components/PortfolioGrid.tsx`.
- [x] 1.3 Delete `src/components/cards/ContactCardContent.tsx`.
- [x] 1.4 Delete `src/components/details/ContactDetails.tsx`.
- [x] 1.5 Remove the `contact` case from `src/components/cards/CardContentRenderer.tsx`.
- [x] 1.6 Remove the `contact` case from `src/components/PortfolioModal.tsx`.

## 2. Clean up unused i18n keys

- [x] 2.1 Remove `portfolio.contact` keys from `src/i18n/locales/en.json`.
- [x] 2.2 Remove `portfolio.contact` keys from `src/i18n/locales/es.json`.
- [x] 2.3 Remove `portfolio.contact` keys from `src/i18n/locales/ua.json`.
- [x] 2.4 Run `pnpm check:i18n` to confirm key parity.

## 3. Prepare the Social modal form for tests

- [x] 3.1 Add `data-testid="social-contact-form"` to the form in
      `src/components/details/SocialCanvas.tsx`.
- [x] 3.2 Add `data-testid="social-contact-error"` to the error container in
      `SocialCanvas.tsx`.
- [x] 3.3 Verify the form still POSTs to `/api/send-email` with name, email and
      message.

## 4. Update Playwright coverage

- [x] 4.1 Update `tests/contact.spec.ts` to open the Social card and test the
      SocialCanvas form.
- [x] 4.2 Add a mocked-success test.
- [x] 4.3 Add a mocked-error test.

## 5. Verification

- [x] 5.1 Run `pnpm check` and `pnpm build`; fix any errors.
- [x] 5.2 Visually verify the bento grid layout is restored and the Social modal
      form still works.
- [x] 5.3 Run the full Playwright suite.
- [x] 5.4 Update `docs/STATE.md` and `docs/plan/PLAN.md`.
- [x] 5.5 Run `pnpm openspec:validate`.
