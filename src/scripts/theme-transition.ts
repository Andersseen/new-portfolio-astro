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
/** Upper bound for browsers that leave a View Transition promise unresolved. */
const TRANSITION_TIMEOUT_MS = REVEAL_DURATION_MS + 260;
/** Ease-out that decelerates smoothly, giving a liquid "settle" feel. */
const REVEAL_EASING = "cubic-bezier(0.33, 0, 0.2, 1)";

let activeTransition: Promise<void> | null = null;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function withTimeout(promise: Promise<unknown>, ms: number): Promise<void> {
  return Promise.race([promise, wait(ms)]).then(() => undefined, () => undefined);
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
  if (activeTransition) {
    return Promise.resolve(update());
  }

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

  document.documentElement.dataset.themeTransition = "active";

  let transition: ViewTransition;
  try {
    transition = startViewTransition.call(document, () => Promise.resolve(update()));
  } catch {
    delete document.documentElement.dataset.themeTransition;
    return Promise.resolve(update());
  }

  const reveal = transition.ready
    .then(() => {
      const animation = document.documentElement.animate(
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
      return animation.finished;
    })
    .catch(() => undefined);

  activeTransition = Promise.all([
    withTimeout(transition.finished, TRANSITION_TIMEOUT_MS),
    withTimeout(reveal, TRANSITION_TIMEOUT_MS),
  ])
    .then(() => undefined)
    .finally(() => {
      if (activeTransition) {
        activeTransition = null;
      }
      delete document.documentElement.dataset.themeTransition;
    });

  return activeTransition;
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
