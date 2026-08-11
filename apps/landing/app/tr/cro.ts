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
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restoranlar","Kafeler","Barlar","Pizzacılar"],
    title: "Restoranınız dijital",
    titleAccent: "5 dakikada",
    sub: "Dijital menü, mutfak ekranı ve 7/24 rezervasyon — restoranınızın ihtiyacı olan her şey, 5 dakikada hazır.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restoranlar" },
      { icon: "cafe", label: "Kafeler" },
      { icon: "bar", label: "Barlar" },
      { icon: "pizza", label: "Pizzacılar" },
    ],
    title: "Restoranınız için",
    titleAccent: "gereken her şey!",
    sub: "Süreçlerinizi 10 dakikada kurun: online menüyü yayınlayın, mutfağı optimize edin ve masa doluluğunu takip edin.",
    primaryLabel: "Ücretsiz başlayın",
    demoLabel: "Demoyu izle",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Mutfak ekranlı tablet: masalara göre siparişler, durum sütunları" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Rezervasyon takvimli tablet: aylık görünüm ve onay bekleyen rezervasyonlar" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Restoran web sitesinin ana sayfası açık telefon: fotoğraf, rezervasyon ve online menü" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Yemek sayfası açık telefon: fotoğraf, fiyat ve alerjen etiketleri" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "10 dakikada yayında", sub: "Pahalı ekipman ve uzun kurulum yok" },
    { Icon: MessagesSquare, title: "Hızlı destek", sub: "Sohbette birkaç saat içinde yanıtlıyoruz" },
    { Icon: Globe, title: "{count} işletmenin tercihi", sub: "15'ten fazla ülkedeki restoran ve kafeler bize güveniyor" },
    { Icon: Palette, title: "%100 sizin markanız", sub: "Tasarımı ve arayüzü işletmenizin tarzına uyarlıyoruz" },
  ],

  menu: {
    heading: "Web sitesi ve dijital menü",
    sub: {
      link: "QR menüden fazlası!",
      rest: " Özgün tasarımlı, iletişim sayfalı ve masa rezervasyonlu eksiksiz bir web sitesine sahip olun.",
    },
    moreLabel: "Daha fazla bilgi",
    mockupAlt: "İki telefon: restoran web sitesinin ana sayfası ve yemek sayfası",
    bullets: [
      { Icon: Languages, title: "35 dile otomatik çeviri", sub: "Yabancı konuklara dil engeli olmadan hizmet verin — otomatik çeviri her şeyi halleder" },
      { Icon: ClipboardList, title: "Masadan doğrudan sipariş", sub: "Servisi kolaylaştırın: siparişleri masadan hızlıca, garson olmadan alın" },
      { Icon: WheatOff, title: "Alerjenler ve diyetler", sub: "Alerjenleri ve tercihleri (vegan, acı) işaretleyin; konuklar kolay ve güvenle seçsin" },
    ],
  },

  reservations: {
    heading: "Masa rezervasyonu",
    sub: {
      link: "Akıllı masa rezervasyonu!",
      rest: " Boş masaları ve programınızı kendi kendine takip eden otomatik rezervasyon sistemi.",
    },
    moreLabel: "Daha fazla bilgi",
    mockupAlt: "Rezervasyon takvimli tablet: günlere ve zaman dilimlerine göre masalar",
    bullets: [
      { Icon: CalendarCheck, title: "Anlaşılır rezervasyon haritası", sub: "Günlere ve masalara göre görsel çizelge — boş yerler tek bakışta görünür" },
      { Icon: SlidersHorizontal, title: "Esnek rezervasyon ayarları", sub: "Çalışma saatlerini, slot süresini, masa fotoğraflarını ayarlayın ve konuk isteklerini toplayın" },
      { Icon: Users, title: "Konuk akışı kontrolü", sub: "Rezervasyonları nasıl yöneteceğinizi seçin ve konuk akışını tamamen kontrol edin" },
    ],
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
          "Her masa için benzersiz QR kod",
          "Misafirler için uygulama yok — tarayıcıda açılır",
          "Filtrelenebilir alerjen ve diyet etiketleri",
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
          "Yapay zeka kağıt menünüzü 60 saniyede dijitalleştirir",
          "SSL ile kendi alan adınız",
        ],
      },
    ],
  },
};
