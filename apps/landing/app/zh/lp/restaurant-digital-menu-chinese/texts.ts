import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /zh, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /zh page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "每月6.90欧元起 · 14天免费 · 随时取消",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "餐厅数字菜单。5分钟就绪。",
    sub: "5分钟为你的餐厅打造数字菜单。全部包含：无代码移动端编辑器、AI 菜单扫描、桌台二维码以及零佣金直接下单。",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "我和妻子开了一家咖啡馆，花了几周时间寻找一种餐厅数字菜单，它能处理桌上点单和预订，又不笨重也不丑 —",
    quoteAccent: "于是我们打造了自己想要的数字菜单。",
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
        q: "什么是餐厅数字菜单？",
        a: "餐厅数字菜单是纸质菜单的在线版本：客人在桌边用手机相机扫描二维码，浏览器中立即显示菜品、照片、过敏原和价格 — 无需应用程序。在 IQ Rest 中，数字菜单还包括桌边直接点单、24/7 预订和 35 种语言的 AI 翻译 — 一切都可从手机实时更新。",
      },
      {
        q: "餐厅数字菜单费用是多少？",
        a: "每月6.90欧元，全部包含（年度计划折扣）。完整编辑器，无限二维码，零佣金直接点单，35种语言AI翻译，预订和数据分析。14天免费试用，无需信用卡。",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "餐厅数字菜单。",
    headingAccent: "5分钟即可就绪。",
    sub: "14天免费。无需信用卡。加入500多家在 IQ Rest 上运行数字菜单的餐厅。",
  },

  meta: {
    title: "餐厅数字菜单 — 5分钟 | IQ Rest",
    description: "餐厅数字菜单：可打印二维码，零佣金直接订单，35种语言AI翻译。5分钟，14天免费。",
    canonical: "https://iq-rest.com/zh/lp/restaurant-digital-menu-chinese",
    ogLocale: "zh_CN",
    ogTitle: "餐厅数字菜单 — 5分钟内",
    ogDescription: "带有二维码、直接订单和35种AI语言的餐厅数字菜单。5分钟上线 — 14天免费。",
  },
};
