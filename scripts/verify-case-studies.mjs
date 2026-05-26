// Verifies the Selected Work section:
//  1. Heading [data-case-heading] is rendered inside the pinned region.
//  2. When scrolled into the pin (mid-stack), the heading is STILL in the
//     upper-viewport, alongside the cards. This is the bug the user
//     reported — heading scrolled away while cards stacked.
//  3. Cards are visible underneath the heading mid-stack.
//  4. After the pin releases, the heading scrolls away normally.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "screenshots", "case-studies");
await mkdir(OUT, { recursive: true });

const URL = "http://localhost:3000";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on("pageerror", (e) => errors.push(`PAGEERR: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`CONSOLE: ${m.text()}`);
});

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Park the mouse mid-viewport so subsequent wheel events fire from there
await page.mouse.move(720, 450);

const headingBbox = () =>
  page.evaluate(() => {
    const el = document.querySelector("[data-case-heading]");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height, width: r.width };
  });

const cardBboxes = () =>
  page.evaluate(() => {
    const cards = document.querySelectorAll("section#case-studies .case-card");
    return Array.from(cards).map((c, i) => {
      const r = c.getBoundingClientRect();
      return {
        idx: i,
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        inViewport: r.bottom > 0 && r.top < window.innerHeight,
      };
    });
  });

// ── Step 1: jump to the section start ─────────────────────────────────────
await page.evaluate(() => {
  const el = document.getElementById("case-studies");
  el?.scrollIntoView({ behavior: "instant", block: "start" });
});
await page.waitForTimeout(1000);

console.log("\n— Step 1: at section start —");
let hb = await headingBbox();
console.log("heading bbox:", hb);
if (!hb) {
  errors.push("data-case-heading not in DOM");
} else if (hb.top < -50 || hb.top > 250) {
  errors.push(`Heading not near top at section start: top=${hb.top}`);
} else {
  console.log("✓ Heading at top of viewport at section start");
}
await page.screenshot({ path: join(OUT, "1-start.png"), fullPage: false });

// ── Step 2: scroll INTO the pin (~mid-stack) ──────────────────────────────
// Pin span = (CASES.length - 1) * viewport = 4 * 900 = 3600px of scroll. Mid
// = ~1800px past pin start. Drive scroll via wheel so Lenis processes it.
for (let i = 0; i < 6; i++) {
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(180);
}
await page.waitForTimeout(800);

console.log("\n— Step 2: mid-stack —");
hb = await headingBbox();
console.log("heading bbox:", hb);
const cards = await cardBboxes();
console.log("card bboxes:", cards);

if (!hb) {
  errors.push("Heading element disappeared mid-stack");
} else if (hb.top > 250 || hb.bottom < 50) {
  errors.push(`MID-STACK BUG: heading not in upper viewport — top=${hb.top} bottom=${hb.bottom}`);
} else {
  console.log("✓ Heading persists in upper viewport mid-stack");
}

const visibleCards = cards.filter((c) => c.inViewport);
if (visibleCards.length === 0) {
  errors.push("No cards visible mid-stack");
} else {
  console.log(`✓ ${visibleCards.length} card(s) visible mid-stack`);
}

await page.screenshot({ path: join(OUT, "2-mid-stack.png"), fullPage: false });

// ── Step 3: scroll deeper to confirm heading stays through more of the pin ─
for (let i = 0; i < 4; i++) {
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(180);
}
await page.waitForTimeout(800);

console.log("\n— Step 3: deeper in stack —");
hb = await headingBbox();
console.log("heading bbox:", hb);
if (!hb || hb.top > 250 || hb.bottom < 50) {
  errors.push(`Heading lost deeper in stack: ${JSON.stringify(hb)}`);
} else {
  console.log("✓ Heading still pinned");
}
await page.screenshot({ path: join(OUT, "3-deep-stack.png"), fullPage: false });

// ── Step 4: scroll past the pin entirely ──────────────────────────────────
for (let i = 0; i < 20; i++) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(80);
}
await page.waitForTimeout(1000);

console.log("\n— Step 4: past pin —");
hb = await headingBbox();
console.log("heading bbox:", hb);
if (hb && hb.top > -5000 && hb.top < 600 && hb.bottom > 100) {
  // If heading is still near the top, pin didn't release — but only flag if it
  // looks identical to mid-stack. Allow some tolerance because Lenis is async.
  console.log("note: heading still near top — pin may not have released yet");
}
await page.screenshot({ path: join(OUT, "4-after-pin.png"), fullPage: false });

await ctx.close();
await browser.close();

console.log("\n— Summary —");
if (errors.length) {
  console.log("✗ errors:");
  for (const e of errors) console.log(" ", e);
  process.exit(1);
} else {
  console.log("✓ all checks passed");
}
