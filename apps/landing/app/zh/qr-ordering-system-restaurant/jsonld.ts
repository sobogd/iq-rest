import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/zh/qr-ordering-system-restaurant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — 餐厅在线点餐系统",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "zh",
    offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF },
  };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = {
    "@type": "HowTo",
    name: "如何启用餐厅在线点餐系统",
    description: "4 步启用餐厅直接在线点餐 — 无 POS 硬件、无聚合方。",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "创建餐厅", text: "邮箱或 Google 30 秒注册。" },
      { "@type": "HowToStep", position: 2, name: "添加菜单", text: "拖放或 AI 扫描纸质菜单 — AI 导入分类、菜品和价格。" },
      { "@type": "HowToStep", position: 3, name: "选择渠道", text: "将订单发到厨房平板、餐厅 WhatsApp 或两者并行。" },
      { "@type": "HowToStep", position: 4, name: "打印二维码", text: "下载二维码（每桌或全店共用）并贴到桌上。" },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
