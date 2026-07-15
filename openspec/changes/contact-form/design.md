## Context

`src/pages/api/send-email.ts` exposes a `POST /api/send-email` endpoint that validates `name`, `email` and `message` and sends via Resend. There is currently no UI consuming this endpoint. The portfolio grid supports arbitrary card types via `PortfolioCard`, `CardContentRenderer` and `PortfolioModal`, so a new `contact` type can plug into the existing bento + modal system.

## Goals / Non-Goals

**Goals:**
- Add a contact card to the bento grid that opens a modal form.
- Collect name, email and message with client-side validation matching the API contract.
- Submit to `/api/send-email` and surface loading, success and error states.
- Keep the form keyboard-operable and screen-reader friendly inside the existing modal focus trap.
- Add all user-facing strings to the three locale files.

**Non-Goals:**
- Rate limiting or CAPTCHA (out of scope; endpoint already suggests this for the future).
- Real-time email deliverability checks.
- A separate contact page or footer form; the bento card + modal is the chosen placement.

## Decisions

- **Placement**: new `contact` grid card + modal. This reuses the shared-element modal, focus trap and responsive sizing already built for the other cards, and avoids introducing a new page or footer section.
- **Framework**: Preact, like the other interactive grid/details components. Keeps the implementation in the same subsystem and avoids touching the Angular-only directory.
- **UI primitives**: reuse existing `Input.tsx` for name/email and `Button.tsx` for the submit action. For the message field, use a styled native `<textarea>` because `Input.tsx` does not support multi-line text; it will use the same semantic tokens and visual treatment as `Input` for consistency.
- **Validation**: mirror the server rules exactly (name 1–100, email valid and ≤254, message 1–5000). Validation runs on submit to keep the code simple; inline error messages are then displayed per field.
- **Honeypot**: add a hidden text field named `company` rendered with `aria-hidden="true"`, `tabIndex={-1}` and `autocomplete="off"`. If it contains any value on submit the form is silently rejected without calling the API, which avoids tipping off simple bots.
- **State shape**: a small state machine with states `idle | submitting | success | error`. Errors include both field-level validation errors and a single API error message.
- **Focus management**: on validation error, focus moves to the first invalid field; on API error, focus moves to the inline error alert; on success, focus moves to the success message. This satisfies the accessibility requirement and works with the existing modal focus trap.
- **i18n**: all labels, placeholders, button text, validation errors and status messages use `tr()` keys added to `en.json`, `es.json` and `ua.json`.

## Risks / Trade-offs

- **API returns 500 locally without `RESEND_API_KEY`** → the form must handle that gracefully and show a friendly error. The Playwright test will accept this as a valid error-state path.
- **Modal focus trap may conflict with dynamically shown error/success messages** → focus is moved programmatically only after the state update renders the new element.
- **Adding an eighth card changes the bento layout** → the layout pattern repeats every 7 cards, so the new card lands on a `col-span-2` slot. This was verified visually during implementation.

## Migration Plan

No migration needed. The change is purely additive.

## Open Questions

- None.
