import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "zh",
  slug: "shu-zi-cai-dan-can-ting",
  trackPrefix: "l_zh_digital",

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
    headline: "餐厅数字菜单。",
    sub: "您纸质菜单的在线版本,包含图片、过敏原、描述和实时价格更新。客人以自己的语言查看菜单;餐厅节省印刷成本。",
  },

  scan: {
    heading: "有纸质菜单或 PDF 吗?",
    headingAccent: "AI 在 60 秒内将其数字化。",
    sub: "上传照片或文档 — AI 自动识别类别、菜品和价格。",
    cta: "扫描菜单",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "无图片菜单",
      heading: "无图片菜单看起来同样好。",
      body: "有些菜品可能没有图片 — 这完全没问题。IQ Rest 以一致的方式呈现有图片和无图片的卡片:排版、过敏原和价格保持高级感。有图片和无图片菜品的混合保持统一。",
      bullets: [
        "无图片的卡片看起来不空。",
        "排版适应卡片内容。",
        "有图片和无图片的菜品风格一致。",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "桌上的两部手机:带菜品照片的菜单和仅文本的菜单" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "过敏原",
      heading: "过敏原和饮食标签。",
      body: "为麸质、乳糖、坚果、海鲜、纯素和无麸质选项标记菜品。客人根据饮食需求过滤菜单,更有信心地点餐。",
      bullets: [
        "每道菜上有 14 个标准过敏原类别。",
        "一键即可添加纯素、素食和无麸质标签。",
        "客人按饮食限制过滤菜单。",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "客人在手机上按过敏原过滤菜单,同时老板在平板电脑上编辑过敏原列表" },
    },
    {
      icon: Palette,
      eyebrow: "高级设计",
      heading: "带视频背景和联系页面的高级设计。",
      body: "欢迎屏幕上的视频或照片、餐厅描述、专用联系页面,带地图、电话号码和社交资料。数字菜单看起来像一个完整的餐厅网站,而不是 QR 码后面的 PDF。",
      bullets: [
        "欢迎屏幕上的视频背景或大幅照片。",
        "餐厅和类别描述 — 讲述您的概念故事。",
        "联系页面:地图、电话、Instagram、WhatsApp。",
      ],
      image: { src: "/landing/feature-design.webp", alt: "咖啡馆桌上的两部手机:带视频背景的菜单主屏和带地图的联系页面" },
    },
    {
      icon: Languages,
      eyebrow: "35 种 AI 语言",
      heading: "35 种 AI 语言 — 每位客人以自己的语言阅读菜单。",
      body: "一个 QR 码,35 种语言。AI 处理烹饪上下文 — 菜品名称和描述听起来自然。游客更有信心地点餐,即使服务员不翻译每道菜,平均账单也会增长。",
      bullets: [
        "订阅中包含 35 种语言,无额外费用。",
        "具有烹饪意识的 AI,而非原始 Google Translate。",
        "客人在菜单内一键切换语言。",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "两位客人在自己的手机上以不同语言阅读同一份数字菜单" },
    },
    {
      icon: Smartphone,
      eyebrow: "从任何设备管理",
      heading: "从任何设备管理菜单。",
      body: "一个面板可在手机、平板电脑或笔记本电脑的浏览器中打开。更改价格、将菜品从停止列表中移除或添加特价菜 — 客人在数秒内看到变化。无需安装,无需集成。",
      bullets: [
        "无需安装应用 — 打开浏览器即可使用。",
        "价格、照片和停止列表 — 在手机上几下点击。",
        "从任何地方管理菜单,包括大堂。",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "咖啡馆桌上的笔记本电脑和手机在两台设备上编辑同一菜单项" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "从菜单订购 · 可选",
      heading: "客人直接从菜单下单。",
      body: "客人在 QR 菜单中建立购物车并发送订单 — 它会到达大堂的服务员或厨房的平板电脑。该功能可以随时在设置中启用或禁用。",
      bullets: [
        "购物车、评论和一键发送订单。",
        "订单立即到达管理面板、WhatsApp 或厨房显示屏。",
        "可在设置中切换该功能。",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "桌上的两部手机:带订单的购物车和已下单的确认" },
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
