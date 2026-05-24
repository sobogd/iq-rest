import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "tr",
  htmlDir: "ltr",

  meta: {
    title: "Restoranlar için QR menü — Doğrudan sipariş, sıfır komisyon | IQ Rest",
    description:
      "Restoranlar için hepsi bir arada platform: dijital menü, QR sipariş, masa rezervasyonu ve mutfak ekranı. 5 dakikada hazır. 14 gün ücretsiz, kart gerekmez.",
    canonical: "https://iq-rest.com/tr",
    ogLocale: "tr_TR",
    ogTitle: "Restoranlar için QR menü — Doğrudan sipariş, sıfır komisyon",
    ogDescription:
      "Dijital menü, QR sipariş, masa rezervasyonu ve AI çeviri. 5 dakikada hazır. 14 gün ücretsiz.",
  },

  ctaText: "Ücretsiz başla",
  homeCtaText: "Platformunu oluştur",
  demoText: "Demoyu izle",
  microcopy: "14 gün ücretsiz · Kart yok · İstediğiniz zaman iptal edin",

  header: {
    navFeatures: "Özellikler",
    navHow: "Nasıl çalışır",
    navPricing: "Fiyatlar",
    navFaq: "SSS",
    signIn: "Giriş yap",
    cta: "Ücretsiz başla",
  },

  hero: {
    verticals: ["Restoranlar", "Kafeler", "Barlar", "Oteller", "Pizzacılar"],
    headline: "Restoran için dijital menü. 5 dakikada hazır.",
    sub: "Restoranınız için 5 dakikada dijital menü. Hepsi dahil: kodsuz editör, basılı menünün AI tanıması, masalar için QR kodları ve komisyonsuz doğrudan sipariş.",
    dynamicHeadlines: ["0% komisyon.", "35 AI dili.", "Online sipariş.", "7/24 rezervasyon.", "Premium tasarım."],
    painBullets: [
      "0% komisyon: her sipariş doğrudan restoranınıza gider.",
      "35 dile AI çevirisi — turistler menüyü anlar ve daha fazla sipariş verir.",
      "7/24 rezervasyon: misafirler yoğun saatlerde aramadan kendileri masa rezerve eder.",
      "Esnek fiyatlar: menü güncellemeleri saniyeler içinde yayında.",
    ],
    rating: "30'dan fazla ülkede 500'den fazla restoran",
  },

  features: {
    heading: "İhtiyacınız olan her şey.",
    headingAccent: "Gereksiz hiçbir şey yok.",
    sub: "Restoranlar için yapıldı. Her gün masada, mutfakta ve salonda kullanılıyor.",
    items: [
      { Icon: Monitor, title: "Dijital menü", desc: "Fotoğraflar, fiyatlar, alerjenler ve açıklamalarla tarayıcıdaki menü. Telefondan gerçek zamanlı güncellenir. Misafirler menüyü kendi dillerinde görür; restoran baskıdan tasarruf eder.", tag: "Dijital menü", href: "/tr/dijital-menu-restoran" },
      { Icon: Receipt, title: "Sipariş alma: misafir ve garson", desc: "Masada misafir için bir QR kodu veya garson telefondan siparişi alır — ikisi de doğrudan mutfağa ya da WhatsApp'a gider. Komisyonsuz, her fişte masa numarasıyla.", tag: "Siparişler", href: "/tr/restoran-siparis-sistemi" },
      { Icon: CalendarCheck, title: "7/24 masa rezervasyonu", desc: "Misafirler siz salonla meşgulken web sitesi veya QR menü üzerinden kendileri masa rezerve eder. Masaya göre takvim, otomatik onaylar ve hatırlatmalar. Tek bir misafir bile kaçmıyor.", tag: "Rezervasyon", href: "/tr/masa-rezervasyonu" },
      { Icon: ChefHat, title: "Mutfak ekranı (KDS)", desc: "Kağıt fişlere artık gerek yok. Salondan gelen siparişler doğrudan aşçının ekranına düşer — „hazırlanıyor / hazır / servis edildi“ sütunları, alerjenler ve notlar renkle vurgulanır. Tablette veya telefonda.", tag: "KDS", href: "/tr/mutfak-ekrani" },
    ],
  },

  founder: {
    eyebrow: "Restorancılar tarafından yapıldı",
    quoteStart:
      "Eşim ve ben kendi kafemizi işlettik ve restoran gününün gerçekte nasıl göründüğünü ilk elden biliyoruz — sipariş alma, rezervasyonlar, salon ve mutfak akışı. Tek bir araç istedik: modern, başlatması kolay ve ilk bakışta net —",
    quoteAccent: "ve şu anda diğer restorancılar için geliştirdiğimiz platformu kurmaya başladık.",
    sign: "Bogdan Sokolov · kurucu, eski kafe sahibi",
    photoAlt: "Bogdan Sokolov, IQ Rest kurucusu",
  },

  how: {
    heading: "5 dakikada hazır",
    sub: "Dört kısa adım. Kurulum yok, teknik yapılandırma yok.",
    steps: [
      { n: "1", t: "Tür ve isim", d: "Mekan türünü seçin ve adı girin." },
      { n: "2", t: "Kaydet", d: "E-postanızı girin veya Google ile giriş yapın." },
      { n: "3", t: "Menü", d: "Ürünleri manuel olarak ekleyin veya AI taraması için basılı menüyü yükleyin." },
      { n: "4", t: "Bitti", d: "Bağlantı veya QR kodu paylaşın ve sipariş almaya başlayın." },
    ],
  },

  pricing: {
    badge: "Komisyon yok · Sözleşme yok",
    heading: "Tek plan.",
    headingAccent: "Hepsi dahil.",
    sub: "QR menü, sipariş alma, AI çevirisi, restoran web sitesi ve rezervasyon. Tek şeffaf aylık ücret.",
    monthlyLabel: "Aylık",
    yearlyLabel: "Yıllık",
    saveBadge: "%25 tasarruf",
    perMonth: "ay başına",
    billedAnnually: "Yıllık faturalandırılır: {total}",
    youSave: "{amount} tasarruf edersiniz",
    trust: { secure: "Stripe ile güvenli ödeme", noCommitment: "Taahhüt yok", quick: "Birkaç dakikada aktif", restaurants: "500+ restoran" },
  },

  faq: {
    eyebrow: "Sorularınız mı var?",
    heading: "Sık sorulan",
    headingAccent: "sorular.",
    sub: "Restorancıların kayıt olmadan önce sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın — bot değil, gerçek insanlar cevaplıyor.",
    whatsappCta: "WhatsApp'tan sor",
    whatsappPrefill: "Merhaba, IQ Rest hakkında bir sorum var",
    items: [
      { q: "Deneme süresi neleri içeriyor ve sonrasında ne oluyor?", a: "14 gün boyunca tüm özelliklere tam erişim, kart gerekmez. 14 gün sonra ödeme yöntemi eklenmezse hesap duraklatılır — asla otomatik tahsilat yapmıyoruz. Ödemeyi daha sonra ekleyip kaldığınız yerden devam edebilirsiniz. İstediğiniz zaman tek tıkla iptal edin." },
      { q: "Siparişlerden komisyon alıyor musunuz?", a: "Hayır. QR menüden gelen her sipariş doğrudan restorana gider — bizim tarafımızdan yüzde yok, aracı komisyonu yok. Sabit aylık ücret ve başka bir şey yok." },
      { q: "Misafirlerin uygulamaya, bizim teknik bilgiye ihtiyacımız var mı?", a: "Misafirlerin uygulamaya ihtiyacı yoktur — telefon kamerasını QR koduna doğrultur ve menü tarayıcıda açılır. Restoranların da teknik bilgiye ihtiyacı yok: yönetim paneli telefondaki, tabletteki veya dizüstündeki herhangi bir modern tarayıcıda çalışır. Her işlem kod olmadan tıklama ve sürükle-bırak ile yapılır." },
      { q: "Fiyatlar ne kadar hızlı değişir ve yeni yemekler ne kadar hızlı görünür?", a: "Anında. Telefondan fiyatı değiştirin — misafirler saniyeler içinde görür. Yeni bir yemek birkaç dokunuş alır: ad, fiyat, fotoğraf. Yeniden baskı yok, tasarımcı beklemek yok." },
      { q: "Kaç dil destekleniyor?", a: "Yerleşik AI çevirisi ile 35 dil. Tek dokunuşla tüm menü çevrilir; AI mutfak bağlamını anlar — adlar ve açıklamalar her dilde doğal görünür. Turistler menüyü gerçekten anladıklarında daha büyük güvenle sipariş verir." },
    ],
  },

  finalCta: {
    heading: "5 dakikada hazır.",
    headingAccent: "14 gün ücretsiz.",
    sub: "Kart yok, istediğiniz zaman iptal. IQ Rest'i zaten kullanan 500+ restorana katılın.",
  },

  scan: {
    heading: "Kağıt menünüz veya PDF'iniz mi var?",
    headingAccent: "AI bunu 60 saniyede dijitalleştirir.",
    sub: "Bir fotoğraf veya belge yükleyin — AI kategorileri, yemekleri ve fiyatları otomatik olarak tanır.",
    cta: "Menüyü tara →",
  },

  pricingHero: {
    chips: ["Komisyon yok", "Sözleşme yok", "14 gün ücretsiz"],
    heading: "Fiyatlar.",
    headingAccent: "Gizli ücret yok.",
    sub: "Tek şeffaf aylık ücret. Siparişlerden yüzde yok, aracı komisyonu yok. Aboneliği istediğiniz zaman iptal edin.",
    popularBadge: "Popüler",
    perMonthSuffix: "/ay",
    whenAnnualTemplate: "yıllık faturalandırma · yılda {total} €",
    orMonthlyTemplate: "veya {price} €/ay",
    savingsTemplate: "yılda {amount} € tasarruf",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menü, QR sipariş ve AI çevirisi. 5 dakikada hazır.",
        features: [
          "Her masa için QR menü",
          "Fotoğraflı ve alerjenli dijital menü",
          "35 dile AI çevirisi",
          "Menüden sipariş (isteğe bağlı)",
          "Yemek fotoğraflarının AI üretimi",
          "Herhangi bir telefon veya tabletten yönetim",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Tam restoran kontrolü: mutfak ekranı ve rezervasyonlar.",
        features: [
          "Basic'teki her şey",
          "Mutfak ekranı (KDS)",
          "7/24 online masa rezervasyonu",
          "Öncelikli WhatsApp desteği",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/tr/dijital-menu-restoran", label: "Dijital menü" },
      { href: "/tr/restoran-siparis-sistemi", label: "Siparişler" },
      { href: "/tr/masa-rezervasyonu", label: "Rezervasyon" },
      { href: "/tr/mutfak-ekrani", label: "Mutfak ekranı" },
    ],
    navLinks: [
      { href: "/tr/fiyatlar", label: "Fiyatlar" },
      { href: "#faq", label: "SSS" },
      { href: "/tr/languages", label: "Dili değiştir" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tüm hakları saklıdır.",
  },
};
