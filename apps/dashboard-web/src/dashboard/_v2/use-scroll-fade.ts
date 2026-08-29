import { useEffect, useRef } from "react";

/** How far the content dissolves at an edge that has more behind it. The two
 *  edges differ because they mean different things: the top only marks what
 *  was left behind, while the bottom is where the reader is heading and has to
 *  announce itself early. The ramp inside each distance also differs — see
 *  `.scroll-fade`. */
const MAX_TOP = 80;
const MAX_BOTTOM = 160;

/**
 * Marks a scroll container as scrollable by dissolving its own pixels toward
 * whichever edge still has content behind it (see `.scroll-fade` in
 * styles.css). The dashboard hides every scrollbar globally, so without this a
 * pane that continues below the fold looks exactly like one that ends there.
 *
 * The stop distances are written as pixel values rather than toggled on and
 * off, so the fade grows with the first pixels of scrolling instead of popping
 * in at scrollTop === 1.
 *
 * Only for panes whose overlays are portaled out: a mask makes the element a
 * containing block, which would trap a `position: fixed` child inside it.
 */
export function useScrollFade<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pending = false;
    let lastTop = -1;
    let lastBottom = -1;

    const apply = () => {
      pending = false;
      const scrollTop = el.scrollTop;
      const top = Math.min(MAX_TOP, Math.max(0, Math.round(scrollTop)));
      const bottom = Math.min(
        MAX_BOTTOM,
        Math.max(0, Math.round(el.scrollHeight - el.clientHeight - scrollTop)),
      );
      if (top === lastTop && bottom === lastBottom) return;
      lastTop = top;
      lastBottom = bottom;
      el.style.setProperty("--fade-top", top + "px");
      el.style.setProperty("--fade-bottom", bottom + "px");
    };

    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(apply);
    };

    apply();
    el.addEventListener("scroll", schedule, { passive: true });
    // The pane resizes with the viewport; its children grow when a nav group
    // appears (admin rows, the impersonation banner), which changes whether
    // there is anything below the fold without any scrolling happening.
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);

    return () => {
      el.removeEventListener("scroll", schedule);
      ro.disconnect();
    };
  }, []);

  return ref;
}
