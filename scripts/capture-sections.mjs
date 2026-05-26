// Capture all sections of the homepage at desktop + mobile sizes for review.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "screenshots", "sections");
const URL_BASE = process.env.URL_BASE || "http://localhost:3000";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

// Section anchors in scroll order
const sections = [
  { id: "top", label: "01-hero" },
  { id: null, label: "02-marquee", scrollY: 700 },
  { id: "services", label: "03-services" },
  { id: "process", label: "04-process" },
  { id: "case-studies", label: "05-work" },
  { id: "industries", label: "06-industries" },
  { id: "about", label: "07-founder" },
  { id: "testimonials", label: "08-testimonials" },
  { id: "contact", label: "09-contact" },
];

async function captureViewport(ctx, viewport, suffix) {
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.error(`[${suffix}] PAGE ERR:`, e.message));

  await page.goto(URL_BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  for (const s of sections) {
    if (s.id === null) {
      await page.evaluate((y) => window.scrollTo(0, y), s.scrollY ?? 0);
    } else if (s.id === "top") {
      await page.evaluate(() => window.scrollTo(0, 0));
    } else {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) {
          // Account for fixed 80px navbar
          const y = el.getBoundingClientRect().top + window.scrollY - 16;
          window.scrollTo(0, y);
        }
      }, s.id);
    }
    // Wait for Lenis lerp + GSAP triggers to settle
    await page.waitForTimeout(1500);
    await page.mouse.move(2, 2);
    await page.waitForTimeout(150);
    const path = join(OUT, `${s.label}-${suffix}.png`);
    await page.screenshot({ path, fullPage: false });
    console.log(`✓ ${path}`);
  }

  await page.close();
}

// Desktop
const dCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
console.log("Capturing desktop 1440×900");
await captureViewport(dCtx, { w: 1440, h: 900 }, "desktop");
await dCtx.close();

// Mobile
const mCtx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
console.log("Capturing mobile 390×844");
await captureViewport(mCtx, { w: 390, h: 844 }, "mobile");
await mCtx.close();

await browser.close();
console.log("done");
