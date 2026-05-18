import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "zh", htmlDir: "ltr",
  meta: {
    title: "餐厅QR菜单 — 直接下单,零佣金 | IQ Rest",
    description: "告别纸质菜单和外卖平台佣金。QR菜单、直接下单、预订、多语言网站。14天免费,无需信用卡。",
    canonical: "https://iq-rest.com/zh", ogLocale: "zh_CN",
    ogTitle: "餐厅QR菜单 — 直接下单,零佣金",
    ogDescription: "QR菜单、直接下单、预订和AI翻译。5分钟上线。14天免费 — 无需信用卡。",
  },
  ctaText: "免费试用",
  demoText: "查看实时演示", microcopy: "14天免费 · 无需信用卡 · 随时取消",
  header: { navFeatures: "功能", navHow: "如何使用", navPricing: "价格", navFaq: "常见问题", signIn: "登录", cta: "开始" },
  hero: {
    verticals: ["餐厅", "咖啡馆", "酒吧", "酒店", "披萨店"],
    headline: "5分钟创建QR菜单。",
    sub: "为您的餐厅准备好的网站——无需开发者或外包。直接下单、预订和顾客分析尽在一个订阅中。",
    dynamicHeadlines: ["0 佣金。", "35 种语言 AI 翻译。", "在线下单。", "24/7 预订。", "高档设计。"],
    painBullets: ["0% 佣金：所有订单直接发送给您。", "AI 翻译：35 种语言提升游客客单价。", "24/7 预订：无需电话，实现满员预订。", "灵活调价：几秒钟内更新您的菜单。"],
    rating: "30多个国家500多家餐厅",
  },
  features: {
    heading: "你需要的一切。", headingAccent: "不需要的都没有。",
    sub: "为餐厅打造。在桌边使用。",
    items: [
      
      { Icon: QrCode, title: "桌边 QR 点餐系统", desc: "客人扫描桌面二维码下单，订单直达您的厨房平板或 WhatsApp。零佣金、含桌号。", tag: "QR 点餐", href: "/zh/qr-ordering-system-restaurant" },
      { Icon: Languages, title: "AI 翻译（35 种语言）", desc: "我们的 AI 懂美食。当游客真正看懂菜单时，下单量会增加 20%。", tag: "AI 翻译" },
      { Icon: CalendarCheck, title: "桌位预订", desc: "当您在厨房忙碌时，系统会自动接受预订。不再错过任何客户。", tag: "预订" },
      { Icon: Palette, title: "现代设计", desc: "视频背景和精美照片。您的菜单看起来高档且瞬间勾起食欲。", tag: "自定义设计" },
      { Icon: Smartphone, title: "即时编辑器", desc: "直接通过智能手机管理沽清列表和价格。更改立即对顾客生效。", tag: "菜单编辑器" },
      { Icon: ChefHat, title: "厨房显示屏", desc: "告别纸质小票。前厅订单直接显示在厨师的屏幕上。", tag: "厨房显示屏" },
    
    ],
  },
  founder: {
    eyebrow: "餐厅老板亲手打造",
    quoteStart: "我和妻子开了家咖啡馆,花了几周找一个能处理在线下单、预订还看着现代的系统。试过的每一个都笨重、丑陋或缺一半功能 —",
    quoteAccent: "于是我们做了自己想要的那个。",
    sign: "Bogdan Sokolov · 创始人,前咖啡馆老板",
    photoAlt: "Bogdan,IQ Rest 创始人",
  },
  how: {
    heading: "不到5分钟上线",
    sub: "四个简短步骤。无需安装,无需技术配置。",
    steps: [
      { n: "1", t: "类型和名称", d: "选择类型并输入名称。" },
      { n: "2", t: "保存", d: "邮箱或使用 Google 登录。" },
      { n: "3", t: "菜单", d: "手动创建或扫描纸质菜单。" },
      { n: "4", t: "完成", d: "查看、分享、开始接单。" },
    ],
  },
  pricing: {
    badge: "零佣金 · 无合同",
    heading: "一个套餐。", headingAccent: "全部包含。",
    sub: "QR菜单、订单、AI翻译、餐厅网站和预订。一个简单的价格。",
    monthlyLabel: "按月", yearlyLabel: "按年", saveBadge: "省25%", perMonth: "每月",
    billedAnnually: "年付 {total}", youSave: "节省 {amount}",
    trust: { secure: "Stripe安全支付", noCommitment: "无承诺", quick: "几分钟即激活", restaurants: "500+ 餐厅" },
  },
  faq: {
    eyebrow: "有问题?", heading: "常见", headingAccent: "问题。",
    sub: "餐厅老板注册前会问的。没看到你的?在WhatsApp上写给我们 — 真人回复。",
    whatsappCta: "在WhatsApp上提问", whatsappPrefill: "你好,我有关于IQ Rest的问题",
    items: [
      { q: "免费试用包含什么,之后呢?", a: "14天完整访问,无需信用卡。14天后如果你不添加付款方式,账户暂停 — 我们绝不自动扣款。稍后添加付款信息即可重新激活。一键取消。" },
      { q: "你们对订单收佣金吗?", a: "零。你QR菜单的每笔订单都直接给你 — 我们没有抽成,没有美团/饿了么费用。一个固定月费,就这些。" },
      { q: "客人需要APP吗?我需要技术技能吗?", a: "客人无需APP — 摄像头扫描QR,菜单在浏览器中打开。你无需技术技能 — 整个仪表板在手机上运行,点击添加,拖拽排序,这就是全部学习曲线。" },
      { q: "改价和加菜有多快?", a: "即时。在手机上改价,客人几秒内看到。新菜?点击、输入、照片,完成 — 无需重印,无需等设计师。" },
      { q: "支持多少种语言?", a: "35种语言,内置AI翻译。一点翻译整个菜单,AI懂烹饪上下文 — 名称和描述在每种语言中都自然。游客真正理解时下单更多。" },
    ],
  },
  finalCta: { heading: "5分钟上线。", headingAccent: "14天免费。", sub: "无需信用卡。随时取消。加入已在IQ Rest上的500多家餐厅。" },
  scan: {
    heading: "有纸质菜单或 PDF？",
    headingAccent: "AI 60 秒数字化。",
    sub: "上传即可 — AI 自动识别分类、菜品和价格。",
    cta: "扫描我的菜单 →",
  },
  footer: {
    featureLinks: [
      { href: "/zh/qr-ordering-system-restaurant", label: "在线点餐系统" }, { href: "/zh/ai-translation", label: "AI翻译" },
      { href: "/zh/reservations", label: "预订" }, { href: "/zh/mobile-management", label: "手机管理" },
      { href: "/zh/easy-menu", label: "菜单编辑器" }, { href: "/zh/custom-design", label: "视频和照片背景" },
      { href: "/zh/color-scheme", label: "品牌色彩" }, { href: "/zh/multilingual", label: "多语言网站" },
      { href: "/zh/ai-images", label: "AI图片优化" }, { href: "/zh/analytics", label: "分析" },
      { href: "/zh/instant-setup", label: "即时设置" }, { href: "/zh/personal-support", label: "专属支持" },
    ],
    navLinks: [
      { href: "#pricing", label: "价格" }, { href: "#faq", label: "问题" },
      { href: "/zh/languages", label: "切换语言" },
    ],
    copyrightTemplate: "© {year} IQ Rest。版权所有。",
  },
};
