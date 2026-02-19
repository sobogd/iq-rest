"use client";

import { useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/routing";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  onBack?: () => void;
  backHref?: string;
  historyBack?: boolean;
}

export function PageHeader({ title, children, onBack, backHref = "/dashboard", historyBack }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (onBack) return onBack();
    if (historyBack) return router.back();
    router.push(backHref);
  }, [onBack, historyBack, backHref, router]);

  useEffect(() => {
    // Push extra history entry so we can intercept browser back button
    window.history.pushState(null, "", window.location.href);

    const onPopState = () => {
      handleBack();
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [handleBack]);

  return (
    <header className="shrink-0 shadow-sm px-6 bg-muted/50">
      <div className="flex items-center py-3 max-w-lg mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center justify-center h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold flex-1 ml-3">{title}</h1>
        {children}
      </div>
    </header>
  );
}
