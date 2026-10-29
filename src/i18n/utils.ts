import { LANGUAGES, DEFAULT_LANGUAGE, type Language } from "./config";

/**
 * Translations come from Glossa (see `glossa.ts`). On the server, pages call
 * `loadMessages()` before rendering, which registers the catalog here. In the
 * browser, `Layout.astro` embeds the current locale's catalog as JSON
 * (`#i18n-messages`) and `t()` reads it from there — no catalog is bundled.
 */
export type Messages = { [key: string]: string | Messages };

/** Id of the `<script type="application/json">` holding the page's catalog. */
export const MESSAGES_ELEMENT_ID = "i18n-messages";

const registry: Partial<Record<Language, Messages>> = {};

export function registerMessages(language: Language, messages: Messages) {
  registry[language] = messages;
}

function readEmbeddedMessages(): { language: Language; messages: Messages } | null {
  if (typeof document === "undefined") return null;

  const element = document.getElementById(MESSAGES_ELEMENT_ID);
  if (!element?.textContent) return null;

  try {
    return {
      language: (element.dataset.lang as Language) || DEFAULT_LANGUAGE,
      messages: JSON.parse(element.textContent) as Messages,
    };
  } catch {
    return null;
  }
}

export function getTranslation(language: Language): Messages | undefined {
  if (!registry[language]) {
    const embedded = readEmbeddedMessages();
    if (embedded) registerMessages(embedded.language, embedded.messages);
  }
  return registry[language];
}

export function t(language: Language, key: string): string {
  const translation = getTranslation(language);

  let result: string | Messages | undefined = translation;
  for (const k of key.split(".")) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }

  return typeof result === "string" ? result : key;
}

export function getAvailableLanguages(): Language[] {
  return Object.values(LANGUAGES);
}
