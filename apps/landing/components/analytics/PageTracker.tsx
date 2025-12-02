"use client";

import { useEffect, useRef } from "react";

interface PageTrackerProps {
  slug: string;
  page: string;
  language: string;
  onResult?: (result: { showAd: boolean; remaining: number | null }) => void;
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

export function PageTracker({ slug, page, language, onResult }: PageTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const sessionId = getSessionId();
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
        language,
        referrer,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (onResult && data.success) {
          onResult({
            showAd: data.showAd,
            remaining: data.remaining,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to track page view:", err);
      });
  }, [slug, page, language, onResult]);

  return null;
}
