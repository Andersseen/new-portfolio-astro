## ADDED Requirements

### Requirement: Browser contrast audit
The test suite SHALL include a Playwright accessibility audit that evaluates computed contrast for visible text in real page and modal states.

#### Scenario: Modal text contrast is audited in light and dark themes
- **WHEN** Playwright opens portfolio modals in both light and dark themes
- **THEN** every visible non-disabled text sample in the audited regions MUST meet WCAG contrast thresholds of 4.5:1 for normal text and 3:1 for large text

#### Scenario: Audit uses real computed colors
- **WHEN** text is styled through semantic CSS variables or runtime theme values
- **THEN** the audit MUST calculate contrast from browser-computed foreground and effective background colors

#### Scenario: Full portfolio surface audit
- **WHEN** Playwright audits the portfolio in light and dark themes
- **THEN** every grid card and every modal detail view MUST be checked for visible text contrast

#### Scenario: Interactive states are audited
- **WHEN** a card, link, button, tab, or focusable control has hover or keyboard focus applied
- **THEN** visible text in that interactive state MUST meet the same contrast thresholds

#### Scenario: Shadow DOM content is audited
- **WHEN** an audited component renders visible text inside an open shadow root
- **THEN** the audit MUST include that shadow-root text in contrast checks

### Requirement: Keyboard modal flow remains covered
The test suite SHALL verify that audited modal flows remain keyboard-operable.

#### Scenario: Opening and closing a modal by keyboard
- **WHEN** a user focuses a portfolio card and activates it with the keyboard
- **THEN** focus MUST move into the dialog, Escape MUST close it, and focus MUST return to the opener

### Requirement: Theme transitions do not get stuck
The theme transition system SHALL prevent overlapping View Transition animations from leaving a reveal layer stuck over the page.

#### Scenario: Rapid theme toggles
- **WHEN** the theme toggle is activated repeatedly before the previous reveal animation has finished
- **THEN** the page MUST settle on a valid light or dark theme and MUST NOT retain a blocking or visible stuck reveal overlay

#### Scenario: Transition completion timeout
- **WHEN** the browser View Transition promises reject or fail to finish promptly
- **THEN** the theme mutation MUST still complete and the transition state MUST be cleared
