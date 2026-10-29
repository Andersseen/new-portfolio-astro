import { chromium } from "@playwright/test";
const base = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(base + "/"); await p.waitForLoadState("networkidle"); await p.waitForTimeout(1500);
const snap = async (label) => console.log(label.padEnd(26), JSON.stringify(await p.evaluate(async () => {
  const db = await new Promise((res) => { const r = indexedDB.open("portfolio-db"); r.onsuccess = () => res(r.result); r.onerror = () => res(null); });
  let state = null; try { const names = [...db.objectStoreNames]; const tx = db.transaction(names[0]); state = await new Promise((res) => { const g = tx.objectStore(names[0]).get("theme-state"); g.onsuccess = () => res(g.result); }); } catch {}
  return { theme: document.documentElement.dataset.theme, bg: document.documentElement.style.getPropertyValue("--color-background") || "(css)", idbMode: state?.mode, idbBg: state?.colors?.background, vt: document.documentElement.dataset.themeTransition ?? null };
})));
for (let i = 1; i <= 5; i++) { await p.click("#theme-toggle"); await p.waitForTimeout(350); await snap(`fast toggle ${i}`); }
await p.waitForTimeout(3000); await snap("settled (expect dark)");
await p.reload(); await p.waitForLoadState("networkidle"); await p.waitForTimeout(2500); await snap("after reload");
for (let i = 1; i <= 3; i++) { await p.click("#theme-randomize"); await p.waitForTimeout(400); await snap(`fast randomize ${i}`); }
await p.waitForTimeout(3000); await snap("settled");
await p.reload(); await p.waitForLoadState("networkidle"); await p.waitForTimeout(2500); await snap("after reload");
await b.close();
