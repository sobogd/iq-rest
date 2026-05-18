import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /tr, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /tr page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "6,90 €/aydan · 14 gün ücretsiz · İstediğin zaman iptal",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Restoranlar için Dijital Menü. 5 dakikada hazır.",
    sub: "Restoranınız için 5 dakikada dijital menü. Her şey dahil: kodsuz mobil editör, yapay zeka menü tarama, masalar için QR kodları ve komisyonsuz doğrudan siparişler.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Eşim ve ben bir kafe açtık ve haftalarca masa siparişini ve rezervasyonu da yöneten, hantal ya da çirkin olmayan restoranlar için dijital menü aradık —",
    quoteAccent: "bu yüzden kendi istediğimiz dijital menüyü inşa ettik.",
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
        q: "Restoranlar için dijital menü nedir?",
        a: "Restoranlar için dijital menü, kağıt menünün çevrimiçi sürümüdür: misafir masada QR kodu telefonla tarar ve hemen yemekleri, fotoğrafları, alerjenleri ve fiyatları tarayıcıda görür — uygulamasız. IQ Rest ile dijital menü ayrıca masada doğrudan sipariş, 24/7 rezervasyon ve 35 dile AI çeviri içerir — her şey telefondan gerçek zamanlı güncellenir.",
      },
      {
        q: "Restoranlar için dijital menü ne kadar?",
        a: "6,90 €/ay, her şey dahil (yıllık planda indirim). Tam editör, sınırsız QR kod, komisyonsuz doğrudan sipariş, 35 dile AI çeviri, rezervasyon ve analitik. 14 günlük ücretsiz deneme, kart gerekmez.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Restoranlar için dijital menü.",
    headingAccent: "5 dakikada hazır.",
    sub: "14 gün ücretsiz. Kart yok. Dijital menülerini IQ Rest üzerinde çalıştıran 500+ restorana katıl.",
  },

  meta: {
    title: "Restoranlar için Dijital Menü — 5 Dk | IQ Rest",
    description: "Restoranlar için dijital menü: yazdırılabilir QR kod, komisyonsuz doğrudan siparişler, 35 dile AI çeviri. 5 dakika, 14 gün ücretsiz.",
    canonical: "https://iq-rest.com/tr/lp/restoranlar-icin-dijital-menu",
    ogLocale: "tr_TR",
    ogTitle: "Restoranlar için Dijital Menü — 5 Dakikada",
    ogDescription: "Restoranlar için dijital menü QR kod, doğrudan sipariş ve 35 AI diliyle. 5 dakikada yayında — 14 gün ücretsiz.",
  },
};
