"use client";

import { useEffect, useState } from "react";

interface Props {
  /**
   * The word that ships in the server-rendered HTML. The Ads crawler scores
   * the landing against this word, so it must equal the keyword form (e.g.
   * "ristoranti" for "menu digitale per ristoranti").
   */
  initial: string;
  /**
   * Full cycle including the initial word. The component rotates through
   * this list in order; the loop wraps back to index 0 after the last item.
   */
  items: string[];
  intervalMs?: number;
  className?: string;
}

export function AccentWordRotator({
  initial,
  items,
  intervalMs = 1000,
  className,
}: Props) {
  // Render `initial` during SSR and on the very first client render so the
  // hydration markup matches the server (and the Ads crawler sees the
  // keyword form in the first frame). After mount, swap to the rotation.
  const [word, setWord] = useState(initial);

  useEffect(() => {
    if (items.length <= 1) return;
    const startIdx = Math.max(items.indexOf(initial), 0);
    let i = startIdx;
    const id = setInterval(() => {
      i = (i + 1) % items.length;
      setWord(items[i]);
    }, intervalMs);
    return () => clearInterval(id);
  }, [initial, items, intervalMs]);

  return <span className={className}>{word}</span>;
}
