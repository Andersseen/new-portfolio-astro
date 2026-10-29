import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("renders the bento grid without a visible hero", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("text=Andersseen Dev").first()).toBeVisible();
    // The hero copy is only kept as a visually hidden h1 for the outline/SEO.
    await expect(page.locator("h1.sr-only")).toContainText(
      "I build polished web products",
    );
    await expect(page.locator("#portfolio-grid")).toBeVisible();
    await expect(page.locator("#theme-toggle")).toBeVisible();
    await expect(page.locator("#theme-randomize")).toBeVisible();
  });

  test("logo opens the about dialog with the hero copy", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Open about me" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Full-stack developer & UI systems builder");
    await expect(dialog).toContainText("I build polished web products");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
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

  test("social card renders the Blog icon without nested controls", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const socialCard = page
      .locator('#portfolio-grid button[type="button"]')
      .filter({ hasText: "Social" });

    await expect(socialCard).toHaveCount(1);
    await expect(socialCard.locator("svg.lucide-rss")).toBeVisible();
    await expect(socialCard.locator("a, button")).toHaveCount(0);

    await page.locator("#theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(socialCard.locator("svg.lucide-rss")).toBeVisible();

    await socialCard.focus();
    await expect(socialCard).toBeFocused();
    await socialCard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Social" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Blog" }).locator("svg.lucide-rss"),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Social" })).toBeHidden();
    await expect(socialCard).toBeFocused();
  });
});
