"use client";

import { useEffect } from "react";

// iOS Safari auto-zooms the page whenever a focused <input>/<textarea>/<select>
// has a font-size below 16px. Bumping the auth fields to 16px would shift the
// desktop layout, so instead we lock the viewport to maximum-scale=1 for the
// duration of the focus and restore the original viewport on blur — the
// focus-zoom never fires, but pinch-to-zoom stays available everywhere else.
// iOS-only: other browsers have no focus-zoom and must keep their pinch zoom.
const LOCKED = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS 13+ reports a Mac UA; the touch-point count is what gives it away.
  return /iP(hone|od|ad)/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
}

const isField = (el: EventTarget | null): boolean =>
  el instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);

/** Renders nothing — mounted once on a page with small-font inputs (the auth
 *  page) to suppress iOS's focus-zoom without touching the field font size. */
export function IosInputZoomLock() {
  useEffect(() => {
    if (!isIOS()) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) return;
    const original = meta.content;

    // maximum-scale=1 has to be in place BEFORE the focus zoom animates, so we
    // set it on focusin (fires before the zoom) and undo it on focusout.
    const lock = (e: FocusEvent) => {
      if (isField(e.target)) meta.content = LOCKED;
    };
    const unlock = (e: FocusEvent) => {
      if (isField(e.target)) meta.content = original;
    };

    document.addEventListener("focusin", lock);
    document.addEventListener("focusout", unlock);
    return () => {
      document.removeEventListener("focusin", lock);
      document.removeEventListener("focusout", unlock);
      meta.content = original;
    };
  }, []);

  return null;
}
