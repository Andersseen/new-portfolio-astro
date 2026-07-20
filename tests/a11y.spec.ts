import { expect, test, type Locator, type Page } from "@playwright/test";

type ContrastIssue = {
  text: string;
  ratio: number;
  required: number;
  color: string;
  backgroundColor: string;
  path: string;
};

const AUDITED_CARD_IDS = [
  "projects",
  "community",
  "design",
  "social",
  "services",
  "stack",
  "articles",
] as const;

async function setTheme(page: Page, theme: "light" | "dark") {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.evaluate((nextTheme) => {
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, theme);
}

async function openCard(page: Page, id: string) {
  const card = page.getByTestId(`portfolio-card-${id}`);
  await expect(card).toBeVisible();
  await card.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(id === "design" ? 1200 : 700);
  return dialog;
}

async function closeDialog(page: Page) {
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
}

async function expectAuditedTextContrast(
  locator: Locator,
  label: string,
  options: { includeShadowDom?: boolean } = {},
) {
  const issues = await locator.evaluate(
    (root, auditOptions) => {
      type Rgba = { r: number; g: number; b: number; a: number };

      const scratch = document.createElement("canvas");
      scratch.width = 1;
      scratch.height = 1;
      const ctx = scratch.getContext("2d", { willReadFrequently: true });

      const parseColor = (value: string): Rgba | null => {
        if (!ctx || !value || value === "transparent") return null;
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = value;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
        return { r, g, b, a: a / 255 };
      };

      const blend = (top: Rgba, bottom: Rgba): Rgba => {
        const alpha = top.a + bottom.a * (1 - top.a);
        if (alpha === 0) return { r: 255, g: 255, b: 255, a: 1 };
        return {
          r: (top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / alpha,
          g: (top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / alpha,
          b: (top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / alpha,
          a: alpha,
        };
      };

      const luminance = ({ r, g, b }: Rgba) => {
        const channel = (value: number) => {
          const srgb = value / 255;
          return srgb <= 0.03928
            ? srgb / 12.92
            : Math.pow((srgb + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
      };

      const contrastRatio = (fg: Rgba, bg: Rgba) => {
        const lighter = Math.max(luminance(fg), luminance(bg));
        const darker = Math.min(luminance(fg), luminance(bg));
        return (lighter + 0.05) / (darker + 0.05);
      };

      const composedParent = (element: Element): Element | null => {
        if (element.parentElement) return element.parentElement;
        const rootNode = element.getRootNode();
        return rootNode instanceof ShadowRoot ? rootNode.host : null;
      };

      const ancestorChain = (element: Element): Element[] => {
        const chain: Element[] = [];
        for (let el: Element | null = element; el; el = composedParent(el)) {
          chain.push(el);
        }
        return chain.reverse();
      };

      const effectiveBackground = (element: Element): Rgba => {
        let bg: Rgba = { r: 255, g: 255, b: 255, a: 1 };
        for (const el of ancestorChain(element)) {
          const color = parseColor(getComputedStyle(el).backgroundColor);
          if (color && color.a > 0) bg = blend(color, bg);
        }
        return bg;
      };

      const isVisible = (element: HTMLElement) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          Number(style.opacity) > 0.01 &&
          rect.width > 0 &&
          rect.height > 0
        );
      };

      const elementPath = (element: Element) => {
        const parts: string[] = [];
        for (
          let el: Element | null = element;
          el && el !== document.body && parts.length < 6;
          el = composedParent(el)
        ) {
          const id = el.id ? `#${el.id}` : "";
          const className =
            typeof el.className === "string" && el.className
              ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
              : "";
          parts.unshift(`${el.tagName.toLowerCase()}${id}${className}`);
        }
        return parts.join(" > ");
      };

      const textSelector =
        "h1,h2,h3,h4,h5,h6,p,a,button,span,li,code,label,input,textarea";

      const collectElements = (scope: ParentNode): HTMLElement[] => {
        const elements = Array.from(
          scope.querySelectorAll<HTMLElement>(textSelector),
        );

        if (!auditOptions.includeShadowDom) return elements;

        const descendants = Array.from(scope.querySelectorAll<HTMLElement>("*"));
        for (const element of descendants) {
          if (element.shadowRoot) {
            elements.push(...collectElements(element.shadowRoot));
          }
        }
        return elements;
      };

      const textElements = collectElements(root).filter((element) => {
        if (
          !isVisible(element) ||
          element.closest("[aria-hidden='true']") ||
          element.matches("[disabled],[aria-disabled='true']")
        ) {
          return false;
        }
        const text = (
          element instanceof HTMLInputElement ||
          element instanceof HTMLTextAreaElement
            ? element.value || element.placeholder
            : element.innerText || element.textContent
        )
          ?.replace(/\s+/g, " ")
          .trim();
        if (!text) return false;

        return !Array.from(element.children).some((child) =>
          child.textContent?.trim(),
        );
      });

      return textElements.flatMap((element) => {
        const style = getComputedStyle(element);
        const color = parseColor(style.color);
        if (!color || color.a === 0) return [];

        const fontSize = parseFloat(style.fontSize);
        const fontWeight = parseInt(style.fontWeight, 10) || 400;
        const isLargeText =
          fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
        const required = isLargeText ? 3 : 4.5;
        const background = effectiveBackground(element);
        const ratio = contrastRatio(color, background);

        if (ratio + 0.01 >= required) return [];

        return [
          {
            text: (
              element instanceof HTMLInputElement ||
              element instanceof HTMLTextAreaElement
                ? element.value || element.placeholder
                : element.innerText || element.textContent || ""
            )
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 90),
            ratio: Number(ratio.toFixed(2)),
            required,
            color: style.color,
            backgroundColor: style.backgroundColor,
            path: elementPath(element),
          },
        ];
      });
    },
    { includeShadowDom: options.includeShadowDom ?? false },
  );

  expect(
    issues,
    `${label} contrast issues:\n${issues
      .map(
        (issue: ContrastIssue) =>
          `${issue.ratio}:1 < ${issue.required}:1 "${issue.text}" at ${issue.path} color=${issue.color} bg=${issue.backgroundColor}`,
      )
      .join("\n")}`,
  ).toEqual([]);
}

async function auditInteractiveStates(
  page: Page,
  root: Locator,
  label: string,
) {
  const controls = root.locator(
    "a,button,input,textarea,select,[tabindex]:not([tabindex='-1'])",
  );
  const count = await controls.count();
  let audited = 0;

  for (let i = 0; i < count; i += 1) {
    if (audited >= 12) break;

    const control = controls.nth(i);
    if (!(await control.isVisible().catch(() => false))) continue;
    if ((await control.getAttribute("disabled").catch(() => null)) !== null) {
      continue;
    }

    await control.hover({ trial: false, timeout: 600 }).catch(() => undefined);
    await expectAuditedTextContrast(root, `${label} hover ${i}`);

    await control.focus({ timeout: 600 }).catch(() => undefined);
    await expectAuditedTextContrast(root, `${label} focus ${i}`);
    await page.mouse.move(0, 0).catch(() => undefined);
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
    audited += 1;
  }
}

test.describe("accessibility audit", () => {
  test.setTimeout(90_000);

  for (const theme of ["light", "dark"] as const) {
    test(`all grid cards pass contrast in ${theme} theme`, async ({ page }) => {
      await setTheme(page, theme);
      const grid = page.locator("#portfolio-grid");

      await expectAuditedTextContrast(grid, `${theme} grid`);
      await auditInteractiveStates(page, grid, `${theme} grid`);
    });

    test(`all modals pass contrast in ${theme} theme`, async ({ page }) => {
      await setTheme(page, theme);

      for (const cardId of AUDITED_CARD_IDS) {
        const dialog = await openCard(page, cardId);
        await expectAuditedTextContrast(dialog, `${theme} ${cardId} modal`, {
          includeShadowDom: true,
        });
        await auditInteractiveStates(page, dialog, `${theme} ${cardId} modal`);
        await closeDialog(page);
      }
    });
  }

  test("modal keyboard flow moves focus in and restores it on close", async ({
    page,
  }) => {
    await setTheme(page, "dark");
    const opener = page.getByTestId("portfolio-card-projects");

    await opener.focus();
    await expect(opener).toBeFocused();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Projects" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close modal" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test("rapid theme toggles settle without a stuck reveal", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const toggle = page.locator("#theme-toggle");
    for (let i = 0; i < 6; i += 1) {
      await toggle.click();
      await page.waitForTimeout(80);
    }

    await page.waitForTimeout(1200);

    const state = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        theme: root.getAttribute("data-theme"),
        transitionState: root.dataset.themeTransition ?? null,
        bodyPointerEvents: getComputedStyle(document.body).pointerEvents,
      };
    });

    expect(["light", "dark"]).toContain(state.theme);
    expect(state.transitionState).toBeNull();
    expect(state.bodyPointerEvents).not.toBe("none");
  });
});
