// Unified theme management using IndexedDB
import { openDB } from "idb";

const DB_NAME = "portfolio-db";
const STORE = "kv";

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

async function db() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    },
  });
}

export async function saveThemeState(state: ThemeState) {
  const database = await db();
  await database.put(STORE, state, "theme-state");
}

export async function loadThemeState(): Promise<ThemeState | undefined> {
  const database = await db();
  const val = await database.get(STORE, "theme-state");
  return val as ThemeState | undefined;
}

export async function clearThemeState() {
  const database = await db();
  await database.delete(STORE, "theme-state");
}
