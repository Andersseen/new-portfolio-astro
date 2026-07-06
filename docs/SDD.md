# Spec-Driven Development (SDD) Workflow

How to execute tasks in this repo. The goal: think in text (cheap, reviewable)
before writing code (expensive, error-prone). Follow the phases in order and
do not skip the gates.

## When to use which weight

| Task size                                          | Process                                             |
| -------------------------------------------------- | --------------------------------------------------- |
| Trivial (typo, copy change, one locale key, style tweak) | No spec. Do it, verify, log it in STATE.md.   |
| Small (one component, ≤2 files)                    | Mini-spec: write the Goal + Plan sections directly in chat, get a nod, implement. |
| Non-trivial (new feature, new card, refactor, >2 files, new dependency, new subsystem) | Full spec file in `docs/specs/` (see below). |

## The phases

### Phase 0 — Orient (always)

1. Read `docs/CONTEXT.md` and `docs/STATE.md`.
2. Read the ARCHITECTURE.md sections for the subsystems you'll touch.
3. Read the actual source files you plan to change — never edit a file you
   haven't read. Verify claims from the docs against the code; the code wins.

### Phase 1 — Specify

Create `docs/specs/YYYY-MM-DD-<slug>.md` from `docs/specs/_TEMPLATE.md`.
Fill in: Goal, Context, Requirements, Non-goals. Requirements must be
**testable statements**, not vibes ("card opens with the shared-element
animation and returns focus to opener on close", not "modal works well").

**GATE: show the spec to the user and get approval before proceeding.**
If the user is unavailable and the task was explicitly delegated, proceed but
mark `Status: implemented without spec review` in the spec.

### Phase 2 — Plan

Fill in the Plan section of the spec: ordered steps, each naming the files it
touches. Rules:

- Steps must be small enough that `pnpm check` can pass between them.
- Identify the i18n keys you'll add (all 3 locales) up front.
- Identify which framework each new component uses (see decision table in
  CONVENTIONS.md) — this is where the multi-framework setup bites the unwary.
- Note anything that needs a new dependency → requires explicit user approval.

### Phase 3 — Implement

- Follow the plan step by step; update the spec's Status log as you go.
- Stay in scope: if you discover something broken outside the spec, note it in
  STATE.md "Known issues" — do NOT fix it in the same change.
- Match surrounding code style; use existing primitives (`ui/`, `t()`,
  nanostores patterns, idb helpers) before inventing new ones.

### Phase 4 — Verify (definition of done)

```bash
pnpm check    # i18n parity + TypeScript — must pass
pnpm build    # must pass
pnpm dev      # exercise the actual flow you changed
```

Manual matrix for UI changes: light/dark/randomized theme · mobile + desktop
widths · en/es/ua when text changed · keyboard-only walkthrough for anything
interactive.

### Phase 5 — Record

1. Update the spec: Status → `done`, note deviations from plan.
2. Update `docs/STATE.md`: move the item to "Recently completed", add a
   session-log line, record any new debt/issues discovered.
3. Commit on a `feature/<slug>` branch with a `feat:`/`fix:`/`refactor:` message.
   Do not push or open a PR unless asked.

## Spec lifecycle

- Specs live in `docs/specs/`, named `YYYY-MM-DD-<slug>.md`.
- Status field: `draft → approved → in-progress → done` (or `abandoned`).
- Specs are immutable history once `done` — write a new spec to change the
  behavior later; don't rewrite old ones.

## Anti-patterns (things weaker sessions have done — don't)

- Editing code before reading it, or trusting docs over code.
- Adding an i18n key to `en.json` only ("I'll add translations later" — the
  check fails and the task isn't done).
- "Simplifying" the multi-framework setup, the alias spelling
  (`@componentes`), or the phase-based modal state machine.
- Hardcoding a color/string because the token/key system takes an extra minute.
- Reporting done without running `pnpm build` (astro check passes ≠ build passes:
  SSR/hydration issues only surface at build/runtime).
- Wide refactors piggybacking on a small task.
