"use client";

import { useEffect, useState } from "react";

interface RotatingAccentProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export function RotatingAccent({ items, intervalMs = 2000, className = "" }: RotatingAccentProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setI((x) => (x + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  return (
    <span className={"bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent " + className}>
      {items[i] ?? ""}
    </span>
  );
}
