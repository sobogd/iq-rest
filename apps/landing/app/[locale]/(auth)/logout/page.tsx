"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";

export default function LogoutPage() {
  const locale = useLocale();

  useEffect(() => {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      window.location.href = `/${locale}/login`;
    });
  }, [locale]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
