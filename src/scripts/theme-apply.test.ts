import { describe, it, expect, beforeEach } from "vitest";
import { applyThemeColors, resetThemeColors } from "./theme-apply";
import type { ThemeColors } from "./theme-state";

describe("theme-apply", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("style");
  });

  it("applies theme colors as CSS custom properties", () => {
    const colors: ThemeColors = {
      primary: "oklab(0.5 0.1 -0.2)",
      secondary: "oklab(0.6 0.15 -0.15)",
      accent: "oklab(0.7 0.2 -0.1)",
      success: "oklab(0.7 -0.15 0.1)",
      warning: "oklab(0.8 0.05 0.1)",
      background: "oklab(0.97 0 0)",
      foreground: "oklab(0.21 0 0)",
    };

    applyThemeColors(colors);

    const root = document.documentElement;
    expect(root.style.getPropertyValue("--color-primary")).toBe(
      "oklab(0.5 0.1 -0.2)",
    );
    expect(root.style.getPropertyValue("--color-background")).toBe(
      "oklab(0.97 0 0)",
    );
  });

  it("resetThemeColors removes applied theme custom properties", () => {
    applyThemeColors({
      primary: "oklab(0.5 0.1 -0.2)",
      secondary: "oklab(0.6 0.15 -0.15)",
      accent: "oklab(0.7 0.2 -0.1)",
      success: "oklab(0.7 -0.15 0.1)",
      warning: "oklab(0.8 0.05 0.1)",
      background: "oklab(0.97 0 0)",
      foreground: "oklab(0.21 0 0)",
    });

    resetThemeColors();

    const root = document.documentElement;
    expect(root.style.getPropertyValue("--color-primary")).toBe("");
    expect(root.style.getPropertyValue("--color-background")).toBe("");
  });
});
