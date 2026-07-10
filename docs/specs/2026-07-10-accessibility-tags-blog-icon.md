# Spec: Accessibility, tag contrast, and Blog icon

- **Date:** 2026-07-10
- **Status:** done
- **Author session:** Codex session 2026-07-10

## Goal

Improve the practical accessibility of the portfolio grid, ensure tags remain
readable with every theme, and restore the missing Blog link icon in the Social
card.

## Context

Each full card is rendered as a button that opens a modal. `SocialCardContent`
previously placed links inside that button, creating nested interactive
controls. `IconMap` also lacked the `blog` key used by the data, leaving its
icon empty. Tags used dynamic color combinations whose contrast was not
guaranteed across generated palettes. The project already provides focus
management and dialog semantics in the modal, and this change must preserve
that contract.

## Requirements

1. MUST show a recognizable Blog icon in both the Social card and its detail
   view without announcing the same content twice to screen readers.
2. MUST render tags and badges with clearly readable text and stable contrast
   in light, dark, and randomized themes.
3. MUST prevent nested interactive controls inside grid cards; each card must
   expose one accessible action that opens its modal.
4. MUST keep every card keyboard operable, with an accessible name, visible
   focus, Enter/Space activation, and focus restoration after closing.
5. MUST keep the modal labelled, closable with Escape, and focus-trapped while
   open.
6. SHOULD fix additional reproducible accessibility issues found during a
   focused review of the home page without unrelated visual or architectural
   changes.
7. MUST preserve responsive behavior and all three existing locales.

### Non-goals / out of scope

- Formal WCAG certification or a complete legal accessibility audit.
- Redesigning the grid, modal, or theme system.
- Adding dependencies or changing social-link destinations.
- Refactoring unrelated components unless required by a verified accessibility
  fix.

## Affected surface

| File / area | Change |
| ----------- | ------ |
| `src/components/IconMap.tsx` | Add the Blog icon. |
| `src/components/cards/SocialCardContent.tsx` | Remove nested controls and preserve an accessible presentation. |
| `src/components/ui/Badge.tsx` | Stabilize badge contrast. |
| `src/components/cards/ServicesCardContent.tsx` | Apply the same readable treatment to service tags. |
| Grid/modal components that fail the audit | Focused and verified accessibility fixes. |
| `docs/STATE.md` | Record the result. |

- New i18n keys: none anticipated. If visible copy must change, add real
  translations to `en.json`, `es.json`, and `ua.json`.
- New dependencies: none.
- Framework for new components: no new component; existing Preact components.

## Plan

1. Fix the icon map and make the Social card content presentational, keeping
   interactive external links in the modal.
2. Standardize badges and tags on surfaces/tokens with stable contrast.
3. Review home-page semantics, accessible names, focus order, and keyboard
   navigation; fix only reproducible failures.
4. Run `pnpm check` and `pnpm build`.
5. Verify light/dark themes, desktop/mobile layouts, keyboard behavior, and all
   three locales in a browser; update this spec and `docs/STATE.md`.

## Verification

- `pnpm check`
- `pnpm build`
- Inspect the accessibility tree to confirm card buttons contain no links and
  every control has a name.
- Keyboard-only walkthrough: cards, modal open/close, focus trap, and focus
  restoration.
- Visually review tags and the Blog icon in light, dark, and randomized themes
  at mobile and desktop widths.
- Smoke-check `/`, `/es/`, and `/ua/` for locale regressions.

## Status log

- 2026-07-10 — created (draft)
- 2026-07-10 — approved by user; implementation and Playwright verification requested
- 2026-07-10 — added the missing Blog/RSS icon, removed nested interactive
  controls from the Social card, and stabilized tag contrast and typography
- 2026-07-10 — `pnpm check`, `pnpm build`, and all 6 Playwright tests passed;
  visually verified the rendered Blog icon and tags in a full-page capture
- 2026-07-10 — done
