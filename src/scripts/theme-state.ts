// Unified theme management using IndexedDB
import { getDb, STORE } from "./db";

type ThemeMode = "light" | "dark";

export interface ThemeState {
  mode: ThemeMode;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
  };
  userSet: boolean; // Whether user explicitly set the theme
}

export async function saveThemeState(state: ThemeState) {
  const database = await getDb();
  await database.put(STORE, state, "theme-state");
}

export async function loadThemeState(): Promise<ThemeState | undefined> {
  const database = await getDb();
  const val = await database.get(STORE, "theme-state");
  return val as ThemeState | undefined;
}

export async function clearThemeState() {
  const database = await getDb();
  await database.delete(STORE, "theme-state");
}
