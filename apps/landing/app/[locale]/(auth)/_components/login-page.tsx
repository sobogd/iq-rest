"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { analytics } from "@/lib/analytics";
import { isAdminEmail } from "@/lib/admin";
import { track, DashboardEvent } from "@/lib/dashboard-events";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = "576149678945-vjqlc4sce6bsne3p0n63bqdvf33k43s0.apps.googleusercontent.com";

export function LoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("dashboard.auth");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleResponse = useCallback(
    async (response: { credential: string }) => {
      setStatus("loading");
      setErrorMessage("");

      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json();

        if (res.ok) {
          track(DashboardEvent.AUTH_GOOGLE_LOGIN);
          if (isAdminEmail(data.email)) {
            analytics.disableTracking();
          }
          if (data.isNewUser) {
            track(DashboardEvent.AUTH_SIGNUP);
          }
          await analytics.linkSession(data.userId);

          const step = data.onboardingStep ?? 0;
          if (step < 2) {
            router.replace("/onboarding/name");
          } else {
            router.replace("/dashboard");
          }
        } else {
          setErrorMessage(data.error || t("errors.sendFailed"));
          setStatus("error");
        }
      } catch {
        setErrorMessage(t("errors.sendFailed"));
        setStatus("error");
      }
    },
    [router, t]
  );

  useEffect(() => {
    track(DashboardEvent.SHOWED_LOGIN);
    emailInputRef.current?.focus();
  }, []);

  // Load Google Identity Services
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const initGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: "popup",
        prompt_parent_id: undefined,
        auto_select: false,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        size: "large",
        width: 280,
        text: "continue_with",
        logo_alignment: "left",
      });
    };

    if (window.google) {
      initGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    document.head.appendChild(script);

    return () => {
      // Cleanup only if we added it
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [handleGoogleResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMessage(t("errors.emailRequired"));
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setErrorMessage(t("errors.emailInvalid"));
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        track(DashboardEvent.CLICKED_LOGIN_CONTINUE);

        if (data.autoLogin) {
          if (isAdminEmail(email)) {
            analytics.disableTracking();
          }
          if (data.isNewUser) {
            track(DashboardEvent.AUTH_SIGNUP);
          }
          if (data.fromScanner) {
            analytics.marketing.scannerConversion();
          }
          await analytics.linkSession(data.userId);

          // Redirect based on onboarding step
          const step = data.onboardingStep ?? 0;
          if (step < 2) {
            router.replace("/onboarding/name");
          } else {
            router.replace("/dashboard");
          }
          return;
        }

        window.location.href = `/${locale}/otp?email=${encodeURIComponent(trimmed)}`;
      } else {
        track(DashboardEvent.ERROR_OTP_SEND);
        setErrorMessage(data.error || t("errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      track(DashboardEvent.ERROR_OTP_SEND);
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {status === "error" && errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {errorMessage}
                </div>
              )}

              <Input
                ref={emailInputRef}
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => track(DashboardEvent.FOCUSED_LOGIN_EMAIL)}
                disabled={status === "loading"}
              />

              <Button
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("continue")}
              </Button>

              {GOOGLE_CLIENT_ID && (
                <>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <span className="relative bg-background px-3 text-xs text-muted-foreground">
                      {t("or")}
                    </span>
                  </div>

                  <div ref={googleButtonRef} className="flex justify-center overflow-hidden rounded-md" />
                </>
              )}

              <p className="text-xs text-muted-foreground/70">
                {t("consent.text")}{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  {t("consent.terms")}
                </Link>{" "}
                {t("consent.and")}{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  {t("consent.privacy")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
