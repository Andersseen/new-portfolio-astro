import {
  saveThemeState,
  loadThemeState,
  type ThemeColors,
  type ThemeState,
} from "./theme-state";

async function initThemeToggle() {
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  const html = document.documentElement;

  const savedState = await loadThemeState();

  let currentTheme: "light" | "dark";

  if (savedState && savedState.userSet) {
    currentTheme = savedState.mode;

    if (savedState.colors) {
      applyColors(savedState.colors);
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

  function applyColors(colors: ThemeColors) {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
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
