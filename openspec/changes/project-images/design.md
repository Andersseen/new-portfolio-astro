## Context

`src/data/portfolio.ts` defines five client projects (`falcotech`, `beautyline`, `palomamolero`, `soulalegria`, `mrgdevelops`) with empty `image` strings. The modal content is rendered by the Preact island `src/components/details/ProjectList.tsx`, whose local `Project` interface currently has no `image` field. The project card face is rendered by `src/components/cards/ProjectsCardContent.tsx`.

## Goals / Non-Goals

**Goals:**
- Add an optimized screenshot for every client project.
- Render the screenshot inside the project modal without layout shift.
- Preserve the existing card/modal hover effect and semantic theme tokens.
- Support both themes and mobile/desktop widths.

**Non-Goals:**
- Building a full image gallery or carousel.
- Adding alt-text translations per locale (alt will reuse the existing project title).
- Touching the Angular or Lit subsystems.

## Decisions

- **Screenshot capture**: use Playwright (already a dev dependency) with a throwaway script rather than a manual tool. This keeps the process reproducible and avoids installing extra software.
- **Image format and sizing**: WebP, 16:10 aspect ratio, compressed to <100 KB each. WebP is supported by the target browser matrix and keeps bundles small.
- **Asset location**: `src/assets/projects/` so Astro/Vite handles hashing and optimization instead of dropping raw files in `public/`.
- **Import strategy**: import images in `src/data/portfolio.ts` via the `@assets/projects/` alias. The resulting object provides the resolved URL; width/height are fixed by the capture/crop dimensions and stored in the data object so the component can set `width`, `height`, and `aspect-ratio` to prevent CLS.
- **Component approach**: extend the local `Project` interface in `ProjectList.tsx` with `image?: { src: string; width: number; height: number; alt: string }` and render a standard `<img>` with `loading="lazy"`, explicit `width`/`height`, and `aspect-ratio`. Using a plain `<img>` inside the Preact island avoids fighting Astro's `<Image />` component, which is meant for `.astro` files.
- **Card face**: defer adding thumbnails to `ProjectsCardContent.tsx`. The card face is dense and already shows titles and tech tags; adding images there changes the bento grid balance and deserves its own design review. The modal image is the high-impact fix requested by the phase.

## Risks / Trade-offs

- **Screenshots can become stale** if client sites redesign. Mitigation: images are versioned assets; updating them later is a simple asset swap.
- **External sites may fail to load during capture** (network, geo-blocking, cookie banners). Mitigation: script retries once per URL and falls back to a placeholder message so the build is not blocked.
- **Plain `<img>` inside Preact does not get Astro's build-time optimization** such as responsive srcsets. Mitigation: images are small (<100 KB) and sized explicitly; this is acceptable for a modal list.

## Migration Plan

No migration needed. The change is purely additive.

## Open Questions

- Should the project card face (`ProjectsCardContent.tsx`) later display a small collage/thumbnail? Out of scope for this change; revisit in a future design proposal.
