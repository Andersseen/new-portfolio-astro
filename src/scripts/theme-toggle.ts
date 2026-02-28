import { saveThemeState, loadThemeState, type ThemeState } from "./theme-state";

async function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
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
      "(prefers-color-scheme: dark)"
    ).matches;
    currentTheme = prefersDark ? "dark" : "light";
  }

  
  setTheme(currentTheme, false);

  
  if (themeToggle) {
    themeToggle.addEventListener("click", async () => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      await setTheme(newTheme, true);
    });
  }

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


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}


window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", async (e) => {
    const savedState = await loadThemeState(); 
    const state = await savedState;

    
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
