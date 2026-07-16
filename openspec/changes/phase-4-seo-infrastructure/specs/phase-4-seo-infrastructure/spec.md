## ADDED Requirements

### Requirement: Custom 404 page

The system SHALL render a branded not-found page for unmatched routes.

#### Scenario: Unknown path shows the 404 page
- **WHEN** a user visits a path that does not exist
- **THEN** the server returns the custom 404 page with a link back to the home
  page

### Requirement: JSON-LD structured data

The system SHALL include schema.org `WebSite` and `Person` structured data on
every page.

#### Scenario: WebSite schema
- **WHEN** any page is rendered
- **THEN** a `WebSite` JSON-LD object is present with name, URL and description

#### Scenario: Person schema
- **WHEN** any page is rendered
- **THEN** a `Person` JSON-LD object is present with name, URL, job title and
  sameAs links to GitHub, GitLab and Medium

#### Scenario: Locale-aware schema
- **WHEN** the page is `/es/` or `/ua/`
- **THEN** the JSON-LD `@language` value matches the page locale

### Requirement: 404 page is served as a serverless fallback

The system SHALL mark `src/pages/404.astro` as not prerendered so Vercel can
serve it for any unmatched route.

#### Scenario: Unknown route hits the 404 function
- **WHEN** a user visits a path that does not exist
- **THEN** the serverless 404 page is rendered and returns HTTP 404

### Requirement: Vercel Analytics integration

The system SHALL load Vercel Analytics on every page without CSP violations.

#### Scenario: Analytics script loads
- **WHEN** any page is rendered
- **THEN** the Vercel Analytics script is referenced and not blocked by the CSP

#### Scenario: Web Vitals endpoint is allowed
- **WHEN** analytics collects performance data
- **THEN** the browser can connect to the Vercel vitals endpoint

### Requirement: No build or test regressions

The system SHALL continue to pass checks and tests after these changes.

#### Scenario: Verification
- **WHEN** `pnpm check`, `pnpm build` and `pnpm exec playwright test` are run
- **THEN** all commands complete successfully
