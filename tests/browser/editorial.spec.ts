import { test, expect } from "@playwright/test";
test("formulation changes keep the desktop catalogue at a stable height", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const heights: number[] = [];
  for (const slug of [
    "skinseal",
    "skinseal-plus",
    "skinseal-adv",
    "skinseal-adv-plus",
  ]) {
    await page.locator(`#formula-tab-${slug}`).click();
    heights.push(
      (await page.locator(".formulation-catalogue").boundingBox())!.height,
    );
  }
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(2);
});
test("formulation catalogue switches by keyboard without presenting false variant packaging", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tablist", { name: "Medical formulations" });
  await tabs.getByRole("tab", { name: /SkinSeal Plus/ }).click();
  await expect(
    page.getByRole("tabpanel", { name: /SkinSeal Plus/ }),
  ).toContainText("2-Octyl Cyanoacrylate");
  await expect(
    page.getByRole("tabpanel", { name: /SkinSeal Plus/ }).locator("img"),
  ).toHaveCount(0);
  await page.keyboard.press("ArrowRight");
  await expect(
    tabs.getByRole("tab", { name: /SkinSeal Adv Butyl/ }),
  ).toHaveAttribute("aria-selected", "true");
});
test("closure journey supports keyboard navigation and product-specific guidance", async ({
  page,
}) => {
  await page.goto("/");
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
test("wide desktop navigation is horizontal and product menu describes formulations", async ({
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
  await page.getByRole("button", { name: "Open product navigation" }).click();
  await expect(page.locator(".product-dropdown")).toContainText("2-Octyl");
});
