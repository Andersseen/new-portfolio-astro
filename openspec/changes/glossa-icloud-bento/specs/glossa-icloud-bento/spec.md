## ADDED Requirements

### Requirement: Translations come from Glossa

All user-visible copy SHALL be loaded from the Glossa `portfolio` project;
the repository MUST NOT contain locale catalogs.

#### Scenario: Edit in Glossa
- **WHEN** a value is changed in Glossa and the page is rendered again
- **THEN** the page shows the new value without a code change

#### Scenario: Islands translate without a bundled catalog
- **WHEN** a client island calls `t()`
- **THEN** it reads the current locale's catalog embedded in the page, and no
  client JavaScript chunk contains catalog strings or `GLOSSA_TOKEN`

#### Scenario: Glossa unreachable at build
- **WHEN** a prerendered page cannot load its catalog after retries
- **THEN** the build fails with an error naming the locale

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
