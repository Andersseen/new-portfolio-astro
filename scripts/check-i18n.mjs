import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const LOCALES_DIR = join(__dirname, "..", "src", "i18n", "locales");
const SOURCE_LANG = "en";
const LANGUAGES = ["en", "es", "ua"];

/**
 * @param {Record<string, unknown>} obj
 * @param {string} prefix
 * @returns {string[]}
 */
function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

function loadLocale(lang) {
  const path = join(LOCALES_DIR, `${lang}.json`);
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw);
}

function main() {
  const source = loadLocale(SOURCE_LANG);
  const sourceKeys = flattenKeys(source);

  let hasErrors = false;

  for (const lang of LANGUAGES) {
    if (lang === SOURCE_LANG) continue;

    const target = loadLocale(lang);
    const targetKeys = flattenKeys(target);

    const missing = sourceKeys.filter((key) => !targetKeys.includes(key));
    const extra = targetKeys.filter((key) => !sourceKeys.includes(key));

    if (missing.length > 0) {
      hasErrors = true;
      console.error(`❌ Missing keys in ${lang}.json:`);
      missing.forEach((key) => console.error(`   - ${key}`));
    }

    if (extra.length > 0) {
      hasErrors = true;
      console.error(`⚠️  Extra keys in ${lang}.json (not in ${SOURCE_LANG}.json):`);
      extra.forEach((key) => console.error(`   - ${key}`));
    }
  }

  if (hasErrors) {
    process.exit(1);
  }

  console.log("✅ All i18n locale files have matching keys.");
}

main();
