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
 * Flattens a ThemeColors object into CSS custom property → value pairs.
 * Handles both string values and full color scales for primary/secondary.
 * The flat form is what gets persisted, so the inline `<head>` script can
 * re-apply a palette synchronously before first paint.
 */
export function themeColorsToVars(colors: ThemeColors): Record<string, string> {
  const vars: Record<string, string> = {};

  const setScale = (prefix: string, scale: ThemeScale | string) => {
    if (typeof scale === "string") {
      vars[`--color-${prefix}`] = scale;
      return;
    }

    Object.entries(scale).forEach(([key, value]) => {
      const v = value as string;
      if (key === "DEFAULT") {
        vars[`--color-${prefix}`] = v;
      } else if (key === "foreground") {
        vars[`--color-${prefix}-foreground`] = v;
      } else {
        vars[`--color-${prefix}-${key}`] = v;
      }
    });
  };

  setScale("primary", colors.primary);
  setScale("secondary", colors.secondary);

  const optional: [string, string | undefined][] = [
    ["--color-accent", colors.accent],
    ["--color-success", colors.success],
    ["--color-warning", colors.warning],
    ["--color-background", colors.background],
    ["--color-foreground", colors.foreground],
    ["--color-background-secondary", colors.backgroundSecondary],
    ["--color-background-tertiary", colors.backgroundTertiary],
    ["--color-foreground-secondary", colors.foregroundSecondary],
    ["--color-foreground-tertiary", colors.foregroundTertiary],
    ["--color-border", colors.border],
    ["--color-border-light", colors.borderLight],
  ];
  optional.forEach(([prop, value]) => {
    if (value) vars[prop] = value;
  });

  return vars;
}

/** Applies flattened theme variables to the document root. */
export function applyThemeVars(vars: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
}

/** Applies a ThemeColors object to CSS custom properties on the document root. */
export function applyThemeColors(colors: ThemeColors) {
  applyThemeVars(themeColorsToVars(colors));
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
