import { test, expect } from "@playwright/test";
test("hero product and caption never overlap at the requested widths", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const product = (await page
      .locator(".hero-showcase .stage-applicator")
      .boundingBox())!;
    const caption = (await page
      .locator(".hero-showcase .showcase-caption")
      .boundingBox())!;
    expect(caption.y, `Caption clearance at ${width}px`).toBeGreaterThanOrEqual(
      product.y + product.height + 12,
    );
  }
});

test("1024px desktop navigation displays all links without a hamburger or overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link")).toHaveCount(8);
  await expect(
    page.getByRole("button", { name: "Open navigation", exact: true }),
  ).toBeHidden();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open product navigation" }).click();
  await expect(page.locator(".product-dropdown")).toBeVisible();
});
test("mobile menu restores the desktop state when resized to 1024px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page.getByRole("button", { name: "Expand products" }).click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await expect(page.locator(".product-dropdown")).toHaveCount(0);
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  expect(
    await page.locator("body").evaluate((el) => getComputedStyle(el).overflow),
  ).not.toBe("hidden");
});
test("benefit explanations expand beside authentic product imagery", async ({
  page,
}) => {
  await page.goto("/why-skinseal");
  const benefits = page.locator(".benefit-visual-layout");
  await expect(benefits.locator("img")).toHaveCount(1);
  const summary = benefits
    .locator("summary")
    .filter({ hasText: "Protective sealing" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(
    benefits.locator("details[open]").filter({ hasText: "Protective sealing" }),
  ).toContainText("Polymerizes to form a film");
});
test("closure stages expose progress and genuine product context without a large numeral", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: /Seal$/, exact: false }).click();
  const panel = page.getByRole("tabpanel", { name: /Seal$/, exact: false });
  await expect(panel.locator("img")).toHaveCount(1);
  await expect(
    page.getByRole("progressbar", { name: "Closure journey progress" }),
  ).toHaveAttribute("aria-valuenow", "4");
  await expect(page.locator(".journey-big-number")).toHaveCount(0);
});
