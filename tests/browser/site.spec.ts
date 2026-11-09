import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about",
  "/products",
  "/applications",
  "/why-skinseal",
  "/clinical-experiences",
  "/resources",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  ...[
    "skinseal",
    "skinseal-plus",
    "skinseal-adv",
    "skinseal-adv-plus",
    "skinseal-dental",
    "skinseal-veterinary",
  ].map((x) => `/products/${x}`),
];
test("local brand typography resolves on headings and body", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain("manrope");
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain("inter");
});
test("every route renders with unique metadata, intact images and valid local links", async ({
  page,
  request,
}) => {
  const titles = new Set<string>();
  const hrefs = new Set<string>();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    expect(
      new URL(
        (await page.locator("link[rel=canonical]").getAttribute("href")) || "",
      ).pathname,
    ).toBe(route);
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.forEach((im) => ((im as HTMLImageElement).loading = "eager")),
      );
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect
      .poll(
        () =>
          page
            .locator("img")
            .evaluateAll((imgs) =>
              (imgs as HTMLImageElement[])
                .filter((im) => !im.complete || im.naturalWidth === 0)
                .map((im) => im.src),
            ),
        { timeout: 20000 },
      )
      .toEqual([]);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")!)))
      hrefs.add(href.split("#")[0]);
  }
  for (const href of hrefs)
    expect((await request.get(href)).status(), href).toBe(200);
  expect(errors).toEqual([]);
});
test("all pages fit at narrow mobile, tablet and desktop widths", async ({
  page,
}) => {
  test.setTimeout(180000);
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
          { message: `${route} at ${width}px` },
        )
        .toBe(true);
    }
  }
});
test("mobile navigation expands, traps focus, closes with Escape and follows product links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "Open navigation",
    exact: true,
  });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand products" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "SkinSeal Plus", exact: true })
    .click();
  await expect(page).toHaveURL(/products\/skinseal-plus/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("#mobile-navigation>.button")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation", exact: true }),
  ).toBeFocused();
});
test("desktop product disclosure returns keyboard focus on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open product navigation" });
  await toggle.click();
  await page.locator(".product-dropdown a").first().focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
});
test("product filters and FAQ operate by keyboard", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("button", { name: "Veterinary", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText(
    "SkinSeal Veterinary Range",
  );
  await page.goto("/");
  const faq = page.locator("summary").first();
  await faq.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});
test("form validates fields and does not fake delivery when credentials are missing", async ({
  page,
}) => {
  await page.goto("/contact?product=skinseal-plus");
  await expect(page.locator("#product")).toHaveValue("skinseal-plus");
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#consent-error")).toBeVisible();
  await page.getByLabel("Full name").fill("Asha Rao");
  await page.getByLabel("Email address").fill("asha@example.com");
  await page.getByLabel("Phone number").fill("+91 9876543210");
  await page
    .getByLabel("Organization", { exact: false })
    .fill("Example Clinic");
  await page.locator("#profession").selectOption("Healthcare professional");
  await page
    .getByLabel("Your message")
    .fill("Please send current product information.");
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.locator("form [role=alert]")).toContainText(
    "not configured",
  );
  await expect(page.locator("#message")).toHaveValue(
    "Please send current product information.",
  );
});
test("API rejects invalid, foreign-origin and bot submissions", async ({
  request,
}) => {
  expect((await request.post("/api/enquiries", { data: {} })).status()).toBe(
    400,
  );
  expect(
    (
      await request.post("/api/enquiries", {
        headers: { Origin: "https://untrusted.example" },
        data: {},
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/enquiries", {
        data: "bad",
        headers: { "Content-Type": "text/plain" },
      })
    ).status(),
  ).toBe(415);
});
test("unapproved media are not published and unknown products return 404", async ({
  page,
  request,
}) => {
  await page.goto("/resources");
  expect(await page.locator('a[href$=".pdf"]').count()).toBe(0);
  await expect(
    page.getByRole("link", { name: "Request current document" }),
  ).toHaveCount(7);
  await page.goto("/clinical-experiences");
  await expect(page.locator("video")).toHaveCount(0);
  await expect(
    page.getByText(
      "No clinical testimonials or patient footage are currently published.",
    ),
  ).toBeVisible();
  expect((await request.get("/products/does-not-exist")).status()).toBe(404);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});
test("all content routes have no automated WCAG A/AA violations", async ({
  page,
}) => {
  test.setTimeout(120000);
  const issues: object[] = [];
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      await page.goto(path);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      if (result.violations.length)
        issues.push({
          path,
          width,
          violations: result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
    }
  }
  expect(issues).toEqual([]);
});
test("capture representative layouts", async ({ page }) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `.recovery/home-${width}.png`,
      fullPage: true,
      animations: "disabled",
    });
  }
  await page.goto("/products/skinseal");
  await page.screenshot({
    path: ".recovery/product-desktop.png",
    fullPage: true,
  });
  await page.goto("/contact");
  await page.screenshot({
    path: ".recovery/contact-desktop.png",
    fullPage: true,
  });
});
