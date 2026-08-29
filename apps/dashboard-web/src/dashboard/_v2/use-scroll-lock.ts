import { useEffect } from "react";

// Counts how many modal-style overlays are open. While count > 0 we lock
// overflow on <html>/<body> (kiosk hosts still scroll the document) AND on the
// page body — the dashboard scrolls there, not on the document, so locking the
// document alone lets the screen slide behind an open modal / drawer. The
// sidebar keeps its own scroll (it IS the drawer on mobile).
let lockCount = 0;
let prevHtmlOverflow: string | null = null;
let prevBodyOverflow: string | null = null;
let prevBodyPaddingRight: string | null = null;
let lockedPanes: { el: HTMLElement; prev: string }[] = [];

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (typeof document === "undefined") return;
    if (lockCount === 0) {
      const body = document.body;
      const html = document.documentElement;
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      prevHtmlOverflow = html.style.overflow;
      prevBodyOverflow = body.style.overflow;
      prevBodyPaddingRight = body.style.paddingRight;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        const current = parseInt(body.style.paddingRight || "0", 10) || 0;
        body.style.paddingRight = `${current + scrollbarWidth}px`;
      }
      lockedPanes = Array.from(
        document.querySelectorAll<HTMLElement>('[data-scroll-pane="page"]'),
      ).map((el) => {
        const prev = el.style.overflow;
        el.style.overflow = "hidden";
        return { el, prev };
      });
    }
    lockCount++;
    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.documentElement.style.overflow = prevHtmlOverflow ?? "";
        document.body.style.overflow = prevBodyOverflow ?? "";
        document.body.style.paddingRight = prevBodyPaddingRight ?? "";
        prevHtmlOverflow = null;
        prevBodyOverflow = null;
        prevBodyPaddingRight = null;
        for (const { el, prev } of lockedPanes) el.style.overflow = prev;
        lockedPanes = [];
      }
    };
  }, [active]);
}
