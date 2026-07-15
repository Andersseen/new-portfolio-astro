## Why

The portfolio has a working `POST /api/send-email` endpoint. The Social modal
already contains a contact form in `SocialCanvas.tsx`, but it was not covered by
e2e tests and the previous attempt added a redundant standalone "Contact" bento
card that broke the grid layout. This change keeps the existing Social modal
form as the canonical contact UI and adds automated test coverage for it.

## What Changes

- Remove the redundant standalone "Contact" bento card and its supporting code.
- Keep the existing `SocialCanvas.tsx` form as the contact form wired to
  `POST /api/send-email`.
- Add Playwright coverage for opening the Social modal, submitting the form
  (mocked success), and handling a mocked API error.
- Add stable `data-testid` selectors to the Social modal form and error
  container to support the tests.

## Capabilities

### New Capabilities

- `social-contact-form-test`: automated verification that the Social modal
  contact form submits and shows the right state.

### Modified Capabilities

- `contact-form`: reachable through the existing Social card instead of a
  dedicated grid card.

## Impact

- `src/data/portfolio.ts`: removes the `contact` portfolio item.
- `src/components/PortfolioGrid.tsx`: removes the `contact` type from the
  `PortfolioItem` union.
- `src/components/cards/ContactCardContent.tsx`: deleted.
- `src/components/details/ContactDetails.tsx`: deleted.
- `src/components/cards/CardContentRenderer.tsx`: removes the `contact` case.
- `src/components/PortfolioModal.tsx`: removes the `contact` case.
- `src/components/details/SocialCanvas.tsx`: adds `data-testid` to the form and
  error container.
- `src/i18n/locales/*.json`: removes the now-unused `portfolio.contact` keys.
- `tests/contact.spec.ts`: updated to test the Social modal form.
- `playwright.config.ts`: dev server moved to port 4324 to avoid a conflicting
  local process on 4321.
- No new dependencies.
