import { test, expect } from "@playwright/test";

test("company films play on demand and restore keyboard focus", async ({
  page,
}) => {
  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/videos/")) videoRequests.push(request.url());
  });
  await page.goto("/clinical-experiences");
  await expect(page.locator(".video-card")).toHaveCount(2);
  expect(videoRequests).toEqual([]);
  const opener = page.getByRole("button", {
    name: /Watch SkinSeal product overview/,
  });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByText(/For product information/),
  ).toBeVisible();
  const video = dialog.locator("video");
  await video.evaluate((el: HTMLVideoElement) => el.play());
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime))
    .toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("video")).toHaveCount(0);
  await expect(opener).toBeFocused();
  await page.getByRole("button", { name: /Watch SkinSeal veterinary product video/ }).click();
  const vet = dialog.locator("video");
  await vet.evaluate((el: HTMLVideoElement) => el.play());
  await expect.poll(() => vet.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  await expect.poll(() => vet.evaluate((el: HTMLVideoElement) => el.duration)).toBeGreaterThan(140);
  await dialog.getByRole("button", { name: "Close video" }).click();
  await expect(dialog).not.toBeVisible();
});

test("product video association and all seven PDF downloads use real public files", async ({
  page,
  request,
}) => {
  await page.goto("/products/skinseal-veterinary");
  await expect(page.locator(".video-card")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: /Watch SkinSeal veterinary/ }),
  ).toBeVisible();
  await page.goto("/resources");
  await expect(page.locator(".resource-row")).toHaveCount(7);
  const urls = await page
    .locator(".resource-row a[download]")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
  expect(new Set(urls).size).toBe(7);
  for (const url of urls) {
    const result = await request.get(url);
    expect(result.status()).toBe(200);
    expect(result.headers()["content-type"]).toContain("application/pdf");
    expect((await result.body()).subarray(0, 4).toString()).toBe("%PDF");
  }
});
