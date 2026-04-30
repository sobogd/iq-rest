import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "tr", htmlDir: "ltr",
  meta: {
    title: "Restoranlar için QR Menü — Direkt Siparişler, Sıfır Komisyon | IQ Rest",
    description: "Basılı menülere ve teslimat uygulaması komisyonlarına son. QR menü, direkt siparişler, rezervasyonlar ve çok dilli web sitesi. 14 gün ücretsiz, kart gerekmez.",
    canonical: "https://iq-rest.com/tr", ogLocale: "tr_TR",
    ogTitle: "Restoranlar için QR Menü — Direkt Siparişler, Sıfır Komisyon",
    ogDescription: "QR menü, direkt siparişler, rezervasyonlar ve AI çeviri. 2 dakikada hazır. 14 gün ücretsiz — kart gerekmez.",
  },
  ctaText: "Ücretsiz başla →",
  demoText: "Canlı demoyu gör", microcopy: "14 gün ücretsiz · Kart gerekmez · İstediğin zaman iptal",
  header: { navFeatures: "Özellikler", navHow: "Nasıl çalışır", navPricing: "Fiyatlar", navFaq: "SSS", signIn: "Giriş", cta: "Ücretsiz başla →" },
  hero: {
    verticals: ["Restoranlar", "Kafeler", "Barlar", "Oteller", "Pizzacılar"],
    variants: [
      { headline: "Menü basmayı bırak.", headlineAccent: "Teslimat uygulamalarına 30% vermeyi bırak.", sub: "QR menü, direkt siparişler, rezervasyonlar ve çok dilli site. 2 dakikada hazır — kart gerekmez." },
      { headline: "Restoranın kağıt menülerden ve", headlineAccent: "kaçırılan çağrılardan fazlasını hak ediyor.", sub: "Direkt siparişler, anlık menü güncellemeleri ve 24/7 rezervasyonlar. 2 dakikada kurulur." },
      { headline: "Tek QR kodu.", headlineAccent: "Sıfır komisyon. Kağıda elveda.", sub: "QR menü, online siparişler ve rezervasyonlar — hepsi tek yerde. 14 gün ücretsiz, kart gerekmez." },
      { headline: "Direkt sipariş al.", headlineAccent: "Komisyonu atla.", sub: "Misafirler tarayıp sipariş veriyor ve ödüyor — direkt sana, Yemeksepeti payı yok. 2 dakikada hazır." },
      { headline: "Daha fazla sipariş. Daha fazla rezervasyon.", headlineAccent: "Kağıt yok, uygulama yok.", sub: "QR menü + rezervasyonlar + çok dilli site otopilotta. 14 günlük ücretsiz deneme." },
      { headline: "Turistler menüyü anlamıyor mu?", headlineAccent: "2 dakikada çözüldü.", sub: "AI tüm menünü 35 dile çeviriyor. Ayrıca QR siparişler ve rezervasyonlar dahil." },
      { headline: "Kağıt menüden QR koduna,", headlineAccent: "espresso soğumadan.", sub: "QR menü, direkt siparişler ve 24/7 rezervasyonlar. 2 dakikada hazır — kart gerekmez." },
      { headline: "Ferahlatıcı sade QR menü.", headlineAccent: "Sessiz sedasız güçlü.", sub: "Direkt siparişler, AI çeviri, rezervasyonlar ve site — hepsi telefonda tek dokunuşla." },
    ],
    painBullets: ["Baskı yok — fiyatları anında değiştir", "Sıfır komisyon — siparişler direkt sana", "Kaçırılan çağrı yok — rezervasyonlar 24/7", "35 dil — turist asla kaybolmaz"],
    rating: "4,9 · 30+ ülkede 500'den fazla restoran",
  },
  features: {
    heading: "İhtiyacın olan her şey.", headingAccent: "Olmayan hiçbir şey.",
    sub: "Restoranlar için yapıldı. Masada kullanılır.",
    items: [
      { Icon: ScanLine, title: "Her siparişin %100'ü senin", desc: "Misafirler tarıyor, sipariş veriyor ve ödüyor — direkt sana. Uygulama indirme yok, %30 teslimat payı yok. Her sipariş gerçek zamanlı masa numarasıyla panele düşer." },
      { Icon: Languages, title: "Turistlere kendi dillerinde sat", desc: "Tek dokunuş tüm menüyü 35 dile çeviriyor. AI mutfak bağlamını yakalıyor — misafirler yemeği gerçekten anladığında daha çok sipariş veriyor." },
      { Icon: CalendarCheck, title: "Mutfaktayken rezervasyon kaçırma", desc: "Misafirler 24/7 rezervasyon yapıyor, çağrı yok. Otomatik veya manuel onay, e-posta hatırlatmaları dahil — daha az gelmeyen müşteri, sıfır stres." },
      { Icon: Palette, title: "1 saniyede unutulmaz", desc: "Mutfak videosu veya yemek fotoğrafını menü arka planına koy. Misafirler scroll'ı bırakıyor. Markan akılda kalıyor." },
      { Icon: Smartphone, title: "Saniyelerde değiştir, günlerde değil", desc: "Fiyatları değiştir, fotoğrafları değiştir, günün özelini ekle — telefondan, masalar arasında. Misafirler için anında canlı. Bir daha asla baskı yok." },
      { Icon: ListPlus, title: "WhatsApp gönderebiliyorsan kullanabilirsin", desc: "Yemek eklemek için dokun. Sıralamak için sürükle. Tükenenleri kapat. Kılavuz yok, tutorial yok, öğrenme eğrisi yok." },
    ],
  },
  founder: {
    eyebrow: "Bir restoran sahibi tarafından yapıldı",
    quoteStart: "Eşim ve ben bir kafe açtık ve haftalarca online sipariş, rezervasyon alabilen ve modern görünen bir sistem aradık. Denediğimiz her şey hantal, çirkin veya özelliklerin yarısı eksikti —",
    quoteAccent: "biz de istediğimiz olanı kendimiz yaptık.",
    sign: "Bogdan Sokolov · kurucu, eski kafe sahibi",
    photoAlt: "Bogdan, IQ Rest kurucusu",
  },
  how: {
    heading: "2 dakikadan kısa sürede yayında",
    sub: "Dört kısa adım. Kurulum yok, teknik ayar yok.",
    steps: [
      { n: "1", t: "Kayıt ol", d: "E-posta veya Google. Kart yok. 10 saniyede tamam." },
      { n: "2", t: "Restoran adı", d: "Adı yaz. Menünün üstünde görünür." },
      { n: "3", t: "İlk yemeği ekle", d: "Kategori, ad, fiyat, fotoğraf. Bu kadar." },
      { n: "4", t: "Kapak seç ve QR yazdır", d: "Arka plan seç. QR'ı al. Masalara yapıştır." },
    ],
  },
  pricing: {
    badge: "Sıfır komisyon · Sözleşme yok",
    heading: "Tek plan.", headingAccent: "Hepsi dahil.",
    sub: "QR menü, siparişler, AI çeviri, restoran sitesi ve rezervasyonlar. Tek basit fiyat.",
    monthlyLabel: "Aylık", yearlyLabel: "Yıllık", saveBadge: "%25 tasarruf", perMonth: "ayda",
    billedAnnually: "Yıllık fatura {total}", youSave: "{amount} tasarruf",
    trust: { secure: "Stripe ile güvenli ödeme", noCommitment: "Bağlılık yok", quick: "Dakikalar içinde aktif", restaurants: "500+ restoran" },
  },
  faq: {
    eyebrow: "Sorular?", heading: "Sıkça sorulan", headingAccent: "sorular.",
    sub: "Restoran sahiplerinin kayıt olmadan önce sorduğu şeyler. Seninkini görmüyor musun? WhatsApp'tan yaz — gerçek insanlar cevaplar.",
    whatsappCta: "WhatsApp'tan sor", whatsappPrefill: "Merhaba, IQ Rest hakkında bir sorum var",
    items: [
      { q: "Ücretsiz deneme neyi içeriyor ve sonrası ne olur?", a: "14 gün tam erişim, kart yok. 14 gün sonunda ödeme yöntemi eklemezsen hesabın duraklar — asla otomatik tahsil etmiyoruz. Sonra ödeme bilgisi ekleyip tekrar aktive edebilirsin. Tek tıkla iptal et." },
      { q: "Siparişlerden komisyon alıyor musunuz?", a: "Sıfır. QR menünden gelen her sipariş direkt sana gelir — bizden pay yok, Yemeksepeti / Trendyol Yemek ücretleri yok. Tek sabit aylık fiyat, hepsi bu." },
      { q: "Misafirler için uygulama gerekli mi? Teknik bilgi gerekli mi?", a: "Misafirler için sıfır uygulama — kamerayla QR'ı tarıyor, menü tarayıcıda açılıyor. Senin için sıfır teknik beceri — tüm panel telefonda çalışıyor, eklemek için dokun, sıralamak için sürükle, öğrenme eğrisi bu kadar." },
      { q: "Birden fazla restoranı tek hesaptan yönetebilir miyim?", a: "Evet. Pro plan tek hesapta birden fazla restoran sağlıyor — ayrı menüler, ayrı QR'lar, ayrı analitikler, tek giriş. İki dokunuşla geçiş." },
      { q: "Fiyatları ve yemekleri ne kadar hızlı değiştirebilirim?", a: "Anında. Telefonda fiyatı değiştir, misafirler saniyeler içinde görür. Yeni yemek? Dokun, yaz, fotoğraf, hazır — yeniden basım yok, tasarımcı beklemek yok." },
      { q: "Kaç dil destekleniyor?", a: "Yerleşik AI çeviriyle 35 dil. Tek dokunuş tüm menüyü çeviriyor, AI mutfak bağlamını anlıyor — adlar ve tarifler her dilde doğal görünür. Turistler gerçekten anladıklarında daha çok sipariş verir." },
    ],
  },
  finalCta: { heading: "2 dakikada hazır.", headingAccent: "14 gün ücretsiz.", sub: "Kart yok. İstediğin zaman iptal. IQ Rest'te zaten 500+ restorana katıl." },
  footer: {
    featureLinks: [
      { href: "/tr/online-orders", label: "Online siparişler" }, { href: "/tr/ai-translation", label: "AI çeviri" },
      { href: "/tr/reservations", label: "Rezervasyonlar" }, { href: "/tr/mobile-management", label: "Mobil yönetim" },
      { href: "/tr/easy-menu", label: "Menü editörü" }, { href: "/tr/custom-design", label: "Video ve foto arka planlar" },
      { href: "/tr/color-scheme", label: "Marka renkleri" }, { href: "/tr/multilingual", label: "Çok dilli site" },
      { href: "/tr/ai-images", label: "AI fotoğraf optimizasyonu" }, { href: "/tr/analytics", label: "Analitik" },
      { href: "/tr/instant-setup", label: "Anında kurulum" }, { href: "/tr/personal-support", label: "Kişisel destek" },
    ],
    navLinks: [
      { href: "#pricing", label: "Fiyatlar" }, { href: "#faq", label: "Sorular" },
      { href: "/tr/languages", label: "Dil değiştir" },
    ],
    legalLinks: [
      { href: "/tr/terms", label: "Şartlar" }, { href: "/tr/privacy", label: "Gizlilik" },
      { href: "/tr/cookies", label: "Çerezler" }, { href: "/sitemap.xml", label: "Site haritası" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tüm hakları saklıdır.",
  },
};
