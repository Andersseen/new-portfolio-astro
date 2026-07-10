## Why

The portfolio advertises `@andersseen/layout` as part of its design-system
ecosystem but does not load or use the package in production UI. Integrating it
across representative Astro and Preact surfaces makes the portfolio a truthful
showcase of the framework-agnostic library and reduces duplicated layout
utilities without changing the visual design.

## What Changes

- Load the published `@andersseen/layout` stylesheet once at the application
  root.
- Add strict JSX typing for the `and-layout` attribute.
- Replace equivalent Tailwind flex/grid/alignment/wrap/gap utilities with
  `and-layout` across the portfolio grid, shared card structure, card content,
  modal content, and selected Astro components.
- Keep Tailwind for visual styling, unsupported layout values, responsive
  behaviors not implemented by package version `0.0.1`, states, and animation.
- Add Playwright coverage for the package's computed desktop/mobile grid and
  flex behavior, plus regression coverage for keyboard/modal behavior.
- No user-visible copy or locale keys change. Accessibility, semantic theme
  tokens, responsive layout, and Swapy behavior must remain unchanged.

Non-goals:

- Migrating every layout class or using `and-text`.
- Modifying or publishing `@andersseen/layout`.
- Adding dependencies, changing breakpoints, or redesigning components.

## Capabilities

### New Capabilities

- `attribute-driven-layout`: Defines how production UI uses
  `@andersseen/layout` across frameworks while preserving responsive and
  accessible behavior.

### Modified Capabilities

None. The OpenSpec source-of-truth directory has no existing capabilities.

## Impact

- Affected code: global CSS, Preact JSX types, the portfolio grid, selected
  Preact card/detail components, selected Astro components, and Playwright
  tests.
- APIs and dependencies: no runtime API changes and no new dependency; the
  existing `@andersseen/layout@0.0.1` package becomes active.
- User-visible behavior: layout and interaction remain visually equivalent in
  mobile/desktop and light/dark themes.
- i18n: no new or modified strings.
