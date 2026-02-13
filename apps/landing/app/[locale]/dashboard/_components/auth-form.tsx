"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { analytics } from "@/lib/analytics";
import { isAdminEmail } from "@/lib/admin";

type Step = "email" | "otp";

interface AuthFormProps {
  onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (step === "otp") {
      otpInputRef.current?.focus();
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        analytics.auth.emailSubmit();

        // Check if auto-login (new user, no OTP needed)
        if (data.autoLogin) {
          if (isAdminEmail(email)) {
            analytics.disableTracking();
          }
          analytics.auth.signUp();
          analytics.linkSession(data.userId);
          onSuccess();
          return;
        }

        // Existing user - proceed to OTP step
        setStep("otp");
        setStatus("idle");
      } else {
        setErrorMessage(data.error || t("auth.errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("auth.errors.sendFailed"));
      setStatus("error");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isAdminEmail(email)) {
          analytics.disableTracking();
        }
        // Track auth events
        analytics.auth.codeVerify();
        if (data.isNewUser) {
          analytics.auth.signUp();
        }
        // Link session to user
        analytics.linkSession(data.userId);
        onSuccess();
      } else {
        setErrorMessage(data.error || t("auth.errors.verifyFailed"));
        setStatus("error");
        setOtp("");
        otpInputRef.current?.focus();
      }
    } catch {
      setErrorMessage(t("auth.errors.verifyFailed"));
      setStatus("error");
      setOtp("");
      otpInputRef.current?.focus();
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[280px]">
        {step === "email" ? (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">Create Your Menu</h1>
              <p className="text-muted-foreground">
                Enter your email to create your restaurant menu:
              </p>
            </div>

            <form onSubmit={handleEmailSubmit}>
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
                  placeholder={t("auth.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="h-auto py-2 text-base lg:py-2.5 lg:text-lg"
                />

                <Button
                  type="submit"
                  className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("auth.continue")}
                </Button>

                <p className="text-xs text-muted-foreground/70">
                  {t("auth.consent.text")}{" "}
                  <Link href="/terms" className="underline hover:text-foreground">
                    {t("auth.consent.terms")}
                  </Link>{" "}
                  {t("auth.consent.and")}{" "}
                  <Link href="/privacy" className="underline hover:text-foreground">
                    {t("auth.consent.privacy")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">{t("auth.verifyTitle")}</h1>
              <p className="text-muted-foreground">
                {t("auth.verifySubtitle", { email })}
              </p>
            </div>

            <form onSubmit={handleOtpSubmit}>
              <div className="grid gap-4">
                {status === "error" && errorMessage && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {errorMessage}
                  </div>
                )}

                <Input
                  ref={otpInputRef}
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="0000"
                  required
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setOtp(value);
                  }}
                  disabled={status === "loading"}
                  className="h-auto py-2 text-base lg:py-2.5 lg:text-lg text-center tracking-widest"
                />

                <Button
                  type="submit"
                  className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                  disabled={status === "loading" || otp.length !== 4}
                >
                  {status === "loading" && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("auth.verify")}
                </Button>

                <p
                  className="text-xs text-muted-foreground/70 cursor-pointer underline"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setErrorMessage("");
                    setStatus("idle");
                  }}
                >
                  {t("auth.changeEmail")}
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
