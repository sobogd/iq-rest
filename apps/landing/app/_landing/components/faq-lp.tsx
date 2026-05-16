import { MessageCircle } from "lucide-react";
import { FaqItem } from "./faq-item";
import { LinkForward } from "./link-forward";
import type { LandingTexts } from "../types";

const WHATSAPP_NUMBER = "34637621754";

interface FaqProps {
  texts: LandingTexts["faq"];
}

export function FaqLp({ texts }: FaqProps) {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texts.whatsappPrefill)}`;

  return (
    <div className="flex flex-col gap-10 items-stretch max-w-4xl mx-auto">
      <div className="text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 leading-[1.15]">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-md lg:max-w-2xl mx-auto leading-snug mb-5">
          {texts.sub}
        </p>
        <LinkForward
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          trackEvent="land_faq_whatsapp_click"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#0F766E] text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          {texts.whatsappCta}
        </LinkForward>
      </div>

      <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
        {texts.items.map(({ q, a }, idx) => (
          <FaqItem key={q} q={q} a={a} position={idx + 1} />
        ))}
      </div>
    </div>
  );
}
