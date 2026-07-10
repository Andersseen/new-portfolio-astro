# Spec: Adopt OpenSpec for spec-driven development

- **Date:** 2026-07-10
- **Status:** draft
- **Author session:** Codex session 2026-07-10

## Goal

Adopt OpenSpec as the repository's canonical SDD workflow and configure its
official Codex integration, while preserving useful project-specific quality
gates and historical specifications.

## Context

The repository currently uses a custom workflow in `docs/SDD.md` and stores
change specifications under `docs/specs/`. OpenSpec CLI `1.5.0` is already
available locally, and the project satisfies its Node.js requirement. The
official core workflow is `explore → propose → apply → sync → archive`; it
stores source-of-truth specs in `openspec/specs/`, active changes in
`openspec/changes/`, and generates Codex skills under `.codex/skills/`.

## Requirements

1. MUST initialize OpenSpec with the official CLI using the `core` profile and
   the `codex` tool integration.
2. MUST keep all generated and hand-written repository documentation in
   English.
3. MUST make OpenSpec the canonical workflow for non-trivial changes while
   retaining project-specific verification gates (`pnpm check`, `pnpm build`,
   Playwright/manual UI checks, i18n parity, and `docs/STATE.md`).
4. MUST update `AGENTS.md`, `docs/SDD.md`, and the documentation map so future
   agents know when and how to use OpenSpec.
5. MUST not rewrite completed historical specs into fake OpenSpec history;
   `docs/specs/` remains an archive and new non-trivial changes use OpenSpec.
6. MUST validate the initialized setup with the OpenSpec CLI.
7. SHOULD add package scripts for repeatable OpenSpec status and validation
   without adding a project dependency when the existing CLI is sufficient.

### Non-goals / out of scope

- Rewriting all historic changes as OpenSpec capabilities.
- Creating speculative source-of-truth product specs without user review.
- Enabling integrations for assistants other than Codex.
- Changing application runtime behavior.

## Affected surface

| File / area | Change |
| ----------- | ------ |
| `openspec/` | Official configuration, specs, and change structure. |
| `.codex/skills/` | Generated OpenSpec skills for Codex. |
| `AGENTS.md` | Route non-trivial work through OpenSpec. |
| `docs/SDD.md` | Replace the custom active workflow with an OpenSpec guide and project gates. |
| `docs/CONTEXT.md` / `docs/STATE.md` | Record the workflow adoption where relevant. |
| `package.json` | Add repeatable OpenSpec helper scripts if appropriate. |

- New i18n keys: none.
- New dependencies: none planned.
- Framework for new components: not applicable.

## Plan

1. Run official non-interactive initialization for Codex and inspect every
   generated file before accepting it.
2. Reconcile the generated workflow with `AGENTS.md` and project-specific SDD
   gates; preserve completed files in `docs/specs/` as historical records.
3. Add repeatable status/validation scripts and concise English documentation.
4. Run OpenSpec validation plus the repository documentation-language check.
5. Update this spec and `docs/STATE.md` with results and any deviations.

## Verification

- `openspec --version`
- `openspec list`
- `openspec validate --all`
- Confirm the expected `openspec/` and `.codex/skills/openspec-*` files exist.
- Search tracked Markdown files for remaining Spanish prose and review any
  legitimate locale/product-name matches manually.
- `pnpm check` and `pnpm build` if initialization touches package metadata or
  any build-consumed file.

## Status log

- 2026-07-10 — created (draft)
