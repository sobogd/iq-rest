"use client";

import { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { analytics } from "@/lib/analytics";
import { dashboardApi, dashboardUrl } from "@/lib/dashboard-url";
import type { LegalView } from "@/components/legal-modal";
import { CuisineStep } from "./cuisine-step";
import { NameStep } from "./name-step";
import { AuthStep } from "./auth-step";
import type { CuisineKey } from "./cuisine";

const LegalModal = lazy(() =>
  import("@/components/legal-modal").then((m) => ({ default: m.LegalModal })),
);

const TOTAL_STEPS = 3;

export function CreateFlowModal({
  open,
  mode = "create",
  onClose,
}: {
  open: boolean;
  mode?: "create" | "signin";
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [cuisine, setCuisine] = useState<CuisineKey | null>(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [legalView, setLegalView] = useState<LegalView>(null);
  const isSignIn = mode === "signin";
  // Records why the dialog is closing so onOpenChange can fire the right event.
  // Set by outside-click / ESC handlers; otherwise defaults to "x" (Close button).
  const closeReasonRef = useRef<"x" | "backdrop" | "esc" | "auth">("x");

  // Already-authenticated visitors who land on the modal get bounced to the dashboard
  // — same behaviour as the dashboard's own /onboarding wizard.
  useEffect(() => {
    if (!open) return;
    analytics.track(`land_onb_open_${mode}`);
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
    if (!open || isSignIn) return;
    analytics.track(`land_onb_step${step}_view`);
  }, [open, step, isSignIn]);

  // Reset wizard whenever modal closes.
  useEffect(() => {
    if (open) return;
    const reset = setTimeout(() => {
      setStep(1);
      setLegalView(null);
    }, 200);
    return () => clearTimeout(reset);
  }, [open]);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const signupContext = useMemo(
    () => (cuisine ? { cuisine, restaurantName: restaurantName.trim() } : null),
    [cuisine, restaurantName],
  );

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          if (o) return;
          analytics.track(`land_onb_close_${closeReasonRef.current}_${mode}`);
          onClose();
        }}
      >
        <DialogContent
          onPointerDownOutside={(e) => {
            // Cross-origin iframes (Google sign-in popup) report clicks
            // as "outside" because their events don't bubble. Don't close.
            const target = e.target as HTMLElement | null;
            if (target?.tagName === "IFRAME" || target?.closest("[data-iframe-host]")) {
              e.preventDefault();
              return;
            }
            closeReasonRef.current = "backdrop";
          }}
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement | null;
            if (target?.tagName === "IFRAME" || target?.closest("[data-iframe-host]")) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={() => {
            closeReasonRef.current = "esc";
          }}
          className="max-w-md p-0 gap-0 bg-background border-border overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            {!isSignIn && (
              <Progress
                step={step}
                total={TOTAL_STEPS}
                onJump={(target) => {
                  if (target === step) return;
                  if (target > step) return;
                  analytics.track(`land_onb_jump_${target}`);
                  setStep(target);
                }}
              />
            )}

            {isSignIn ? (
              <AuthStep
                signupContext={null}
                onOpenLegal={(v) => {
                  analytics.track(`land_onb_open_${v}`);
                  setLegalView(v);
                }}
              />
            ) : (
              <>
                {step === 1 && (
                  <CuisineStep
                    selected={cuisine}
                    onSelect={(c) => {
                      analytics.track(`land_onb_cuisine_${c}`);
                      setCuisine(c);
                    }}
                    onContinue={() => {
                      analytics.track("land_onb_cuisine_continue");
                      next();
                    }}
                  />
                )}

                {step === 2 && (
                  <NameStep
                    value={restaurantName}
                    onChange={setRestaurantName}
                    onFocus={() => analytics.track("land_onb_name_focus")}
                    onBack={() => {
                      analytics.track("land_onb_name_back");
                      back();
                    }}
                    onContinue={() => {
                      analytics.track("land_onb_name_continue");
                      next();
                    }}
                  />
                )}

                {step === 3 && signupContext && (
                  <AuthStep
                    signupContext={signupContext}
                    onOpenLegal={(v) => {
                      analytics.track(`land_onb_open_${v}`);
                      setLegalView(v);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {legalView ? (
        <Suspense fallback={null}>
          <LegalModal view={legalView} onClose={() => setLegalView(null)} />
        </Suspense>
      ) : null}
    </>
  );
}

function Progress({
  step,
  total,
  onJump,
}: {
  step: number;
  total: number;
  onJump: (target: number) => void;
}) {
  const t = useTranslations("createFlow");
  const labels = [t("step1.label"), t("step2.label"), t("step3.label")];
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
