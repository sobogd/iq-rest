"use client";

import { useState, useCallback } from "react";
import { PageTracker } from "./PageTracker";
import { AdModal } from "./AdModal";

interface MenuContentProps {
  slug: string;
  page: string;
  language: string;
  initialShowAd: boolean;
  children: React.ReactNode;
}

export function MenuContent({
  slug,
  page,
  language,
  initialShowAd,
  children,
}: MenuContentProps) {
  const [showAd, setShowAd] = useState(initialShowAd);
  const [adComplete, setAdComplete] = useState(!initialShowAd);

  const handleTrackResult = useCallback(
    (result: { showAd: boolean; remaining: number | null }) => {
      // If server says show ad and we haven't shown it yet
      if (result.showAd && !adComplete) {
        setShowAd(true);
      }
    },
    [adComplete]
  );

  const handleAdComplete = useCallback(() => {
    setAdComplete(true);
    setShowAd(false);
  }, []);

  return (
    <>
      <PageTracker
        slug={slug}
        page={page}
        language={language}
        onResult={handleTrackResult}
      />

      {showAd && !adComplete && <AdModal onComplete={handleAdComplete} />}

      {children}
    </>
  );
}
