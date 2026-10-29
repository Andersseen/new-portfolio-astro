/**
 * Single owner of the page theme: light/dark mode plus an optional generated
 * palette from the Palette Crafter API.
 *
 * Every user action (toggle, randomize, system change) bumps a generation
 * counter; async work that finishes after a newer action is discarded, so a
 * slow API response can never paint colors for a mode the user already left.
 * Mode and colors are always committed together inside one view transition.
 *
 * A palette is identified by `{ baseHue, harmony }` rather than a seed, so the
 * same palette can be requested for the other mode and survives toggling.
 * State lives in localStorage (synchronous) so the inline `<head>` script in
 * BaseHead.astro can restore it before first paint.
 */
import {
  getTheme,
  type ThemeApiSuccessResponse,
  type ThemeHarmony,
  type ThemeMode,
} from "@/utils/theme-api";
import { applyThemeVars, resetThemeColors, themeColorsToVars } from "./theme-apply";
import { clearThemeState, loadThemeState, type ThemeColors } from "./theme-state";
import { originFromEvent, runThemeTransition, type TransitionOrigin } from "./theme-transition";

/** Keep in sync with the inline script in BaseHead.astro. */
const STORAGE_KEY = "portfolio:theme";
const LEGACY_SNAPSHOT_KEY = "portfolio:last-theme-api-response";
const DEFAULT_HARMONY: ThemeHarmony = "triadic";
/** How long a toggle waits for an uncached palette before using static colors. */
const TOGGLE_PALETTE_WAIT_MS = 1500;

interface Palette {
  baseHue: number;
  harmony: ThemeHarmony;
}

interface StoredTheme {
  mode: ThemeMode;
  /** True once the user picked a mode; system changes are ignored after that. */
  userSetMode: boolean;
  palette?: Palette;
  /** Flattened CSS variables of `palette` for `mode`. */
  vars?: Record<string, string>;
}

const root = document.documentElement;

let mode: ThemeMode = root.dataset.theme === "dark" ? "dark" : "light";
let userSetMode = false;
let palette: Palette | undefined;
let vars: Record<string, string> | undefined;
let generation = 0;

const paletteCache = new Map<string, Promise<ThemeColors>>();

function systemMode(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function randomSeed(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function toThemeColors(payload: ThemeApiSuccessResponse): ThemeColors {
  const { theme } = payload;

  // success/warning are left to the static per-mode CSS tokens.
  return {
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.primary["400"] || theme.secondary["400"] || theme.primary.DEFAULT,
    background: theme.bg,
    foreground: theme.fg,
    backgroundSecondary: `color-mix(in oklab, ${theme.bg} 92%, ${theme.fg})`,
    backgroundTertiary: `color-mix(in oklab, ${theme.bg} 84%, ${theme.fg})`,
    foregroundSecondary: `color-mix(in oklab, ${theme.fg} 70%, ${theme.bg})`,
    foregroundTertiary: `color-mix(in oklab, ${theme.fg} 55%, ${theme.bg})`,
    border: `color-mix(in oklab, ${theme.fg} 18%, ${theme.bg})`,
    borderLight: `color-mix(in oklab, ${theme.fg} 10%, ${theme.bg})`,
  };
}

function cacheKey(forMode: ThemeMode, p: Palette): string {
  return `${forMode}:${p.baseHue}:${p.harmony}`;
}

function fetchPalette(forMode: ThemeMode, p: Palette): Promise<ThemeColors> {
  const key = cacheKey(forMode, p);
  let pending = paletteCache.get(key);
  if (!pending) {
    pending = getTheme({ mode: forMode, baseHue: p.baseHue, harmony: p.harmony }).then(toThemeColors);
    pending.catch(() => paletteCache.delete(key));
    paletteCache.set(key, pending);
  }
  return pending;
}

/** Warm the cache for the other mode so the next toggle is instant. */
function prefetchOppositeMode() {
  if (palette) {
    fetchPalette(mode === "dark" ? "light" : "dark", palette).catch(() => undefined);
  }
}

function within<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

function persist() {
  const stored: StoredTheme = { mode, userSetMode, palette, vars };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked (private mode): the theme still works for this visit.
  }
}

function readStored(): StoredTheme | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredTheme) : null;
    return parsed && (parsed.mode === "light" || parsed.mode === "dark") ? parsed : null;
  } catch {
    return null;
  }
}

/** Paints `nextMode` with `nextVars` (or the static tokens) in one go. */
function paint(nextMode: ThemeMode, nextVars: Record<string, string> | undefined) {
  resetThemeColors();
  if (nextVars) applyThemeVars(nextVars);
  root.dataset.theme = nextMode;
}

async function commit(
  nextMode: ThemeMode,
  colors: ThemeColors | null,
  origin?: TransitionOrigin | null,
) {
  // State is updated before the transition: its update callback runs a frame
  // later, and persisting must not record the previous colors.
  mode = nextMode;
  vars = colors ? themeColorsToVars(colors) : undefined;
  const nextVars = vars;
  const transition = runThemeTransition(() => paint(nextMode, nextVars), origin);
  persist();
  prefetchOppositeMode();
  await transition;
}

async function setMode(nextMode: ThemeMode, origin?: TransitionOrigin | null) {
  const gen = ++generation;
  // Track the requested mode right away so rapid toggles flip from the
  // latest intent, not from what is currently painted.
  mode = nextMode;

  let colors: ThemeColors | null = null;
  if (palette) {
    try {
      colors = await within(fetchPalette(nextMode, palette), TOGGLE_PALETTE_WAIT_MS);
    } catch (error) {
      console.warn("Palette unavailable for this mode; using default colors.", error);
      palette = undefined;
    }
  }

  if (gen !== generation) return;
  await commit(nextMode, colors, origin);
}

async function randomize(button: HTMLElement, origin: TransitionOrigin | null) {
  const gen = ++generation;
  const requestedMode = mode;
  const harmony = (button.getAttribute("data-theme-harmony") || DEFAULT_HARMONY) as ThemeHarmony;

  button.setAttribute("aria-busy", "true");
  try {
    const payload = await getTheme({ mode: requestedMode, seed: randomSeed(), harmony });
    if (gen !== generation) return;

    palette = { baseHue: payload.meta.baseHue, harmony: payload.meta.harmony };
    const colors = toThemeColors(payload);
    paletteCache.set(cacheKey(requestedMode, palette), Promise.resolve(colors));
    await commit(requestedMode, colors, origin);
  } catch (error) {
    // Keep whatever is on screen; never fall back to another mode's palette.
    console.warn("Could not generate a new theme:", error);
  } finally {
    button.removeAttribute("aria-busy");
  }
}

/** One-time migration from the old IndexedDB/localStorage theme state. */
async function migrateLegacyState(): Promise<StoredTheme | null> {
  try {
    const legacy = await loadThemeState();
    localStorage.removeItem(LEGACY_SNAPSHOT_KEY);
    if (!legacy) return null;

    await clearThemeState();
    const meta = legacy.apiSnapshot?.meta;
    return {
      mode: legacy.mode === "dark" ? "dark" : "light",
      userSetMode: legacy.userSet,
      palette: meta ? { baseHue: meta.baseHue, harmony: meta.harmony } : undefined,
    };
  } catch {
    return null;
  }
}

async function init() {
  const stored = readStored() ?? (await migrateLegacyState());

  if (stored) {
    userSetMode = stored.userSetMode;
    palette = stored.palette;
  }
  // Without an explicit choice the page follows the system preference.
  const initialMode = stored?.userSetMode ? stored.mode : systemMode();
  mode = initialMode;

  if (stored?.vars && stored.mode === initialMode) {
    // The <head> script already painted this; make sure the DOM agrees.
    vars = stored.vars;
    paint(initialMode, vars);
    persist();
    prefetchOppositeMode();
  } else {
    // No cached colors for this mode (first visit, migration, or the system
    // mode changed): paint the static tokens now and bring the palette in
    // silently if there is one.
    vars = undefined;
    paint(initialMode, undefined);
    persist();
    if (palette) {
      const gen = generation;
      fetchPalette(initialMode, palette)
        .then((colors) => {
          if (gen === generation) return commit(initialMode, colors);
        })
        .catch(() => {
          palette = undefined;
          persist();
        });
    }
  }
}

// Delegated listeners are registered immediately so the navbar buttons work
// even before (or regardless of when) the Preact navbar hydrates.
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;

  if (target?.closest("#theme-toggle")) {
    userSetMode = true;
    setMode(mode === "dark" ? "light" : "dark", originFromEvent(event));
    return;
  }

  const randomizeButton = target?.closest<HTMLElement>("#theme-randomize");
  if (randomizeButton) {
    randomize(randomizeButton, originFromEvent(event));
  }
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (!userSetMode) setMode(event.matches ? "dark" : "light");
});

init();
