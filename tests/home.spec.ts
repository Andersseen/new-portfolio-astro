import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("renders the hero and portfolio grid", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("text=Andersseen Dev").first()).toBeVisible();
    await expect(
      page.locator("text=I build polished web products"),
    ).toBeVisible();
    await expect(page.locator("#portfolio-grid")).toBeVisible();
    await expect(page.locator("#theme-toggle")).toBeVisible();
    await expect(page.locator("#theme-randomize")).toBeVisible();
  });

  test("portfolio cards are interactive", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const firstCard = page.locator('[data-swapy-item] >> visible=true').first();
    await expect(firstCard).toBeVisible();

    // Cards should have buttons that can receive focus.
    const firstButton = page.locator('button[type="button"]').first();
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
  });
});
