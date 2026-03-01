import { saveThemeState, loadThemeState, type ThemeState } from "./theme-state";

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
};

function oklabFromHue(hueDegrees: number): string {
  const chroma = 0.15;
  const radians = (hueDegrees * Math.PI) / 180;
  const a = Math.cos(radians) * chroma;
  const b = Math.sin(radians) * chroma;
  const l = 0.7;

  return `oklab(${l} ${a.toFixed(3)} ${b.toFixed(3)})`;
}

function contrastColor(oklabString: string): string {
  const match = oklabString.match(/oklab\(([\d\.]+)/);
  if (match && parseFloat(match[1]) > 0.6) {
    return "oklab(0.21 0 0)";
  }
  return "oklab(0.97 0 0)";
}

export function generateThemeColors(seed?: number): ThemeColors {
  const h =
    typeof seed === "number" ? seed % 360 : Math.floor(Math.random() * 360);

  return {
    primary: oklabFromHue(h),
    secondary: oklabFromHue(h + 36),
    accent: oklabFromHue(h + 150),
    success: "oklab(0.723 -0.16 0.145)",
    warning: "oklab(0.796 0.04 0.155)",
  };
}

export function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-success", colors.success);
  root.style.setProperty("--color-warning", colors.warning);
}

export async function randomizeTheme() {
  const currentState = await loadThemeState();
  const currentMode =
    currentState?.mode ||
    (document.documentElement.getAttribute("data-theme") as "light" | "dark") ||
    "light";

  const newColors = generateThemeColors();
  applyThemeColors(newColors);

  const newState: ThemeState = {
    mode: currentMode,
    colors: newColors,
    userSet: true,
  };

  await saveThemeState(newState);

  return newColors;
}

document.addEventListener("DOMContentLoaded", async () => {
  const saved = await loadThemeState();
  if (saved && saved.colors) {
    applyThemeColors(saved.colors);
  }

  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest("#theme-randomize");
    if (btn) {
      await randomizeTheme();
      // Optional subtle animation on the body to indicate change
      document.documentElement.animate([{ opacity: 0.98 }, { opacity: 1 }], {
        duration: 220,
      });
    }
  });
});
