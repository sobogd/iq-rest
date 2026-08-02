import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "zh",
  htmlDir: "ltr",

  meta: {
    title: "数字菜单、厨房显示屏与预订 — IQ Rest",
    description:
      "用一个应用运营餐厅:多语言数字菜单、厨房显示屏与 24/7 预订。5 分钟上线。14 天免费,无需银行卡。",
    canonical: "https://iq-rest.com/zh",
    ogLocale: "zh_CN",
    ogTitle: "数字菜单、厨房显示屏与预订",
    ogDescription:
      "用一个应用运营餐厅:多语言数字菜单、厨房显示屏与 24/7 预订。5 分钟上线。14 天免费,无需银行卡。",
  },

  ctaText: "免费试用",
  homeCtaText: "免费试用",
  trust: [
    { kind: "num", value: 35, label: "种菜单语言" },
    { kind: "text", value: "24/7", label: "在线预订" },
    { kind: "num", value: 5, suffix: "分钟", label: "即可上线" },
    { kind: "count", label: "家餐厅选择我们" },
  ],
  demoText: "观看演示",
  microcopy: "14 天免费 · 无需信用卡 · 随时取消",

  header: {
    navFeatures: "功能",
    navHow: "工作原理",
    navPricing: "价格",
    navFaq: "常见问题",
    signIn: "登录",
    viewFeatures: "查看功能",
    cta: "免费试用",
  },

  hero: {
    verticals: ["餐厅", "咖啡馆", "酒吧", "酒店", "比萨店"],
    headline: "餐厅数字菜单。\n5 分钟上线。",
    sub: "5 分钟内为您的餐厅创建数字菜单。一切包含在内:无代码编辑器、印刷菜单的 AI 识别、餐桌 QR 码,以及无佣金的直接订单。",
    dynamicHeadlines: ["0% 佣金。", "35 种 AI 语言。", "在线订单。", "24/7 预订。", "高级设计。"],
    painBullets: [
      "0% 佣金:每个订单直接到达您的餐厅。",
      "AI 翻译成 35 种语言 — 游客理解菜单并点更多。",
      "24/7 预订:客人在繁忙时段无需电话,自己预订餐桌。",
      "灵活定价:菜单更新数秒内上线。",
    ],
    rating: "30 多个国家的 500 多家餐厅",
  },

  features: {
    heading: "您所需的一切。",
    headingAccent: "毫无多余。",
    sub: "为餐厅而建。每天在餐桌、厨房和大堂中使用。",
    items: [
      { Icon: Monitor, title: "数字菜单", desc: "浏览器中的菜单,包含图片、价格、过敏原和描述。从手机实时更新。客人以自己的语言查看菜单;餐厅节省印刷成本。", tag: "数字菜单", href: "/zh/shu-zi-cai-dan-can-ting" },
      { Icon: Receipt, title: "接单:客人和服务员", desc: "餐桌上一个 QR 码供客人使用,或服务员从手机接单 — 两者都直接发送到厨房或 WhatsApp。无佣金,每张收据上都有桌号。", tag: "订单", href: "/zh/dian-can-xi-tong-can-ting" },
      { Icon: CalendarCheck, title: "24/7 餐桌预订", desc: "当您忙于大堂时,客人通过网站或 QR 菜单自己预订餐桌。按餐桌的日历、自动确认和提醒。一位客人也不会错过。", tag: "预订", href: "/zh/yu-ding-zhuo-wei" },
      { Icon: ChefHat, title: "厨房显示屏 (KDS)", desc: "不再需要纸质订单。来自大堂的订单直接出现在厨师的屏幕上 — 「准备中 / 已完成 / 已上菜」列、过敏原和注释以颜色突出显示。在平板电脑或手机上。", tag: "KDS", href: "/zh/hou-chu-xian-shi-qi" },
    ],
  },

  founder: {
    eyebrow: "由餐厅老板打造",
    quoteStart:
      "我和妻子经营过自己的咖啡馆,亲身了解餐厅日常真实的样子 — 接单、预订、大堂和厨房流程。我们想要一个工具:现代、易于启动、第一眼就清晰 —",
    quoteAccent: "于是我们开始构建现在为其他餐厅老板开发的这个平台。",
    sign: "Bogdan Sokolov · 创始人,前咖啡馆老板",
    photoAlt: "IQ Rest 创始人 Bogdan Sokolov",
  },

  how: {
    heading: "5 分钟上线",
    sub: "四个简短步骤。无安装,无技术配置。",
    steps: [
      { n: "1", t: "类型和名称", d: "选择场所类型并输入名称。" },
      { n: "2", t: "保存", d: "输入您的电子邮件或使用 Google 登录。" },
      { n: "3", t: "菜单", d: "手动添加商品或上传印刷菜单进行 AI 扫描。" },
      { n: "4", t: "完成", d: "分享链接或 QR 码,开始接单。" },
    ],
  },

  pricing: {
    badge: "无佣金 · 无合同",
    heading: "一个计划。",
    headingAccent: "全部包含。",
    sub: "QR 菜单、接单、AI 翻译、餐厅网站和预订。一笔透明的月费。",
    monthlyLabel: "按月",
    yearlyLabel: "按年",
    saveBadge: "节省 25%",
    perMonth: "每月",
    billedAnnually: "按年计费:{total}",
    youSave: "您节省 {amount}",
    trust: { secure: "通过 Stripe 安全支付", noCommitment: "无承诺", quick: "几分钟内激活", restaurants: "500+ 家餐厅" },
  },

  faq: {
    eyebrow: "有问题吗?",
    heading: "常见",
    headingAccent: "问题。",
    sub: "餐厅老板在注册前常问的问题。找不到您的问题?在 WhatsApp 上给我们留言 — 真实的人回复,而不是机器人。",
    whatsappCta: "在 WhatsApp 上提问",
    whatsappPrefill: "您好,我对 IQ Rest 有一个问题",
    items: [
      { q: "试用期包含什么?之后会怎样?", a: "14 天内全权访问所有功能,无需信用卡。14 天后,如未添加付款方式,账户将暂停 — 我们绝不自动扣款。您可以稍后添加付款方式并从中断处继续。随时一键取消。" },
      { q: "您从订单中收取佣金吗?", a: "不。来自 QR 菜单的每个订单都直接到达餐厅 — 我们这边没有百分比,也没有聚合器佣金。固定的月费,别无其他。" },
      { q: "客人需要应用程序吗?我们需要技术知识吗?", a: "客人不需要应用程序 — 他们将手机相机对准 QR 码,菜单就会在浏览器中打开。餐厅也不需要技术知识:管理面板可以在手机、平板电脑或笔记本电脑上的任何现代浏览器中运行。每个操作都通过点击和拖放完成,无需代码。" },
      { q: "价格变更和新菜品出现的速度有多快?", a: "立即。从手机上更改价格 — 客人在数秒内看到。新菜品只需几下点击:名称、价格、照片。无需重新印刷,无需等待设计师。" },
      { q: "支持多少种语言?", a: "35 种语言,内置 AI 翻译。一键即可翻译整个菜单;AI 理解烹饪上下文 — 名称和描述在任何语言中都听起来自然。当游客真正理解菜单时,他们会更有信心地点餐。" },
    ],
  },

  finalCta: {
    heading: "5 分钟上线。",
    headingAccent: "14 天免费。",
    sub: "无需信用卡,随时取消。加入已经使用 IQ Rest 的 500+ 家餐厅。",
  },

  featureHighlights: {
    heading: "功能全包含",
    sub: "把顾客变成订单的功能——每个套餐都包含，无额外费用。",
  },

  scan: {
    heading: "有纸质菜单或 PDF 吗?",
    headingAccent: "AI 在 60 秒内将其数字化。",
    sub: "上传照片或文档 — AI 自动识别类别、菜品和价格。",
    cta: "扫描菜单 →",
  },

  pricingQuiz: {
    heading: "搭建您的套餐",
    sub: "只为您使用的功能付费。从菜单开始，按需添加。",
    billingLabel: "计费方式:",
    monthly: "按月",
    yearly: "按年",
    restaurantsLabel: "餐厅:",
    fewerAria: "减少餐厅",
    moreAria: "增加餐厅",
    menuTitle: "数字菜单",
    menuHint: "始终包含",
    reservationsTitle: "预订",
    reservationsHint: "餐桌预订",
    kdsTitle: "厨房显示屏",
    kdsHint: "厨房屏幕上的订单",
    domainTitle: "自定义域名",
    domainHint: "您专属的网址",
    perMonthSuffix: "/月",
    perYearSuffix: "/年",
    perMonthLongSuffix: "/月",
    saveYearlyTemplate: "选择按年计费每年可省 {amount}",
    volumeDiscountTemplate: "{percent}% 数量折扣 · {count} 家餐厅",
    saveUpToHint: "5 家以上餐厅最多可省 50%",
    billedYearly: "每年计费一次",
    billedMonthly: "按月计费",
    enterprisePre: "需要定制套餐或更多餐厅？",
    enterpriseCta: "联系我们",
    enterprisePost: "我们将为您量身定制。",
    enterpriseWa: "您好！我想为我的餐厅定制一个套餐。",
  },

  pricingCta: {
    heading: "简单灵活的定价",
    sub: "只为您需要的功能付费 — 一分钟搭建您专属的套餐。",
    fromTemplate: "{price}/月起",
    button: "计算您的套餐",
  },

  footer: {
    featureLinks: [
      { href: "/zh/shu-zi-cai-dan-can-ting", label: "数字菜单" },
      { href: "/zh/dian-can-xi-tong-can-ting", label: "订单" },
      { href: "/zh/yu-ding-zhuo-wei", label: "预订" },
      { href: "/zh/hou-chu-xian-shi-qi", label: "厨房显示屏" },
    ],
    navLinks: [
      { href: "/zh/jia-ge", label: "价格" },
      { href: "#faq", label: "常见问题" },
      { href: "/zh/languages", label: "切换语言" },
    ],
    copyrightTemplate: "© {year} IQ Rest。保留所有权利。",
  },
};
