import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const origin = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3002";
const report = [];
for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ["/", "/resources", "/clinical-experiences", "/products/skinseal", "/products/skinseal-veterinary"]) {
    await page.goto(origin + route);
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
    if (!fits) throw new Error(`Overflow: ${route} at ${width}`);
  }
}
for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ["/resources", "/clinical-experiences"]) {
    await page.goto(origin + route);
    await page.screenshot({ path: `.recovery/media-integration/${route.slice(1)}-${width}.png`, fullPage: true });
    const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    report.push({ route, width, violations: scan.violations });
  }
  await page.getByRole("button", { name: /Watch SkinSeal product overview/ }).click();
  await page.screenshot({ path: `.recovery/media-integration/player-${width}.png` });
  await page.keyboard.press("Escape");
}
await writeFile(".recovery/media-integration/layout-a11y.json", JSON.stringify(report, null, 2));
await browser.close();
if (report.some(item => item.violations.length)) throw new Error("Accessibility violations; see report");
console.log("45 route/viewport checks and 4 accessibility scans passed; six screenshots saved.");
