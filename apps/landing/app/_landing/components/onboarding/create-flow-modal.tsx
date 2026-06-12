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

  // Keyboard-aware centering. The dialog is vertically centered via CSS, but a
  // `position: fixed` element centers against the *layout* viewport, which the
  // mobile on-screen keyboard does not shrink — so the keyboard ends up covering
  // the lower half (the email input + submit button). We re-center against the
  // visualViewport instead: keyboard closed → screen center; keyboard open →
  // center of the still-visible area above the keyboard. `top` is driven inline
  // (wins over the class), `translateY(-50%)` keeps it a true center.
  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const vv = window.visualViewport;
    const apply = () => {
      const el = contentRef.current;
      if (!el) return;
      const h = vv?.height ?? window.innerHeight;
      const offset = vv?.offsetTop ?? 0;
      el.style.top = `${offset + h / 2}px`;
      el.style.maxHeight = `${h - 24}px`;
    };
    apply();
    const raf = requestAnimationFrame(apply);
    vv?.addEventListener("resize", apply);
    vv?.addEventListener("scroll", apply);
    window.addEventListener("resize", apply);
    return () => {
      cancelAnimationFrame(raf);
      vv?.removeEventListener("resize", apply);
      vv?.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
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
