## Why

The portfolio has a working `POST /api/send-email` endpoint but no UI wired to it, leaving the site's main conversion path incomplete. Adding a contact form turns visitors into leads and gives the endpoint a purpose.

## What Changes

- Add a new "Contact" bento card to the portfolio grid with a matching modal.
- Build a Preact contact form inside the modal with fields for name, email and message.
- Mirror the server-side validation rules on the client (name 1–100, email valid ≤254, message 1–5000).
- Add an invisible honeypot field for basic spam protection.
- Provide loading, success and error states with clear feedback.
- Add all labels, placeholders and messages to `en.json`, `es.json` and `ua.json`.
- Ensure full keyboard and screen-reader accessibility inside the modal.
- Add Playwright coverage for validation, submission and state transitions.

## Capabilities

### New Capabilities

- `contact-form`: Collect and submit visitor messages through the portfolio contact modal.

### Modified Capabilities

- None.

## Impact

- `src/data/portfolio.ts`: new `contact` portfolio item.
- `src/components/cards/ContactCardContent.tsx`: card face content.
- `src/components/details/ContactDetails.tsx`: modal form component.
- `src/components/PortfolioModal.tsx` and `src/components/cards/CardContentRenderer.tsx`: dispatch the new `contact` type.
- `src/i18n/locales/*.json`: new contact keys.
- `tests/`: new Playwright spec for the contact form.
- No new dependencies; reuses existing `Input.tsx`, `Button.tsx` and modal focus trap.
- i18n, accessibility, theme and responsive behavior are affected.
