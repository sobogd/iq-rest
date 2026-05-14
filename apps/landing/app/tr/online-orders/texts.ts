import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "QR Menüden Online Sipariş — Komisyonsuz Restoran Siparişleri",
    description:
      "QR menünüzden doğrudan sipariş alın. Sıfır komisyon, Uber Eats / Glovo kesintisi yok. Misafirler tarar, sipariş verir, öder — doğrudan size. 14 günlük ücretsiz deneme.",
    canonical: "https://iq-rest.com/tr/online-orders",
    ogLocale: "tr_TR",
    ogTitle: "Komisyonsuz Online Sipariş — QR Menünüzden Doğrudan Siparişler",
    ogDescription:
      "%30'luk teslimat uygulaması komisyonlarını doğrudan siparişlerle değiştirin. Misafirler QR'nizi tarar, sipariş verir, öder — her kuruş size kalır. 14 günlük ücretsiz deneme, kart yok.",
  },

  hero: {
    title: "Doğrudan siparişler. Sıfır komisyon. Doğruca mutfağınıza.",
    subtitle:
      "Uber Eats, Glovo ve Wolt'a %30 ödemeyi bırakın. IQ Rest ile misafirleriniz QR'yi tarar, siparişlerini telefonlarında oluşturur ve fiş doğrudan mutfağınıza düşer — her kuruş sizde kalır.",
    trustLine: "30+ ülkede 500+ restoran",
  },

  seo: {
    description:
      "QR menünüzü, teslimat uygulamalarına %30 vermeden tam bir online sipariş sistemine dönüştürün. Misafirler QR kodunuzu tarar, menüye kendi dilinde göz atar, sepet oluşturur, siparişi gönderir — siz de masa numarasıyla anında alırsınız. Uygulama indirme yok, komisyon yok, sizinle misafiriniz arasında üçüncü taraf yok.",
    fullDescription:
      "Çoğu restoran daha yemek mutfaktan çıkmadan para kaybetmeye başlar — Uber Eats %30, Glovo %30, Wolt %30 alır. IQ Rest üzerinden online sipariş tamamen farklı çalışır. Sipariş, misafirin telefonundan doğrudan panelinize geçer ve tüm marj sizindir.\n\nSipariş arayüzü özellikle restoran içi kullanım için tasarlandı: misafirler bir masa seçer, menüye göz atar, sepete ürün ekler, mutfağa not bırakır ve gönderir. Yeni siparişleri telefonunuzda veya mutfak ekranında masa numarası, ürünler, modifikasyonlar ve notlarla gerçek zamanlı görürsünüz. Yemekleri hazır olarak işaretleyin, masa durumu görsün — vardiyada garsonların onlarca yürüyüşünü tasarruf edin.\n\nPaket servis ve self-pickup için de çalışır: misafirler kapı yanındaki QR çıkartmasını tarar, sipariş verir ve öder — ayrı bir sipariş uygulamasına, ayrı bir web sitesine veya Stripe entegrasyon projesine ihtiyacınız yoktur.",
    benefitsHeading: "IQ Rest üzerinden doğrudan sipariş neden teslimat uygulamalarını yener",
    benefits: [
      "Her siparişte sıfır komisyon — gelirin %100'ü sizde kalır",
      "Siparişler masa numarasıyla gerçek zamanlı olarak panelinize uçar",
      "Misafirler için uygulama yok — QR'nizi tarar ve tarayıcıda sipariş verirler",
      "Modifikasyonlar, yorumlar, diyet notları — hepsi temiz biçimde alınır",
      "Yerinde yeme, paket servis ve self-pickup için çalışır — bir menü, üç akış",
      "Yerleşik üst satış ipuçları ortalama sipariş değerini artırır",
    ],
  },

  pricing: {
    heading: "Tek plan.",
    headingAccent: "Sıfır komisyon.",
    sub: "Doğrudan sipariş, QR menü, restoran için web sitesi ve rezervasyonlar — hepsi dahil. Sipariş başına ücret yok, Stripe entegrasyon projesi yok.",
  },

  faq: {
    sub: "Restoran sahiplerinin online sipariş hakkında sorduğu her şey. Sizinki burada yok mu? WhatsApp'tan yazın — gerçek insanlar yanıtlar.",
    items: [
      {
        q: "Siparişlerden komisyon alıyor musunuz?",
        a: "Sıfır. QR menünüzden gelen her sipariş doğrudan size gider — bizim için kesinti yok, Glovo / Uber Eats ücretleri yok. Tek bir sabit aylık abonelik, hepsi bu. Hesap basit: ayda 5.000 € teslimat uygulaması siparişi alıyorsanız 1.500 € kaybediyorsunuz. Doğrudan siparişe geçin ve o 1.500 € cebinizde kalsın.",
      },
      {
        q: "Misafirler nasıl sipariş veriyor — uygulamaya mı ihtiyaç var?",
        a: "Uygulama yok. Misafirler QR kodunuzu telefon kamerasıyla tarar, menü tarayıcıda açılır, masayı seçer, göz atar, sepete ekler ve gönderir. Tüm akış tarama sonrası iki dokunuş. App Store araması yok, kayıt yok, sürtüşme yok.",
      },
      {
        q: "Mutfakta siparişleri nasıl alıyorum?",
        a: "Siparişler panelinizde masa numarası, ürünler, modifikasyonlar ve notlarla anında görünür. Telefonunuzdan, geçişteki bir tabletten veya mutfak ekranından görüntüleyin. Ürünleri hazır olarak işaretleyin, masa durumu görsün — daha az 'yemeğim geliyor mu?' çağrısı, daha hızlı devir.",
      },
      {
        q: "Misafirler QR menüden ödeme yapabilir mi yoksa sadece masada mı?",
        a: "Her ikisi de. Klasik şekilde masada nakit veya kartla gönderip ödeyebilirler ya da menü üzerinden Stripe ile çevrimiçi ödeyebilirler. Neyin etkin olacağına siz karar verirsiniz. Çevrimiçi ödeme Stripe ile güvence altındadır — IQ Rest parayı asla tutmaz, doğrudan Stripe hesabınıza gider.",
      },
      {
        q: "Sadece yerinde yemek için değil, paket servis ve self-pickup için de çalışıyor mu?",
        a: "Evet. Paket servis için girişinize bir QR çıkartması yapıştırın veya menü bağlantınızı Instagram ve WhatsApp'ta paylaşın. Misafirler 'pickup' seçer, sipariş verir, öder — siz hazırlarsınız, onlar gelip alır. Aynı sistem, üç farklı sipariş akışı: yerinde yeme, paket servis, self-pickup.",
      },
    ],
  },

  finalCta: {
    heading: "Teslimat uygulamalarını beslemeyi bırakın.",
    headingAccent: "%100'ünü tutmaya başlayın.",
    sub: "%30 komisyonlarınızı sabit bir aylık ücretle değiştirin. 14 günlük ücretsiz deneme. Kredi kartı yok. İstediğiniz zaman iptal edin.",
  },
};
