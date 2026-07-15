## ADDED Requirements

### Requirement: Each client project has an optimized screenshot
The system MUST provide a compressed WebP screenshot for each of the five client projects defined in `src/data/portfolio.ts`.

#### Scenario: Screenshot asset exists
- **WHEN** the project source is built
- **THEN** each project has a corresponding `.webp` image under `src/assets/projects/`

### Requirement: Project images are wired into portfolio data
The system MUST populate the `image` field of every client project in `src/data/portfolio.ts` with the imported asset reference.

#### Scenario: Project data includes image metadata
- **WHEN** `getPortfolioItems()` is invoked
- **THEN** every project object includes `image` with `src`, `width`, `height`, and `alt`

### Requirement: Project modal renders the image without layout shift
The system MUST render the project screenshot inside `ProjectList.tsx` with explicit dimensions and lazy loading.

#### Scenario: Image renders with sizing attributes
- **WHEN** a user opens the projects modal
- **THEN** each project card displays its image with `loading="lazy"`, explicit `width` and `height`, and `aspect-ratio` set to 16/10

#### Scenario: Image renders across viewports
- **WHEN** the page is viewed on mobile, tablet, or desktop widths
- **THEN** the image scales to fit the card width without overflowing or causing layout shift

### Requirement: Images follow theme and hover semantics
The system MUST style project images using semantic Tailwind tokens so they remain visible in both light and dark themes and do not break the existing hover state.

#### Scenario: Image visible in both themes
- **WHEN** the theme is toggled between light and dark
- **THEN** the project image remains clearly visible and its container colors adapt via semantic tokens

#### Scenario: Hover effect preserved
- **WHEN** a user hovers over a project card
- **THEN** the existing sliding background and text color transition still apply

### Requirement: Project images have accessible alt text
The system MUST provide meaningful `alt` text for each project image.

#### Scenario: Screen reader announces image
- **WHEN** a screen reader focuses a project image
- **THEN** it reads the project title as the image description
