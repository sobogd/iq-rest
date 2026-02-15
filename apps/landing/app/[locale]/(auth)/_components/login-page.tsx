"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { analytics } from "@/lib/analytics";
import { isAdminEmail } from "@/lib/admin";

export function LoginPage() {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

        if (data.autoLogin) {
          if (isAdminEmail(email)) {
            analytics.disableTracking();
          }
          if (data.isNewUser) {
            analytics.auth.signUp();
          }
          analytics.linkSession(data.userId);

          // Redirect based on onboarding step
          const step = data.onboardingStep ?? 0;
          if (step === 0) {
            window.location.href = `/${locale}/onboarding/name`;
          } else if (step === 1) {
            window.location.href = `/${locale}/onboarding/type`;
          } else {
            window.location.href = `/${locale}/dashboard`;
          }
          return;
        }

        window.location.href = `/${locale}/otp?email=${encodeURIComponent(email)}`;
      } else {
        setErrorMessage(data.error || "Failed to send code");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Failed to send code");
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">Welcome to IQ Rest</h1>
            <p className="text-muted-foreground">
              Enter your email to get started
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
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
              />

              <Button
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue
              </Button>

              <p className="text-xs text-muted-foreground/70">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
