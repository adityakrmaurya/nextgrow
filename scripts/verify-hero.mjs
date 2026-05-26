// Quick verification of BackgroundPaths on Hero — checks DOM presence,
// counts motion paths actually mounted, samples opacity values, and
// captures hi-res shots at desktop and mobile.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "screenshots", "hero");
await mkdir(OUT, { recursive: true });

const URL = "http://localhost:3000";
const browser = await chromium.launch({ headless: true });

const errors = [];
async function check(viewport, label, isMobile) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: isMobile ? 2 : 1,
    isMobile,
    hasTouch: isMobile,
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`[${label}] ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${label}] CONSOLE: ${m.text()}`);
  });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const stats = await page.evaluate(() => {
    const svgs = document.querySelectorAll("section#hero svg");
    const paths = document.querySelectorAll("section#hero svg path");
    const samples = Array.from(paths)
      .slice(0, 5)
      .map((p) => ({
        d: p.getAttribute("d")?.slice(0, 40),
        sw: p.getAttribute("stroke-width"),
        op: getComputedStyle(p).opacity,
        stroke: getComputedStyle(p).stroke.slice(0, 40),
      }));
    return { svgs: svgs.length, paths: paths.length, samples };
  });
  console.log(`[${label}] svgs=${stats.svgs} paths=${stats.paths}`);
  for (const s of stats.samples) console.log("  ", s);

  await page.mouse.move(2, 2);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, `${label}.png`), fullPage: false });
  await ctx.close();
}

await check({ width: 1440, height: 900 }, "desktop", false);
await check({ width: 390, height: 844 }, "mobile", true);

await browser.close();

if (errors.length) {
  console.log("\n— errors —");
  for (const e of errors) console.log(e);
} else {
  console.log("\n✓ no page or console errors");
}
