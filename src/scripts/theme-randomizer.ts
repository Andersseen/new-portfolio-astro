// Theme randomizer: generates a harmonious palette and applies CSS variables.
type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  mode: "light" | "dark";
};

function hsl(h: number, s = 70, l = 50) {
  return `hsl(${Math.round(h)}, ${s}%, ${l}%)`;
}

function contrastTextForLightness(l: number) {
  // simple: if lightness > 60% use dark text, else use white
  return l > 60 ? "#111827" : "#ffffff";
}

export function generateTheme(seed?: number): Theme {
  const h =
    typeof seed === "number" ? seed % 360 : Math.floor(Math.random() * 360);
  const primary = hsl(h, 68, 46);
  const secondary = hsl((h + 36) % 360, 68, 52);
  const accent = hsl((h + 78) % 360, 68, 54);
  const success = hsl((h + 150) % 360, 68, 42);
  const warning = hsl((h + 210) % 360, 68, 52);
  const mode = "light";
  return { primary, secondary, accent, success, warning, mode };
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-secondary", theme.secondary);
  root.style.setProperty("--color-accent", theme.accent);
  root.style.setProperty("--color-success", theme.success);
  root.style.setProperty("--color-warning", theme.warning);

  // accessible foreground for accents
  root.style.setProperty(
    "--color-primary-contrast",
    contrastTextForLightness(46)
  );
  root.style.setProperty(
    "--color-accent-contrast",
    contrastTextForLightness(54)
  );

  // set data-theme for light/dark consumers
  document.documentElement.setAttribute("data-theme", theme.mode);

  // persist
  try {
    localStorage.setItem("site-random-theme", JSON.stringify(theme));
  } catch (e) {
    console.warn("Failed to persist theme:", e);
  }
}

export function randomizeTheme() {
  const theme = generateTheme();
  applyTheme(theme);
  return theme;
}

export function loadSavedTheme() {
  try {
    const raw = localStorage.getItem("site-random-theme");
    if (!raw) return null;
    return JSON.parse(raw) as Theme;
  } catch (e) {
    return null;
  }
}

// Auto-init: apply saved theme if exists, otherwise do nothing (keep default)
document.addEventListener("DOMContentLoaded", () => {
  const saved = loadSavedTheme();
  if (saved) applyTheme(saved);

  const btn = document.getElementById("theme-randomize");
  if (btn) {
    btn.addEventListener("click", () => {
      const newTheme = randomizeTheme();
      // small visual pulse to indicate change
      document.documentElement.animate([{ opacity: 0.98 }, { opacity: 1 }], {
        duration: 220,
      });
      console.log("Applied random theme", newTheme);
    });
  }
});
