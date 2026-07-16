# Portfolio Improvement Plan

> **How to use this file (instructions for the executing agent):**
>
> 1. Read [CONTEXT.md](CONTEXT.md) in this folder FIRST — it replaces repo
>    re-analysis. Also honor the repo's own AGENTS.md.
> 2. The user tells you which phase(s) to execute. Phases are independent
>    unless a **Depends on / Prerequisite** line says otherwise, so any phase
>    can start in a fresh session, and several phases can be chained in one
>    session (finish + verify one before starting the next).
> 3. Each phase = one `feature/<name>` branch. Non-trivial phases (all except
>    1) follow the OpenSpec workflow before implementation.
> 4. Before starting, check the **Status** line of your phase and `git log`
>    — a previous session may have partially done it.
> 5. When done: run the full Definition of Done (CONTEXT.md), update
>    [docs/STATE.md](../STATE.md), and update the phase's **Status** line here
>    (`pending` → `in progress (branch: …)` → `done (PR #…)`).
>
> **Open decision (ask the user if a phase touches it):** canonical domain is
> `andriipap.dev` in config, but blog/social links point to `andersseen.dev`.
> Do not unify without confirmation.

**Recommended order by impact:** 1 → 2 → 3 → 4, then 5/6 when the user
provides materials, 7 anytime (ideally last, after data shapes settle).

---

## Phase 1 — Content & i18n quick wins

**Status:** done (branch: `feature/phase-1-content-i18n`)
**Goal:** fix everything that shows wrong/untranslated content today, without
adding new features.
**Prerequisite:** none. Smallest phase; good same-session lead-in to any other.

Tasks:

1. Move the hardcoded English strings in `src/data/portfolio.ts` into the i18n
   system (finding #3 in CONTEXT.md):
   - `services` item — the `details` strings inside both `content[]` and
     `details[]` (note the two arrays differ slightly; keep both variants or
     consolidate deliberately).
   - `design` item — the 4 npm-package `description` strings.
   - Add every new key to `en.json`, `es.json`, `ua.json` (translate es/ua
     naturally, not machine-literal).
2. Fix the `ProjectList.tsx` badge: interface expects `category`, data sends
   `role` (finding #2). Align on one name end-to-end (`role` is the truthful
   one) so the badge shows the role again.
3. Replace the 3 fallback article URLs in the `articles` item with the real
   Medium article URLs (ask the user for the links, or find them on
   `https://medium.com/@andriipap` — titles exist as i18n keys
   `portfolio.articles.material_blocks`, `.switch_map`, `.textarea`).

Acceptance:

- `pnpm check` + `pnpm build` pass.
- Services and Design modals show translated text in `/es/` and `/ua/`.
- Project modal badges show the role for each project.
- No raw i18n keys visible in any of the 3 locales.

---

## Phase 2 — Project images

**Status:** done (branch: `feature/phase-1-content-i18n`)
**Goal:** the 5 client projects show real screenshots on the Projects modal
(biggest visual gap on the site — finding #1).
**Prerequisite:** none (screenshots can be captured from the live client sites).

Tasks:

1. Capture screenshots of the 5 live sites in `src/data/portfolio.ts`
   (falcotech.es, beauty-line-esthetic.es, palomamolero.com, soulalegria.com,
   mrgdevelops.com). Playwright is already installed — a throwaway script at
   ~1280×800, then crop/optimize, works well. Save under `src/assets/projects/`
   as compressed `.webp` (aim <100 KB each).
2. Wire images into the data: fill the `image` fields; import via Astro/Vite
   asset handling rather than raw `public/` paths so they get optimized.
3. Extend `ProjectList.tsx` to render the image (its `Project` interface has no
   `image` field today — see CONTEXT.md finding #1). Design constraints:
   - `loading="lazy"`, explicit `width`/`height` or `aspect-ratio` (no CLS),
     meaningful `alt` (i18n keys ×3 or the project title).
   - Keep the existing hover effect working; semantic tokens only.
   - Must look right in light AND dark themes and at mobile widths.
4. Consider whether the card face (`ProjectsCardContent.tsx`) should also get a
   thumbnail/collage — optional; propose in the OpenSpec design first.

Acceptance:

- `pnpm check` + `pnpm build` pass; Lighthouse Performance does not drop
  (images lazy, sized, webp).
- Projects modal shows an image per project, both themes, mobile + desktop.
- No layout shift when images load.

---

## Phase 3 — Contact form

**Status:** done
**Goal:** a working contact form wired to the existing `POST /api/send-email`
(contract in CONTEXT.md) — the site's main conversion path (finding #8).
**Decision:** the Social modal already contains a contact form in
`SocialCanvas.tsx`. Adding a separate contact bento card duplicated functionality
and broke the grid layout, so the standalone card was removed and the existing
SocialCanvas form is the canonical contact UI.
**Prerequisite:** none for the UI. Real sending needs `RESEND_API_KEY`
(user/Vercel dashboard); without it the endpoint returns 500 — the form must
handle that gracefully.

Tasks:

1. Verify the existing `SocialCanvas.tsx` form posts to `/api/send-email` with
   name/email/message and handles loading, success and error states.
2. Keep (or add) a Playwright test that opens the Social card, fills the form,
   mocks the API, and asserts success/error states.
3. Do not add a dedicated contact bento card; keep the grid layout intact.

Acceptance:

- `pnpm check` + `pnpm build` + e2e pass.
- Contact form is reachable from the Social card only.
- Graceful UX when the API returns 400/500.

---

## Phase 4 — SEO & infrastructure small wins

**Status:** done
**Goal:** 404 page, structured data, analytics (findings #5, #6, #7).
**Prerequisite:** analytics choice may need the user (Vercel Web Analytics
must be enabled in the Vercel dashboard — flag it in your report).

Tasks:

1. `src/pages/404.astro`: on-brand not-found page using `Layout`, i18n text
   (×3), link back home. Note: with `trailingSlash: "always"` and hybrid
   output, verify how Vercel serves it (`pnpm preview` or deploy preview).
2. JSON-LD in `BaseHead.astro`: `Person` (name, url, sameAs → GitHub, GitLab,
   Medium) + `WebSite`. Use the configured `site` URL; keep it locale-aware
   only if trivial.
3. Analytics: recommended `@vercel/analytics` (inject via Layout) or a
   privacy-first alternative (Plausible/Umami) if the user prefers. **Any new
   external script/endpoint must be added to the CSP in `vercel.json`** or it
   will be blocked.
4. Verify structured data with a validator (e.g. schema.org validator) against
   the built HTML.

Acceptance:

- `pnpm check` + `pnpm build` pass.
- Visiting a bogus URL shows the custom 404 in dev/preview.
- JSON-LD validates; no CSP violations in the console on the deployed preview.

---

## Phase 5 — CV / resume download

**Status:** pending — **blocked on user input**
**Goal:** a "Download CV" action (finding #9).
**Prerequisite:** the user must provide the CV PDF (or the content to generate
one). Ask before starting. If multilingual CVs exist, one per locale.

Tasks:

1. Place PDF(s) in `public/` (e.g. `public/cv/andrii-pap-en.pdf`).
2. Add the download action where the user prefers — navbar (Angular component
   — remember the Angular-only directory rule), the About drawer/modal, or the
   hero. Propose placement in the OpenSpec design; hero or About modal avoids
   touching Angular.
3. i18n label ×3; `download` attribute; track click if Phase 4 analytics landed.

Acceptance: link works in all locales, correct file per locale (or single
shared file — user's call), check/build pass.

---

## Phase 6 — Client testimonials

**Status:** pending — **blocked on user input**
**Goal:** social proof from the 5 real client projects (finding #10).
**Prerequisite:** the user must supply 2–5 short quotes (author, role/company,
text — ideally per-locale or ready to translate). Ask before starting.

Tasks:

1. OpenSpec design: likely a new bento card type (`testimonials`) with modal,
   following the existing card-type pattern (`cards/` face + `details/` modal
   component + entry in `portfolio.ts` + `CardContentRenderer` dispatch).
2. Testimonial text via i18n keys ×3.
3. Keep grid balance: adding a card changes the bento layout (`colSpan`
   values) — check mobile and desktop, and the Swapy drag still works with the
   new card.

Acceptance: card + modal render in 3 locales/both themes, keyboard-operable,
grid layout intact on mobile/desktop, check/build/e2e pass.

---

## Phase 7 — Type safety: `PortfolioItem.details`

**Status:** pending
**Goal:** replace `details: any` with a discriminated union so bugs like the
Phase 1 `category`/`role` mismatch become compile errors (finding #12).
**Prerequisite:** best done AFTER phases that reshape data (1, 2, 6) to avoid
churn — but not blocked by them.

Tasks:

1. Define per-card-type detail interfaces (projects, community, design,
   social, services, stack, articles, about) in/near
   `src/components/PortfolioGrid.tsx` or a new `src/types/portfolio.ts`.
2. Make `PortfolioItem` a discriminated union on `type` so `details` narrows
   automatically; remove the per-component casts in `details/*` and `cards/*`.
3. Fix every type error this surfaces (expect several silent mismatches —
   that's the point). Do not change runtime behavior; data fixes belong in
   their own commit if found.

Acceptance: `pnpm check` passes with no `any` left on the details path,
`pnpm build` passes, site behavior unchanged (spot-check all 7 modals).
