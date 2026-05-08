import { useCallback, useEffect, useState } from "react";

const KEY = "iqr_cart";

export type Cart = Record<string, number>;

function load(): Cart {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as Cart) : {};
  } catch {
    return {};
  }
}

function save(c: Cart) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    // ignore quota / disabled storage
  }
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(() => (typeof window === "undefined" ? {} : load()));

  // Sync between tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setCart(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((prev) => {
      const cur = prev[id] || 0;
      const next = { ...prev };
      if (cur <= 1) delete next[id];
      else next[id] = cur - 1;
      save(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    save({});
    setCart({});
  }, []);

  const totalQty = Object.values(cart).reduce((sum, n) => sum + n, 0);

  return { cart, add, remove, clear, totalQty };
}
