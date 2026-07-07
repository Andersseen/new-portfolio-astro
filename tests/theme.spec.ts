import { test, expect } from "@playwright/test";

async function getThemeState(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    return {
      dataTheme: root.getAttribute("data-theme"),
      bg: getComputedStyle(root).getPropertyValue("--color-background").trim(),
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
    };
  });
}

test.describe("theme", () => {
  test("clicking theme-toggle switches to dark and stays dark", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const before = await getThemeState(page);
    console.log("Before toggle:", before);
    expect(["light", "dark"]).toContain(before.dataTheme);

    // Click the theme toggle button.
    await page.click("#theme-toggle");

    // Wait long enough for any async theme regeneration to finish.
    await page.waitForTimeout(3500);

    const after = await getThemeState(page);
    console.log("After toggle:", after);

    expect(after.dataTheme).toBe("dark");

    // The dark background in oklab is approximately oklab(0.21 0 0),
    // the light background is oklab(0.97 0 0). Verify it switched to dark.
    const oklabMatch = after.bodyBg.match(/oklab\(([\d.]+)/);
    expect(oklabMatch).toBeTruthy();
    if (oklabMatch) {
      const lightness = parseFloat(oklabMatch[1]);
      console.log("Body background lightness:", lightness);
      expect(lightness).toBeLessThan(0.5);
    }
  });

  test("clicking theme-randomize does not revert dark mode", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Switch to dark first.
    await page.click("#theme-toggle");
    await page.waitForTimeout(1000);

    const afterToggle = await getThemeState(page);
    expect(afterToggle.dataTheme).toBe("dark");

    // Click the randomize button and wait for the API call / fallback.
    await page.click("#theme-randomize");
    await page.waitForTimeout(3500);

    const afterRandom = await getThemeState(page);
    console.log("After randomize:", afterRandom);

    // Even if the API is unavailable, the mode must stay dark and the
    // background should not revert to the light fallback.
    expect(afterRandom.dataTheme).toBe("dark");

    const oklabMatch = afterRandom.bodyBg.match(/oklab\(([\d.]+)/);
    expect(oklabMatch).toBeTruthy();
    if (oklabMatch) {
      const lightness = parseFloat(oklabMatch[1]);
      console.log("Body background lightness after randomize:", lightness);
      expect(lightness).toBeLessThan(0.5);
    }
  });
});
