import { test, expect } from "@playwright/test";

test.describe("CV download", () => {
  test("download link is inside the about drawer", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const aboutButton = page.getByRole("button", { name: /Open about me/ });
    await expect(aboutButton).toBeVisible();
    await aboutButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const cvLink = dialog.locator('a[href="/andrii-pap.pdf"]');
    await expect(cvLink).toBeVisible();
    await expect(cvLink).toHaveAttribute("download");
    await expect(cvLink).toContainText(/Download CV|Descargar CV|Завантажити CV/);
  });

  test("download link is translated on Spanish locale", async ({ page }) => {
    await page.goto("/es/");
    await page.waitForLoadState("networkidle");

    const aboutButton = page.getByRole("button", { name: /Abrir sobre mí/ });
    await aboutButton.click();

    const dialog = page.getByRole("dialog");
    const cvLink = dialog.locator('a[href="/andrii-pap.pdf"]');
    await expect(cvLink).toContainText("Descargar CV");
  });
});
