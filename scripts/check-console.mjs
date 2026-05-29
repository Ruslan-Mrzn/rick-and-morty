import { chromium } from 'playwright';

const url = process.env.CHECK_URL || 'http://localhost:4173/';
const browser = await chromium.launch();
const page = await browser.newPage();

const logs = [];
page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (err) => logs.push(`[pageerror] ${err.message}`));
page.on('requestfailed', (req) =>
  logs.push(`[requestfailed] ${req.url()} — ${req.failure()?.errorText}`)
);

await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

console.log('=== console / errors ===');
console.log(logs.length ? logs.join('\n') : '(empty)');

await browser.close();
