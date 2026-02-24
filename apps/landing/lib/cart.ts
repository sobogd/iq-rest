const CART_COOKIE = "iqrest_cart";

export const CART_COOKIE_NAME = CART_COOKIE;

/** Parse cart cookie value → Map<itemId, qty> */
export function parseCart(cookieValue: string | undefined | null): Map<string, number> {
  if (!cookieValue) return new Map();
  try {
    const entries: [string, number][] = JSON.parse(cookieValue);
    return new Map(entries);
  } catch {
    return new Map();
  }
}

// --- Client-side helpers (used in "use client" components) ---

/** Read cart from document.cookie */
export function loadCartClient(): Map<string, number> {
  if (typeof document === "undefined") return new Map();
  const match = document.cookie.match(new RegExp(`(?:^|; )${CART_COOKIE}=([^;]*)`));
  if (!match) return new Map();
  try {
    return new Map(JSON.parse(decodeURIComponent(match[1])));
  } catch {
    return new Map();
  }
}

/** Write cart to document.cookie (session cookie, path=/) */
export function saveCartClient(cart: Map<string, number>) {
  if (typeof document === "undefined") return;
  const value = JSON.stringify([...cart]);
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(value)};path=/;SameSite=Lax`;
}

/** Clear cart cookie */
export function clearCartClient() {
  if (typeof document === "undefined") return;
  document.cookie = `${CART_COOKIE}=;path=/;max-age=0`;
}
