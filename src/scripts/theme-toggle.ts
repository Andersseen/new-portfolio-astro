function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  const html = document.documentElement;

  // Load theme from localStorage or system preference
  const savedTheme = localStorage.getItem("theme");
  let currentTheme = savedTheme;

  if (!currentTheme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    currentTheme = prefersDark ? "dark" : "light";
  }

  // Set initial theme
  setTheme(currentTheme);

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  }

  function setTheme(theme: string) {
    currentTheme = theme;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

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

// Watch for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
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
  });
