import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("opens the contact modal from the grid", async ({ page }) => {
    const cardButton = page.locator('[data-testid="portfolio-card-contact"]');
    await expect(cardButton).toBeVisible();

    await cardButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible();
  });

  test("validates empty fields on submit", async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-contact"]').click();

    await page.locator('[data-testid="contact-form"]').locator('button[type="submit"]').click();

    await expect(page.locator("#contact-name-error")).toBeVisible();
    await expect(page.locator("#contact-email-error")).toBeVisible();
    await expect(page.locator("#contact-message-error")).toBeVisible();

    await expect(page.locator("#contact-name")).toBeFocused();
  });

  test("shows an error for an invalid email", async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-contact"]').click();

    await page.locator("#contact-name").fill("Ada");
    await page.locator("#contact-email").fill("not-an-email");
    await page.locator("#contact-message").fill("Hello!");
    await page.locator('[data-testid="contact-form"]').locator('button[type="submit"]').click();

    await expect(page.locator("#contact-email-error")).toBeVisible();
    await expect(page.locator("#contact-name-error")).toBeHidden();
    await expect(page.locator("#contact-message-error")).toBeHidden();
  });

  test("submits the form and shows a success message", async ({ page }) => {
    await page.route("/api/send-email", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true }),
        contentType: "application/json",
      });
    });

    await page.locator('[data-testid="portfolio-card-contact"]').click();

    await page.locator("#contact-name").fill("Ada Lovelace");
    await page.locator("#contact-email").fill("ada@example.com");
    await page.locator("#contact-message").fill("I would love to work with you.");
    await page.locator('[data-testid="contact-form"]').locator('button[type="submit"]').click();

    await expect(page.locator('[data-testid="contact-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="contact-success"]')).toContainText(
      /Thanks|Gracias|Дякую/,
    );
  });

  test("shows an error message when the API fails", async ({ page }) => {
    await page.route("/api/send-email", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
        contentType: "application/json",
      });
    });

    await page.locator('[data-testid="portfolio-card-contact"]').click();

    await page.locator("#contact-name").fill("Grace Hopper");
    await page.locator("#contact-email").fill("grace@example.com");
    await page.locator("#contact-message").fill("Just saying hi.");
    await page.locator('[data-testid="contact-form"]').locator('button[type="submit"]').click();

    await expect(page.locator('[data-testid="contact-error"]')).toBeVisible();
  });
});
