## 1. i18n keys

- [x] 1.1 Add contact form keys to `src/i18n/locales/en.json`.
- [x] 1.2 Add Spanish translations to `src/i18n/locales/es.json`.
- [x] 1.3 Add Ukrainian translations to `src/i18n/locales/ua.json`.
- [x] 1.4 Run `pnpm check:i18n` to confirm key parity.

## 2. Data and card wiring

- [x] 2.1 Add a `contact` item to `getPortfolioItems()` in `src/data/portfolio.ts`.
- [x] 2.2 Create `src/components/cards/ContactCardContent.tsx` for the card face.
- [x] 2.3 Register the `contact` case in `src/components/cards/CardContentRenderer.tsx`.
- [x] 2.4 Register the `contact` case in `src/components/PortfolioModal.tsx`.

## 3. Contact form component

- [x] 3.1 Create `src/components/details/ContactDetails.tsx` with name, email and message fields.
- [x] 3.2 Implement client-side validation matching the API contract.
- [x] 3.3 Add an invisible honeypot field.
- [x] 3.4 Implement submit handling with loading, success and error states.
- [x] 3.5 Add focus management for validation errors, API errors and success.
- [x] 3.6 Wire the existing `Input.tsx` and `Button.tsx` components.

## 4. Verification

- [x] 4.1 Run `pnpm check` and `pnpm build`; fix any errors.
- [x] 4.2 Visually verify the contact card and modal in all 3 locales, both themes and mobile/desktop.
- [x] 4.3 Add a Playwright test for the contact form validation and submission states.
- [x] 4.4 Update `docs/STATE.md` and `docs/plan/PLAN.md`.
- [x] 4.5 Run `pnpm openspec:validate`.
