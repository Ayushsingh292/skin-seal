import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
for (const width of [320,390,768,1024,1440]) {
  await page.setViewportSize({width,height:1000});
  await page.goto(`${process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000'}/`);
  for (const img of await page.locator('img').all()) await img.scrollIntoViewIfNeeded();
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:`.recovery/simple-top-${width}.png`});
  await page.screenshot({path:`.recovery/simple-home-${width}.png`,fullPage:true});
}
for (const route of ['products','contact','applications','videos','about']) {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(`${process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000'}/${route}`);
  for (const img of await page.locator('img').all()) await img.scrollIntoViewIfNeeded();
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:`.recovery/simple-${route}.png`,fullPage:true});
}
await browser.close();
