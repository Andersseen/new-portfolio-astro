# Spec: <short title>

- **Date:** YYYY-MM-DD
- **Status:** draft | approved | in-progress | done | abandoned
- **Author session:** <model/tool + date, e.g. "Claude session 2026-07-06">

## Goal

One or two sentences: what exists after this change that doesn't exist now,
and why it's worth doing. Link the STATE.md backlog item if there is one.

## Context

What the implementer needs to know that isn't obvious: relevant
ARCHITECTURE.md sections, current behavior, prior attempts, constraints.
Keep it to facts verified in the code.

## Requirements

Testable statements. Number them.

1. MUST …
2. MUST …
3. SHOULD …

### Non-goals / out of scope

- Explicitly list what this change does NOT do (prevents scope creep).

## Affected surface

| File / area | Change |
| ----------- | ------ |
| `src/…`     | …      |

- New i18n keys: `portfolio.…` (en + es + ua)
- New dependencies: none | <name> (approved by user: yes/no)
- Framework for new components: astro | preact | angular | lit (per CONVENTIONS.md table)

## Plan

Ordered, small steps; each should leave `pnpm check` passing.

1. …
2. …
3. Verify (Phase 4 of SDD.md) and update STATE.md.

## Verification

How to prove each requirement holds — commands plus the manual checks
(theme light/dark/randomized, mobile/desktop, locales, keyboard) that apply.

## Status log

- YYYY-MM-DD — created (draft)
- YYYY-MM-DD — approved by user
- YYYY-MM-DD — <step done / deviation from plan and why>
- YYYY-MM-DD — done
