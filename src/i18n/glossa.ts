/**
 * Server-only loader for the translation catalogs stored in Glossa
 * (https://glossa.andersseen.dev, project `portfolio`). Import it only from
 * `.astro` frontmatter or endpoints: it reads GLOSSA_TOKEN, which must never
 * reach a client bundle.
 *
 * Source order: public delivery URL (no auth) → MCP `get_catalog` with
 * GLOSSA_TOKEN. Catalogs are cached in memory — for the whole build in
 * production, and only briefly in dev so edits in Glossa show on reload.
 */
import { LANGUAGES, type Language } from "./config";
import { registerMessages, type Messages } from "./utils";

const GLOSSA_URL = "https://glossa.andersseen.dev";
const PROJECT = "portfolio";
const DEV_CACHE_MS = 5_000;
const ATTEMPTS = 3;

/** The site keeps `ua` in its URLs; Glossa uses the ISO 639-1 code `uk`. */
const GLOSSA_LOCALES: Record<Language, string> = {
  [LANGUAGES.EN]: "en",
  [LANGUAGES.ES]: "es",
  [LANGUAGES.UA]: "uk",
};

const cache = new Map<Language, { at: number; pending: Promise<Messages> }>();

async function fetchFromDelivery(locale: string): Promise<Messages | null> {
  const res = await fetch(`${GLOSSA_URL}/i18n/${PROJECT}/${locale}.json`);
  return res.ok ? ((await res.json()) as Messages) : null;
}

async function fetchFromMcp(locale: string, token: string): Promise<Messages> {
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
      params: { name: "get_catalog", arguments: { locale } },
    }),
  });
  if (!res.ok) throw new Error(`Glossa MCP returned HTTP ${res.status}`);

  const { result, error } = await res.json();
  if (error) throw new Error(`Glossa MCP: ${error.message}`);

  const payload = JSON.parse(result.content[0].text);
  if (result.isError) throw new Error(`Glossa MCP: ${payload.code}: ${payload.message}`);
  return payload.content as Messages;
}

async function fetchCatalog(language: Language): Promise<Messages> {
  const locale = GLOSSA_LOCALES[language];
  const token = import.meta.env.GLOSSA_TOKEN;
  let lastError: unknown;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const delivered = await fetchFromDelivery(locale);
      if (delivered) return delivered;
      if (!token) {
        throw new Error(
          "Glossa public delivery is disabled and GLOSSA_TOKEN is not set",
        );
      }
      return await fetchFromMcp(locale, token);
    } catch (error) {
      lastError = error;
      if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }

  const reason = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Could not load "${locale}" translations from Glossa: ${reason}`);
}

/**
 * Loads (and registers for `t()`) the catalog of one locale. Call it in page
 * frontmatter before any `t()` call for that locale.
 */
export async function loadMessages(language: Language): Promise<Messages> {
  const cached = cache.get(language);
  const fresh =
    cached && (!import.meta.env.DEV || Date.now() - cached.at < DEV_CACHE_MS);

  if (!fresh) {
    const pending = fetchCatalog(language);
    pending.catch(() => cache.delete(language));
    cache.set(language, { at: Date.now(), pending });
  }

  const messages = await cache.get(language)!.pending;
  registerMessages(language, messages);
  return messages;
}
