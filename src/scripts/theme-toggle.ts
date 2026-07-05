import {
  saveThemeState,
  loadThemeState,
  type ThemeState,
} from "./theme-state";
import { applyThemeColors } from "./theme-apply";

async function initThemeToggle() {
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  const html = document.documentElement;

  const savedState = await loadThemeState();

  let currentTheme: "light" | "dark";

  if (savedState && savedState.userSet) {
    currentTheme = savedState.mode;

    if (savedState.colors) {
      applyThemeColors(savedState.colors);
    }
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    currentTheme = prefersDark ? "dark" : "light";
  }

  setTheme(currentTheme, false);
  // Use event delegation to handle clicks even if elements are hydrated/replaced
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const toggleBtn = target.closest("#theme-toggle");
    if (toggleBtn) {
      const newTheme = currentTheme === "light" ? "dark" : "light";

      await setTheme(newTheme, true);
    }
  });

  async function setTheme(theme: "light" | "dark", userSet: boolean = false) {
    currentTheme = theme;
    html.setAttribute("data-theme", theme);

    const savedState = await loadThemeState();
    const newState: ThemeState = {
      mode: theme,
      colors: savedState?.colors,
      userSet: userSet || (savedState?.userSet ?? false),
    };
    await saveThemeState(newState);

    window.dispatchEvent(
      new CustomEvent("portfolio:theme-mode-changed", {
        detail: { mode: theme, userSet },
      }),
    );

    if (sunIcon && moonIcon) {
      if (theme === "dark") {
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
      } else {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
      }
    }
  }

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", async (e) => {
    const state = await loadThemeState();

    if (!state || !state.userSet) {
      const newTheme = e.matches ? "dark" : "light";
      const html = document.documentElement;
      const sunIcon = document.getElementById("sun-icon");
      const moonIcon = document.getElementById("moon-icon");

      html.setAttribute("data-theme", newTheme);

      await saveThemeState({
        mode: newTheme,
        colors: state?.colors,
        userSet: false,
      });

      window.dispatchEvent(
        new CustomEvent("portfolio:theme-mode-changed", {
          detail: { mode: newTheme, userSet: false },
        }),
      );

      if (sunIcon && moonIcon) {
        if (newTheme === "dark") {
          sunIcon.classList.remove("hidden");
          moonIcon.classList.add("hidden");
        } else {
          sunIcon.classList.add("hidden");
          moonIcon.classList.remove("hidden");
        }
      }
    }
  });
