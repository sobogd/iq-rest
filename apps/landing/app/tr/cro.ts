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
    verticals: ["Restoranlar","Kafeler","Barlar","Pizzacılar"],
    title: "Restoranınız,",
    titleAccent: "5 dakikada tamamen dijital.",
    sub: "Modern bir restoranı yönetmek için eksiksiz platform — şık, hepsi tek yerde, teknik bilgi gerekmez.",
  },

  heroMicrocopy: "{count} restoran · 14 gün ücretsiz · Kart yok",
  seeIncluded: "Neler dahil",

  trust: [
    { kind: "num", value: 35, label: "Dil" },
    { kind: "text", value: "24/7", label: "Rezervasyon" },
    { kind: "num", value: 5, suffix: " min", label: "Kurulum" },
    { kind: "count", label: "Restoran" },
  ],

  bundle: {
    heading: "Restoranınızı çalıştıran her şey.",
    headingAccent: "Tek uygulamada.",
    sub: "Menü, mutfak ve rezervasyonlar tek yerde — modern, hızlı ve restoranların gerçekte nasıl çalıştığına göre tasarlandı. Ek paket yok, özellik başına ücret yok.",
  },

  benefits: [
    { Icon: Languages, tag: "Dijital menü", title: "PDF değil, web sitesi gibi görünen bir menü.", bullets: ["35 yapay zeka dili","Premium tasarım","Anında fiyat değişimi"], image: "/landing/feature-design.webp", imageAlt: "Bir kafe masasında iki telefon: dijital menünün karşılama ekranı ve haritalı iletişim sayfası" },
    { Icon: ChefHat, tag: "Mutfak ekranı", title: "Mutfak, nihayet kağıtsız.", bullets: ["Ekranda canlı","Notlar ve alerjenler","Tablet ya da telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Bardaki tablet, masalara göre siparişlerle mutfak ekranını gösteriyor" },
    { Icon: CalendarCheck, tag: "Rezervasyonlar", title: "Kendi kendine dolan masalar, 24/7.", bullets: ["Self rezervasyon","Otomatik onay","Masaya göre takvim"], image: "/landing/feature-booking-calendar.webp", imageAlt: "İki tablet rezervasyon takvimini gösteriyor: masaya göre günlük görünüm ve aylık görünüm" },
    { Icon: Receipt, tag: "Masada sipariş", title: "Not defteri olmadan sipariş alın — opsiyonel.", bullets: ["Misafir ya da garson","Doğrudan mutfağa","İstediğinde aç/kapa"], image: "/landing/feature-orders.webp", imageAlt: "Garson masada telefondan sipariş alıyor, sipariş mutfak ekranına düşüyor" },
  ],

  seeDetails: "Ayrıntılar",

  extras: {
    heading: "Ve diğer her şey dahil.",
    items: [
      { Icon: ScanLine, label: "Yapay zeka kağıt menünüzü 60 saniyede dijitalleştirir" },
      { Icon: QrCode, label: "Her masa için benzersiz QR kod" },
      { Icon: Smartphone, label: "Misafirler için uygulama yok — tarayıcıda açılır" },
      { Icon: Globe, label: "SSL ile kendi alan adınız" },
      { Icon: BarChart3, label: "Satış analizleri: gelir, en çok satan yemekler, saatler" },
      { Icon: Palette, label: "Filtrelenebilir alerjen ve diyet etiketleri" },
    ],
  },

  midCta: {
    heading: "Beş yerine tek uygulama.",
    sub: "Menü, mutfak ve rezervasyonlar için ayrı araçlarla uğraşmak yok — hepsi tek yerde, her telefon ya da tablette, kurulum gerektirmeden.",
  },

  how: {
    heading: "5 dakikada hazır",
    sub: "Dört adım. Kurulum yok, teknik ayar yok, kart yok.",
    steps: [
      { n: "1", t: "Tür ve ad", d: "Mekan türü ve adı — tüm kayıt bu kadar." },
      { n: "2", t: "Giriş yap", d: "E-posta ya da Google. Kart yok." },
      { n: "3", t: "Menüyü ekle", d: "Yazın ya da yapay zeka kağıt menünüzü tarasın." },
      { n: "4", t: "Yayındasınız", d: "Menü, mutfak ve rezervasyonlar — hazır." },
    ],
  },
};
