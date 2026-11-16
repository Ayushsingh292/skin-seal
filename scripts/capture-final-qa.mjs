import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const directory = ".recovery/final-qa";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const origin = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const routes = ["/", "/products", "/products/skinseal", "/products/skinseal-plus", "/products/skinseal-dental", "/products/skinseal-veterinary", "/applications", "/about", "/resources", "/videos", "/contact"];
const measurements = [];
for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    await page.goto(`${origin}${route}`);
    await page.evaluate(() => document.fonts.ready);
    for (const disclosure of await page.locator("details").filter({ has: page.locator("img") }).all())
      await disclosure.locator("summary").click();
    for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].filter(image => image.checkVisibility()).every(image => image.complete && image.naturalWidth > 0));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    await page.screenshot({ path: `${directory}/${slug}-${width}.png`, fullPage: true, animations: "disabled" });
    measurements.push(await page.evaluate(() => ({
      route: location.pathname,
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      brokenImages: [...document.images].filter(image => image.checkVisibility() && (!image.complete || !image.naturalWidth)).map(image => image.currentSrc),
    })));
  }
}
for (const [width, height] of [[320,480], [375,667], [768,430]]) {
  await page.setViewportSize({ width, height });
  await page.goto(origin);
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  await page.getByRole("button", { name: "Expand products" }).click();
  await page.screenshot({ path: `${directory}/menu-${width}x${height}.png` });
  measurements.push(await page.evaluate(() => ({
    viewport: [innerWidth, innerHeight],
    headerBottom: document.querySelector(".nav-wrap").getBoundingClientRect().bottom,
    menuTop: document.querySelector(".mobile-panel").getBoundingClientRect().top,
  })));
  await page.keyboard.press("Escape");
}
await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2));
console.log(`Saved ${routes.length * 5 + 3} screenshots and geometry to ${directory}`);
await browser.close();
