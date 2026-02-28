
import { getDb, STORE } from "./db";

export async function saveOrder(order: string[]) {
  const database = await getDb();
  await database.put(STORE, order, "card-order");
}

export async function loadOrder(): Promise<string[] | undefined> {
  const database = await getDb();
  const val = await database.get(STORE, "card-order");
  return val as string[] | undefined;
}

export async function clearOrder() {
  const database = await getDb();
  await database.delete(STORE, "card-order");
}
