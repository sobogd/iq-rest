import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /fa, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /fa page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "منوی QR برای رستوران‌ها. آماده در ۵ دقیقه.",
    sub: "منوی QR برای رستوران شما در ۵ دقیقه. همه چیز شامل است: ویرایشگر موبایل بدون کد، اسکن منو با هوش مصنوعی، کد QR برای میزها و سفارش‌های مستقیم بدون کمیسیون.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "من و همسرم یک کافه باز کردیم و هفته‌ها دنبال منوی QR برای رستوران‌ها با سفارش روی میز و رزرو بدون رابط زشت گشتیم —",
    quoteAccent: "پس منوی QR را خودمان ساختیم.",
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
        q: "منوی QR برای رستوران‌ها چیست؟",
        a: "منوی QR برای رستوران‌ها کد QR قابل چاپی است که روی میز قرار می‌گیرد و مشتری با دوربین گوشی آن را اسکن می‌کند تا منو در مرورگر باز شود — بدون نیاز به اپلیکیشن. با IQ Rest منوی QR شامل سفارش روی میز، رزرو 24/7 و ترجمه AI به 35 زبان است که همگی از موبایل به‌روز می‌شوند.",
      },
      {
        q: "هزینه منوی QR برای رستوران‌ها چقدر است؟",
        a: "ماهی 6.90 یورو، همه چیز شامل. کد QR نامحدود برای هر میز، ویرایشگر کامل، سفارش مستقیم بدون کارمزد، ترجمه AI به 35 زبان، رزرو و تحلیل. 14 روز رایگان، بدون کارت.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "منوی QR برای رستوران‌ها.",
    headingAccent: "در 5 دقیقه آماده.",
    sub: "14 روز رایگان. بدون کارت. بیش از 500 رستوران از منوی QR در IQ Rest استفاده می‌کنند.",
  },

  meta: {
    title: "منوی QR برای رستوران‌ها — در 5 دقیقه | IQ Rest",
    description: "منوی QR برای رستوران‌ها: کد QR روی هر میز، سفارش مستقیم بدون کارمزد، ترجمه AI به 35 زبان. در 5 دقیقه آماده، 14 روز رایگان.",
    canonical: "https://iq-rest.com/fa/lp/menooye-qr-baraye-restoranha",
    ogLocale: "fa_IR",
    ogTitle: "منوی QR برای رستوران‌ها — در 5 دقیقه آماده",
    ogDescription: "منوی QR با سفارش مستقیم، 35 زبان AI و رزرو. در 5 دقیقه آماده — 14 روز رایگان.",
  },
};
