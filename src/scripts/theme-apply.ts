import type { ThemeScale } from "@/utils/theme-api";
import type { ThemeColors } from "./theme-state";

/**
 * CSS custom properties managed by the theme system. Removing them from the
 * inline style lets the static `[data-theme="dark"]` rules take over.
 */
const THEME_CSS_PROPERTIES = [
  "--color-primary",
  "--color-primary-foreground",
  "--color-primary-50",
  "--color-primary-100",
  "--color-primary-200",
  "--color-primary-300",
  "--color-primary-400",
  "--color-primary-500",
  "--color-primary-600",
  "--color-primary-700",
  "--color-primary-800",
  "--color-primary-900",
  "--color-primary-950",
  "--color-secondary",
  "--color-secondary-foreground",
  "--color-secondary-50",
  "--color-secondary-100",
  "--color-secondary-200",
  "--color-secondary-300",
  "--color-secondary-400",
  "--color-secondary-500",
  "--color-secondary-600",
  "--color-secondary-700",
  "--color-secondary-800",
  "--color-secondary-900",
  "--color-secondary-950",
  "--color-accent",
  "--color-success",
  "--color-warning",
  "--color-background",
  "--color-foreground",
  "--color-background-secondary",
  "--color-background-tertiary",
  "--color-foreground-secondary",
  "--color-foreground-tertiary",
  "--color-border",
  "--color-border-light",
];

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

/**
 * Removes theme-related inline custom properties from the document root so the
 * static `[data-theme="..."]` CSS rules are used again.
 */
export function resetThemeColors() {
  const root = document.documentElement;
  THEME_CSS_PROPERTIES.forEach((prop) => {
    root.style.removeProperty(prop);
  });
}
