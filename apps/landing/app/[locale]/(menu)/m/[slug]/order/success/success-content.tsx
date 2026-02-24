"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { clearCartClient } from "@/lib/cart";

const ORDER_DRAFT_KEY = "iqrest_order_draft";

interface OrderSuccessContentProps {
  accentColor: string;
  text: string;
}

export function OrderSuccessContent({ accentColor, text }: OrderSuccessContentProps) {
  useEffect(() => {
    clearCartClient();
    try {
      sessionStorage.removeItem(ORDER_DRAFT_KEY);
    } catch {}
  }, []);

  return (
    <div className="text-center space-y-4">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{ backgroundColor: accentColor }}
      >
        <Check className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-black">{text}</h3>
    </div>
  );
}
