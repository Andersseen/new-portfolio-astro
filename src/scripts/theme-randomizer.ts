import { saveThemeState, loadThemeState, type ThemeState } from "./theme-state";

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
};

// Oklab conversion helper (simplified for generation)
// We will generate colors in HSL first for easy manipulation, then output as oklab strings or HSL strings.
// Actually, since we updated global.css to use oklab, we should ideally consistency use oklab,
// but CSS handles mixing formats fine. To be modern, let's output oklab strings if possible,
// or stick to HSL if it's easier and robust.
// Given the user request for "colors to Oklab", let's try to generate Oklab directly or convert.

// Simpler approach: Generate HSL because it's semantically easier to rotate hue,
// then let the browser handle it. The user said "prefiro mantener colores en oklab",
// so let's try to output oklab.
// Mapping HSL hue to Oklab storage is non-trivial without a library.
// Strategy: Generate vibrant colors in oklab directly.
// Oklab(L, a, b): L=0.6-0.8 for vibrant UI colors. a,b range approx -0.3 to 0.3.
// We can rotate a/b using polar coordinates.

function oklabFromHue(hueDegrees: number): string {
  // Convert hue to a/b in Oklab
  // Chroma approx 0.15 for vibrant but readable colors
  const chroma = 0.15;
  const radians = (hueDegrees * Math.PI) / 180;
  const a = Math.cos(radians) * chroma;
  const b = Math.sin(radians) * chroma;
  const l = 0.7; // Good middle lightness for both dark/light modes usually

  // Format: oklab(L a b)
  return `oklab(${l} ${a.toFixed(3)} ${b.toFixed(3)})`;
}

function contrastColor(oklabString: string): string {
  // Rough estimation: if L > 0.6 assume dark text needed
  // This is a naive check but sufficient for randomizer
  // Extract L
  const match = oklabString.match(/oklab\(([\d\.]+)/);
  if (match && parseFloat(match[1]) > 0.6) {
    return "oklab(0.21 0 0)"; // dark
  }
  return "oklab(0.97 0 0)"; // light
}

export function generateThemeColors(seed?: number): ThemeColors {
  const h =
    typeof seed === "number" ? seed % 360 : Math.floor(Math.random() * 360);

  // Generate harmonious palette based on hue rotation in Oklab space
  return {
    primary: oklabFromHue(h),
    secondary: oklabFromHue(h + 36), // Analogous
    accent: oklabFromHue(h + 150), // Complementary-ish
    success: "oklab(0.723 -0.16 0.145)", // Keep success predictable
    warning: "oklab(0.796 0.04 0.155)", // Keep warning predictable
  };
}

export function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-success", colors.success);
  root.style.setProperty("--color-warning", colors.warning);

  // Since we use Oklab now, contrast calculation is tricky without parsing.
  // For the randomizer, we can set a safe default or try to deduce.
  // Given we generate L=0.7 for primary/secondary, they likely need dark text in light mode context?
  // Actually, randomizer updates the brand colors.
  // Let's hardcode a reasonable contrast or use brand colors as background for buttons.

  // Note: randomizer might break strict contrast if not careful, but it's a "fun" feature.
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

  // Save to IDB
  const newState: ThemeState = {
    mode: currentMode,
    colors: newColors,
    userSet: true,
  };

  await saveThemeState(newState);
  console.log("Applied random theme", newColors);

  return colors;
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
