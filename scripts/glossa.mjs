import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Sync src/i18n/locales/*.json with the "portfolio" project in Glossa.
 *
 *   node scripts/glossa.mjs pull [--soft]   Glossa → local JSON files
 *   node scripts/glossa.mjs push            local JSON files → Glossa
 *
 * `pull` reads the public delivery URLs first and falls back to the MCP
 * endpoint when GLOSSA_TOKEN is available. With `--soft` (used by `pnpm
 * build`) any failure keeps the committed files instead of failing the build.
 * `push` needs GLOSSA_TOKEN with catalog:write and only writes changed values.
 */

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const LOCALES_DIR = join(ROOT, "src", "i18n", "locales");
const GLOSSA_URL = "https://glossa.andersseen.dev";
const PROJECT = "portfolio";
const SOURCE_LANG = "en";

// Local file name → Glossa locale. The site keeps `ua` in its URLs while
// Glossa uses the ISO 639-1 code `uk`.
const LOCALES = { en: "en", es: "es", ua: "uk" };

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

async function pull() {
  const token = loadToken();
  /** @type {Record<string, Record<string, unknown>>} */
  const catalogs = {};

  for (const [file, locale] of Object.entries(LOCALES)) {
    catalogs[file] = await fetchCatalog(locale, token);
  }

  const sourceKeys = flatten(catalogs[SOURCE_LANG]).map(([key]) => key).sort();
  if (sourceKeys.length === 0) throw new Error("source catalog is empty");

  for (const [file, catalog] of Object.entries(catalogs)) {
    const entries = flatten(catalog);
    const keys = entries.map(([key]) => key).sort();
    if (keys.join("\n") !== sourceKeys.join("\n")) {
      throw new Error(`${file} does not have the same keys as ${SOURCE_LANG}`);
    }
    const nonString = entries.find(([, value]) => typeof value !== "string");
    if (nonString) throw new Error(`${file}: ${nonString[0]} is not a string`);
  }

  for (const [file, catalog] of Object.entries(catalogs)) {
    writeFileSync(
      join(LOCALES_DIR, `${file}.json`),
      `${JSON.stringify(catalog, null, 2)}\n`,
    );
  }
  console.log(`✅ Pulled ${sourceKeys.length} keys × ${Object.keys(LOCALES).length} locales from Glossa.`);
}

async function push() {
  const token = loadToken();
  if (!token) throw new Error("GLOSSA_TOKEN is required to push");

  for (const [file, locale] of Object.entries(LOCALES)) {
    const local = JSON.parse(readFileSync(join(LOCALES_DIR, `${file}.json`), "utf-8"));

    /** @type {Map<string, unknown>} */
    let remote = new Map();
    /** @type {string | undefined} */
    let revision;
    try {
      const catalog = await callTool(token, "get_catalog", { locale });
      remote = new Map(flatten(catalog.content));
      revision = catalog.revision;
    } catch (error) {
      if (error.code !== "CATALOG_NOT_FOUND") throw error;
    }

    let written = 0;
    for (const [key, value] of flatten(local)) {
      if (typeof value !== "string") {
        throw new Error(`${file}: ${key} is not a string`);
      }
      if (remote.get(key) === value) continue;

      const result = await callTool(token, "set_translation", {
        locale,
        key,
        value,
        ...(revision ? { expectedRevision: revision } : {}),
      });
      revision = result.revision;
      written++;
    }

    const localKeys = new Set(flatten(local).map(([key]) => key));
    const remoteOnly = [...remote.keys()].filter((key) => !localKeys.has(key));

    console.log(`✅ ${file} → ${locale}: ${written} value(s) written.`);
    remoteOnly.forEach((key) => console.warn(`   ⚠️  only in Glossa: ${key}`));
  }
}

async function main() {
  const [command, ...flags] = process.argv.slice(2);
  const soft = flags.includes("--soft");

  try {
    if (command === "pull") await pull();
    else if (command === "push") await push();
    else {
      console.error("Usage: node scripts/glossa.mjs <pull [--soft] | push>");
      process.exit(1);
    }
  } catch (error) {
    if (command === "pull" && soft) {
      console.warn(`⚠️  Glossa pull skipped, keeping committed locale files: ${error.message}`);
      return;
    }
    console.error(`❌ Glossa ${command} failed: ${error.message}`);
    process.exit(1);
  }
}

main();
