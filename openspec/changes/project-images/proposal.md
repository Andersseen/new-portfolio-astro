## Why

The five client projects in the portfolio currently show no screenshots, which is the biggest visual gap on the site (PLAN.md finding #1). Adding real project thumbnails makes the work tangible and improves credibility for visitors evaluating the portfolio.

## What Changes

- Capture 1280×800 screenshots of the five live client sites listed in `src/data/portfolio.ts`.
- Crop and compress the screenshots to WebP (<100 KB each) and store them under `src/assets/projects/`.
- Wire the images into the portfolio data so each project carries an optimized image reference.
- Extend `ProjectList.tsx` to render the image per project with lazy loading, explicit sizing, and an accessible `alt` text.
- Keep the existing hover effect and semantic-token styling intact across light/dark themes and mobile/desktop widths.

## Capabilities

### New Capabilities

- `project-images`: Display optimized screenshots for each client project in the projects modal.

### Modified Capabilities

- None.

## Impact

- `src/data/portfolio.ts`: populate `image` fields.
- `src/components/details/ProjectList.tsx`: add image rendering and update the local `Project` interface.
- `src/components/cards/ProjectsCardContent.tsx`: optional thumbnail preview on the card face (decided during design/implementation).
- New image assets under `src/assets/projects/`.
- No new dependencies; Playwright is already installed for screenshot capture.
- i18n not required for the images themselves, but alt text may reuse existing project title keys.
- Accessibility and responsive behavior are affected and must be verified.
