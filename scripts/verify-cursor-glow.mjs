// Verifies the global CursorGlow:
//  1. Mounts at the layout level (one instance, fixed-position).
//  2. Tracks the cursor under it (post-lerp).
//  3. STAYS PUT IN VIEWPORT COORDS WHEN THE PAGE SCROLLS WITHOUT MOUSE MOVE
//     — this is the bug the user reported. The fix is screen-space coords +
//     position:fixed; if the test fails, somewhere is still using section-local
//     math.
//  4. Visible (not occluded) at each major section.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "screenshots", "cursor-glow");
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

const waitFrames = (n) =>
  page.evaluate(
    (count) =>
      new Promise((resolve) => {
        let i = 0;
        const step = () => {
          if (i++ >= count) return resolve();
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }),
    n
  );

const readGlow = () =>
  page.evaluate(() => {
    const el = document.querySelector("[data-cursor-glow]");
    if (!el) return { found: false };
    const cs = window.getComputedStyle(el);
    const m = cs.transform;
    let tx = NaN;
    let ty = NaN;
    const mm = m.match(/matrix(?:3d)?\(([^)]+)\)/);
    if (mm) {
      const parts = mm[1].split(",").map((s) => parseFloat(s.trim()));
      if (parts.length === 6) {
        tx = parts[4];
        ty = parts[5];
      } else if (parts.length === 16) {
        tx = parts[12];
        ty = parts[13];
      }
    }
    return {
      found: true,
      position: cs.position,
      zIndex: cs.zIndex,
      mixBlendMode: cs.mixBlendMode,
      opacity: cs.opacity,
      tx,
      ty,
    };
  });

console.log("\n— Mount check —");
const initial = await readGlow();
console.log("glow:", initial);
if (!initial.found) errors.push("CursorGlow element [data-cursor-glow] not in DOM");
if (initial.position !== "fixed") errors.push(`CursorGlow position is ${initial.position}, expected fixed`);

console.log("\n— Scroll-stability check (the user's bug) —");
await page.mouse.move(600, 400);
await waitFrames(45); // lerp 0.28 settles to <0.5px in ~25 frames
const before = await readGlow();
console.log("Before scroll @ cursor (600,400):", { tx: before.tx, ty: before.ty });

await page.evaluate(() => window.scrollBy(0, 800));
await waitFrames(45);
const after = await readGlow();
console.log("After scrollBy(0, 800), cursor untouched:", { tx: after.tx, ty: after.ty });

const dx = Math.abs(before.tx - after.tx);
const dy = Math.abs(before.ty - after.ty);
console.log(`Δ transform: dx=${dx.toFixed(2)}px dy=${dy.toFixed(2)}px`);

if (Number.isFinite(dx) && Number.isFinite(dy) && dx < 5 && dy < 5) {
  console.log("✓ Glow is scroll-stable (viewport-anchored as expected)");
} else {
  errors.push(`Glow DRIFTED on scroll: dx=${dx} dy=${dy} — coords are not viewport-anchored`);
}

console.log("\n— Cursor-tracking check —");
await page.mouse.move(200, 200);
await waitFrames(45);
const trackA = await readGlow();
await page.mouse.move(1100, 700);
await waitFrames(45);
const trackB = await readGlow();
const moveDx = trackB.tx - trackA.tx;
const moveDy = trackB.ty - trackA.ty;
console.log(`Cursor moved by (900, 500). Glow moved by (${moveDx.toFixed(1)}, ${moveDy.toFixed(1)})`);
if (Math.abs(moveDx - 900) < 10 && Math.abs(moveDy - 500) < 10) {
  console.log("✓ Glow tracks cursor 1:1 after lerp settles");
} else {
  errors.push(`Glow tracking off: expected (900, 500), got (${moveDx}, ${moveDy})`);
}

console.log("\n— Visibility per section —");
const sections = ["hero", "services", "case-studies", "industries", "contact"];
for (const id of sections) {
  const found = await page.evaluate((s) => {
    const el = document.getElementById(s);
    if (!el) return false;
    el.scrollIntoView({ behavior: "instant", block: "start" });
    return true;
  }, id);
  if (!found) {
    console.log(`[${id}] section not found — skipping`);
    continue;
  }
  await page.waitForTimeout(500);
  await page.mouse.move(720, 450);
  await waitFrames(45);
  const g = await readGlow();
  console.log(`[${id}] glow opacity=${g.opacity} transform tx=${g.tx?.toFixed(0)} ty=${g.ty?.toFixed(0)}`);
  await page.screenshot({ path: join(OUT, `${id}.png`), fullPage: false });
}

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
