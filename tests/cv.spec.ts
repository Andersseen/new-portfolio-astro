import { test, expect } from "@playwright/test";

test.describe("CV download", () => {
  test("hero has a working CV download link", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cvLink = page.locator('a[href="/andrii-pap.pdf"]');
    await expect(cvLink).toBeVisible();
    await expect(cvLink).toHaveAttribute("download");
    await expect(cvLink).toContainText(/Download CV|Descargar CV|Завантажити CV/);
  });

  test("CV download link is translated on Spanish locale", async ({ page }) => {
    await page.goto("/es/");
    await page.waitForLoadState("networkidle");

    const cvLink = page.locator('a[href="/andrii-pap.pdf"]');
    await expect(cvLink).toContainText("Descargar CV");
  });
});
