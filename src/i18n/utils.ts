import { LANGUAGES, DEFAULT_LANGUAGE, type Language } from "./config";
import en from "./locales/en.json";
import es from "./locales/es.json";
import ua from "./locales/ua.json";

type Messages = typeof en;

const messages: Record<Language, Messages> = {
  [LANGUAGES.EN]: en,
  [LANGUAGES.ES]: es,
  [LANGUAGES.UA]: ua,
};

// Get translation for a specific language
export function getTranslation(language: Language): Messages {
  return messages[language] || messages[DEFAULT_LANGUAGE];
}

// Translate a key for a specific language
export function t(language: Language, key: string): string {
  const translation = getTranslation(language);

  // Support nested keys like "nav.home"
  const keys = key.split(".");
  let result: any = translation;

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof result === "string" ? result : key;
}

// Get all available languages
export function getAvailableLanguages(): Language[] {
  return Object.values(LANGUAGES);
}
