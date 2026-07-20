## Why

Lighthouse reports 100 accessibility, but the real modal states can still show low-contrast combinations during theme changes, hover states, and generated palettes. The project cards also over-emphasize large screenshots and use a saturated primary-color treatment that feels off-palette and harms readability.

## What Changes

- Add a Playwright-based accessibility audit focused on real user flows: opening modals, keyboard interaction, dark/light themes, and computed contrast checks for visible text.
- Expand the audit to cover every portfolio grid card, every modal detail view, hover/focus states, and shadow-DOM content exposed by design-system demos.
- Fix the theme View Transition so repeated theme toggles cannot leave the circular reveal stuck over the page.
- Refine project modal cards so screenshots are smaller, better balanced with content, and no longer depend on a full-card primary-color hover wash.
- Keep project card colors on semantic background/foreground/border tokens and reserve primary color for small accents.
- Preserve project links, lazy images, keyboard operation, and external-link behavior.

Non-goals:

- No new dependencies such as axe are introduced in this change.
- No changes to project content, translations, routing, or API behavior.
- No broad redesign of every modal; fixes are scoped to contrast/interaction risks discovered in the affected surfaces.

## Capabilities

### New Capabilities

- `a11y-visual-audit`: Browser-level accessibility audit coverage for modal/card contrast and keyboard behavior.
- `project-card-presentation`: Project modal card presentation requirements for balanced media, semantic palette use, and readable interactive states.

### Modified Capabilities

- None.

## Impact

- Affected code: `src/components/details/ProjectList.tsx`, Playwright tests under `tests/`, and project session docs.
- Accessibility: improves contrast coverage beyond Lighthouse by checking computed colors in the browser.
- Themes: verifies light and dark modes and avoids hardcoded colors.
- Responsive behavior: project cards remain single-column, with a compact screenshot layout that adapts on mobile/desktop.
- Dependencies: none.
