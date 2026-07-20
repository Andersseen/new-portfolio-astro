## ADDED Requirements

### Requirement: Project cards use balanced media
Project modal cards SHALL present screenshots as supporting media with bounded dimensions so content remains scannable.

#### Scenario: Desktop project cards
- **WHEN** the projects modal is viewed on a desktop viewport
- **THEN** each project screenshot MUST render as a side thumbnail rather than a full-width dominant image

#### Scenario: Mobile project cards
- **WHEN** the projects modal is viewed on a mobile viewport
- **THEN** each project screenshot MUST remain visible without forcing an oversized card or horizontal scrolling

### Requirement: Project cards preserve semantic palette readability
Project modal cards SHALL use semantic neutral surfaces for card backgrounds and body text, with primary color limited to accents that preserve contrast.

#### Scenario: Card default state
- **WHEN** a project card is visible in its default state
- **THEN** title, role, description, and tech text MUST be readable against the card background

#### Scenario: Card hover and focus states
- **WHEN** a project card is hovered or keyboard focused
- **THEN** the card MUST remain readable and MUST NOT place body copy on a saturated primary background
