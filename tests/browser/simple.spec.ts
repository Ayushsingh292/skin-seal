import { test, expect } from "@playwright/test";

test("homepage presents six sections and every product without selectors", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main > section")).toHaveCount(6);
  await expect(page.locator("main .product-card")).toHaveCount(6);
  await expect(page.getByRole("tab")).toHaveCount(0);
  for (const card of await page.locator("main .product-card").all()) {
    await expect(card.getByRole("link", { name: /View Details/ })).toBeVisible();
    await expect(card.getByRole("link", { name: /Enquire/ })).toBeVisible();
  }
});

test("buyer can compare all six families and enquire about dental", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("table", { name: "Compare SkinSeal products" })).toBeVisible();
  await expect(page.locator("tbody tr")).toHaveCount(6);
  await page.locator(".product-card").filter({ hasText: "SkinSeal Dental Range" }).getByRole("link", { name: /View Details/ }).click();
  await expect(page.locator("h1")).toHaveText("SkinSeal Dental Range");
  await page.locator("main").getByRole("link", { name: /Enquire About/ }).click();
  await expect(page.locator("#product")).toHaveValue("skinseal-dental");
});

test("variant documentation enquiry requests the exact product insert", async ({ page }) => {
  await page.goto("/products/skinseal-plus");
  await page.getByRole("link", { name: "Request Product Documentation" }).click();
  await expect(page.locator("#product")).toHaveValue("skinseal-plus");
  await expect(page.locator("#message")).toHaveValue("Please send the current Instructions for Use for SkinSeal Plus.");
});

test("doctor journeys work for each product family", async ({ page }) => {
  for (const slug of ["skinseal", "skinseal-plus", "skinseal-adv", "skinseal-adv-plus", "skinseal-dental", "skinseal-veterinary"]) {
    await page.goto("/");
    await page.locator("main").getByRole("link", { name: "Explore Products", exact: true }).click();
    await page.locator(`.product-card a[href="/products/${slug}"]`).last().click();
    await page.getByRole("link", { name: /Enquire About/ }).click();
    await expect(page.locator("#product")).toHaveValue(slug);
  }
});

test("a first-time visitor can submit required fields without optional profile details", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Asha Rao");
  await page.getByLabel("Email address").fill("asha@example.com");
  await page.getByLabel("Phone number").fill("+91 9876543210");
  await page.getByLabel("Your message").fill("Please send current product information.");
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.locator("form [role=alert]")).toContainText("not configured");
  await expect(page.locator("#organization-error, #profession-error")).toHaveCount(0);
});

test("application cards show full-width photographs above their descriptions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/applications");
  for (const card of await page.locator(".application-details > article").all()) {
    const box = (await card.boundingBox())!;
    const photo = (await card.locator(".application-detail-image").boundingBox())!;
    const copy = (await card.locator("div").last().boundingBox())!;
    expect(photo.width).toBeGreaterThan(box.width - 4);
    expect(photo.y).toBeLessThan(copy.y);
  }
});
