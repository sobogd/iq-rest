"use client";

// Global top-of-app notice (toast): fades in, sits ~1s, fades out. No buttons.
// Mounted once in the dashboard chrome so it survives SPA page transitions —
// e.g. hit Save on a dish, navigate to the menu list, the notice stays put.

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon } from "./icons";

interface Notice {
  id: number;
  title: string;
  message?: string;
}

let emit: ((n: Notice) => void) | null = null;
let seq = 0;

// Show a transient success/info notice. Safe to call from anywhere; no-op if
// the host isn't mounted (e.g. kiosk bundle).
export function notify(title: string, message?: string) {
  emit?.({ id: ++seq, title, message });
}

const VISIBLE_MS = 1000;
const EXIT_MS = 300;

export function NoticeHost() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [closing, setClosing] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    emit = (n) => {
      timersRef.current.forEach(clearTimeout);
      setNotice(n);
      setClosing(false);
      timersRef.current = [
        window.setTimeout(() => setClosing(true), VISIBLE_MS),
        window.setTimeout(() => {
          setNotice(null);
          setClosing(false);
        }, VISIBLE_MS + EXIT_MS),
      ];
    };
    return () => {
      emit = null;
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  if (!notice) return null;

  return createPortal(
    <div className="fixed top-[calc(var(--topbar-h,3.5rem)+0.75rem)] left-0 right-0 z-[120] flex justify-center px-4 pointer-events-none">
      <div
        key={notice.id}
        className={
          "flex items-center gap-3.5 max-w-[calc(100vw-2rem)] px-5 py-3.5 rounded-xl bg-card border border-border shadow-xl duration-300 fill-mode-forwards " +
          (closing
            ? "animate-out fade-out-0 slide-out-to-top-2"
            : "animate-in fade-in-0 slide-in-from-top-2")
        }
      >
        <span className="shrink-0 w-8 h-8 rounded-lg bg-primary-gradient text-primary-foreground flex items-center justify-center">
          <CheckIcon size={16} />
        </span>
        <span className="min-w-0 space-y-1">
          <span className="block text-sm font-semibold text-foreground leading-tight truncate">{notice.title}</span>
          {notice.message ? (
            <span className="block text-sm text-muted-foreground leading-tight truncate">{notice.message}</span>
          ) : null}
        </span>
      </div>
    </div>,
    document.body,
  );
}
