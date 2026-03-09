"use client";

import { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, Mail, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../_ui/page-header";
import { DashboardContent } from "../_ui/dashboard-content";

const TURNSTILE_SITE_KEY = process.env.NODE_ENV === "production"
  ? "0x4AAAAAACi6p7FVybIQ_YZg"
  : "1x00000000000000000000AA";

export function SaveMenuPage() {
  const locale = useLocale();
  const t = useTranslations("dashboard.claim");
  const tAuth = useTranslations("dashboard.auth");

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const turnstileRef = useRef<TurnstileInstance>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(trimmed.toLowerCase())) {
      setErrorMessage(tAuth("errors.emailInvalid"));
      setStatus("error");
      return;
    }

    if (!turnstileToken) {
      setErrorMessage(tAuth("errors.sendFailed"));
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale, turnstileToken }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("otp");
        setStatus("idle");
      } else if (data.error === "email_taken") {
        setErrorMessage(t("emailTaken"));
        setStatus("error");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      } else {
        setErrorMessage(data.error || tAuth("errors.sendFailed"));
        setStatus("error");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setErrorMessage(tAuth("errors.sendFailed"));
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  const handleVerifyCode = async (code: string) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/claim/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(t("success"));
        window.location.href = `/${locale}/dashboard`;
      } else if (data.error === "email_taken") {
        setErrorMessage(t("emailTaken"));
        setStatus("error");
      } else if (data.error === "TOO_MANY_ATTEMPTS") {
        setErrorMessage(tAuth("errors.tooManyAttempts"));
        setStatus("error");
        setStep("email");
        setOtp("");
      } else {
        setErrorMessage(tAuth("errors.invalidCode"));
        setStatus("error");
        setOtp("");
      }
    } catch {
      setErrorMessage(tAuth("errors.verifyFailed"));
      setStatus("error");
      setOtp("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={t("title")} />

      <div className="flex-1 overflow-auto px-6 py-6">
        <DashboardContent>
          <div className="flex flex-col gap-4">
            {/* Description */}
            <p className="text-xs text-muted-foreground/60 px-4">
              {t("subtitle")}
            </p>

            {/* Error */}
            {status === "error" && errorMessage && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
                {errorMessage}
              </div>
            )}

            {step === "email" && (
              <form onSubmit={handleSendCode}>
                <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                  {/* Email input row */}
                  <div className="flex items-center gap-3 h-11 px-4">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40"
                    />
                  </div>

                  {/* Send code button */}
                  <button
                    type="submit"
                    disabled={status === "loading" || !email.trim() || (!turnstileToken && !!TURNSTILE_SITE_KEY)}
                    className="flex items-center gap-3 w-full h-11 px-4 border-t border-border/50 hover:bg-muted/50 transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 text-emerald-500 shrink-0 animate-spin" />
                    ) : (
                      <span className="h-4 w-4 shrink-0" />
                    )}
                    <span className="text-sm font-medium text-emerald-500 flex-1 text-left">{t("sendCode")}</span>
                    <ChevronRight className="h-4 w-4 text-emerald-500/50 shrink-0" />
                  </button>
                </div>

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
              </form>
            )}

            {step === "otp" && (
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                  {/* Code sent info */}
                  <div className="flex items-center gap-3 h-11 px-4">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground truncate">{email.trim()}</span>
                  </div>

                  {/* OTP input */}
                  <div className="flex justify-center py-4 border-t border-border/50">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      onComplete={handleVerifyCode}
                      disabled={status === "loading"}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {status === "loading" && (
                    <div className="flex justify-center pb-3">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  )}

                  {/* Change email */}
                  <button
                    type="button"
                    className="flex items-center gap-3 w-full h-11 px-4 border-t border-border/50 hover:bg-muted/50 transition-colors"
                    onClick={() => { setStep("email"); setOtp(""); setErrorMessage(""); setStatus("idle"); }}
                  >
                    <span className="h-4 w-4 shrink-0" />
                    <span className="text-sm text-muted-foreground/60 flex-1 text-left">{tAuth("changeEmail")}</span>
                  </button>
                </div>

                <p className="text-xs text-muted-foreground/60 px-4">
                  {tAuth("checkSpam")}
                </p>
              </div>
            )}
          </div>
        </DashboardContent>
      </div>
    </div>
  );
}
