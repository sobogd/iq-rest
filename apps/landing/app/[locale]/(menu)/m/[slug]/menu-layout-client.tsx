"use client";

import { useState, useCallback } from "react";
import { AdModal } from "@/components/analytics/AdModal";

interface MenuLayoutClientProps {
  showAd: boolean;
  children: React.ReactNode;
}

export function MenuLayoutClient({
  showAd,
  children,
}: MenuLayoutClientProps) {
  const [adComplete, setAdComplete] = useState(!showAd);

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
