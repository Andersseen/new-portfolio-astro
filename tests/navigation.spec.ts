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

  test("language selector links use routed trailing-slash URLs", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.locator("#langButton").click();
    await page.getByRole("menuitem", { name: "Українська" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/ua\/$/);
    await expect(page.getByText("404: Not found")).toHaveCount(0);
    await expect(page.locator("#portfolio-grid")).toBeVisible();

    await page.locator("#langButton").click();
    await page.getByRole("menuitem", { name: "Español" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/es\/$/);
    await expect(page.getByText("404: Not found")).toHaveCount(0);
    await expect(page.locator("#portfolio-grid")).toBeVisible();

    await page.locator("#langButton").click();
    await page.getByRole("menuitem", { name: "English" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/$/);
    await expect(page).not.toHaveURL(/\/en\/?$/);
    await expect(page.getByText("404: Not found")).toHaveCount(0);
    await expect(page.locator("#portfolio-grid")).toBeVisible();
  });
});
