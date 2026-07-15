import { test, expect } from "@playwright/test";

test.describe("contact form in social modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("opens the social modal and shows the contact form", async ({ page }) => {
    const socialCard = page.locator('[data-testid="portfolio-card-social"]');
    await expect(socialCard).toBeVisible();
    await socialCard.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.locator('[data-testid="social-contact-form"]')).toBeVisible();
  });

  test("submits the form and shows a success state", async ({ page }) => {
    await page.route("/api/send-email", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true }),
        contentType: "application/json",
      });
    });

    await page.locator('[data-testid="portfolio-card-social"]').click();

    await page.locator("#contact-name").fill("Ada Lovelace");
    await page.locator("#contact-email").fill("ada@example.com");
    await page.locator("#contact-message").fill("I would love to work with you.");
    await page.locator('[data-testid="social-contact-form"]').locator('button[type="submit"]').click();

    const submitButton = page.locator('[data-testid="social-contact-form"]').locator('button[type="submit"]');
    await expect(submitButton).toContainText(/Sent|Enviado|Надіслано/);
  });

  test("shows an error message when the API fails", async ({ page }) => {
    await page.route("/api/send-email", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
        contentType: "application/json",
      });
    });

    await page.locator('[data-testid="portfolio-card-social"]').click();

    await page.locator("#contact-name").fill("Grace Hopper");
    await page.locator("#contact-email").fill("grace@example.com");
    await page.locator("#contact-message").fill("Just saying hi.");
    await page.locator('[data-testid="social-contact-form"]').locator('button[type="submit"]').click();

    await expect(page.locator('[data-testid="social-contact-error"]')).toBeVisible();
  });
});
