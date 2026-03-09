"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
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
const TURNSTILE_SITE_KEY = process.env.NODE_ENV === "production"
  ? "0x4AAAAAACi6p7FVybIQ_YZg"
  : "1x00000000000000000000AA"; // Cloudflare test key — always passes

export function LoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("dashboard.auth");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const googleHiddenRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [googleReady, setGoogleReady] = useState(false);

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
          if (step < 3) {
            router.replace("/onboarding");
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
  }, []);

  // Load Google Identity Services
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const initGoogle = () => {
      if (!window.google || !googleHiddenRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: "popup",
        prompt_parent_id: undefined,
        auto_select: false,
      });

      window.google.accounts.id.renderButton(googleHiddenRef.current, {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        size: "large",
        width: 300,
        text: "continue_with",
        logo_alignment: "left",
      });

      setGoogleReady(true);
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

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(trimmed.toLowerCase())) {
      setErrorMessage(t("errors.emailInvalid"));
      setStatus("error");
      return;
    }

    if (!turnstileToken) {
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale, turnstileToken }),
      });

      const data = await response.json();

      if (response.ok) {
        track(DashboardEvent.CLICKED_LOGIN_CONTINUE);
        if (data.isNewUser) {
          track(DashboardEvent.AUTH_SIGNUP);
        }

        // Always require OTP verification
        window.location.href = `/${locale}/otp?email=${encodeURIComponent(trimmed)}`;
      } else {
        track(DashboardEvent.ERROR_OTP_SEND);
        setErrorMessage(data.error || t("errors.sendFailed"));
        setStatus("error");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      track(DashboardEvent.ERROR_OTP_SEND);
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[280px] lg:max-w-[360px]">
        <div className="grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {t("title")}<br />
              <span className="bg-gradient-to-br from-[hsl(9,100%,58%)] to-amber-400 bg-clip-text text-transparent">
                {t("titleAccent")}
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {status === "error" && errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-base">
                  {errorMessage}
                </div>
              )}

              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => track(DashboardEvent.FOCUSED_LOGIN_EMAIL)}
                disabled={status === "loading"}
                className="text-center lg:h-auto lg:py-2.5 lg:text-lg"
              />

              {TURNSTILE_SITE_KEY && (
                <div className="absolute overflow-hidden w-0 h-0">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ size: "flexible", appearance: "interaction-only" }}
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "loading" || (!turnstileToken && !!TURNSTILE_SITE_KEY)}
                className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
              >
                {status === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("continue")}
              </Button>

              {GOOGLE_CLIENT_ID && (
                <>
                  {googleReady && (
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <span className="relative bg-background px-3 text-base text-muted-foreground">
                        {t("or")}
                      </span>
                    </div>
                  )}

                  {/* Google button: real SDK button overlays custom design */}
                  <div className={cn("relative", !googleReady && "hidden")}>
                    <div className="flex w-full items-center justify-center gap-2 rounded-[15px] border border-border bg-muted/30 h-10 px-6 text-base lg:h-auto lg:py-2.5 lg:text-lg text-muted-foreground" aria-hidden>
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      {t("continueGoogle")}
                    </div>
                    {/* Real Google SDK button stretched over custom button, invisible */}
                    <div ref={googleHiddenRef} className="absolute inset-0 opacity-0 overflow-hidden [&_iframe]:!w-full [&_iframe]:!h-full [&>div]:!w-full [&>div]:!h-full" />
                  </div>
                </>
              )}

            </div>
          </form>
        </div>

        <p className="text-base text-muted-foreground/40 text-center mt-12">
          {t("consent.text")}{" "}
          <Link href="/terms" className="underline hover:text-foreground/40">
            {t("consent.terms")}
          </Link>{" "}
          {t("consent.and")}{" "}
          <Link href="/privacy" className="underline hover:text-foreground/40">
            {t("consent.privacy")}
          </Link>
        </p>
      </div>
    </div>
  );
}
