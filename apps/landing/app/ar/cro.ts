import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["مطاعم","مقاهي","حانات","بيتزا"],
    title: "مطعمك،",
    titleAccent: "رقمي بالكامل في 5 دقائق.",
    sub: "المنصة المتكاملة لإدارة مطعم عصري — أنيقة، كل شيء في مكان واحد، دون مهارات تقنية.",
  },

  heroMicrocopy: "{count} مطعم · 14 يومًا مجانًا · بدون بطاقة",
  seeIncluded: "شاهد ما تتضمنه",

  trust: [
    { kind: "num", value: 35, label: "لغة" },
    { kind: "text", value: "24/7", label: "الحجوزات" },
    { kind: "num", value: 5, suffix: " min", label: "الإطلاق" },
    { kind: "count", label: "مطعم" },
  ],

  bundle: {
    heading: "كل ما يقوم عليه مطعمك.",
    headingAccent: "في تطبيق واحد.",
    sub: "القائمة والمطبخ والحجوزات في مكان واحد — عصري وسريع ومصمم لطريقة عمل المطاعم فعليًا. بلا إضافات، بلا رسوم لكل ميزة.",
  },

  benefits: [
    { Icon: Languages, tag: "قائمة رقمية", title: "قائمة تبيع.", bullets: ["35 لغة بالذكاء الاصطناعي","تصميم متميز","تحديث فوري للأسعار"], image: "/landing/feature-design.webp", imageAlt: "هاتفان على طاولة مقهى: شاشة الترحيب للقائمة الرقمية وصفحة التواصل مع خريطة" },
    { Icon: ChefHat, tag: "شاشة المطبخ", title: "اطبخ أسرع، دون أن يفوتك شيء.", bullets: ["مباشر على الشاشة","ملاحظات ومسببات حساسية","جهاز لوحي أو هاتف"], image: "/landing/feature-kds-cards.webp", imageAlt: "جهاز لوحي على المنضدة يعرض شاشة المطبخ مع الطلبات حسب الطاولة" },
    { Icon: CalendarCheck, tag: "الحجوزات", title: "حجوزات على الطيار الآلي.", bullets: ["حجز ذاتي","تأكيد تلقائي","تقويم حسب الطاولة"], image: "/landing/feature-booking-calendar.webp", imageAlt: "جهازان لوحيان يعرضان تقويم الحجوزات: عرض يومي حسب الطاولة وعرض شهري" },
    { Icon: Receipt, tag: "الطلب على الطاولة", title: "الطلبات مباشرة إلى المطبخ.", bullets: ["الضيف أو النادل","مباشرة إلى المطبخ","شغّله متى شئت"], image: "/landing/feature-orders-map.webp", imageAlt: "جهاز لوحي بشاشة الطلبات: قائمة الطلبات ومخطط الصالة بطاولات ملوّنة." },
  ],

  seeDetails: "عرض التفاصيل",

  extras: {
    heading: "وكل ما تبقى مشمول.",
    items: [
      { Icon: ScanLine, label: "الذكاء الاصطناعي يرقمن قائمتك الورقية في 60 ثانية" },
      { Icon: QrCode, label: "رمز QR فريد لكل طاولة" },
      { Icon: Smartphone, label: "لا تطبيق للضيوف — يُفتح في المتصفح" },
      { Icon: Globe, label: "نطاقك الخاص مع SSL" },
      { Icon: BarChart3, label: "تحليلات المبيعات: الإيرادات، أكثر الأطباق طلبًا، الساعات" },
      { Icon: Palette, label: "وسوم مسببات الحساسية والحميات للتصفية" },
    ],
  },

  midCta: {
    heading: "تطبيق واحد بدل خمسة.",
    sub: "لا مزيد من التنقل بين أدوات منفصلة للقائمة والمطبخ والحجوزات — كل شيء في مكان واحد، على أي هاتف أو جهاز لوحي، دون أي تثبيت.",
  },

  how: {
    heading: "جاهز في 5 دقائق",
    sub: "أربع خطوات. بلا تثبيت، بلا إعداد تقني، بلا بطاقة.",
    steps: [
      { n: "1", t: "النوع والاسم", d: "نوع المكان والاسم — هذا كل التسجيل." },
      { n: "2", t: "تسجيل الدخول", d: "بريد إلكتروني أو Google. بلا بطاقة." },
      { n: "3", t: "أضف القائمة", d: "اكتبها أو دع الذكاء الاصطناعي يمسح قائمتك الورقية." },
      { n: "4", t: "أنت مباشر الآن", d: "القائمة والمطبخ والحجوزات — جاهزة." },
    ],
  },
};
