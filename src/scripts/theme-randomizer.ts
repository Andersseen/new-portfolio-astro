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

const FALLBACK_COLORS: ThemeColors = {
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

export function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;

  const setScale = (prefix: string, scale: ThemeScale | string) => {
    if (typeof scale === "string") {
      root.style.setProperty(`--color-${prefix}`, scale);
      return;
    }

    Object.entries(scale).forEach(([key, value]) => {
      const v = value as string;
      if (key === "DEFAULT") {
        root.style.setProperty(`--color-${prefix}`, v);
      } else if (key === "foreground") {
        root.style.setProperty(`--color-${prefix}-foreground`, v);
      } else {
        root.style.setProperty(`--color-${prefix}-${key}`, v);
      }
    });
  };

  setScale("primary", colors.primary);
  setScale("secondary", colors.secondary);

  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-success", colors.success);
  root.style.setProperty("--color-warning", colors.warning);

  if (colors.background) {
    root.style.setProperty("--color-background", colors.background);
  }
  if (colors.foreground) {
    root.style.setProperty("--color-foreground", colors.foreground);
  }
  if (colors.backgroundSecondary) {
    root.style.setProperty(
      "--color-background-secondary",
      colors.backgroundSecondary,
    );
  }
  if (colors.backgroundTertiary) {
    root.style.setProperty(
      "--color-background-tertiary",
      colors.backgroundTertiary,
    );
  }
  if (colors.foregroundSecondary) {
    root.style.setProperty(
      "--color-foreground-secondary",
      colors.foregroundSecondary,
    );
  }
  if (colors.foregroundTertiary) {
    root.style.setProperty(
      "--color-foreground-tertiary",
      colors.foregroundTertiary,
    );
  }
  if (colors.border) {
    root.style.setProperty("--color-border", colors.border);
  }
  if (colors.borderLight) {
    root.style.setProperty("--color-border-light", colors.borderLight);
  }
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
}) {
  const currentState = await loadThemeState();
  const currentMode = getCurrentMode();
  const button = options?.button ?? null;

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

    applyThemeColors(nextState.colors || FALLBACK_COLORS);
    await saveThemeState(nextState);

    if (nextState.apiSnapshot) {
      saveLocalSnapshot(nextState.apiSnapshot);
    }

    setStatus("Theme updated");
    return nextState.colors;
  } catch (error) {
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

    applyThemeColors(FALLBACK_COLORS);
    const reason =
      error instanceof ThemeApiError
        ? error.message
        : "Could not generate a new theme.";
    setStatus(reason, true);
    return FALLBACK_COLORS;
  } finally {
    setButtonLoading(button, false);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const saved = await loadThemeState();
  if (saved && saved.colors) {
    applyThemeColors(saved.colors);
  } else {
    await randomizeTheme({ seed: stableSeedFromRoute(), userSet: false });
  }

  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest("#theme-randomize");
    if (btn) {
      const selectedHarmony = (btn.getAttribute("data-theme-harmony") ||
        DEFAULT_HARMONY) as ThemeHarmony;
      const seed = btn.getAttribute("data-theme-seed") || randomSeed();

      await randomizeTheme({
        seed,
        harmony: selectedHarmony,
        userSet: true,
        button: btn as HTMLElement,
      });

      // Optional subtle animation on the body to indicate change
      document.documentElement.animate([{ opacity: 0.98 }, { opacity: 1 }], {
        duration: 220,
      });
    }
  });

  window.addEventListener("portfolio:theme-mode-changed", async (event) => {
    const customEvent = event as CustomEvent<{ mode?: ThemeMode }>;
    const state = await loadThemeState();
    const mode = customEvent.detail?.mode || getCurrentMode();

    await randomizeTheme({
      seed: stableSeedFromRoute(),
      harmony: state?.apiSnapshot?.meta.harmony || DEFAULT_HARMONY,
      userSet: state?.userSet ?? false,
    });

    document.documentElement.setAttribute("data-theme", mode);
  });
});
