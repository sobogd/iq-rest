import { MessageCircle } from "lucide-react";
import { FaqItem } from "./faq-item";
import { LinkForward } from "./link-forward";
import type { LandingTexts } from "../types";

const WHATSAPP_NUMBER = "34637621754";

interface FaqProps {
  texts: LandingTexts["faq"];
}

export function Faq({ texts }: FaqProps) {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texts.whatsappPrefill)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-10 lg:gap-14 w-full">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-start lg:sticky lg:top-24">
        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] font-medium tracking-tight mb-3 leading-[1.05]">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 max-w-xl leading-snug mb-5">
          {texts.sub}
        </p>
        <LinkForward
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          trackEvent="l_faq_whatsapp_click"
          className="inline-flex items-center justify-center gap-2 min-h-11 py-2 px-6 rounded-lg bg-[#0F766E] text-white text-sm font-semibold leading-tight hover:opacity-90 active:scale-[0.99] transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          {texts.whatsappCta}
        </LinkForward>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {texts.items.map(({ q, a }, idx) => (
          <FaqItem key={q} q={q} a={a} position={idx + 1} />
        ))}
      </div>
    </div>
  );
}
