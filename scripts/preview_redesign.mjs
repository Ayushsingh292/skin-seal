import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));
for (const width of [1440, 768, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://localhost:3000");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `.recovery/redesign/home-${width}-viewport.png`,
    animations: "disabled",
  });
  await page
    .locator("img")
    .evaluateAll((images) =>
      images.forEach((image) => (image.loading = "eager")),
    );
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete),
  );
  await page.screenshot({
    path: `.recovery/redesign/home-${width}-full.png`,
    fullPage: true,
    animations: "disabled",
  });
}
for (const [path, name] of [
  ["/products", "catalogue"],
  ["/products/skinseal-plus", "formulation"],
  ["/resources", "resources"],
  ["/contact", "contact"],
  ["/about", "about"],
]) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`http://localhost:3000${path}`);
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator("img")
    .evaluateAll((images) =>
      images.forEach((image) => (image.loading = "eager")),
    );
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete),
  );
  await page.screenshot({
    path: `.recovery/redesign/${name}-desktop.png`,
    fullPage: true,
    animations: "disabled",
  });
}
await browser.close();
