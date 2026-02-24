import { cookies } from "next/headers";
import { parseCart } from "./cart";

/** Server-only: read cart from request cookies */
export async function getCartFromCookies(): Promise<Map<string, number>> {
  const store = await cookies();
  const value = store.get("iqrest_cart")?.value;
  return parseCart(value);
}
