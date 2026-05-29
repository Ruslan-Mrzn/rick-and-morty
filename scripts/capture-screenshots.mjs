import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'public', 'screenshots');
const url = process.env.SCREENSHOT_URL || 'http://localhost:5173/';

const targets = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 }
];

const browser = await chromium.launch();

for (const { name, width, height } of targets) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, `${name}.png`) });
  console.log(`✓ ${name}.png (${width}x${height})`);
  await context.close();
}

await browser.close();
console.log('\nScreenshots saved to /public/screenshots');
