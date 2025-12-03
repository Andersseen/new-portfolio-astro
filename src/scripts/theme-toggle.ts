function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  const html = document.documentElement;

  // Check if user has manually set a theme preference
  const savedTheme = localStorage.getItem("theme");
  const userSetTheme = localStorage.getItem("theme-user-set") === "true";

  let currentTheme: string;

  if (savedTheme && userSetTheme) {
    // User has explicitly set a theme - use it
    currentTheme = savedTheme;
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
    themeToggle.addEventListener("click", () => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      // Mark as user-set when manually toggled
      setTheme(newTheme, true);
    });
  }

  function setTheme(theme: string, userSet: boolean = false) {
    currentTheme = theme;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Mark if this was a user action
    if (userSet) {
      localStorage.setItem("theme-user-set", "true");
    }

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
  .addEventListener("change", (e) => {
    const userSetTheme = localStorage.getItem("theme-user-set") === "true";

    // Only auto-update if user hasn't manually set a preference
    if (!userSetTheme) {
      const newTheme = e.matches ? "dark" : "light";
      const html = document.documentElement;
      const sunIcon = document.getElementById("sun-icon");
      const moonIcon = document.getElementById("moon-icon");

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

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
