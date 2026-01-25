import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export const DB_NAME = "portfolio-db";
export const STORE = "kv";
export const DB_VERSION = 3; // Incremented to force upgrade

interface PortfolioDB extends DBSchema {
  kv: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<PortfolioDB>> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<PortfolioDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      },
    });
  }
  return dbPromise;
}
