"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdModal } from "@/components/analytics/AdModal";

interface MenuLayoutClientProps {
  slug: string;
  locale: string;
  showAd: boolean;
  children: React.ReactNode;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem("sqr_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("sqr_session_id", sessionId);
  }
  return sessionId;
}

function getPageFromPath(pathname: string): string {
  if (pathname.includes("/menu")) return "menu";
  if (pathname.includes("/contacts")) return "contacts";
  if (pathname.includes("/language")) return "language";
  if (pathname.includes("/reserve")) return "reserve";
  return "home";
}

export function MenuLayoutClient({
  slug,
  locale,
  showAd,
  children,
}: MenuLayoutClientProps) {
  const pathname = usePathname();
  const [adComplete, setAdComplete] = useState(!showAd);
  const [tracked, setTracked] = useState(false);

  // Track page view
  useEffect(() => {
    if (tracked) return;
    setTracked(true);

    const sessionId = getSessionId();
    const page = getPageFromPath(pathname);
    const referrer = document.referrer || null;

    fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        page,
        sessionId,
        language: locale,
        referrer,
      }),
    }).catch((err) => {
      console.error("Failed to track page view:", err);
    });
  }, [slug, locale, pathname, tracked]);

  // Reset tracked state when pathname changes
  useEffect(() => {
    setTracked(false);
  }, [pathname]);

  const handleAdComplete = useCallback(() => {
    setAdComplete(true);
  }, []);

  return (
    <>
      {showAd && !adComplete && <AdModal onComplete={handleAdComplete} />}
      {children}
    </>
  );
}
