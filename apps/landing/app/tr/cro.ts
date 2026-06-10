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
    sub: "Şık bir dijital menü, bir mutfak ekranı ve 7/24 rezervasyon — modern bir restoran için eksiksiz platform.",
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
    { Icon: Languages, tag: "Dijital menü", title: "Satan bir menü.", bullets: ["35 yapay zeka dili","Premium tasarım","Anında fiyat değişimi"], image: "/landing/feature-design.webp", imageAlt: "Bir kafe masasında iki telefon: dijital menünün karşılama ekranı ve haritalı iletişim sayfası" },
    { Icon: ChefHat, tag: "Mutfak ekranı", title: "Daha hızlı pişirin, hiçbir şeyi kaçırmayın.", bullets: ["Ekranda canlı","Notlar ve alerjenler","Tablet ya da telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Bardaki tablet, masalara göre siparişlerle mutfak ekranını gösteriyor" },
    { Icon: CalendarCheck, tag: "Rezervasyonlar", title: "Otomatik pilotta rezervasyonlar.", bullets: ["Self rezervasyon","Otomatik onay","Masaya göre takvim"], image: "/landing/feature-booking-calendar.webp", imageAlt: "İki tablet rezervasyon takvimini gösteriyor: masaya göre günlük görünüm ve aylık görünüm" },
    { Icon: Receipt, tag: "Masada sipariş", title: "Siparişler doğrudan mutfağa.", bullets: ["Misafir ya da garson","Doğrudan mutfağa","İstediğinde aç/kapa"], image: "/landing/feature-orders-map.webp", imageAlt: "Sipariş ekranlı tablet: sipariş listesi ve renk kodlu masalarla salon planı." },
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

  platform: {
    hardwareTitle: "Kendi donanımınızla çalışın",
    hardwareSub: "Sizi asla bizden donanım almaya zorlamayız. Zaten sahip olduğunuz telefon, tablet ve bilgisayarları kullanın.",
    anywhereTitle: "Her yerde çalışır",
    anywhereSub: "Telefon, tablet, dizüstü, PC. Android, iOS, Windows, Mac, Linux. Tüm modern tarayıcılarda kurulum gerektirmeden çalışır.",
  },

  activities: {
    heading: "Tek sistem,",
    headingAccent: "tüm restoranınız.",
    sub: "Daha hızlı servis, daha sakin bir mutfak, daha düşük maliyet ve misafirin hatırlayacağı bir deneyim — hepsi tek platformda.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Masada — misafirler",
        bullets: [
          "35 dilde QR menü",
          "Garson beklemeden sipariş",
          "Garson çağırma veya hesap isteme",
          "7/24 masa rezervasyonu",
        ],
      },
      {
        Icon: ChefHat,
        tag: "Mutfakta",
        bullets: [
          "Siparişler ekrana anında düşer",
          "Hazırlanıyor / hazır / servis edildi sütunları",
          "Alerjenler ve notlar vurgulanır",
          "Tablet veya telefon — kâğıt fiş yok",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Yönetim",
        bullets: [
          "Menü ve fiyat değişiklikleri anında yayında",
          "Tek tıkla yapay zeka çevirisi",
          "Satış analizleri ve raporlar",
          "Tek hesapta birden çok restoran",
        ],
      },
    ],
  },
};
