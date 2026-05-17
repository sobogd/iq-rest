import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /tr, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /tr page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Restoranlar için QR menü",
    sub: "30+ ülkedeki 500+ restoran basılı menüyü QR menü ile değiştiriyor, turistlere daha çok satıyor ve teslimat komisyonlarını sıfırlıyor. 5 dakikada hazır — 14 gün ücretsiz.",
    dynamicHeadlines: [],
    headlinePrefix: "Restoranlar için ",
    accentWord: "QR menü",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Eşimle bir kafe açtık ve restoranlar için masa siparişi ve rezervasyon yapabilen, çirkin olmayan bir QR menü ararken haftalar geçirdik —",
    quoteAccent: "bu yüzden istediğimiz QR menüyü kendimiz yaptık.",
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
        q: "Restoranlar için QR menü nedir?",
        a: "Restoranlar için QR menü, müşterilerin telefon kamerasıyla masadaki QR kodu okutarak menüyü tarayıcıda açtığı sistemdir — uygulama gerekmez. IQ Rest ile QR menü masa siparişi, 24/7 rezervasyon ve 35 dile AI çeviri içerir, hepsi telefondan güncellenir.",
      },
      {
        q: "Restoranlar için QR menü ne kadar?",
        a: "Ayda 6,90 €, her şey dahil. Her masaya sınırsız QR kod, tam editör, komisyonsuz direkt sipariş, 35 dile AI çeviri, rezervasyon ve analitik. 14 gün ücretsiz, kart gerekmez.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Restoranlar için QR menü.",
    headingAccent: "5 dakikada hazır.",
    sub: "14 gün ücretsiz. Kart gerekmez. 500+ restoran QR menüsünü IQ Rest'te kullanıyor.",
  },

  meta: {
    title: "Restoranlar için QR Menü — 5 Dakikada Hazır | IQ Rest",
    description: "Restoranlar için QR menü: her masada QR kod, komisyonsuz direkt sipariş, 35 dile AI çeviri. 5 dakikada hazır, 14 gün ücretsiz.",
    canonical: "https://iq-rest.com/tr/lp/restoranlar-icin-qr-menu",
    ogLocale: "tr_TR",
    ogTitle: "Restoranlar için QR Menü — 5 Dakikada Hazır",
    ogDescription: "QR menü ile direkt sipariş, 35 dil AI ve rezervasyon. 5 dakikada hazır — 14 gün ücretsiz.",
  },
};
