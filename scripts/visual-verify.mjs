// Visual verification of the Services horizontal card stack.
// Boots a Chromium, walks through scroll snap points, captures shots.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "screenshots");
const URL_BASE = process.env.URL_BASE || "http://localhost:3000";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

// ── Desktop 1440 × 900 ────────────────────────────────────────────────────
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();
page.on("pageerror", (e) => console.error("PAGE ERROR:", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.error("CONSOLE ERR:", m.text());
});

console.log("→ navigating");
await page.goto(URL_BASE, { waitUntil: "networkidle" });
await page.waitForSelector("#services");
await page.waitForTimeout(800); // allow GSAP + Lenis to attach

const servicesTop = await page.evaluate(() => {
  const el = document.querySelector("#services");
  return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0;
});
console.log("→ #services top:", servicesTop);

const probe = await page.evaluate(() => {
  // @ts-ignore
  const dbg = window.__servicesDebug;
  if (!dbg) return { hasDebug: false };
  return {
    hasDebug: true,
    tlDuration: dbg.tl?.duration?.(),
    tlProgress: dbg.tl?.progress?.(),
    tweenCount: dbg.tl?.getChildren?.()?.length,
    hasScrollTrigger: !!dbg.tl?.scrollTrigger,
    cardCount: dbg.cards?.length,
  };
});
console.log("→ Services debug:", JSON.stringify(probe, null, 2));

// Direct timeline-progress probe: bypass scroll, drive tl.progress directly.
// If this works, the timeline is fine and the bug is in scroll-driven progress.
// If cards still don't move, the timeline itself is broken.
const directTest = await page.evaluate(() => {
  // @ts-ignore
  const dbg = window.__servicesDebug;
  if (!dbg?.tl) return null;
  const out = {};
  for (const p of [0, 0.25, 0.5, 0.75, 1]) {
    dbg.tl.progress(p);
    out[p] = dbg.cards.map((c) => {
      const t = getComputedStyle(c).transform;
      const m = t.match(/matrix\(.*?,\s*([\-\d.]+),\s*([\-\d.]+)\)$/);
      return m ? { tx: Math.round(parseFloat(m[1])) } : { t };
    });
  }
  dbg.tl.progress(0); // reset
  return out;
});
console.log("→ Direct timeline test:");
for (const [p, rows] of Object.entries(directTest || {})) {
  console.log(`   progress=${p}: ${rows.map((r, i) => `c${i}.tx=${r.tx ?? r.t}`).join(", ")}`);
}

// Drive scroll via real wheel events — Lenis interprets them, ScrollTrigger
// follows, snap engages naturally. Each delta is a chunk of pixels.
async function wheel(totalDelta) {
  const STEP = 250;
  const dir = Math.sign(totalDelta);
  let remaining = Math.abs(totalDelta);
  // Park cursor over the section.
  await page.mouse.move(720, 450);
  while (remaining > 0) {
    const d = Math.min(remaining, STEP);
    await page.mouse.wheel(0, d * dir);
    await page.waitForTimeout(60);
    remaining -= d;
  }
}

async function settleAndShoot(label) {
  // Let Lenis lerp + snap finish (lerp 0.08 → ~600ms; snap max 0.45s)
  await page.waitForTimeout(1800);
  // Park cursor at the top-left corner so it doesn't appear in shots
  await page.mouse.move(2, 2);
  await page.waitForTimeout(150);
  const path = join(OUT, `services-${label}.png`);
  await page.screenshot({ path, fullPage: false });
  const info = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(".service-card"));
    return {
      count: cards.length,
      scrollY: Math.round(window.scrollY),
      rows: cards.map((c, i) => {
        const r = c.getBoundingClientRect();
        return {
          idx: i,
          x: Math.round(r.x),
          w: Math.round(r.width),
          transform: getComputedStyle(c).transform.substring(0, 70),
        };
      }),
    };
  });
  console.log(`✓ ${label}: ${info.count} cards, scrollY=${info.scrollY}`);
  for (const row of info.rows) {
    console.log(`   card ${row.idx}: x=${row.x} w=${row.w} ${row.transform}`);
  }
}

// Jump near-immediately to just above the pin start, then wheel through.
await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, servicesTop - 50));
await page.waitForTimeout(800);

const span = 0.9 * 900 * 4;            // total pin distance
const step = span / 4;                  // one card per step

await wheel(60);                        // engage pin
await settleAndShoot("00-card1");
await wheel(step);
await settleAndShoot("01-card2");
await wheel(step);
await settleAndShoot("02-card3");
await wheel(step);
await settleAndShoot("03-card4");
await wheel(step);
await settleAndShoot("04-card5");

// Pre-pin shot: scroll up to show heading approaching
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await wheel(servicesTop - 200);
await page.waitForTimeout(800);
await page.screenshot({ path: join(OUT, "services-pre-pin.png"), fullPage: false });
console.log("✓ shot: services-pre-pin.png");

// Modal test — click the 01 spine when all cards stacked, capture modal
await page.evaluate(() => {
  const spines = document.querySelectorAll("#services button[aria-label^='Open']");
  if (spines[0]) spines[0].click();
});
await page.waitForTimeout(700);
await page.mouse.move(2, 2);
await page.screenshot({ path: join(OUT, "services-modal.png"), fullPage: false });
console.log("✓ shot: services-modal.png");

await ctx.close();

// ── Reduced motion: cards should render in their final stacked state ──────
const rctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const rpage = await rctx.newPage();
await rpage.goto(URL_BASE, { waitUntil: "networkidle" });
await rpage.waitForSelector("#services");
await rpage.waitForTimeout(800);
await rpage.evaluate(() => {
  const el = document.querySelector("#services");
  if (el) el.scrollIntoView({ block: "start" });
});
await rpage.waitForTimeout(800);
await rpage.mouse.move(2, 2);
await rpage.screenshot({ path: join(OUT, "services-reduced-motion.png"), fullPage: false });
console.log("✓ shot: services-reduced-motion.png");
await rctx.close();

// ── Mobile 390 × 844 (iPhone-ish) ─────────────────────────────────────────
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const mpage = await mctx.newPage();
await mpage.goto(URL_BASE, { waitUntil: "networkidle" });
await mpage.waitForSelector("#services-mobile");
await mpage.evaluate(() => {
  document.querySelector("#services-mobile")?.scrollIntoView({ block: "start" });
});
await mpage.waitForTimeout(800);
await mpage.screenshot({ path: join(OUT, "services-mobile.png"), fullPage: false });
console.log("✓ shot: services-mobile.png");

await mctx.close();
await browser.close();
console.log("done");
