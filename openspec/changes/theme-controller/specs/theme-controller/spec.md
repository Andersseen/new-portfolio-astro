## ADDED Requirements

### Requirement: Mode and palette stay consistent

The theme system SHALL never paint one mode with a palette generated for the
other mode, regardless of click speed or API latency.

#### Scenario: Fast toggles with a slow API
- **WHEN** a palette is active and the user toggles five times quickly while
  API responses arrive out of order
- **THEN** the page settles on the mode implied by the last click, with that
  mode's palette, and a reload restores the same mode and palette

#### Scenario: Randomize in dark mode
- **WHEN** the user randomizes repeatedly in dark mode
- **THEN** every applied palette is a dark palette and the mode stays dark

#### Scenario: API unavailable
- **WHEN** randomize fails
- **THEN** the current theme stays unchanged

### Requirement: Palette survives toggling

Toggling the mode SHALL keep the current palette's hue and harmony.

#### Scenario: Toggle after randomize
- **WHEN** the user randomizes and then toggles
- **THEN** the new mode is requested with the same `baseHue` and `harmony`

### Requirement: No theme flash on load

The stored mode and colors SHALL be applied synchronously before first paint.

#### Scenario: Reload in dark mode
- **WHEN** a user who chose dark reloads the page
- **THEN** `<html data-theme="dark">` is set before the page's module scripts run
