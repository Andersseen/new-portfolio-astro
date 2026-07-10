import { test, expect } from "@playwright/test";

test.describe("@andersseen/layout integration", () => {
  test("applies attribute-driven flex styles in Astro markup", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const languageButton = page.locator("#langButton");
    await expect(languageButton).toHaveAttribute(
      "and-layout",
      "horizontal align:center justify:center",
    );

    const styles = await languageButton.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        display: computed.display,
        alignItems: computed.alignItems,
        justifyContent: computed.justifyContent,
      };
    });

    expect(styles).toEqual({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
  });

  test("preserves desktop grid columns, gaps, and wide spans", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const grid = page.locator("#portfolio-grid");
    await expect(grid).toHaveAttribute(
      "and-layout",
      "grid cols:1 cols@md:3 gap:md gap@md:lg",
    );

    const styles = await grid.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        display: computed.display,
        columns: computed.gridTemplateColumns.trim().split(/\s+/).length,
        columnGap: computed.columnGap,
        rowGap: computed.rowGap,
      };
    });

    expect(styles).toEqual({
      display: "grid",
      columns: 3,
      columnGap: "24px",
      rowGap: "24px",
    });

    const firstSlot = page.locator("#portfolio-grid > [data-swapy-slot]").first();
    await expect(firstSlot).toHaveAttribute("and-layout", "span@md:2");
    await expect
      .poll(() =>
        firstSlot.evaluate((element) => getComputedStyle(element).gridColumnEnd),
      )
      .toBe("span 2");
  });

  test("preserves the single-column mobile grid", async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const grid = page.locator("#portfolio-grid");
    const styles = await grid.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        display: computed.display,
        columns: computed.gridTemplateColumns.trim().split(/\s+/).length,
        columnGap: computed.columnGap,
        rowGap: computed.rowGap,
      };
    });

    expect(styles).toEqual({
      display: "grid",
      columns: 1,
      columnGap: "16px",
      rowGap: "16px",
    });

    const firstSlot = page.locator("#portfolio-grid > [data-swapy-slot]").first();
    await expect
      .poll(() =>
        firstSlot.evaluate((element) => getComputedStyle(element).gridColumnEnd),
      )
      .toBe("auto");
  });
});
