"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookieConsent";
const SHOW_DELAY_MS = 1000;

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), SHOW_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? "accepted" : "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{t("title")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("description")}{" "}
                <Link href="/cookies" className="text-primary hover:underline">
                  {t("learnMore")}
                </Link>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => handleConsent(true)} size="sm">
                  {t("acceptAll")}
                </Button>
                <Button
                  onClick={() => handleConsent(false)}
                  variant="outline"
                  size="sm"
                >
                  {t("rejectAll")}
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => handleConsent(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
