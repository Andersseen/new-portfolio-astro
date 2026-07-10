## Context

The portfolio deliberately mixes Astro, Preact, Angular, and Lit to demonstrate
framework breadth. `@andersseen/layout@0.0.1` is a pure-CSS package that targets
HTML attributes, making it suitable for shared use across those rendering
models. It is installed but currently inactive. Tailwind v4 remains the site's
visual-token and state styling system.

The installed package supports flex direction, grid columns/spans, alignment,
justification, wrapping, gaps, and spacing on a fixed responsive scale. It does
not cover auto rows, arbitrary sizing, position, overflow, flex growth/shrink,
ordering, or interaction states.

## Goals / Non-Goals

**Goals:**

- Activate the package once globally.
- Establish meaningful production usage in both Astro and Preact.
- Migrate enough representative surfaces that the portfolio genuinely consumes
  the library rather than merely demonstrating it in a modal.
- Preserve pixel-equivalent responsive behavior and accessibility.
- Make regression detection depend on computed CSS, not just attribute presence.

**Non-Goals:**

- Remove Tailwind or migrate every layout utility.
- Use the package's `and-text` typography API.
- Change Angular ownership boundaries or create new components.
- Modify the external package or add a dependency.

## Decisions

### Import the package before project styles

`@andersseen/layout` will be imported once from `global.css`. Tailwind and
project rules remain able to override package declarations when a deliberately
unsupported or exceptional layout is needed.

Alternative considered: importing it inside each island. This duplicates CSS
and undermines the package's framework-agnostic value.

### Extend Preact's HTML attribute types

`src/types.d.ts` will add `and-layout?: string` to Preact HTML attributes. Astro
already accepts custom HTML attributes. No component or framework abstraction
will wrap the package.

Alternative considered: spreading a cast object into every element. That hides
errors, adds noise, and works against strict TypeScript.

### Migrate by CSS responsibility, not by file count

The migration will target the main portfolio grid, shared card layout, card
content rows/wrappers, detail grids, and selected Astro list/grid components.
Only equivalent properties are removed from `class`/`className`; classes for
flex growth, sizing, position, order, overflow, state, and visuals remain.

Alternative considered: replacing every `flex` and `grid` occurrence. Package
`0.0.1` cannot express several required patterns, making that approach fragile.

### Preserve dynamic spans with attribute tokens

Portfolio slots will receive `and-layout="span@md:2"` or
`and-layout="span@md:1"` based on the existing layout pattern. The grid keeps
Tailwind only for `auto-rows` because the package has no equivalent.

### Verify computed styles in Playwright

Tests will assert `display`, template-column count, gap, and grid-column values
at both sides of the `md` breakpoint. Existing keyboard/modal tests remain the
interaction regression contract.

## Risks / Trade-offs

- **Attribute tokens are stringly typed** → keep values limited to the inspected
  `0.0.1` API and cover critical behavior with computed-style tests.
- **Tailwind and package specificity can conflict** → remove equivalent layout
  classes and retain duplicates only when the package lacks an equivalent.
- **A broad migration may create hard-to-review markup** → migrate a curated set
  of shared and visible surfaces, then verify each group before expanding.
- **Package upgrades may change generated selectors** → pin behavior through
  Playwright rather than asserting implementation filenames.

## Migration Plan

1. Load CSS and add JSX typing.
2. Migrate the main grid and verify mobile/desktop geometry.
3. Migrate shared/representative Astro and Preact surfaces in small groups.
4. Run all checks and visual review.
5. Roll back individual `and-layout` attributes to their prior Tailwind layout
   utilities if a package limitation appears; no data migration is involved.

## Open Questions

None. Package version `0.0.1` and the target surfaces were inspected before the
design was written.
