import { chromium } from "@playwright/test";
const base = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
p.on("response", async (r) => { if (r.url().includes("/api/") && r.url().includes("theme")) {
  let mode = ""; try { const j = await r.json(); mode = j?.meta?.mode + " bg=" + j?.theme?.bg; } catch {}
  console.log("   ↳", r.request().method(), r.status(), r.url().replace(base, ""), mode); } });
p.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") console.log("   console:", m.text().slice(0, 140)); });
await p.goto(base + "/"); await p.waitForLoadState("networkidle"); await p.waitForTimeout(1500);
const snap = async (label) => console.log(label.padEnd(18), await p.evaluate(() => ({
  theme: document.documentElement.dataset.theme,
  inlineBg: document.documentElement.style.getPropertyValue("--color-background") || "(css)",
  bodyBg: getComputedStyle(document.body).backgroundColor })));
await snap("load");
for (let i = 1; i <= 4; i++) { await p.click("#theme-toggle"); await p.waitForTimeout(1800); await snap(`toggle ${i}`); }
await p.click("#theme-toggle"); await p.waitForTimeout(1800); await snap("toggle → dark");
for (let i = 1; i <= 3; i++) { await p.click("#theme-randomize"); await p.waitForTimeout(2200); await snap(`randomize ${i}`); }
await b.close();
