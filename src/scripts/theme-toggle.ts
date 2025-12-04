import { saveThemeState, loadThemeState, type ThemeState } from "./theme-state";

async function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  const html = document.documentElement;

  // Load theme state from IDB
  const savedState = await loadThemeState();

  let currentTheme: "light" | "dark";

  if (savedState && savedState.userSet) {
    // User has explicitly set a theme - use it
    currentTheme = savedState.mode;
    // Also restore custom colors if they exist
    if (savedState.colors) {
      applyColors(savedState.colors);
    }
  } else {
    // No user preference - use system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    currentTheme = prefersDark ? "dark" : "light";
  }

  // Set initial theme (without marking as user-set)
  setTheme(currentTheme, false);

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", async () => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      // Mark as user-set when manually toggled
      await setTheme(newTheme, true);
    });
  }

  async function setTheme(theme: "light" | "dark", userSet: boolean = false) {
    currentTheme = theme;
    html.setAttribute("data-theme", theme);

    // Save to IDB
    const savedState = await loadThemeState();
    const newState: ThemeState = {
      mode: theme,
      colors: savedState?.colors, // Preserve custom colors
      userSet: userSet || (savedState?.userSet ?? false),
    };
    await saveThemeState(newState);

    // Update icons visibility
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

  function applyColors(colors: any) {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-success", colors.success);
    root.style.setProperty("--color-warning", colors.warning);
  }
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}

// Watch for system theme changes (only if user hasn't set preference)
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", async (e) => {
    const savedState = await import("./theme-state").then((m) =>
      m.loadThemeState()
    );
    const state = await savedState;

    // Only auto-update if user hasn't manually set a preference
    if (!state || !state.userSet) {
      const newTheme = e.matches ? "dark" : "light";
      const html = document.documentElement;
      const sunIcon = document.getElementById("sun-icon");
      const moonIcon = document.getElementById("moon-icon");

      html.setAttribute("data-theme", newTheme);

      // Save to IDB
      await import("./theme-state").then((m) =>
        m.saveThemeState({
          mode: newTheme,
          colors: state?.colors,
          userSet: false,
        })
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
