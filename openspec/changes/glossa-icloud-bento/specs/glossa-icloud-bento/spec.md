## ADDED Requirements

### Requirement: Translations sync from Glossa

The build SHALL pull the `portfolio` catalogs from Glossa into
`src/i18n/locales/` before building, and SHALL keep the committed files when
the pull fails or the pulled catalogs do not share one key set.

#### Scenario: Successful pull
- **WHEN** `pnpm build` runs and Glossa returns catalogs with matching keys
- **THEN** `en.json`, `es.json` and `ua.json` (from Glossa `uk`) are rewritten
  and the build continues

#### Scenario: Glossa unavailable
- **WHEN** delivery is disabled and no `GLOSSA_TOKEN` is set, or the request fails
- **THEN** a warning is logged, no locale file changes, and the build continues

### Requirement: Hero copy lives in the about dialog

The home page MUST NOT render a visible hero block above the bento grid. It
SHALL keep a visually hidden `h1`, and the about dialog opened from the navbar
logo SHALL show the translated role, headline and subheadline.

#### Scenario: Logo opens the dialog with hero copy
- **WHEN** the user activates the navbar logo button
- **THEN** a dialog opens containing the role and headline in the current locale
- **AND** Escape closes it

### Requirement: Logo follows the theme

The navbar logo SHALL be painted with the foreground token, centered in a
solid circle without blur.

#### Scenario: Dark theme
- **WHEN** the theme is dark
- **THEN** the logo glyph renders in the light foreground color

### Requirement: iCloud-style bento tiles

Each bento card SHALL render as a raised tile on the page surface with an
app-style icon tile, its title and description, using semantic tokens only.

#### Scenario: Card identity
- **WHEN** the grid renders
- **THEN** every card shows a decorative (`aria-hidden`) icon tile next to its
  `h2` title, and keyboard focus and modal opening behave as before
