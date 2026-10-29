import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Key-parity check for the translations stored in Glossa (project
 * "portfolio"), the single source of the site's copy — there are no locale
 * files in the repo; pages load catalogs at build time via src/i18n/glossa.ts.
 *
 *   node scripts/glossa.mjs check
 *
 * Every locale must define exactly the source locale's keys, all as strings.
 * Reads the public delivery URLs first and falls back to the MCP endpoint with
 * GLOSSA_TOKEN (from the environment or .env).
 */

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const GLOSSA_URL = "https://glossa.andersseen.dev";
const PROJECT = "portfolio";
const SOURCE_LOCALE = "en";
const LOCALES = ["en", "es", "uk"];

function loadToken() {
  if (process.env.GLOSSA_TOKEN) return process.env.GLOSSA_TOKEN;

  const envPath = join(ROOT, ".env");
  if (!existsSync(envPath)) return undefined;

  const match = readFileSync(envPath, "utf-8").match(/^GLOSSA_TOKEN=(.*)$/m);
  return match?.[1].trim().replace(/^["']|["']$/g, "") || undefined;
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string} prefix
 * @returns {[string, unknown][]}
 */
function flatten(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object" && !Array.isArray(value)
      ? flatten(value, fullKey)
      : [[fullKey, value]];
  });
}

/**
 * @param {string} token
 * @param {string} name
 * @param {Record<string, unknown>} args
 */
async function callTool(token, name, args = {}) {
  const res = await fetch(`${GLOSSA_URL}/mcp`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  if (!res.ok) throw new Error(`MCP ${name} → HTTP ${res.status}`);

  const { result, error } = await res.json();
  if (error) throw new Error(`MCP ${name} → ${error.message}`);

  const payload = JSON.parse(result.content[0].text);
  if (result.isError) {
    const err = new Error(`MCP ${name} → ${payload.code}: ${payload.message}`);
    err.code = payload.code;
    throw err;
  }
  return payload;
}

/**
 * @param {string} locale Glossa locale
 * @param {string | undefined} token
 * @returns {Promise<Record<string, unknown>>}
 */
async function fetchCatalog(locale, token) {
  const res = await fetch(`${GLOSSA_URL}/i18n/${PROJECT}/${locale}.json`);
  if (res.ok) return res.json();

  if (!token) {
    throw new Error(
      `public delivery returned HTTP ${res.status} for ${locale} and GLOSSA_TOKEN is not set`,
    );
  }
  const { content } = await callTool(token, "get_catalog", { locale });
  return content;
}

async function check() {
  const token = loadToken();
  /** @type {Record<string, [string, unknown][]>} */
  const entries = {};
  for (const locale of LOCALES) {
    entries[locale] = flatten(await fetchCatalog(locale, token));
  }

  const sourceKeys = new Set(entries[SOURCE_LOCALE].map(([key]) => key));
  if (sourceKeys.size === 0) throw new Error("source catalog is empty");

  let hasErrors = false;
  for (const locale of LOCALES) {
    const keys = new Set(entries[locale].map(([key]) => key));
    const missing = [...sourceKeys].filter((key) => !keys.has(key));
    const extra = [...keys].filter((key) => !sourceKeys.has(key));
    const nonString = entries[locale].filter(([, value]) => typeof value !== "string");

    if (missing.length || extra.length || nonString.length) hasErrors = true;
    missing.forEach((key) => console.error(`❌ ${locale}: missing ${key}`));
    extra.forEach((key) => console.error(`⚠️  ${locale}: not in ${SOURCE_LOCALE}: ${key}`));
    nonString.forEach(([key]) => console.error(`❌ ${locale}: ${key} is not a string`));
  }

  if (hasErrors) process.exit(1);
  console.log(`✅ Glossa catalogs match: ${sourceKeys.size} keys × ${LOCALES.length} locales.`);
}

async function main() {
  const [command] = process.argv.slice(2);
  if (command !== "check") {
    console.error("Usage: node scripts/glossa.mjs check");
    process.exit(1);
  }

  try {
    await check();
  } catch (error) {
    console.error(`❌ Glossa check failed: ${error.message}`);
    process.exit(1);
  }
}

main();
