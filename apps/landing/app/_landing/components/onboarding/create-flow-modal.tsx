"use client";

import { useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { analytics } from "@/lib/analytics";
import { dashboardApi, dashboardUrl } from "@/lib/dashboard-url";
import { AuthStep } from "./auth-step";

/**
 * Unified entry modal. Onboarding (cuisine + name steps) is removed — every
 * landing CTA opens the same single auth screen with a demo button on top and
 * Google / Apple / Email below. Sign-in and registration are the same flow
 * (passwordless find-or-create), so the copy is intentionally universal.
 *
 * `mode` is kept for backward compatibility with existing call sites but no
 * longer branches the UI — there is only one view now.
 */
export function CreateFlowModal({
  open,
  mode = "create",
  onClose,
}: {
  open: boolean;
  mode?: "create" | "signin" | "register";
  onClose: () => void;
}) {
  // Backdrop/Esc closing is blocked — only the X button can close the modal.
  const closeReasonRef = useRef<"x" | "auth">("x");
  const contentRef = useRef<HTMLDivElement>(null);

  // Keyboard-aware positioning. A `position: fixed` dialog centers against the
  // layout viewport, which the mobile keyboard doesn't shrink — so the keyboard
  // covers the lower half (email input + submit button). Two strategies, picked
  // at runtime:
  //   • If visualViewport actually shrinks on keyboard open (modern browsers) →
  //     center inside the still-visible area above the keyboard.
  //   • If it doesn't (many in-app webviews keep the viewport full-size) → fall
  //     back to the only reliable signal, input focus: pin the dialog near the
  //     top while a field is focused so it clears the keyboard, re-center on blur.
  // `top` + `transform` are driven inline so they win over the Tailwind classes
  // (transform must re-include translateX(-50%) since inline replaces the class).
  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const vv = window.visualViewport;
    let focused = false;
    const apply = () => {
      const el = contentRef.current;
      if (!el) return;
      const h = vv?.height ?? window.innerHeight;
      const offset = vv?.offsetTop ?? 0;
      const viewportShrank = vv ? vv.height < window.innerHeight - 100 : false;
      el.style.maxHeight = `${h - 24}px`;
      if (focused && !viewportShrank) {
        // Webview that won't resize: pin to the top so the field clears the keyboard.
        el.style.top = `${offset + 12}px`;
        el.style.transform = "translate(-50%, 0)";
      } else {
        // Center in the visible area (full screen when closed, above-keyboard when shrunk).
        el.style.top = `${offset + h / 2}px`;
        el.style.transform = "translate(-50%, -50%)";
      }
    };
    const onFocusIn = (e: FocusEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        focused = true;
        apply();
      }
    };
    const onFocusOut = () => {
      focused = false;
      // Delay so focus moving between two fields doesn't flicker to center.
      setTimeout(() => {
        if (!contentRef.current?.contains(document.activeElement)) apply();
      }, 50);
    };
    apply();
    const raf = requestAnimationFrame(apply);
    vv?.addEventListener("resize", apply);
    vv?.addEventListener("scroll", apply);
    window.addEventListener("resize", apply);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      cancelAnimationFrame(raf);
      vv?.removeEventListener("resize", apply);
      vv?.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [open]);

  // Already-authenticated visitors who land on the modal get bounced to the dashboard.
  useEffect(() => {
    if (!open) return;
    analytics.track(`l_onb_open_${mode}`);
    closeReasonRef.current = "x";
    let cancelled = false;
    fetch(dashboardApi("/api/auth/check"), { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.authenticated) return;
        const locale = (typeof document !== "undefined" && document.documentElement.lang) || "en";
        if (data.legacyDashboard) {
          window.location.assign(`/${locale}/dashboard`);
          return;
        }
        window.location.assign(`${dashboardUrl()}/${locale}/dashboard`);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open, mode]);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) return;
        analytics.track(`l_onb_close_${closeReasonRef.current}_${mode}`);
        onClose();
      }}
    >
      <DialogContent
        ref={contentRef}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        // Radix auto-focuses the first focusable child on open. Block it so the
        // mobile keyboard doesn't pop before the user has read the copy.
        onOpenAutoFocus={(e) => e.preventDefault()}
        // Vertically centered (base classes); `top` is overridden inline by the
        // visualViewport effect so the keyboard never overlaps the form.
        className="max-w-md p-0 gap-0 bg-background border-border overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          <AuthStep signupContext={null} variant="unified" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
