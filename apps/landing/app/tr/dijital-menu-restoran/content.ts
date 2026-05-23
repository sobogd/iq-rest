import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "tr",
  slug: "dijital-menu-restoran",
  trackPrefix: "l_tr_digital",

  meta: {
    title: "Restoranlar için dijital menü | IQ Rest",
    description:
      "Restoranlar için dijital menü: fotoğraflı, alerjenli online kart, AI çevirisi ve canlı fiyat güncellemeleri. 14 gün ücretsiz, kart gerekmez.",
    canonical: "https://iq-rest.com/tr/dijital-menu-restoran",
    ogLocale: "tr_TR",
    ogTitle: "Restoranlar için dijital menü",
    ogDescription:
      "Kağıt menünüzün online versiyonu — fotoğraflar, alerjenler, AI çevirisi, gerçek zamanlı güncellemeler.",
    brandLine: "IQ Rest — Restoranlar için dijital menü",
  },

  hero: {
    headline: "Restoranlar için dijital menü.",
    sub: "Fotoğraflar, alerjenler, açıklamalar ve canlı fiyat güncellemeleriyle kağıt menünüzün online versiyonu. Misafirler menüyü kendi dillerinde görür; restoran baskıdan tasarruf eder.",
    imageSrc: "/landing/hero-digital-menu.webp",
    imageAlt: "Two phones on a wooden restaurant table showing a digital menu with dish photos and prices",
  },

  scan: {
    heading: "Kağıt menünüz veya PDF'iniz mi var?",
    headingAccent: "AI bunu 60 saniyede dijitalleştirir.",
    sub: "Bir fotoğraf veya belge yükleyin — AI kategorileri, yemekleri ve fiyatları otomatik olarak tanır.",
    cta: "Menüyü tara",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI dili",
      heading: "35 AI dili — her misafir menüyü kendi dilinde okur.",
      body: "Bir QR kodu, 35 dil. AI mutfak bağlamını yönetir — yemek adları ve açıklamalar doğal görünür. Turistler daha büyük güvenle sipariş verir ve ortalama hesap, garson her yemeği tercüme etmeden büyür.",
      bullets: [
        "Abonelikte 35 dil dahil, ek ücret yok.",
        "Ham Google Translate değil, mutfak farkındalığı olan AI.",
        "Misafir, menüde tek dokunuşla dili değiştirir.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "İki misafir aynı dijital menüyü kendi telefonlarında farklı dillerde okuyor" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alerjenler",
      heading: "Alerjen ve diyet etiketleri.",
      body: "Yemekleri gluten, laktoz, kuruyemiş, deniz ürünleri, vegan ve glutensiz seçenekler için işaretleyin. Misafirler menüyü diyet ihtiyaçlarına göre filtreler ve daha büyük güvenle sipariş verir.",
      bullets: [
        "Her yemek üzerinde 14 standart alerjen kategorisi.",
        "Tek tıklamayla vegan, vejetaryen ve glutensiz etiketler.",
        "Misafirler menüyü diyet kısıtlamalarına göre filtreler.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Misafir telefonda menüyü alerjenlere göre filtrelerken sahip alerjen listesini bir tablette düzenliyor" },
    },
    {
      icon: Palette,
      eyebrow: "Premium tasarım",
      heading: "Video arka plan ve iletişim sayfasıyla premium tasarım.",
      body: "Karşılama ekranında video veya fotoğraf, restoran açıklaması, harita, telefon numaraları ve sosyal profillerle özel iletişim sayfası. Dijital menü, QR kodu arkasında bir PDF değil, tam bir restoran web sitesi gibi görünür.",
      bullets: [
        "Karşılama ekranında video arka plan veya büyük fotoğraf.",
        "Restoran ve kategori açıklamaları — kavramın hikayesini anlatın.",
        "İletişim sayfası: harita, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Bir kafe masasında iki telefon: video arka planlı menü ana ekranı ve haritalı iletişim sayfası" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Menüden sipariş · isteğe bağlı",
      heading: "Misafirler doğrudan menüden sipariş verir.",
      body: "Misafirler QR menüsünde sepet oluşturur ve siparişi gönderir — salondaki garsona veya mutfak tabletine düşer. Özellik, ayarlardan istediğiniz zaman etkinleştirilebilir veya devre dışı bırakılabilir.",
      bullets: [
        "Sepet, yorumlar ve tek dokunuşla sipariş gönderme.",
        "Sipariş anında yönetim paneline, WhatsApp'a veya mutfak ekranına düşer.",
        "Özellik ayarlardan değiştirilir.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Masada iki telefon: siparişli sepet ve sipariş onayı" },
    },
  ],

  faq: {
    sub: "Restorancıların IQ Rest'teki dijital menü hakkında sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın.",
    items: [
      { q: "Teknik becerilere veya CMS deneyimine ihtiyacım var mı?", a: "Hayır, özel beceri gerekmez. Yönetim panelindeki her işlem kod olmadan tıklama ve sürükle-bırak ile yapılır. Bir menü ürünü eklemek birkaç saniye sürer: ad, fiyat, fotoğraf. Tam bir menü kurulumu genellikle 30 dakika ile bir saat arasında sürer." },
      { q: "IQ Rest dijital menü nedir?", a: "IQ Rest, restoranlar için bir bulut platformudur. Dijital menü, QR kodu veya doğrudan bağlantı aracılığıyla misafirlere sunulan menünüzün online versiyonudur: yemek fotoğrafları, fiyatlar, alerjenler, 35 dile AI çevirisi, gerçek zamanlı güncellemeler. Menü sunucularımızda barındırılır; yazılım kurmanıza veya bakımını yapmanıza gerek yoktur — sadece tarayıcıyı açın." },
      { q: "Misafirlerin uygulamaya veya özel donanıma ihtiyacı var mı?", a: "Hayır. Misafirler telefon kamerasını QR koduna doğrultur ve menü tarayıcıda açılır. Restoran için yönetim paneli de herhangi bir modern tarayıcıda çalışır — telefon, tablet veya dizüstü. QR kodlar herhangi bir ofis yazıcısında basılır." },
      { q: "Menüyü kendi alan adımda barındırabilir miyim?", a: "Evet. SSL sertifikalı özel alan adını destekliyoruz — misafirler menüyü restoranınızın adresinde görür (örn. menu.restoraniniz.com). DNS kurulumunda yardımcı oluyoruz; genellikle 5-10 dakika sürer." },
      { q: "Tek bir hesaptan birden fazla restoranı yönetebilir miyim?", a: "Evet, talep üzerine. Bir hesap birden fazla restoranı barındırabilir: her mekan kendi menüsü, tasarımı, QR kodları ve analitiği ile. WhatsApp'tan yazın, grubunuz için çoklu restoran modunu etkinleştirelim." },
      { q: "Menüyü sıfırdan kurmak ne kadar zor?", a: "Kurulum üç adımdan oluşur: (1) kategoriler oluşturun; (2) ad, fiyat ve fotoğraflarla ürünler ekleyin; (3) masalar için QR kodları basın. Zaten bir kağıt menüniz veya PDF'iniz varsa, yükleyin — AI kategorileri, adları ve fiyatları tanıyacak ve kartları otomatik olarak dolduracak. Temel bir menü 5 dakikada yayınlanabilir; tam kurulum süresi ürün sayısına bağlıdır." },
      { q: "Ne tür destek sunuyorsunuz?", a: "Çalışma saatlerinde WhatsApp'tayız ve e-postaya hızlı cevap veriyoruz. İlk kurulum, alan adı yapılandırması, menü tasarımı ve her türlü standart dışı durumlarda yardımcı oluyoruz. Demo veya lansman sırasında uygulamalı desteğe ihtiyacınız varsa — bize yazın." },
    ],
  },
};
