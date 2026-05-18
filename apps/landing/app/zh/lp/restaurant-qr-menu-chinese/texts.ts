import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /zh, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /zh page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "餐厅二维码菜单。5分钟就绪。",
    sub: "5分钟为你的餐厅打造二维码菜单。全部包含：无代码移动端编辑器、AI 菜单扫描、桌台二维码以及零佣金直接下单。",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "我和妻子开了一家咖啡馆，花了几周寻找能同时支持桌面点单和预订的餐厅QR菜单，但都不够好用 —",
    quoteAccent: "于是我们自己做了想要的QR菜单。",
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
        q: "餐厅QR菜单是什么？",
        a: "餐厅QR菜单是桌面上可打印的QR码，顾客用手机相机扫描即可在浏览器中打开菜单 — 无需安装应用。使用IQ Rest，QR菜单包含桌面点单、24/7预订和35种语言AI翻译，全部通过手机更新。",
      },
      {
        q: "餐厅QR菜单多少钱？",
        a: "每月6.90欧元，全部包含。每张桌子无限QR码、完整编辑器、零佣金直接点单、35种语言AI翻译、预订和分析。14天免费试用，无需信用卡。",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "餐厅QR菜单。",
    headingAccent: "5分钟内准备好。",
    sub: "14天免费。无需信用卡。500多家餐厅已在IQ Rest使用QR菜单。",
  },

  meta: {
    title: "餐厅QR菜单 — 5分钟即可使用 | IQ Rest",
    description: "餐厅QR菜单：每张桌子上的QR码、零佣金直接点单、35种语言AI翻译。5分钟内上线，14天免费。",
    canonical: "https://iq-rest.com/zh/lp/restaurant-qr-menu-chinese",
    ogLocale: "zh_CN",
    ogTitle: "餐厅QR菜单 — 5分钟即可使用",
    ogDescription: "QR菜单提供直接点单、35种AI语言和预订。5分钟内上线 — 14天免费。",
  },
};
