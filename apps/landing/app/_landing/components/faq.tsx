"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { LinkForward } from "./link-forward";
import type { LandingTexts } from "../types";

const WHATSAPP_NUMBER = "34637621754";

interface FaqProps {
  texts: LandingTexts["faq"];
}

export function Faq({ texts }: FaqProps) {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texts.whatsappPrefill)}`;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="text-center lg:text-start">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/20 px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            {texts.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 leading-[1.15]">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-snug mb-5">
            {texts.sub}
          </p>
          <LinkForward
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            trackEvent="land_faq_whatsapp_click"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            {texts.whatsappCta}
          </LinkForward>
        </div>

        <div className="flex flex-col gap-3">
          {texts.items.map(({ q, a }, idx) => (
            <details
              key={q}
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) {
                  analytics.track(`land_faq_item_${idx + 1}_open`);
                }
              }}
              className="group bg-muted/20 border border-border rounded-2xl px-5 py-4 open:bg-muted/30 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-base font-medium tracking-tight">
                <span>{q}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
