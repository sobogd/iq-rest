import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "tr",
  slug: "qr-kod-menu-restoran",
  trackPrefix: "l_tr_qr",

  meta: {
    title: "Restoranlar için QR kod menü | IQ Rest",
    description:
      "Restoranlar için QR kod menü: misafir masadaki QR kodu okutur, menüyü tarayıcıda açar ve kendi dilinde sipariş verir. 14 gün ücretsiz, kart gerekmez.",
    canonical: "https://iq-rest.com/tr/qr-kod-menu-restoran",
    ogLocale: "tr_TR",
    ogTitle: "Restoranlar için QR kod menü",
    ogDescription:
      "Masada QR, telefonda menü — fotoğraflar, alerjenler, 35 dil ve anlık güncellemeler.",
    brandLine: "IQ Rest — Restoranlar için QR kod menü",
  },

  hero: {
    headline: "Restoranlar için QR kod menü.",
    cta: "QR menü oluştur",
    sub: "Misafir kamerayı masadaki QR koda tutar ve menü telefon tarayıcısında anında açılır: yemek fotoğrafları, alerjenler, her zaman güncel fiyatlar ve 35 dile otomatik çeviri. Uygulama indirmeden, her fiyat değişiminde menüyü yeniden bastırmadan.",
  },

  scan: {
    heading: "Kâğıt ya da PDF menünüz mü var?",
    headingAccent: "Yapay zekâ onu 60 saniyede QR menüye dönüştürür.",
    sub: "Menünün fotoğrafını ya da PDF'i yükleyin — yapay zekâ kategorileri, yemekleri ve fiyatları çıkarır ve anında QR menüye bağlar.",
    cta: "QR menü oluştur",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Tek QR, 35 dil",
      heading: "Tek bir QR kod, menü 35 dilde.",
      body: "Misafir QR'ı okutur ve dilini seçer: çeviriyi genel bir çevirmen değil, mutfak diline hâkim bir yapay zekâ yapar. Turistler için ayrı menüler ve masadaki dağınık kâğıtlar son bulur.",
      bullets: [
        "Tek bir QR baskısı 35 dili kapsar, abonelikte dahildir.",
        "Yapay zekâ mutfak dilini anlar — yemek adları her dilde doğal duyulur.",
        "Misafir menü içinde dili değiştirir, QR'ı tekrar okutmadan.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "İki misafir aynı masadaki QR kodu okutur ve menüyü farklı dillerde okur" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "QR'da alerjenler",
      heading: "QR menüde alerjenler ve diyet etiketleri.",
      body: "QR'a bağlı menüdeki her yemek gluten, laktoz, kuruyemiş, deniz ürünleri, vegan ve glutensiz seçenek etiketleri taşıyabilir. Misafir telefondan kısıtlamalarına uygun yemekleri personele sormadan filtreler.",
      bullets: [
        "Yemek bazında 14 alerjen kategorisi.",
        "Panelde tek tıkla vegan, vejetaryen ve glutensiz etiketleri.",
        "Misafir QR menüyü kendi kısıtlamalarına göre filtreler.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Misafir telefonda QR menüyü alerjenlere göre filtrelerken işletme sahibi listeyi tabletten düzenliyor" },
    },
    {
      icon: Palette,
      eyebrow: "Sadece bir QR'dan fazlası",
      heading: "Restoranın web sitesi kadar özenli bir QR menü.",
      body: "Kodu okuttuktan sonra misafir düz bir PDF'le karşılaşmaz: arka planda video ya da öne çıkan fotoğraflı bir karşılama ekranı, mekânın açıklaması ve harita, telefonlar ile sosyal medya bağlantılarını içeren bir iletişim sayfası görür. QR, restoranın çevrimiçi kapısına dönüşür.",
      bullets: [
        "QR menünün açılış ekranında arka plan videosu ya da öne çıkan fotoğraf.",
        "Mekânın ve her kategorinin konseptini anlatacak alan.",
        "Yerleşik iletişim sayfası: harita, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Masada iki telefon: arka plan videolu QR menü açılış ekranı ve haritalı iletişim sayfası" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "QR'dan sipariş · isteğe bağlı",
      heading: "QR kodundan misafir sipariş de verebilir.",
      body: "Menüyü görüntülemenin yanı sıra QR menü bir sipariş kanalına dönüşebilir: misafir yemekleri sepete ekler ve isteği gönderir. Sipariş salondaki garsona, WhatsApp'a ya da mutfak ekranına ulaşır. Özellik gerektiğinde ayarlardan açılır ya da kapatılır.",
      bullets: [
        "QR okutulduğu anda sepet, notlar ve sipariş gönderimi.",
        "Sipariş anında salona, WhatsApp'a ya da mutfak ekranına düşer.",
        "Özellik saatlere, salonlara veya belirli restoranlara göre açılabilir.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Masada iki telefon: QR menüden oluşturulan sepet ve gönderilen sipariş onayı" },
    },
  ],

  faq: {
    sub: "Restoran sahiplerinin IQ Rest QR kod menü hakkında sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın.",
    items: [
      { q: "IQ Rest QR kod menü nasıl çalışır?", a: "Her masada basılı bir QR kod bulunur. Misafir telefon kamerasıyla okutur ve tarayıcı restoran menüsünü açar — fotoğraflar, açıklamalar, alerjenler ve güncel fiyatlar. Ne misafir ne de personel için herhangi bir uygulama gerekmez." },
      { q: "QR menü oluşturmak için teknik bilgi gerekir mi?", a: "Hayır. Panel tıklama ve sürükle-bırak ile çalışır, kod ya da karmaşık ayar yoktur. Bir yemek eklemek birkaç saniye sürer: ad, fiyat, fotoğraf. İlk kurulum genellikle 30 dakika ile bir saat arasıdır; menünüzün PDF'i varsa yapay zekâ onu otomatik dönüştürür." },
      { q: "Misafirler QR'ı okutmak için uygulama kurmalı mı?", a: "Hayır. iPhone ve Android'in yerleşik kamerası QR kodu saniyeler içinde tanır ve menüyü doğrudan tarayıcıda açar. Yönetim paneli de modern her tarayıcıda çalışır — telefon, tablet ya da dizüstü." },
      { q: "Masalar için QR kodlar nasıl basılır?", a: "QR kodlar panelde otomatik üretilir (masa başına bir tane ya da tüm mekân için tek bir tane) ve baskıya hazır PDF olarak indirilir. Bir ofis yazıcısı ve bir stant yeterlidir: ayaklık, etiket veya bardak altlığı." },
      { q: "QR menü için kendi alan adımı kullanabilir miyim?", a: "Evet. SSL sertifikalı bir restoran alan adını destekliyoruz (örneğin menu.restoraniniz.com): misafir QR'ı okuttuğunda genel bir alt alan adı yerine restoranınızın adresini görür. DNS ayarı 5–10 dakika sürer ve size eşlik ederiz." },
      { q: "Birden fazla restoranın QR kodlarını tek hesaptan yönetebilir miyim?", a: "Evet, talep üzerine. Tek bir hesap birden fazla mekânı toplayabilir; her biri kendi QR kodlarına, menüsüne, tasarımına ve analizine sahip olur. WhatsApp'tan yazın, çoklu restoran modunu açalım." },
      { q: "QR menüyü sıfırdan başlatmak zor mu?", a: "Üç adım: (1) kategorileri oluşturun; (2) yemekleri ad, fiyat ve fotoğrafla ekleyin; (3) QR'ları basıp masalara koyun. Elinizde kâğıt ya da PDF menü varsa yükleyin — yapay zekâ kategorileri ve fiyatları tanır ve kartları doldurur. Temel bir menü 5 dakikada çevrimiçi olabilir." },
    ],
  },
};
