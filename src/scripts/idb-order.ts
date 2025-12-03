// Lightweight IndexedDB wrapper for saving small values (card order)
import { openDB } from "idb";

const DB_NAME = "portfolio-db";
const STORE = "kv";

async function db() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    },
  });
}

export async function saveOrder(order: string[]) {
  const database = await db();
  await database.put(STORE, order, "card-order");
}

export async function loadOrder(): Promise<string[] | undefined> {
  const database = await db();
  const val = await database.get(STORE, "card-order");
  return val as string[] | undefined;
}

export async function clearOrder() {
  const database = await db();
  await database.delete(STORE, "card-order");
}
