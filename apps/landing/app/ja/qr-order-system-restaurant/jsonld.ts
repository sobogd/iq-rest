import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/ja/qr-order-system-restaurant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — 飲食店向け QR オーダーシステム",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "ja",
    offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF },
  };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = {
    "@type": "HowTo",
    name: "飲食店向けオーダーシステムの有効化方法",
    description: "POS ハードウェアやアグリゲーター不要、4 ステップで自店のオンライン注文を稼働。",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "店舗作成", text: "メール or Google で 30 秒登録。" },
      { "@type": "HowToStep", position: 2, name: "メニュー追加", text: "ドラッグ&ドロップ、または紙メニューを AI スキャン — カテゴリ・商品・価格を自動取り込み。" },
      { "@type": "HowToStep", position: 3, name: "チャネル選択", text: "注文をキッチンタブレット、店舗 WhatsApp、または両方に送信。" },
      { "@type": "HowToStep", position: 4, name: "QR 印刷", text: "QR（テーブル毎 or 店舗共通）をダウンロードしてテーブルに貼付。" },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
