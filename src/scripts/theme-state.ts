import { getDb, STORE } from "./db";
import type { ThemeApiMeta, ThemeScale, ThemeApiTheme, ThemeMode } from "@/utils/theme-api";

export interface ThemeColors {
  primary: ThemeScale | string;
  secondary: ThemeScale | string;
  accent: string;
  success: string;
  warning: string;
  background?: string;
  foreground?: string;
  backgroundSecondary?: string;
  backgroundTertiary?: string;
  foregroundSecondary?: string;
  foregroundTertiary?: string;
  border?: string;
  borderLight?: string;
}

export interface ThemeApiSnapshot {
  theme: ThemeApiTheme;
  meta: ThemeApiMeta;
  fetchedAt: number;
}

export interface ThemeState {
  mode: ThemeMode;
  colors?: ThemeColors;
  apiSnapshot?: ThemeApiSnapshot;
  userSet: boolean;
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
