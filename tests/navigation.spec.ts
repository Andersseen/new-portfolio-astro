import { test, expect } from "@playwright/test";

test.describe("language navigation", () => {
  test("switching language changes the URL", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Spanish
    await page.goto("/es/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/es\//);

    // Ukrainian
    await page.goto("/ua/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/ua\//);
  });
});
