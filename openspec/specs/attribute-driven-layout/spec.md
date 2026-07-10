# Attribute-Driven Layout

## Purpose

Define how the portfolio uses `@andersseen/layout` as a framework-agnostic
production layout system while preserving responsive, visual, and accessible
behavior across Astro and Preact surfaces.

## Requirements

### Requirement: Global layout stylesheet
The application MUST load the published `@andersseen/layout` stylesheet exactly
once so `and-layout` attributes work in every framework surface.

#### Scenario: Attribute styles are available application-wide
- **GIVEN** an Astro or Preact element with `and-layout="horizontal gap:md"`
- **WHEN** the page is rendered
- **THEN** its computed display MUST be `flex` and its computed gap MUST be 16 px

### Requirement: Framework-agnostic production usage
The application MUST use `and-layout` in production Astro and Preact components
for supported flex, grid, alignment, wrapping, and gap responsibilities.

#### Scenario: Astro component uses the library
- **GIVEN** a visible static Astro component with a supported layout pattern
- **WHEN** its markup is rendered
- **THEN** the element MUST carry an `and-layout` attribute and MUST NOT retain
  equivalent Tailwind flex/grid/gap classes

#### Scenario: Preact component uses the library
- **GIVEN** a visible Preact component with a supported layout pattern
- **WHEN** its markup is rendered and hydrated
- **THEN** the element MUST carry an `and-layout` attribute with strict JSX
  type checking and MUST NOT require a type suppression

### Requirement: Responsive portfolio grid parity
The portfolio grid MUST preserve one column and a 16 px gap below 768 px, then
three columns, a 24 px gap, and dynamic one/two-column card spans from 768 px.

#### Scenario: Mobile grid
- **GIVEN** a viewport narrower than 768 px
- **WHEN** the portfolio grid is rendered
- **THEN** its computed layout MUST have one column, a 16 px row/column gap, and
  each grid item MUST occupy one column

#### Scenario: Desktop grid
- **GIVEN** a viewport at least 768 px wide
- **WHEN** the portfolio grid is rendered
- **THEN** its computed layout MUST have three columns, a 24 px row/column gap,
  and pattern-assigned wide items MUST span two columns

### Requirement: Progressive responsibility migration
Components MUST use `and-layout` only for values supported by installed package
version `0.0.1`; Tailwind MUST remain responsible for visual tokens, sizing,
positioning, overflow, state, motion, and unsupported layout values.

#### Scenario: Mixed styling responsibilities
- **GIVEN** a migrated component that needs both supported layout and visual styles
- **WHEN** its markup is reviewed
- **THEN** `and-layout` MUST own the supported layout properties while semantic
  Tailwind classes MUST continue to own colors, borders, typography, and states

### Requirement: Interaction and accessibility preservation
The migration MUST preserve keyboard operation, focus visibility, modal focus
management, card activation, and Swapy ordering behavior.

#### Scenario: Keyboard modal flow after migration
- **GIVEN** keyboard focus on a portfolio card
- **WHEN** the user presses Enter and later presses Escape
- **THEN** the modal MUST open, close, and restore focus to the originating card

### Requirement: Automated layout verification
The Playwright suite MUST verify computed layout behavior at mobile and desktop
breakpoints and MUST run alongside the existing interaction tests.

#### Scenario: Layout regression is detected
- **GIVEN** the `@andersseen/layout` stylesheet is missing or an attribute value
  no longer matches the package API
- **WHEN** the layout Playwright test runs
- **THEN** it MUST fail on a computed display, gap, column, or span assertion
