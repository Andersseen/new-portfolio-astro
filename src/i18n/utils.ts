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


export function getTranslation(language: Language): Messages {
  return messages[language] || messages[DEFAULT_LANGUAGE];
}


export function t(language: Language, key: string): string {
  const translation = getTranslation(language);

  
  const keys = key.split(".");
  let result: any = translation;

  for (const k of keys) {
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
