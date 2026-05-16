"use client";

import { ArrowRight, CalendarDays, Globe, Phone } from "lucide-react";
import { PhoneFrame } from "./phone-frame";
import { RESTAURANT } from "./data";
import { getChrome } from "./chrome-i18n";

interface Props {
  locale: string;
  className?: string;
  /** Override the brand title rendered as the hero H1 inside the mockup
   *  (defaults to RESTAURANT.title). PPC LPs pass "IQ Rest" here to show
   *  our brand instead of the generic placeholder restaurant name. */
  brandName?: string;
}

export function MockHome({ locale, className, brandName }: Props) {
  const chrome = getChrome(locale);
  const accent = RESTAURANT.accentColor;
  const title = brandName ?? RESTAURANT.title;

  return (
    <PhoneFrame className={className} notch>
      <div className="h-full flex flex-col">
        <div className="flex-1 relative overflow-hidden min-h-[50%]">
          <div className="absolute inset-0" style={{ backgroundColor: accent }} />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={RESTAURANT.videoWebm} type="video/webm" />
            <source src={RESTAURANT.videoMp4} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 z-[2]" />
          <div className="absolute inset-x-0 top-[30%] z-10 flex justify-center px-[8%]">
            <div className="max-w-[440px] w-full">
              <h1 className="text-6xl font-black text-white break-words">{title}</h1>
              <p className="text-xl text-white/90 mt-3">{RESTAURANT.description}</p>
            </div>
          </div>
        </div>

        <nav className="bg-white">
          {RESTAURANT.hasReservations ? (
            <div className="border-t border-gray-300/25 flex justify-center px-[8%]">
              <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
                <CalendarDays className="h-5 w-5" />
                {chrome.reserve}
              </span>
            </div>
          ) : null}
          {RESTAURANT.hasContacts ? (
            <div className="border-t border-gray-300/25 flex justify-center px-[8%]">
              <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
                <Phone className="h-5 w-5" />
                {chrome.contacts}
              </span>
            </div>
          ) : null}
          {RESTAURANT.hasMultipleLanguages ? (
            <div className="border-t border-gray-300/25 flex justify-center px-[8%]">
              <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
                <Globe className="h-5 w-5" />
                {chrome.language}
              </span>
            </div>
          ) : null}
        </nav>

        <div className="flex justify-center px-[8%]" style={{ backgroundColor: accent }}>
          <span className="max-w-[440px] w-full py-8 flex items-center justify-between text-white font-bold uppercase text-xl">
            {chrome.onlineMenu}
            <ArrowRight className="h-6 w-6" strokeWidth={3} />
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
