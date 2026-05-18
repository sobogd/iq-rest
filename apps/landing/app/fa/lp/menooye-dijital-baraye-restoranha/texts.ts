import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /fa, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /fa page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "از ۶٫۹۰ یورو/ماه · ۱۴ روز رایگان · هر زمان لغو کنید",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "منوی دیجیتال برای رستوران‌ها. آماده در ۵ دقیقه.",
    sub: "منوی دیجیتال برای رستوران شما در ۵ دقیقه. همه چیز شامل است: ویرایشگر موبایل بدون کد، اسکن منو با هوش مصنوعی، کد QR برای میزها و سفارش‌های مستقیم بدون کمیسیون.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "همسرم و من یک کافه باز کردیم و هفته‌ها به‌دنبال منوی دیجیتال برای رستوران‌ها بودیم که سفارش سر میز و رزرو را نیز اداره کند، بدون آنکه سنگین یا زشت باشد —",
    quoteAccent: "بنابراین منوی دیجیتالی را ساختیم که خودمان می‌خواستیم.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "منوی دیجیتال برای رستوران‌ها چیست؟",
        a: "منوی دیجیتال برای رستوران‌ها نسخه آنلاین منوی کاغذی است: مهمان روی میز با گوشی کد QR را اسکن می‌کند و بلافاصله غذاها، عکس‌ها، آلرژن‌ها و قیمت‌ها را در مرورگر می‌بیند — بدون اپلیکیشن. با IQ Rest منوی دیجیتال شامل سفارش مستقیم سر میز، رزرو ۲۴/۷ و ترجمه AI به ۳۵ زبان نیز هست — همه چیز در زمان واقعی از گوشی به‌روزرسانی می‌شود.",
      },
      {
        q: "هزینه منوی دیجیتال برای رستوران‌ها چقدر است؟",
        a: "۶٫۹۰ یورو در ماه، همه‌چیز شامل (تخفیف طرح سالانه). ویرایشگر کامل، QR نامحدود، سفارش مستقیم بدون کمیسیون، ترجمه AI به ۳۵ زبان، رزرو و تحلیل. ۱۴ روز رایگان، بدون کارت.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "منوی دیجیتال برای رستوران‌ها.",
    headingAccent: "در ۵ دقیقه آماده.",
    sub: "۱۴ روز رایگان. بدون کارت. به ۵۰۰+ رستورانی که منوی دیجیتال خود را روی IQ Rest اجرا می‌کنند بپیوندید.",
  },

  meta: {
    title: "منوی دیجیتال برای رستوران‌ها — ۵ دقیقه | IQ Rest",
    description: "منوی دیجیتال برای رستوران‌ها: QR قابل چاپ، سفارش مستقیم بدون کمیسیون، ترجمه AI به ۳۵ زبان. ۵ دقیقه، ۱۴ روز رایگان.",
    canonical: "https://iq-rest.com/fa/lp/menooye-dijital-baraye-restoranha",
    ogLocale: "fa_IR",
    ogTitle: "منوی دیجیتال برای رستوران‌ها — در ۵ دقیقه",
    ogDescription: "منوی دیجیتال برای رستوران‌ها با QR، سفارش مستقیم و ۳۵ زبان AI. در ۵ دقیقه آماده — ۱۴ روز رایگان.",
  },
};
