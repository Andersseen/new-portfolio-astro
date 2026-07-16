## Context

The portfolio hero lives in `src/components/BentoGrid.astro` and already uses
i18n keys for the role, headline and subheadline. The CV PDF is available at
`public/andrii-pap.pdf`, which is served from the site root as
`/andrii-pap.pdf`.

## Goals / Non-Goals

**Goals:**
- Expose the CV download prominently in the hero.
- Keep the label translated in all three locales.
- Use the native `download` attribute so the file is saved rather than opened.

**Non-Goals:**
- Generating or editing the PDF.
- Adding the action to the Angular navbar.
- Tracking download events (can be added later if analytics is active).

## Decisions

- **Placement**: hero section in `BentoGrid.astro`, directly under the
  subheadline. This is the most visible location and avoids touching the
  Angular-only navbar directory.
- **Component**: plain `<a>` styled with Tailwind to match the primary button
  look (`bg-primary-500 text-background hover:bg-primary-600`). No new Preact
  component is needed.
- **i18n**: add `cv.download` to the existing locale files.
- **Accessibility**: the link has a visible label and a descriptive
  `aria-label`.

## Risks / Trade-offs

- **Only one CV file exists** — it is used for all locales. If multilingual CVs
  are needed later, the link can be made locale-aware.
- **Hero already minimal** — adding a button changes the visual balance, but it
  remains clean because it is a single secondary action under the text.

## Migration Plan

No migration needed. The PDF is already in `public/`.

## Open Questions

- None.
