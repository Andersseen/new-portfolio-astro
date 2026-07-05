import type { ThemeScale } from "@/utils/theme-api";
import type { ThemeColors } from "./theme-state";

/**
 * Applies a ThemeColors object to CSS custom properties on the document root.
 * Handles both string values and full color scales for primary/secondary.
 */
export function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;

  const setScale = (prefix: string, scale: ThemeScale | string) => {
    if (typeof scale === "string") {
      root.style.setProperty(`--color-${prefix}`, scale);
      return;
    }

    Object.entries(scale).forEach(([key, value]) => {
      const v = value as string;
      if (key === "DEFAULT") {
        root.style.setProperty(`--color-${prefix}`, v);
      } else if (key === "foreground") {
        root.style.setProperty(`--color-${prefix}-foreground`, v);
      } else {
        root.style.setProperty(`--color-${prefix}-${key}`, v);
      }
    });
  };

  setScale("primary", colors.primary);
  setScale("secondary", colors.secondary);

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
