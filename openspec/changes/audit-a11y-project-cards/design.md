## Context

The current Playwright suite verifies theme mode, navigation, and modal behavior, but it does not inspect computed contrast in the dynamic modal states shown in the browser. The project modal cards currently use a full-card `bg-primary` hover overlay and switch most text to `text-background`; this can look disconnected from the surrounding palette and creates contrast risk when generated themes alter the primary token.

## Goals / Non-Goals

**Goals:**

- Add browser-level accessibility coverage that opens the real UI and validates visible text contrast in light and dark themes.
- Expand coverage to the full grid, all modal types, hover/focus states, and open shadow roots.
- Make theme View Transitions resilient to rapid repeated clicks and browser transition failures.
- Keep the audit dependency-free by using Playwright and a local WCAG contrast helper.
- Rebalance project cards so images support the content instead of dominating it.
- Keep project cards on semantic neutral surfaces with primary used for small accents only.

**Non-Goals:**

- Do not introduce axe or another accessibility package in this pass.
- Do not change project data, translated text, routing, or modal state architecture.
- Do not redesign non-project modal layouts except where the audit exposes a direct contrast failure.

## Decisions

- **Use Preact-only edits for project cards.** `ProjectList.tsx` already owns the project modal body, so the implementation stays inside the existing Preact component boundary.
- **Use a neutral card surface instead of a full-card primary overlay.** This preserves readability across runtime palettes and still allows subtle primary border/focus/role accents.
- **Render project media in a compact fixed-width responsive frame.** On mobile the image remains full-width but shorter; on larger viewports it becomes a side thumbnail, reducing scroll discomfort and making text scannable.
- **Audit contrast with Playwright computed styles.** A test can open modals, collect visible text nodes, parse computed foreground/background colors, and enforce WCAG 2.2 contrast thresholds without a new dependency. Large text uses 3:1; normal text uses 4.5:1.
- **Traverse open shadow roots.** The design-system modal renders custom elements; the audit recursively enters open shadow roots so web-component labels/buttons are covered where the browser exposes them.
- **Sample hover and focus states.** The audit exercises actual browser hover/focus on portfolio cards and modal controls before re-running contrast, catching states that static scans miss.
- **Keep keyboard checks in the same flow.** The audit opens modals from real card controls, confirms focus enters the dialog, and closes via Escape so contrast coverage stays tied to usable states.
- **Serialize theme reveals.** `runThemeTransition()` owns a small transition lock and timeout. If a reveal is already active, later theme updates apply without starting another View Transition, preventing stuck circular overlays.

## Risks / Trade-offs

- Browser-reported `oklab()`/`color-mix()` values can vary by engine → The audit runs in the existing Playwright browser and normalizes computed styles through a canvas-backed color parser.
- Text on transparent descendants needs inherited backgrounds → The audit walks ancestors to find the effective non-transparent background before calculating contrast.
- Runtime random palettes can still produce pathological colors after deployment → The component no longer places body text directly on saturated primary surfaces, shrinking the risky surface area.
- The audit is not a complete screen-reader test → It supplements, rather than replaces, existing keyboard/focus checks and manual review.
- View Transition support varies by browser → The fix keeps the existing graceful fallback and adds a bounded timeout so the UI never waits indefinitely.

## Migration Plan

1. Add the Playwright contrast audit and run it against the current UI to confirm the problem surface.
2. Update `ProjectList.tsx` layout and color treatment.
3. Verify `pnpm check`, `pnpm build`, `pnpm test:e2e`, and OpenSpec validation.
4. Rollback is limited to reverting the component and test changes.
