# Spec-Driven Development with OpenSpec

OpenSpec is the canonical workflow for non-trivial changes in this repository.
It keeps current system requirements in `openspec/specs/` and active change
artifacts in `openspec/changes/`. The older `docs/specs/` directory is retained
as historical pre-OpenSpec context; do not add new specs there.

## Change-size policy

| Task size | Process |
| --------- | ------- |
| Trivial: typo, copy-only edit, isolated style correction | Implement directly, verify proportionally, and update `docs/STATE.md`. |
| Small: one component and no more than two files | State Goal + Plan in chat, get confirmation, implement, and verify. |
| Non-trivial: feature, refactor, cross-cutting fix, more than two files, dependency, or subsystem work | Use the complete OpenSpec workflow below. |

## Canonical workflow

```text
explore (optional) → propose → apply → sync → archive
```

### 1. Explore when the problem is unclear

Use `/opsx:explore` or the `openspec-explore` skill to investigate code,
constraints, alternatives, and risks without implementing. Exploration may read
the repository and capture planning artifacts, but it does not authorize code
changes.

### 2. Propose the change

Use `/opsx:propose <description>` or the `openspec-propose` skill. A complete
proposal creates:

```text
openspec/changes/<change-name>/
├── proposal.md
├── design.md
├── specs/<capability>/spec.md
└── tasks.md
```

Requirements must be testable, use MUST/SHALL, and contain scenarios. The
design must state framework ownership, dependency decisions, architecture
contracts, risks, and migration/rollback strategy. Tasks must be ordered,
checkbox-based, and small enough to verify incrementally.

Review the artifacts with the user before implementation unless the user has
explicitly approved the fully described change and asked for immediate
implementation.

### 3. Apply tasks

Use `/opsx:apply <change-name>` or the `openspec-apply-change` skill. Always run
the CLI status/instructions commands and read every context file they return:

```bash
openspec status --change <change-name> --json
openspec instructions apply --change <change-name> --json
```

Implement tasks in order. Mark each checkbox complete immediately after the
task and its proportional verification are complete. If implementation reveals
that a requirement or design decision is wrong, update the artifact before
continuing. Do not silently diverge from the approved change.

### 4. Verify the repository gates

Every implementation must pass the checks relevant to its surface. The default
completion gates are:

```bash
pnpm check
pnpm build
pnpm test:e2e
pnpm openspec:validate
```

UI changes also require manual checks in light/dark/randomized themes, mobile
and desktop widths, keyboard-only interaction, and all three locales when text
changes. API changes require route/runtime validation. Dependency changes
require explicit approval and a reviewed `pnpm-lock.yaml` update.

### 5. Sync and archive

When implementation and verification are complete, use `/opsx:sync` to merge
delta requirements into `openspec/specs/`, then `/opsx:archive <change-name>`
to move the completed change into the OpenSpec archive. Review the sync diff;
source-of-truth specs must describe actual shipped behavior.

Update `docs/STATE.md` before archiving so session-to-session project context
matches the archived change.

## Project-specific OpenSpec rules

The shared context and artifact rules live in `openspec/config.yaml`. They
enforce these repository constraints:

- Documentation and specifications are written in English.
- Astro owns static presentation; Preact owns general interaction; Angular
  remains under `src/components/angular/`; Lit/web components remain the
  design-system demonstration surface.
- New i18n keys are added with real translations to `en.json`, `es.json`, and
  `ua.json` in the same change.
- Semantic theme tokens are mandatory; component code does not hard-code colors.
- Accessibility and focus contracts are testable requirements, not optional QA.
- pnpm is the only package manager.

## Useful commands

```bash
openspec list
openspec status --change <name>
openspec validate --all
openspec show <name>
openspec instructions <artifact> --change <name> --json
```

Run `openspec update` after upgrading the OpenSpec CLI so generated Codex skills
remain aligned with the selected profile.

## Failure modes to avoid

- Writing implementation code before proposal/spec/design/tasks are ready.
- Treating `docs/specs/` as the active source of truth.
- Copying OpenSpec instruction/context blocks into generated artifacts.
- Marking a task complete before its verification passes.
- Archiving without syncing shipped requirements into `openspec/specs/`.
- Reporting completion without `pnpm check`, `pnpm build`, and relevant runtime
  or browser verification.
