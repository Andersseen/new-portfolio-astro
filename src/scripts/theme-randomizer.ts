import { saveThemeState, loadThemeState, type ThemeState } from "./theme-state";

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
};

function hsl(h: number, s = 70, l = 50) {
  return `hsl(${Math.round(h)}, ${s}%, ${l}%)`;
}

function contrastTextForLightness(l: number) {
  return l > 60 ? "#111827" : "#ffffff";
}

export function generateThemeColors(seed?: number): ThemeColors {
  const h =
    typeof seed === "number" ? seed % 360 : Math.floor(Math.random() * 360);
  return {
    primary: hsl(h, 68, 46),
    secondary: hsl((h + 36) % 360, 68, 52),
    accent: hsl((h + 78) % 360, 68, 54),
    success: hsl((h + 150) % 360, 68, 42),
    warning: hsl((h + 210) % 360, 68, 52),
  };
}

export function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-success", colors.success);
  root.style.setProperty("--color-warning", colors.warning);

  // accessible foreground for accents
  root.style.setProperty(
    "--color-primary-contrast",
    contrastTextForLightness(46)
  );
  root.style.setProperty(
    "--color-accent-contrast",
    contrastTextForLightness(54)
  );
}

export async function randomizeTheme() {
  // Get current theme state
  const currentState = await loadThemeState();
  const currentMode =
    currentState?.mode ||
    (document.documentElement.getAttribute("data-theme") as "light" | "dark") ||
    "light";

  // Generate new colors
  const newColors = generateThemeColors();
  applyThemeColors(newColors);

  // Save to IDB, preserving mode and marking as user-set
  const newState: ThemeState = {
    mode: currentMode,
    colors: newColors,
    userSet: true, // Randomizing is a user action
  };

  await saveThemeState(newState);
  console.log("Applied random theme", newColors);

  return newColors;
}

// Auto-init: apply saved theme if exists
document.addEventListener("DOMContentLoaded", async () => {
  const saved = await loadThemeState();
  if (saved && saved.colors) {
    applyThemeColors(saved.colors);
  }

  const btn = document.getElementById("theme-randomize");
  if (btn) {
    btn.addEventListener("click", async () => {
      await randomizeTheme();
      // Small visual pulse to indicate change
      document.documentElement.animate([{ opacity: 0.98 }, { opacity: 1 }], {
        duration: 220,
      });
    });
  }
});
