import { useEffect, useRef } from "react";

// Ties modal open/closed state to browser-history entries so the phone /
// browser Back button closes the modal instead of tearing down the page under
// it. Cooperates with the SPA router (../_spa/router):
//
//   • Opening a modal `pushState`s a new entry tagged with a unique `__modalId`,
//     while KEEPING the existing history.state intact (it carries the router's
//     `__dashboardSpa.stack`). The router's own popstate handler therefore
//     restores the *same* stack on Back — a no-op — so the page underneath
//     never navigates away. Only the URL hash changes (`#option` / `#variant`
//     / `#translations`), which the router ignores (it parses pathname +
//     search, not hash).
//   • All modal history is owned by ONE module-level controller with a SINGLE
//     popstate listener. On every popstate it RECONCILES its open-modal stack
//     against the depth encoded in `history.state.__modalId` and closes
//     whatever the browser dropped. This is self-healing — there is no fragile
//     counter to drift, so a plain page Back can never be "swallowed".
//   • Closing from the UI (Save / Cancel / Escape / backdrop) flips the owner's
//     state; the controller then steps history back once (guard suppressed) and
//     the same reconcile path removes the entry.
//   • `guard` lets a dirty form veto a hardware Back: the controller re-pushes
//     the entry and calls `onBlocked` instead of closing. UI closes suppress
//     the guard — hardware Back is the only guarded path, matching the
//     page-level unsaved flow.

interface ModalEntry {
  id: string;
  hash: string;
  onClose: () => void;
  guard: () => boolean;
  onBlocked: () => void;
}

// Open modals, oldest → newest. Mirrors the browser's modal-entry depth.
const stack: ModalEntry[] = [];
// Set right before a programmatic history.back() so the reconcile that follows
// treats the close as UI-initiated and skips the dirty guard.
let suppressGuardOnce = false;
let installed = false;
let seq = 0;

function currentModalId(): string | undefined {
  const st = window.history.state as Record<string, unknown> | null;
  return (st?.__modalId as string | undefined) ?? undefined;
}

// Push a modal entry, tagging history.state with its id (kept for reconcile and
// for StrictMode-dedup) while preserving the router's own state fields.
//
// The URL is left UNCHANGED (no `#hash`): a fragment would make the browser
// clear it on Back and yank the page under the modal to scrollTop — the modal
// close would jump the dish form to the top. pushState still records a distinct
// history entry with the same URL, so Back closes the modal exactly the same.
function pushEntry(id: string) {
  const st = (window.history.state as Record<string, unknown> | null) || {};
  if (st.__modalId === id) return; // already the current entry (StrictMode)
  const url = window.location.pathname + window.location.search;
  window.history.pushState({ ...st, __modalId: id }, "", url);
}

function reconcile() {
  const curId = currentModalId();
  let targetLen = 0;
  if (curId) {
    const idx = stack.findIndex((e) => e.id === curId);
    // Unknown id (forward nav / foreign entry) → keep the stack as-is.
    targetLen = idx >= 0 ? idx + 1 : stack.length;
  }
  if (targetLen >= stack.length) return; // nothing was dropped

  const removing = stack.length - targetLen;
  const top = stack[stack.length - 1];
  if (removing === 1 && !suppressGuardOnce && top.guard()) {
    // Dirty form + hardware Back → veto: restore the entry and prompt.
    pushEntry(top.id);
    top.onBlocked();
    return;
  }
  suppressGuardOnce = false;
  while (stack.length > targetLen) {
    const e = stack.pop()!;
    e.onClose();
  }
}

function install() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  window.addEventListener("popstate", reconcile);
}

function openEntry(entry: ModalEntry) {
  install();
  if (!stack.some((e) => e.id === entry.id)) stack.push(entry);
  pushEntry(entry.id);
}

// Owner flipped the modal closed. If its entry is the current browser entry,
// step back (reconcile then removes it, guard suppressed). Otherwise it was
// already dropped by a Back — just drop it from the registry.
function closeEntry(id: string) {
  if (currentModalId() === id) {
    suppressGuardOnce = true;
    window.history.back();
  } else {
    const i = stack.findIndex((e) => e.id === id);
    if (i >= 0) stack.splice(i, 1);
  }
}

export interface UseHistoryModalOptions {
  open: boolean;
  hash: string;
  onClose: () => void;
  guard?: () => boolean;
  onBlocked?: () => void;
}

export function useHistoryModal(opts: UseHistoryModalOptions): void {
  const cb = useRef(opts);
  cb.current = opts;
  // Stable per-instance id, assigned in render so StrictMode's double setup
  // reuses the same id (the __modalId dedup then collapses the two pushes).
  const idRef = useRef<string>("");
  if (!idRef.current) idRef.current = "hm" + ++seq;
  const openRef = useRef(false);

  useEffect(() => {
    if (opts.open && !openRef.current) {
      openRef.current = true;
      openEntry({
        id: idRef.current,
        hash: cb.current.hash,
        onClose: () => cb.current.onClose(),
        guard: () => cb.current.guard?.() ?? false,
        onBlocked: () => cb.current.onBlocked?.(),
      });
    } else if (!opts.open && openRef.current) {
      openRef.current = false;
      closeEntry(idRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.open]);

  // Unmount safety: drop a still-open entry from the registry. Don't touch
  // history here — doing a history.back() on unmount misbehaves under React
  // StrictMode's simulated unmount/remount (it churns the entry and can leave
  // the guard-suppress flag stuck). The __modalId dedup keeps the entry count
  // correct without it.
  useEffect(() => {
    return () => {
      if (openRef.current) {
        openRef.current = false;
        const i = stack.findIndex((e) => e.id === idRef.current);
        if (i >= 0) stack.splice(i, 1);
      }
    };
  }, []);
}
