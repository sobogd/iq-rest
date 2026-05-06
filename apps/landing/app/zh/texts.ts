import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "zh", htmlDir: "ltr",
  meta: {
    title: "餐厅QR菜单 — 直接下单,零佣金 | IQ Rest",
    description: "告别纸质菜单和外卖平台佣金。QR菜单、直接下单、预订、多语言网站。14天免费,无需信用卡。",
    canonical: "https://iq-rest.com/zh", ogLocale: "zh_CN",
    ogTitle: "餐厅QR菜单 — 直接下单,零佣金",
    ogDescription: "QR菜单、直接下单、预订和AI翻译。2分钟上线。14天免费 — 无需信用卡。",
  },
  ctaText: "免费开始 →",
  demoText: "查看实时演示", microcopy: "14天免费 · 无需信用卡 · 随时取消",
  header: { navFeatures: "功能", navHow: "如何使用", navPricing: "价格", navFaq: "常见问题", signIn: "登录", cta: "免费开始 →" },
  hero: {
    verticals: ["餐厅", "咖啡馆", "酒吧", "酒店", "披萨店"],
    variants: [
      { headline: "别再印菜单了。", headlineAccent: "别再给外卖平台30%了。", sub: "QR菜单、直接下单、预订和多语言网站。2分钟上线 — 无需信用卡。" },
      { headline: "你的餐厅值得拥有的不止是", headlineAccent: "纸质菜单和漏接的电话。", sub: "直接下单、即时菜单更新和24/7预订。2分钟设置完成。" },
      { headline: "一个二维码。", headlineAccent: "零佣金。再见纸质。", sub: "QR菜单、在线下单和预订 — 都在一处。14天免费,无需信用卡。" },
      { headline: "接收直接订单。", headlineAccent: "跳过佣金。", sub: "客人扫码、下单、付款 — 直接给你,没有美团那一刀。2分钟上线。" },
      { headline: "更多订单。更多预订。", headlineAccent: "无纸,无APP。", sub: "QR菜单 + 预订 + 多语言网站自动驾驶。14天免费试用。" },
      { headline: "游客看不懂菜单?", headlineAccent: "2分钟搞定。", sub: "AI将整个菜单翻译成35种语言。还包含QR下单和预订。" },
      { headline: "从纸菜单到二维码,", headlineAccent: "趁咖啡还没凉。", sub: "QR菜单、直接下单和24/7预订。2分钟上线 — 无需信用卡。" },
      { headline: "意外简单的QR菜单。", headlineAccent: "里面静静地强大。", sub: "直接下单、AI翻译、预订和网站 — 手机一点全搞定。" },
    ],
    painBullets: ["免印刷 — 价格立即修改", "零佣金 — 订单直达你手", "无漏接电话 — 24/7预订", "35种语言 — 不再丢失任何游客"],
    rating: "4.9 · 30多个国家500多家餐厅",
  },
  features: {
    heading: "你需要的一切。", headingAccent: "不需要的都没有。",
    sub: "为餐厅打造。在桌边使用。",
    items: [
      { Icon: ScanLine, title: "保留每笔订单的100%", desc: "客人扫码、下单、付款 — 直接给你。无需下载APP,没有30%外卖抽成。每笔订单实时带桌号进入仪表板。", tag: "直接下单" },
      { Icon: Languages, title: "用游客的语言销售", desc: "一点将整个菜单翻译成35种语言。AI懂得烹饪上下文 — 游客真正理解菜品时下单更多。", tag: "AI 翻译" },
      { Icon: CalendarCheck, title: "做菜时也不丢预订", desc: "客人24/7预订,无需电话。自动或手动确认,邮件提醒包含 — 减少爽约,零压力。", tag: "预订" },
      { Icon: Palette, title: "1秒难忘", desc: "把厨房视频或菜品大片做菜单背景。客人停止滚动,你的品牌留下。", tag: "自定义设计" },
      { Icon: Smartphone, title: "几秒内更新,而不是几天", desc: "改价、换图、加今日特色 — 从手机上,在桌间完成。立即对客人可见。再也不用印刷。", tag: "菜单编辑器" },
      { Icon: ChefHat, title: "每个班次,服务更快", desc: "客人确认的瞬间,订单飞到厨房屏幕。零纸张、零吼叫、零漏单 — 失误更少、服务更快、每晚翻台更多。", tag: "即将上线" },
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
    heading: "不到2分钟上线",
    sub: "四个简短步骤。无需安装,无需技术配置。",
    steps: [
      { n: "1", t: "注册", d: "邮箱或Google。无需信用卡。10秒完成。" },
      { n: "2", t: "餐厅名称", d: "输入名称。显示在菜单顶部。" },
      { n: "3", t: "添加首道菜", d: "分类、名称、价格、照片。就这些。" },
      { n: "4", t: "选择封面并打印QR", d: "选背景。拿QR码。贴到桌上。" },
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
  finalCta: { heading: "2分钟上线。", headingAccent: "14天免费。", sub: "无需信用卡。随时取消。加入已在IQ Rest上的500多家餐厅。" },
  scan: {
    heading: "有纸质菜单或 PDF？",
    headingAccent: "AI 60 秒数字化。",
    sub: "上传即可 — AI 自动识别分类、菜品和价格。",
    cta: "扫描我的菜单 →",
  },
  footer: {
    featureLinks: [
      { href: "/zh/online-orders", label: "在线下单" }, { href: "/zh/ai-translation", label: "AI翻译" },
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
