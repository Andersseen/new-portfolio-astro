## Context

`src/pages/api/send-email.ts` exposes a `POST /api/send-email` endpoint that
validates `name`, `email` and `message` and sends via Resend. The Social modal
(`SocialCanvas.tsx`) already contains a working contact form that posts to this
endpoint. A previous attempt added a dedicated "Contact" bento card, but it
duplicated the existing form and broke the grid layout, so the standalone card
is being removed.

## Goals / Non-Goals

**Goals:**
- Keep the existing Social modal contact form as the only contact UI.
- Ensure the form still posts to `/api/send-email` and handles loading, success
  and error states.
- Add Playwright coverage for the Social modal contact form.
- Restore the bento grid layout by removing the extra card.

**Non-Goals:**
- Rewriting or redesigning the SocialCanvas form.
- Adding a new contact card, page, or footer form.
- Rate limiting or CAPTCHA.

## Decisions

- **Placement**: contact form lives inside the existing Social modal only.
- **Framework**: reuse the existing `SocialCanvas.tsx` Preact component.
- **Validation**: keep the browser-native `required` and `type="email"`
  validation already present in `SocialCanvas.tsx`.
- **Test selectors**: add `data-testid` attributes to the form and the error
  container so Playwright can target them without relying on visible text.
- **i18n cleanup**: remove the `portfolio.contact` keys that were added for the
  now-deleted standalone form.

## Risks / Trade-offs

- **API returns 500 locally without `RESEND_API_KEY`** → the existing form
  already surfaces the error; Playwright mocks both success and error paths.
- **Removing i18n keys is safe** because no remaining code references them.

## Migration Plan

No migration needed. The change removes an unused card and its dead code.

## Open Questions

- None.
