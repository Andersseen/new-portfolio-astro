import {
  saveThemeState,
  loadThemeState,
  type ThemeState,
} from "./theme-state";
import { applyThemeColors, resetThemeColors } from "./theme-apply";
import { runThemeTransition, originFromEvent } from "./theme-transition";

function getStoredTheme(): "light" | "dark" | null {
  try {
    return (
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark"
        | null) ?? null
    );
  } catch {
    return null;
  }
}

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function updateIcons(theme: "light" | "dark") {
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  if (!sunIcon || !moonIcon) {
    return;
  }
  if (theme === "dark") {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
}

async function initThemeToggle() {
  const html = document.documentElement;
  let currentTheme: "light" | "dark" = getStoredTheme() ?? getSystemTheme();

  // Apply the initial theme immediately without blocking on IDB.
  html.setAttribute("data-theme", currentTheme);
  updateIcons(currentTheme);

  // Then try to load persisted state and apply any custom colors.
  try {
    const savedState = await loadThemeState();
    if (savedState?.mode) {
      currentTheme = savedState.mode;
      html.setAttribute("data-theme", currentTheme);
      updateIcons(currentTheme);
    }
    if (savedState?.colors) {
      applyThemeColors(savedState.colors);
    }
  } catch (error) {
    // IDB failure should not break the toggle. Continue with system theme.
    console.warn("Could not load persisted theme state:", error);
  }

  async function setTheme(
    theme: "light" | "dark",
    userSet: boolean = false,
    origin?: { x: number; y: number } | null,
  ) {
    currentTheme = theme;

    // Reveal the mode switch with an expanding clip-path circle (a "water drop"
    // spreading from the click point). Clearing inline colors + swapping
    // data-theme is the synchronous mutation captured by the view transition.
    await runThemeTransition(() => {
      resetThemeColors();
      html.setAttribute("data-theme", theme);
      updateIcons(theme);
    }, origin);

    try {
      const savedState = await loadThemeState();
      const newState: ThemeState = {
        mode: theme,
        colors: savedState?.colors,
        userSet: userSet || (savedState?.userSet ?? false),
      };
      await saveThemeState(newState);
    } catch (error) {
      console.warn("Could not persist theme state:", error);
    }

    window.dispatchEvent(
      new CustomEvent("portfolio:theme-mode-changed", {
        detail: { mode: theme, userSet },
      }),
    );
  }

  // Use event delegation so clicks work even if the navbar is hydrated later.
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const toggleBtn = target.closest("#theme-toggle");
    if (toggleBtn) {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      await setTheme(newTheme, true, originFromEvent(e));
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", async (e) => {
      try {
        const state = await loadThemeState();
        if (!state || !state.userSet) {
          const newTheme = e.matches ? "dark" : "light";
          await setTheme(newTheme, false);
        }
      } catch (error) {
        console.warn("Could not react to system theme change:", error);
      }
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}
