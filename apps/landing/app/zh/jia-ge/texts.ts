import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "价格 — 为您的餐厅提供一个计划,起价 6.90 €/月 | IQ Rest",
    description:
      "餐厅一个计划,起价 6.90 €/月:QR 菜单、接单、AI 翻译、预订、KDS、分析。无限制。14 天免费,无需信用卡,随时取消。",
    canonical: "https://iq-rest.com/zh/jia-ge",
    ogLocale: "zh_CN",
    ogTitle: "价格 — 为您的餐厅提供一个计划",
    ogDescription:
      "6.90 €/月:QR 菜单、点餐、AI 翻译、预订、KDS、分析。无隐藏费用。14 天免费。",
  },
};
