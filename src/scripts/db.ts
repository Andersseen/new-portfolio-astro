import { openDB, type DBSchema, type IDBPDatabase, deleteDB } from "idb";

export const DB_NAME = "portfolio-db";
export const STORE = "kv";
export const DB_VERSION = 4; // Incremented to force upgrade

interface PortfolioDB extends DBSchema {
  kv: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<PortfolioDB>> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        const db = await openDB<PortfolioDB>(DB_NAME, DB_VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(STORE)) {
              db.createObjectStore(STORE);
            }
          },
        });

        // Self-healing: verify store exists
        if (!db.objectStoreNames.contains(STORE)) {
          console.warn("DB corrupted, missing store. Recreating...");
          db.close();
          await deleteDB(DB_NAME);
          return openDB<PortfolioDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
              db.createObjectStore(STORE);
            },
          });
        }

        return db;
      } catch (e) {
        console.error("Failed to open DB, resetting...", e);
        await deleteDB(DB_NAME);
        return openDB<PortfolioDB>(DB_NAME, DB_VERSION, {
          upgrade(db) {
            db.createObjectStore(STORE);
          },
        });
      }
    })();
  }
  return dbPromise;
}
