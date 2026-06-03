"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { analytics } from "@/lib/analytics";
import { dashboardApi, dashboardUrl } from "@/lib/dashboard-url";
import { CuisineStep } from "./cuisine-step";
import { NameStep } from "./name-step";
import { AuthStep } from "./auth-step";
import type { CuisineKey } from "./cuisine";

export function CreateFlowModal({
  open,
  mode = "create",
  onClose,
}: {
  open: boolean;
  mode?: "create" | "signin" | "register";
  onClose: () => void;
}) {
  const t = useTranslations("createFlow");
  const [step, setStep] = useState(1);
  const [cuisine, setCuisine] = useState<CuisineKey | null>(null);
  const [restaurantName, setRestaurantName] = useState("");
  const isSignIn = mode === "signin";
  const isRegister = mode === "register";
  // Sign-in skips the wizard entirely and shows the auth step directly.
  // Register runs a 2-step wizard: name → auth (cuisine skipped).
  const isAuthOnly = isSignIn;
  // The "create" flow is the full 3-step wizard (cuisine → name → auth);
  // "register" is a 2-step subset (name → auth).
  const totalSteps = isRegister ? 2 : 3;
  // Progress labels per mode. Register reuses the name + sign-in labels.
  const progressLabels = isRegister
    ? [t("step2.label"), t("step3.label")]
    : [t("step1.label"), t("step2.label"), t("step3.label")];
  // Backdrop/Esc closing is blocked — only the X button can close the modal.
  const closeReasonRef = useRef<"x" | "auth">("x");

  // Already-authenticated visitors who land on the modal get bounced to the dashboard
  // — same behaviour as the dashboard's own /onboarding wizard.
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

  // Track step view changes.
  useEffect(() => {
    if (!open || isAuthOnly) return;
    analytics.track(`l_onb_step${step}_view`);
  }, [open, step, isAuthOnly]);

  // Reset wizard whenever modal closes.
  useEffect(() => {
    if (open) return;
    const reset = setTimeout(() => {
      setStep(1);
    }, 200);
    return () => clearTimeout(reset);
  }, [open]);

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const signupContext = useMemo(() => {
    const name = restaurantName.trim();
    if (isRegister) {
      // Register skips cuisine — send just the name.
      return name ? { restaurantName: name } : null;
    }
    return cuisine ? { cuisine, restaurantName: name } : null;
  }, [cuisine, restaurantName, isRegister]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          if (o) return;
          analytics.track(`l_onb_close_${closeReasonRef.current}_${mode}`);
          onClose();
        }}
      >
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          // Radix auto-focuses the first focusable child on open. With the
          // email input that pops the mobile keyboard before the user has
          // read the step copy. Block it; users tap when ready.
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-w-md p-0 gap-0 bg-background border-border overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            {!isAuthOnly && (
              <Progress
                step={step}
                total={totalSteps}
                labels={progressLabels}
                onJump={(target) => {
                  if (target === step) return;
                  if (target > step) return;
                  analytics.track(`l_onb_jump_${target}`);
                  setStep(target);
                }}
              />
            )}

            {isAuthOnly ? (
              <AuthStep signupContext={null} variant="signin" />
            ) : isRegister ? (
              <>
                {step === 1 && (
                  <NameStep
                    value={restaurantName}
                    onChange={setRestaurantName}
                    onFocus={() => analytics.track("l_onb_name_focus")}
                    onBack={() => {
                      closeReasonRef.current = "x";
                      onClose();
                    }}
                    onContinue={() => {
                      analytics.track("l_onb_name_continue");
                      next();
                    }}
                  />
                )}

                {step === 2 && signupContext && (
                  <AuthStep signupContext={signupContext} variant="register" />
                )}
              </>
            ) : (
              <>
                {step === 1 && (
                  <CuisineStep
                    selected={cuisine}
                    onSelect={(c) => {
                      analytics.track(`l_onb_cuisine_${c}`);
                      setCuisine(c);
                    }}
                    onContinue={() => {
                      analytics.track("l_onb_cuisine_continue");
                      next();
                    }}
                  />
                )}

                {step === 2 && (
                  <NameStep
                    value={restaurantName}
                    onChange={setRestaurantName}
                    onFocus={() => analytics.track("l_onb_name_focus")}
                    onBack={() => {
                      analytics.track("l_onb_name_back");
                      back();
                    }}
                    onContinue={() => {
                      analytics.track("l_onb_name_continue");
                      next();
                    }}
                  />
                )}

                {step === 3 && signupContext && (
                  <AuthStep signupContext={signupContext} />
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Progress({
  step,
  total,
  labels,
  onJump,
}: {
  step: number;
  total: number;
  labels: string[];
  onJump: (target: number) => void;
}) {
  const t = useTranslations("createFlow");
  return (
    <div className="mb-7">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
        {t("stepOf", { step, total })} · <span className="text-foreground">{labels[step - 1]}</span>
      </p>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const idx = i + 1;
          const done = idx < step;
          const active = idx === step;
          const clickable = done; // only completed steps go back
          return (
            <div key={i} className="flex items-center gap-2 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => clickable && onJump(idx)}
                disabled={!clickable}
                aria-label={`${t("stepOf", { step: idx, total })} · ${labels[idx - 1]}`}
                className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-all ${
                  done
                    ? "bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] text-white border-transparent cursor-pointer hover:opacity-80"
                    : active
                      ? "bg-foreground text-background border-foreground cursor-default"
                      : "bg-background text-muted-foreground border-border cursor-not-allowed"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : idx}
              </button>
              {idx < total && (
                <div
                  className={`flex-1 h-0.5 rounded-full transition-colors ${
                    done ? "bg-gradient-to-r from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)]" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
