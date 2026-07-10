/**
 * "Water drop" theme transition.
 *
 * Wraps a theme mutation (toggling `data-theme` and/or applying CSS custom
 * properties) in the View Transitions API and reveals the new theme with an
 * expanding `clip-path: circle()` that originates at the click point — like a
 * droplet spreading across the surface.
 *
 * Gracefully degrades: when the browser lacks `startViewTransition` or the user
 * prefers reduced motion, the update is applied instantly with no animation.
 *
 * Phase 2 (ripple / waves) can build on top of this by layering additional
 * pseudo-element animations; the clip-path reveal here is the foundation.
 */

export type TransitionOrigin = { x: number; y: number };

/** Duration of the clip-path reveal, in milliseconds. */
const REVEAL_DURATION_MS = 620;
/** Ease-out that decelerates smoothly, giving a liquid "settle" feel. */
const REVEAL_EASING = "cubic-bezier(0.33, 0, 0.2, 1)";

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Runs `update` (which should synchronously mutate the theme) inside a view
 * transition and animates an expanding circular reveal from `origin`. Resolves
 * once the transition finishes (or immediately in the fallback path).
 */
export function runThemeTransition(
  update: () => void | Promise<void>,
  origin?: TransitionOrigin | null,
): Promise<void> {
  const startViewTransition = (
    document as Document & {
      startViewTransition?: Document["startViewTransition"];
    }
  ).startViewTransition;

  if (typeof startViewTransition !== "function" || prefersReducedMotion()) {
    return Promise.resolve(update());
  }

  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = origin?.x ?? w / 2;
  const y = origin?.y ?? h / 2;
  // Radius needed to cover the farthest corner from the origin.
  const endRadius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));

  const transition = startViewTransition.call(document, () =>
    Promise.resolve(update()),
  );

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: REVEAL_DURATION_MS,
          easing: REVEAL_EASING,
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // Animation is best-effort; the theme still updates without it.
    });

  return transition.finished.catch(() => undefined);
}

/**
 * Derives the reveal origin from a triggering event. Uses the pointer position
 * for mouse/touch clicks and falls back to the target element's center for
 * keyboard activation (where clientX/clientY are 0).
 */
export function originFromEvent(event: Event): TransitionOrigin | null {
  const pointer = event as MouseEvent;
  if (
    typeof pointer.clientX === "number" &&
    (pointer.clientX !== 0 || pointer.clientY !== 0)
  ) {
    return { x: pointer.clientX, y: pointer.clientY };
  }

  const el = (event.currentTarget || event.target) as HTMLElement | null;
  const rect = el?.getBoundingClientRect?.();
  if (rect && (rect.width || rect.height)) {
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  return null;
}
