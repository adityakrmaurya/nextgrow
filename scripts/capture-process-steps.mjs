// Walk the Process pinned section, capture each of the 5 steps.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "screenshots", "process");
const URL = process.env.URL_BASE || "http://localhost:3000";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector("#process");
await page.waitForTimeout(1000);

const processTop = await page.evaluate(() =>
  Math.round(document.querySelector("#process").getBoundingClientRect().top + window.scrollY)
);
console.log("→ #process top:", processTop);

async function wheel(total) {
  await page.mouse.move(720, 450);
  const STEP = 200;
  let remaining = total;
  while (remaining > 0) {
    const d = Math.min(remaining, STEP);
    await page.mouse.wheel(0, d);
    await page.waitForTimeout(50);
    remaining -= d;
  }
}

// Pin distance is 5 viewports (~4500px). Each step = 1 viewport (900px).
await page.evaluate((y) => window.scrollTo(0, y), processTop - 100);
await page.waitForTimeout(800);

const STEP_VH = 900;
for (let i = 0; i < 5; i++) {
  await wheel(STEP_VH);
  await page.waitForTimeout(1400);
  await page.mouse.move(2, 2);
  const path = join(OUT, `step-${i + 1}.png`);
  await page.screenshot({ path });
  const active = await page.evaluate(() => {
    const h = document.querySelector("#process h2");
    return h?.textContent ?? "?";
  });
  console.log(`✓ step ${i + 1}: ${active}`);
}

await browser.close();
console.log("done");
