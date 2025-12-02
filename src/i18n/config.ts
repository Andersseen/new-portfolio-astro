// i18n Configuration
export const LANGUAGES = {
  EN: "en",
  ES: "es",
  UA: "ua",
} as const;

export const DEFAULT_LANGUAGE = LANGUAGES.EN;

export const LANGUAGE_NAMES = {
  [LANGUAGES.EN]: "English",
  [LANGUAGES.ES]: "Español",
  [LANGUAGES.UA]: "Українська",
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

// Get language from URL pathname
export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split("/").filter(Boolean);
  const potentialLang = segments[0];

  if (Object.values(LANGUAGES).includes(potentialLang as Language)) {
    return potentialLang as Language;
  }

  return DEFAULT_LANGUAGE;
}

// Get locale string for date formatting, etc.
export function getLocaleCode(language: Language): string {
  const localeMap: Record<Language, string> = {
    [LANGUAGES.EN]: "en-US",
    [LANGUAGES.ES]: "es-ES",
    [LANGUAGES.UA]: "uk-UA",
  };

  return localeMap[language];
}
