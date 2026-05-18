import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ja, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /ja page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "レストラン向けQRメニュー。5分で完成。",
    sub: "5分でできる、あなたのレストランのQRメニュー。すべて込み：ノーコードのモバイルエディタ、AIメニュースキャン、テーブル用QRコード、手数料なしの直接注文。",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "妻と私はカフェを開き、テーブル注文と予約も使えるレストラン向けQRメニューを何週間も探していました —",
    quoteAccent: "そこで欲しかったQRメニューを自分たちで作りました。",
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
        q: "レストラン向けQRメニューとは？",
        a: "レストラン向けQRメニューは、テーブルに置く印刷可能なQRコードで、お客様がスマートフォンのカメラで読み取るとブラウザでメニューが開きます。アプリ不要。IQ Restならテーブル注文、24時間予約、35言語AI翻訳もすべてスマホから更新可能です。",
      },
      {
        q: "レストラン向けQRメニューの料金は？",
        a: "月額6.90ユーロですべて込み。各テーブル無制限QRコード、フルエディター、手数料ゼロの直接注文、35言語AI翻訳、予約、分析。14日間無料、カード不要。",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "レストラン向けQRメニュー。",
    headingAccent: "5分で準備完了。",
    sub: "14日間無料。カード不要。500軒以上のレストランがIQ RestでQRメニューを利用中。",
  },

  meta: {
    title: "レストラン向けQRメニュー — 5分で完成 | IQ Rest",
    description: "レストラン向けQRメニュー：各テーブルにQRコード、手数料ゼロの直接注文、35言語AI翻訳。5分で公開、14日間無料。",
    canonical: "https://iq-rest.com/ja/lp/restoran-qr-menu",
    ogLocale: "ja_JP",
    ogTitle: "レストラン向けQRメニュー — 5分で完成",
    ogDescription: "QRメニューと直接注文、35言語AI、予約。5分で公開 — 14日間無料。",
  },
};
