import { test, expect } from "@playwright/test";

async function fillEnquiry(page: import("@playwright/test").Page) {
  await page.getByLabel("Full name").fill("Asha Rao");
  await page.getByLabel("Email address").fill("asha@example.com");
  await page.getByLabel("Phone number").fill("+91 9876543210");
  await page.getByLabel("Your message").fill("Please send current product and distribution information.");
  await page.locator("#consent").check();
}

test("enquiry requires explicit server confirmation before showing success", async ({ page }) => {
  await page.route("**/api/enquiries", route => route.fulfill({ json: {} }));
  await page.goto("/contact?product=skinseal-plus");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.locator("form [role=alert]")).toContainText("could not be confirmed");
  await expect(page.locator("#message")).not.toHaveValue("");
  await expect(page.locator("form [role=status]")).toHaveCount(0);
});

test("gateway errors provide a useful retry message and retain enquiry values", async ({ page }) => {
  await page.route("**/api/enquiries", route => route.fulfill({ status: 502, contentType: "text/html", body: "<html>Gateway unavailable</html>" }));
  await page.goto("/contact");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.locator("form [role=alert]")).toContainText("try again or contact us directly");
  await expect(page.locator("#name")).toHaveValue("Asha Rao");
});

test("required form controls expose their required state to assistive technology", async ({ page }) => {
  await page.goto("/contact");
  for (const id of ["name", "email", "phone", "product", "message", "consent"])
    await expect(page.locator(`#${id}`)).toHaveAttribute("required", "");
  for (const id of ["organization", "profession", "city"])
    await expect(page.locator(`#${id}`)).not.toHaveAttribute("required");
});

test("mobile menu isolates the page and restores it when closed", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.locator("footer")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  await expect(page.locator("footer")).not.toHaveAttribute("inert");
});

test("product comparison action has its own row and a comfortable touch target", async ({ page }) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/products/skinseal");
    const enquire = (await page.getByRole("link", { name: /Enquire About/ }).boundingBox())!;
    const compare = (await page.getByRole("link", { name: "Compare Formulations" }).boundingBox())!;
    expect(compare.y).toBeGreaterThanOrEqual(enquire.y + enquire.height + 8);
    expect(compare.height).toBeGreaterThanOrEqual(44);
  }
});

test("hospital buyer can compare formulations and request specific product information", async ({ page }) => {
  await page.goto("/");
  await page.locator("main").getByRole("link", { name: "Explore Products", exact: true }).click();
  await page.getByRole("link", { name: /Compare Formulations/ }).click();
  await page.getByRole("link", { name: "Request information: SkinSeal Adv Plus", exact: true }).click();
  await expect(page.locator("#product")).toHaveValue("skinseal-adv-plus");
});

test("distributor can submit a business enquiry with loading and confirmed-response feedback", async ({ page }) => {
  // This tests UI states with a controlled API response, not real email delivery.
  let release!: () => void;
  const waiting = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/enquiries", async route => {
    expect(route.request().postDataJSON().profession).toBe("Distributor");
    await waiting;
    await route.fulfill({ json: { message: "Enquiry delivered." } });
  });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact", exact: true }).click();
  await fillEnquiry(page);
  await page.locator("#profession").selectOption("Distributor");
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.getByRole("button", { name: /Sending enquiry/ })).toBeDisabled();
  release();
  await expect(page.locator("form [role=status]")).toContainText("SkinSeal team");
});

test("a stalled enquiry times out without losing values and can be retried", async ({ page }) => {
  let attempts = 0;
  await page.route("**/api/enquiries", route => {
    attempts++;
    // Leave the first request pending to exercise the real AbortController.
    if (attempts > 1) return route.fulfill({ json: { message: "Enquiry delivered." } });
  });
  await page.goto("/contact?product=skinseal-plus");
  await fillEnquiry(page);
  await page.clock.install();
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.getByRole("button", { name: /Sending enquiry/ })).toBeDisabled();
  await page.clock.fastForward(20001);
  await expect(page.locator("form [role=alert]")).toContainText("took too long");
  await expect(page.locator("#product")).toHaveValue("skinseal-plus");
  await expect(page.locator("#name")).toHaveValue("Asha Rao");
  await page.getByRole("button", { name: "Send Enquiry" }).click();
  await expect(page.locator("form [role=status]")).toBeVisible();
  expect(attempts).toBe(2);
});

test("closing mobile navigation preserves previously inert page content", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await page.locator("main").evaluate((element: HTMLElement) => { element.inert = true; });
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.locator("footer")).not.toHaveAttribute("inert");
});

test("first-time mobile visitor can explore, watch the featured video and contact the team", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await expect(page.locator(".simple-hero-description")).toContainText("topical skin adhesives");
  await page.locator("main").getByRole("link", { name: "Explore Products", exact: true }).click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: /Watch SkinSeal product overview/ }).click();
  const video = page.getByRole("dialog").locator("video");
  await expect(video).toHaveAttribute("controls", "");
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
  const dialog = (await page.getByRole("dialog").boundingBox())!;
  expect(dialog.width).toBeLessThanOrEqual(320);
  await page.getByRole("button", { name: "Close video" }).click();
  await page.locator(".cta-section").getByRole("link", { name: "Enquire Now" }).click();
  await expect(page.locator("#product")).toHaveValue("general");
});
