## 1. Capture and optimize project screenshots

- [ ] 1.1 Create a throwaway Playwright script that captures 1280×800 screenshots of the five client sites.
- [ ] 1.2 Run the script and save raw screenshots to a temporary directory.
- [ ] 1.3 Crop/resize and compress each screenshot to WebP (<100 KB) with a 16:10 aspect ratio.
- [ ] 1.4 Move the final `.webp` files to `src/assets/projects/` using kebab-case names.

## 2. Wire images into portfolio data

- [ ] 2.1 Import the five WebP images at the top of `src/data/portfolio.ts` via `@assets/projects/`.
- [ ] 2.2 Replace the empty `image: ""` values with objects containing `src`, `width`, `height`, and `alt`.

## 3. Render images in the project modal

- [ ] 3.1 Update the local `Project` interface in `src/components/details/ProjectList.tsx` to include the `image` field.
- [ ] 3.2 Render the image above or below the project text with `loading="lazy"`, explicit `width`/`height`, and `aspect-ratio`.
- [ ] 3.3 Ensure the image uses semantic Tailwind tokens and does not break the hover transition.

## 4. Verify and document

- [ ] 4.1 Run `pnpm check` and `pnpm build`; fix any errors.
- [ ] 4.2 Run the relevant Playwright tests.
- [ ] 4.3 Visually verify the projects modal in all three locales, both themes, and mobile/desktop widths.
- [ ] 4.4 Update `docs/STATE.md` with the completed work.
- [ ] 4.5 Run `pnpm openspec:validate` and mark tasks complete.
