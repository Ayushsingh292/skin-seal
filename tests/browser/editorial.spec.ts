import { test, expect } from "@playwright/test";
test("all product cards are visible with accurate photography labels", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".simple-product-card")).toHaveCount(6);
  await expect(page.locator(".simple-card-visual img")).toHaveCount(2);
  await expect(page.locator(".simple-formulation")).toHaveCount(4);
  const plus = page.locator(".simple-product-card").filter({ has: page.getByRole("heading", { name: "SkinSeal Plus", exact: true }) });
  await expect(plus).toContainText("2-Octyl Cyanoacrylate");
  await expect(plus.locator("img")).toHaveCount(0);
});

test("closure journey supports keyboard navigation and product-specific guidance", async ({
  page,
}) => {
  await page.goto("/why-skinseal");
  const tabs = page.getByRole("tablist", { name: "Closure journey" });
  await tabs.getByRole("tab", { name: /Prepare/ }).focus();
  await page.keyboard.press("End");
  await expect(tabs.getByRole("tab", { name: /Heal/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel", { name: /Heal/ })).toContainText(
    "Do not pick",
  );
});
test("resource search filters real document entries and provides approved downloads", async ({
  page,
}) => {
  await page.goto("/resources");
  await page
    .getByRole("searchbox", { name: "Search documents" })
    .fill("insert");
  await expect(page.locator(".resource-row")).toHaveCount(1);
  await expect(page.locator(".resource-row a[download]")).toHaveAttribute(
    "href",
    "/documents/skinseal-insert.pdf",
  );
});
test("wide desktop navigation is horizontal with direct product access", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation", exact: true }),
  ).toBeHidden();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Products", exact: true }).click();
  await expect(page.locator(".simple-product-card")).toHaveCount(6);
});
