import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const results = [];
for (const path of [
  "/",
  "/about",
  "/products",
  "/applications",
  "/why-skinseal",
  "/clinical-experiences",
  "/resources",
  "/contact",
  "/products/skinseal",
  "/products/skinseal-plus",
  "/products/skinseal-adv",
  "/products/skinseal-adv-plus",
  "/products/skinseal-dental",
  "/products/skinseal-veterinary",
]) {
  await page.goto(`http://localhost:3000${path}`);
  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  for (const violation of report.violations)
    for (const node of violation.nodes)
      results.push({
        path,
        id: violation.id,
        target: node.target,
        data: node.any.map((a) => a.data),
        summary: node.failureSummary,
      });
}
await writeFile(
  ".recovery/redesign/accessibility-details.json",
  JSON.stringify(results, null, 2),
);
const unique = new Map();
for (const item of results) {
  const key = JSON.stringify(item.data);
  if (!unique.has(key)) unique.set(key, item);
}
console.log(
  JSON.stringify(
    { count: results.length, unique: [...unique.values()] },
    null,
    2,
  ),
);
await browser.close();
