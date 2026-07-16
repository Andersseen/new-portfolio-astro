import { test, expect } from "@playwright/test";

test.describe("404 page", () => {
  test("renders a custom not-found page for unknown paths", async ({ page }) => {
    await page.goto("/nonexistent/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#not-found-title")).toContainText("Page not found");
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });
});
