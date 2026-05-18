import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ja, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /ja page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "月額6.90ユーロ〜 · 14日間無料 · いつでもキャンセル",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "レストラン向けデジタルメニュー。5分で完成。",
    sub: "5分でできる、あなたのレストランのデジタルメニュー。すべて込み：ノーコードのモバイルエディタ、AIメニュースキャン、テーブル用QRコード、手数料なしの直接注文。",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "妻と私はカフェを開き、テーブル注文と予約も処理できる、扱いにくくも醜くもないレストラン向けデジタルメニューを何週間も探しました —",
    quoteAccent: "そこで自分たちが欲しいデジタルメニューを作りました。",
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
        q: "レストラン向けデジタルメニューとは何ですか？",
        a: "レストラン向けデジタルメニューは紙メニューのオンライン版です。ゲストはテーブルでスマートフォンのカメラでQRコードをスキャンし、ブラウザですぐに料理、写真、アレルゲン、価格を見ることができます — アプリ不要。IQ Restではデジタルメニューに直接テーブル注文、24/7予約、35言語のAI翻訳も含まれ、すべてスマホからリアルタイム更新できます。",
      },
      {
        q: "レストラン向けデジタルメニューの料金は？",
        a: "月額6.90ユーロ、すべて込み（年間プランで割引）。フルエディタ、無制限QRコード、手数料なしの直接注文、35言語のAI翻訳、予約、分析。14日間無料トライアル、カード不要。",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "レストラン向けデジタルメニュー。",
    headingAccent: "5分で準備完了。",
    sub: "14日間無料。カード不要。IQ Restでデジタルメニューを運営する500以上のレストランに参加しましょう。",
  },

  meta: {
    title: "レストラン向けデジタルメニュー — 5分で | IQ Rest",
    description: "レストラン向けデジタルメニュー：印刷可能なQRコード、手数料なしの直接注文、35言語のAI翻訳。5分、14日間無料。",
    canonical: "https://iq-rest.com/ja/lp/restoran-digital-menu",
    ogLocale: "ja_JP",
    ogTitle: "レストラン向けデジタルメニュー — 5分で",
    ogDescription: "QRコード、直接注文、35のAI言語によるレストラン向けデジタルメニュー。5分で公開 — 14日間無料。",
  },
};
