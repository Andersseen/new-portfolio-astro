import {
  createTheme,
  getTheme,
  ThemeApiError,
  type ThemeApiSuccessResponse,
  type ThemeHarmony,
  type ThemeMode,
  type ThemeScale,
} from "@/utils/theme-api";
import {
  saveThemeState,
  loadThemeState,
  type ThemeApiSnapshot,
  type ThemeColors,
  type ThemeState,
} from "./theme-state";
import { applyThemeColors } from "./theme-apply";

function getFallbackColors(mode: ThemeMode): ThemeColors {
  if (mode === "dark") {
    return {
      primary: oklabToScale("oklab(0.85 0.1 -0.2)"),
      secondary: oklabToScale("oklab(0.85 0.12 -0.16)"),
      accent: "oklab(0.85 0.15 -0.05)",
      success: "oklab(0.78 -0.15 0.15)",
      warning: "oklab(0.85 0.05 0.15)",
      background: "oklab(0.21 0 0)",
      foreground: "oklab(0.97 0 0)",
      backgroundSecondary: "oklab(0.18 0 0)",
      backgroundTertiary: "oklab(0.25 0 0)",
      foregroundSecondary: "oklab(0.85 0 0)",
      foregroundTertiary: "oklab(0.75 0 0)",
      border: "oklab(0.3 0 0)",
      borderLight: "oklab(0.25 0 0)",
    };
  }

  return {
    primary: oklabToScale("oklab(0.623 0.125 -0.22)"),
    secondary: oklabToScale("oklab(0.627 0.165 -0.191)"),
    accent: "oklab(0.704 0.191 -0.106)",
    success: "oklab(0.723 -0.16 0.145)",
    warning: "oklab(0.796 0.04 0.155)",
    background: "oklab(0.97 0 0)",
    foreground: "oklab(0.21 0 0)",
    backgroundSecondary: "oklab(0.95 0 0)",
    backgroundTertiary: "oklab(0.92 0 0)",
    foregroundSecondary: "oklab(0.4 0 0)",
    foregroundTertiary: "oklab(0.55 0 0)",
    border: "oklab(0.85 0 0)",
    borderLight: "oklab(0.9 0 0)",
  };
}

const FALLBACK_COLORS = getFallbackColors("light");

function oklabToScale(color: string): ThemeScale {
  return {
    "50": color,
    "100": color,
    "200": color,
    "300": color,
    "400": color,
    "500": color,
    "600": color,
    "700": color,
    "800": color,
    "900": color,
    "950": color,
    DEFAULT: color,
    foreground: "#000000",
  };
}

const LOCAL_THEME_KEY = "portfolio:last-theme-api-response";
const DEFAULT_HARMONY: ThemeHarmony = "triadic";
const RETRY_DELAY_MS = 450;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCurrentMode(): ThemeMode {
  const attrMode = document.documentElement.getAttribute("data-theme");
  return attrMode === "dark" ? "dark" : "light";
}

function stableSeedFromRoute(): string {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  return `portfolio:${pathname}`;
}

function randomSeed(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function toThemeColors(payload: ThemeApiSuccessResponse): ThemeColors {
  const { theme } = payload;

  return {
    primary: theme.primary,
    secondary: theme.secondary,
    accent:
      theme.primary["400"] || theme.secondary["400"] || theme.primary.DEFAULT,
    success: FALLBACK_COLORS.success,
    warning: FALLBACK_COLORS.warning,
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

function readLocalSnapshot(): ThemeApiSnapshot | undefined {
  try {
    const raw = window.localStorage.getItem(LOCAL_THEME_KEY);
    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw) as ThemeApiSnapshot;
    if (!parsed?.theme?.primary?.DEFAULT || !parsed?.meta?.mode) {
      return undefined;
    }

    return parsed;
  } catch {
    return undefined;
  }
}

function saveLocalSnapshot(snapshot: ThemeApiSnapshot) {
  try {
    window.localStorage.setItem(LOCAL_THEME_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore quota and storage errors to keep UX responsive.
  }
}

function getStatusNode(): HTMLElement | null {
  return document.getElementById("theme-status");
}

function setStatus(message: string, isError = false) {
  const node = getStatusNode();
  if (!node) {
    return;
  }

  node.textContent = message;
  node.classList.toggle("text-red-500", isError);
  node.classList.toggle("text-foreground-secondary", !isError);
}

function setButtonLoading(button: HTMLElement | null, loading: boolean) {
  if (!button) {
    return;
  }

  if (loading) {
    button.setAttribute("disabled", "true");
    button.setAttribute("aria-busy", "true");
    button.classList.add("opacity-70", "cursor-wait");
  } else {
    button.removeAttribute("disabled");
    button.removeAttribute("aria-busy");
    button.classList.remove("opacity-70", "cursor-wait");
  }
}

async function requestThemeWithRetry(input: {
  mode: ThemeMode;
  seed?: string | number;
  harmony?: ThemeHarmony;
  baseHue?: number;
}): Promise<ThemeApiSuccessResponse> {
  try {
    return await getTheme(input);
  } catch (firstError) {
    await wait(RETRY_DELAY_MS);

    return createTheme({
      mode: input.mode,
      seed: input.seed,
      harmony: input.harmony,
      baseHue: input.baseHue,
    }).catch((secondError) => {
      throw secondError instanceof ThemeApiError ? secondError : firstError;
    });
  }
}

function buildStateFromResponse(
  payload: ThemeApiSuccessResponse,
  userSet: boolean,
): ThemeState {
  return {
    mode: payload.meta.mode,
    colors: toThemeColors(payload),
    apiSnapshot: {
      theme: payload.theme,
      meta: payload.meta,
      fetchedAt: Date.now(),
    },
    userSet,
  };
}

function applySnapshot(snapshot: ThemeApiSnapshot) {
  applyThemeColors(
    toThemeColors({ ok: true, theme: snapshot.theme, meta: snapshot.meta }),
  );
}

export async function randomizeTheme(options?: {
  seed?: string | number;
  harmony?: ThemeHarmony;
  baseHue?: number;
  userSet?: boolean;
  button?: HTMLElement | null;
  /**
   * When true, do not apply any fallback colors if the API fails.
   * Useful when switching modes, where the static CSS should take over.
   */
  skipFallback?: boolean;
}) {
  const currentState = await loadThemeState();
  const currentMode = getCurrentMode();
  const button = options?.button ?? null;
  const skipFallback = options?.skipFallback ?? false;

  setButtonLoading(button, true);
  setStatus("Generating theme...");

  try {
    const payload = await requestThemeWithRetry({
      mode: currentMode,
      seed: options?.seed,
      harmony: options?.harmony ?? DEFAULT_HARMONY,
      baseHue: options?.baseHue,
    });

    const nextState = buildStateFromResponse(payload, options?.userSet ?? true);

    applyThemeColors(nextState.colors || getFallbackColors(currentMode));
    await saveThemeState(nextState);

    if (nextState.apiSnapshot) {
      saveLocalSnapshot(nextState.apiSnapshot);
    }

    setStatus("Theme updated");
    return nextState.colors;
  } catch (error) {
    if (skipFallback) {
      console.warn("Theme API unavailable; leaving static theme in place.", error);
      setStatus("Theme API unavailable", true);
      return undefined;
    }

    const fallbackSnapshot = currentState?.apiSnapshot || readLocalSnapshot();
    if (fallbackSnapshot) {
      applySnapshot(fallbackSnapshot);
      setStatus("Using last valid theme (API unavailable)", true);
      return toThemeColors({
        ok: true,
        theme: fallbackSnapshot.theme,
        meta: fallbackSnapshot.meta,
      });
    }

    const fallbackColors = getFallbackColors(currentMode);
    applyThemeColors(fallbackColors);
    const reason =
      error instanceof ThemeApiError
        ? error.message
        : "Could not generate a new theme.";
    setStatus(reason, true);
    return fallbackColors;
  } finally {
    setButtonLoading(button, false);
  }
}

async function initializeRandomizer() {
  try {
    const saved = await loadThemeState();
    if (saved && saved.colors) {
      applyThemeColors(saved.colors);
    } else {
      // On first load, try to generate a theme but don't overwrite the static
      // CSS (light/dark) if the API is unavailable.
      await randomizeTheme({
        seed: stableSeedFromRoute(),
        userSet: false,
        skipFallback: true,
      });
    }
  } catch (error) {
    console.warn("Could not initialize random theme:", error);
  }
}

function handleRandomizeClick(e: Event) {
  const target = e.target as HTMLElement;
  const btn = target.closest("#theme-randomize");
  if (!btn) {
    return;
  }

  const selectedHarmony = (btn.getAttribute("data-theme-harmony") ||
    DEFAULT_HARMONY) as ThemeHarmony;
  const seed = btn.getAttribute("data-theme-seed") || randomSeed();

  randomizeTheme({
    seed,
    harmony: selectedHarmony,
    userSet: true,
    button: btn as HTMLElement,
  }).then(() => {
    // Optional subtle animation on the body to indicate change
    document.documentElement.animate([{ opacity: 0.98 }, { opacity: 1 }], {
      duration: 220,
    });
  });
}

async function handleModeChange(event: Event) {
  const customEvent = event as CustomEvent<{ mode?: ThemeMode }>;
  const mode = customEvent.detail?.mode || getCurrentMode();

  try {
    const state = await loadThemeState();
    // Only regenerate if the user had previously set a custom theme. Otherwise
    // let the static [data-theme="..."] CSS rules handle the mode switch.
    if (!state?.userSet && !state?.apiSnapshot) {
      return;
    }

    await randomizeTheme({
      seed: stableSeedFromRoute(),
      harmony: state?.apiSnapshot?.meta.harmony || DEFAULT_HARMONY,
      userSet: state?.userSet ?? false,
      skipFallback: true,
    });

    document.documentElement.setAttribute("data-theme", mode);
  } catch (error) {
    console.warn("Could not regenerate theme after mode change:", error);
  }
}

// Register event listeners immediately so the button works even if IDB/API is slow.
document.addEventListener("click", handleRandomizeClick);
window.addEventListener("portfolio:theme-mode-changed", handleModeChange);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeRandomizer);
} else {
  initializeRandomizer();
}
