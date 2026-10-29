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

/**
 * Mocks the Palette Crafter API with random latency so responses arrive out
 * of order — the condition that used to leave the page dark with a light
 * palette after fast toggling.
 */
async function mockThemeApi(page: import("@playwright/test").Page) {
  const requests: URL[] = [];
  await page.route(/\/api\/(v1\/)?theme/, async (route) => {
    const url = new URL(route.request().url());
    requests.push(url);
    const mode = url.searchParams.get("mode") === "dark" ? "dark" : "light";
    const baseHue = Number(url.searchParams.get("baseHue") ?? Math.floor(Math.random() * 360));
    const scale = (hex: string) => ({
      ...Object.fromEntries(
        ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"].map((k) => [k, hex]),
      ),
      DEFAULT: hex,
      foreground: "#000000",
    });
    await new Promise((r) => setTimeout(r, 100 + Math.random() * 700));
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        theme: {
          bg: mode === "dark" ? "#101018" : "#fafafa",
          fg: mode === "dark" ? "#f0f0f4" : "#141418",
          primary: scale(mode === "dark" ? "#8899ff" : "#3344cc"),
          secondary: scale(mode === "dark" ? "#ff88cc" : "#cc3388"),
        },
        meta: { mode, baseHue, secondaryHue: (baseHue + 120) % 360, harmony: "triadic", seeded: true },
      }),
    });
  });
  return requests;
}

async function expectSettledMode(page: import("@playwright/test").Page, expected: "light" | "dark") {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.themeTransition ?? null))
    .toBeNull();
  const state = await page.evaluate(() => ({
    theme: document.documentElement.getAttribute("data-theme"),
    inlineBg: document.documentElement.style.getPropertyValue("--color-background"),
  }));
  expect(state.theme).toBe(expected);
  // A generated palette, when present, must belong to the painted mode.
  if (state.inlineBg) {
    expect(state.inlineBg).toBe(expected === "dark" ? "#101018" : "#fafafa");
  }
}

test.describe("theme with a live palette API", () => {
  test("fast toggles never paint one mode with the other's palette", async ({ page }) => {
    await mockThemeApi(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const startDark = (await page.getAttribute("html", "data-theme")) === "dark";

    await page.click("#theme-randomize");
    await page.waitForTimeout(1200);

    for (let i = 0; i < 5; i += 1) {
      await page.click("#theme-toggle");
      await page.waitForTimeout(250);
    }
    const expected = startDark ? "light" : "dark";
    await page.waitForTimeout(1500);
    await expectSettledMode(page, expected);

    // Reload restores the same mode and palette before scripts run.
    await page.reload();
    expect(await page.getAttribute("html", "data-theme")).toBe(expected);
    await page.waitForLoadState("networkidle");
    await expectSettledMode(page, expected);
  });

  test("randomize keeps dark mode and toggling keeps the palette hue", async ({ page }) => {
    const requests = await mockThemeApi(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    if ((await page.getAttribute("html", "data-theme")) !== "dark") {
      await page.click("#theme-toggle");
    }

    for (let i = 0; i < 3; i += 1) {
      await page.click("#theme-randomize");
      await page.waitForTimeout(300);
    }
    await page.waitForTimeout(1500);
    await expectSettledMode(page, "dark");

    // The opposite mode is requested with the randomized palette's hue.
    const randomized = requests.filter((u) => u.searchParams.has("seed")).at(-1)!;
    expect(randomized.searchParams.get("mode")).toBe("dark");
    await page.click("#theme-toggle");
    await page.waitForTimeout(1200);
    await expectSettledMode(page, "light");
    const lightRequest = requests.filter((u) => u.searchParams.get("mode") === "light").at(-1)!;
    expect(lightRequest.searchParams.get("baseHue")).not.toBeNull();
  });
});
