import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "zh",
  slug: "shu-zi-cai-dan-can-ting",
  trackPrefix: "l_zh_digital",
  featureHeading: {
    heading: "不止是一份菜单",
    sub: "让二维码菜单成为前厅与后厨服务的一切功能。",
  },

  meta: {
    title: "餐厅数字菜单 | IQ Rest",
    description:
      "餐厅数字菜单:在线菜单,包含图片、过敏原、AI 翻译和实时价格更新。14 天免费,无需信用卡。",
    canonical: "https://iq-rest.com/zh/shu-zi-cai-dan-can-ting",
    ogLocale: "zh_CN",
    ogTitle: "餐厅数字菜单",
    ogDescription:
      "您纸质菜单的在线版本 — 图片、过敏原、AI 翻译、实时更新。",
    brandLine: "IQ Rest — 餐厅数字菜单",
  },

  hero: {
    headline: "功能齐全的数字菜单",
    cta: "创建电子菜单",
    sub: "照片、过敏原、35种语言翻译。还有点餐、WhatsApp和订座 — 尽在一个 IQ Rest。",
  },

  scan: {
    heading: "有纸质菜单或 PDF 吗?",
    headingAccent: "AI 在 60 秒内将其数字化。",
    sub: "上传照片或文档 — AI 自动识别类别、菜品和价格。",
    cta: "扫描菜单",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "AI 翻译",
      heading: "35 种语言的菜单",
      body: "一个 QR，35 种语言。AI 结合菜品语境翻译，每道菜都地道自然，游客点餐更放心。",
      bullets: [
        "套餐含 35 种语言",
        "美食 AI，非 Google",
        "一键切换语言",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "两位客人在自己的手机上以不同语言阅读同一份数字菜单" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "过敏原",
      heading: "菜品标注过敏原与饮食",
      body: "标记麸质、乳糖、坚果、纯素和无麸质。客人按饮食筛选菜单，轻松点餐。",
      bullets: [
        "14 类过敏原",
        "纯素与无麸质标签",
        "按饮食筛选",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "客人在手机上按过敏原过滤菜单,同时老板在平板电脑上编辑过敏原列表" },
    },
    {
      icon: Palette,
      eyebrow: "设计与品牌",
      heading: "专属域名上的高级菜单",
      body: "视频欢迎屏、专属设计，以及带地图和社交的联系页面 — 呈现在您自己的域名上，而非 PDF。",
      bullets: [
        "视频与高级设计",
        "专属域名带 SSL",
        "联系、地图与社交",
      ],
      image: { src: "/landing/feature-design.webp", alt: "咖啡馆桌上的两部手机:带视频背景的菜单主屏和带地图的联系页面" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "点餐",
      heading: "在线点餐，零抽成",
      body: "客人从菜单或直接发到您的 WhatsApp 下单 — 送达大堂或厨房，销售额抽成为 0%。",
      bullets: [
        "从菜单或 WhatsApp",
        "送达大堂或厨房，0%",
        "在设置中开关",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "桌上的两部手机:带订单的购物车和已下单的确认" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "订座",
      heading: "餐桌预订，24/7",
      body: "客人通过菜单或链接自助订座，您按餐桌查看日历，自动或手动确认。",
      bullets: [
        "客人自助预订",
        "跨餐桌日历",
        "自动与手动确认",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "管理",
      heading: "随时随地管理",
      body: "管理后台在任意浏览器中运行 — 手机、平板或电脑。无需安装，基础菜单几分钟即可上线。",
      bullets: [
        "任意设备、任意浏览器",
        "无需安装",
        "几分钟即上线",
      ],
    },
  ],

  faq: {
    sub: "餐厅老板关于 IQ Rest 数字菜单的常见问题。找不到您的问题?在 WhatsApp 上给我们留言。",
    items: [
      { q: "我需要技术技能或 CMS 经验吗?", a: "不,不需要特殊技能。管理面板中的每个操作都是点击和拖放完成的 — 无需任何代码。添加菜单项只需几秒钟:名称、价格、照片。完整的菜单设置通常需要 30 分钟到一个小时。" },
      { q: "IQ Rest 数字菜单是什么?", a: "IQ Rest 是面向餐厅的云平台。数字菜单是您菜单的在线版本,通过 QR 码或直接链接供客人访问:菜品照片、价格、过敏原、35 种语言的 AI 翻译、实时更新。菜单托管在我们的服务器上;您无需安装或维护软件 — 只需打开浏览器。" },
      { q: "客人需要应用或特殊硬件吗?", a: "不需要。客人将手机相机对准 QR 码,菜单就会在浏览器中打开。餐厅的管理面板也在任何现代浏览器中运行 — 手机、平板电脑或笔记本电脑。QR 码可以在任何办公打印机上打印。" },
      { q: "我可以在自己的域名上托管菜单吗?", a: "可以。我们支持带 SSL 证书的自定义域名 — 客人在您餐厅的地址(例如 menu.yourrestaurant.com)上看到菜单。我们帮助进行 DNS 设置;通常需要 5-10 分钟。" },
      { q: "我可以从一个账户管理多家餐厅吗?", a: "可以,应需求提供。一个账户可以托管多家餐厅:每个场所有自己的菜单、设计、QR 码和分析。在 WhatsApp 上给我们留言,我们会为您的集团启用多餐厅模式。" },
      { q: "从零开始设置菜单有多难?", a: "设置包括三个步骤:(1) 创建类别;(2) 添加带名称、价格和照片的菜品;(3) 为餐桌打印 QR 码。如果您已经有纸质菜单或 PDF,上传它 — AI 会识别类别、名称和价格并自动填充卡片。基本菜单可在 5 分钟内上线;完整的设置时间取决于菜品数量。" },
      { q: "您提供什么样的支持?", a: "我们在工作时间内在 WhatsApp 上可用,并通过电子邮件快速回复。我们帮助进行初始设置、域名配置、菜单设计和任何非标准情况。如果您在启动时需要演示或实践支持 — 请给我们留言。" },
    ],
  },
};
