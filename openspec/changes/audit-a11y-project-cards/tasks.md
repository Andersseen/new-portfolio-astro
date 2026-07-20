## 1. Accessibility Audit

- [x] 1.1 Add a Playwright contrast helper that evaluates visible text using computed foreground/background colors.
- [x] 1.2 Add browser tests that open portfolio modals in light and dark themes and verify modal contrast.
- [x] 1.3 Add a keyboard modal flow assertion to the audit coverage.

## 2. Project Cards

- [x] 2.1 Redesign project modal cards with compact responsive screenshots and neutral semantic surfaces.
- [x] 2.2 Remove saturated full-card primary hover states while preserving clear hover/focus affordances.

## 3. Verification and Documentation

- [x] 3.1 Run focused Playwright audit tests.
- [x] 3.2 Run `pnpm check`, `pnpm build`, `pnpm test:e2e`, and `pnpm openspec:validate`.
- [x] 3.3 Update `docs/STATE.md` with the shipped change and verification notes.

## 4. Full Accessibility Audit and Theme Transition Follow-up

- [x] 4.1 Harden the theme View Transition helper against rapid repeated toggles and timeout/rejection paths.
- [x] 4.2 Expand Playwright contrast audit coverage to every grid card, every modal, hover states, focus states, and open shadow roots.
- [x] 4.3 Fix any additional contrast failures found by the expanded audit.
- [x] 4.4 Verify rapid theme toggles do not leave a stuck reveal overlay.
- [x] 4.5 Run focused and full repository verification, then update `docs/STATE.md`.
