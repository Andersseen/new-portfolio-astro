## ADDED Requirements

### Requirement: Hero exposes a CV download action

The system SHALL render a "Download CV" link in the hero section of the home
page.

#### Scenario: Download link is visible
- **WHEN** the home page loads
- **THEN** a link with the label "Download CV" (or its locale translation) is
  visible in the hero

#### Scenario: Download link points to the CV PDF
- **WHEN** the user clicks the link
- **THEN** the browser initiates a download of `/andrii-pap.pdf`

#### Scenario: Download link is translated
- **WHEN** the user views `/es/` or `/ua/`
- **THEN** the link label is in Spanish or Ukrainian respectively

### Requirement: CV download is accessible

The system SHALL provide a descriptive accessible name for the download link.

#### Scenario: Screen reader announcement
- **WHEN** a screen reader focuses the download link
- **THEN** it reads a clear label such as "Download CV"

### Requirement: Automated coverage

The system SHALL include a Playwright test that verifies the download link.

#### Scenario: Test verifies link
- **WHEN** the test loads the home page
- **THEN** it asserts the CV link has `href="/andrii-pap.pdf"` and a `download`
  attribute
