import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Çok Dilli Restoran Menüsü — 35 Dil, Tek Dokunuşla Geçiş",
    description:
      "Uluslararası misafirlere kendi dillerinde hizmet verin. 35 dilli restoran menüsü, tek dokunuşla geçiş. Arapça ve Farsça için sağdan sola desteği. 14 günlük ücretsiz deneme.",
    canonical: "https://iq-rest.com/tr/multilingual",
    ogLocale: "tr_TR",
    ogTitle: "Çok Dilli Restoran Menü Web Sitesi — 35 Dil Yerleşik",
    ogDescription:
      "Turistler tarar, menünüzü kendi dillerinde otomatik görür. 35 dil, sağdan sola desteği, telefon ayarlarından otomatik algılama. 14 günlük ücretsiz deneme.",
  },

  hero: {
    title: "Menünüz her turistin dilini konuşur.",
    subtitle:
      "Çok dilli bir restoran menüsü bir proje olmamalı. IQ Rest ile QR menünüz her misafirin telefon dilini otomatik algılar ve 35 dilden herhangi birinde sunar — Arapça ve Farsça için doğru sağdan sola işleme dahil.",
    trustLine: "4.9 · 30+ ülkede 500+ restoran",
  },

  seo: {
    description:
      "Menünüzü bir kez oluşturun, 35 dilde sunun. IQ Rest her misafirin telefon dilini otomatik algılar ve menüyü onların dilinde işler — bayrağa basma yok, dil engeli yok, tuhaf Google Translate anları yok. İspanyolca ve Almanca'dan Japonca, Arapça ve Mandarin'e kadar misafirleriniz restoranınızı görmesi gerektiği gibi görür.",
    fullDescription:
      "Çoğu 'çok dilli' menü, bir kez basılıp asla güncellenmeyen bozuk Google Translate PDF'leridir. IQ Rest'in çok dilli restoran web sitesi gerçek i18n: her dilin kendi düzgün çevrilmiş kopyası, kendi URL slug'ı, Google'ın indekslemesi için kendi meta etiketleri ve menü uygulaması içinde kendi yönlendirmesi vardır.\n\nFransızca dilinde bir iPhone'u olan turist QR kodunuzu taradığında menü otomatik olarak Fransızca açılır — dokunuş yok, karar yok. Üstteki dil seçiciyle başka herhangi bir dile geçebilirler ama çoğunun ihtiyacı olmaz. Aynısı diyet etiketleri için de geçerlidir ('vegan' dile göre 'vegano' / 'vegetarisch' / 'ヴィーガン' olur), hata mesajları için, 'sepete ekle' düğmeleri için, fişler için. 35 dilin tamamında her UI dizesi, sadece menü içeriği değil.\n\nSağdan sola yazılan diller için — Arapça ve Farsça — tüm düzen düzgün şekilde çevrilir: metin sağa hizalanır, menüler sağdan açılır, fiyatlar yemek adından sonra beklendiği gibi görünür. Bu bir CSS hilesi değil, Arapça ve Farsça misafirlerin sonradan eklenmiş gibi değil, gerçekten hizmet verildiğini hissetmesini sağlayan tam sağdan sola desteğidir.",
    benefitsHeading: "Gerçek bir çok dilli menü neden bir PDF çevirisini yener",
    benefits: [
      "Düzgün UI çevirisiyle 35 dil — sadece menü öğeleri değil",
      "Misafirin telefon dilini otomatik algılar — dokunuş gerekmez",
      "Başka bir dili tercih eden misafirler için manuel dil değiştirici",
      "Arapça ve Farsça için tam sağdan sola desteği — CSS hilesi değil",
      "Her dilin kendi URL'si var — Google sitenizin 35 sürümünü indeksler",
      "Bir yemek açıklamasını kendi dilinizde değiştirin — çeviriler takip eder",
    ],
  },

  pricing: {
    heading: "Tek plan.",
    headingAccent: "35 dilin tamamı dahil.",
    sub: "Çok dilli menü, yapay zekâ çevirisi, QR sipariş ve rezervasyonlar — hepsi tek sabit fiyata. Dil başına ücret yok, sağdan sola için ek ücret yok.",
  },

  faq: {
    sub: "Restoran sahiplerinin çok dilli menü hakkında sorduğu her şey. Sizinki burada yok mu? WhatsApp'tan yazın — gerçek insanlar yanıtlar.",
    items: [
      {
        q: "Menü kaç dili destekliyor?",
        a: "İngilizce, İspanyolca, Almanca, Fransızca, İtalyanca, Portekizce, Felemenkçe, Lehçe, Çekçe, Slovakça, Macarca, Rumence, Bulgarca, Hırvatça, Sırpça, Slovence, Yunanca, Türkçe, Rusça, Ukraynaca, Litvanca, Letonca, Estonca, Fince, İsveççe, Norveççe, Danca, İzlandaca, Katalanca, İrlanda Galcesi, Arapça, Farsça, Japonca, Korece ve Çince dahil 35 dil. UI dizeleri her biri için profesyonelce çevrilmiştir.",
      },
      {
        q: "Müşteriler dilleri nasıl değiştirir?",
        a: "İki yol: otomatik (menü telefonlarının dilinde açılır) ve manuel (menünün üst kısmındaki dil seçici). Turistlerin %80'i manuel seçiciye dokunmaz — otomatik algılama çalışır çünkü telefonları zaten dillerini bilir.",
      },
      {
        q: "Arapça ve Farsça gibi sağdan sola yazılan dilleri destekliyor musunuz?",
        a: "Evet, tam sağdan sola düzeniyle. Tüm menü çevrilir: metin sağa hizalanır, sütunlar tersine döner, gezinme çekmeceleri sağ taraftan açılır, fiyatlar yemek adlarından sonra görünür. Bu, sadece CSS yön hileleri değil, düzen seviyesinde uygulanan gerçek sağdan sola desteğidir.",
      },
      {
        q: "Google menümü 35 dilin tamamında indeksler mi?",
        a: "Evet. Her dilin kendi URL slug'ı (örneğin /es, /fr, /de), düzgün hreflang etiketleri, yerelleştirilmiş meta başlıkları ve açıklamaları ve dile özgü yapılandırılmış verileri vardır. Google her dili o yerel için ayrı bir sayfa olarak ele alır; bu, restoranınızı kendi dillerinde arayan turistlerin sizi bulmasının daha olası olduğu anlamına gelir.",
      },
      {
        q: "Tüm 35 dili istemiyorsam — sadece ana pazarlarımı?",
        a: "Hangi dillerin aktif olduğunu seçin. Yunanistan'da çoğunlukla İngiliz, Alman ve İtalyan turistlere hizmet veren bir plaj restoranıysanız sadece İngilizce, Almanca ve İtalyanca'yı etkinleştirin — diğerleri dil seçicide veya otomatik algılamada görünmez. Turist karışımınız değiştikçe sonradan daha fazlasını her zaman etkinleştirebilirsiniz.",
      },
    ],
  },

  finalCta: {
    heading: "Her turistin telefon dili.",
    headingAccent: "Zaten desteklenen.",
    sub: "Sağdan sola Arapça ve Farsça dahil 35 dilde çok dilli menü sunun. 14 günlük ücretsiz deneme, kredi kartı yok, dil başına ücret yok.",
  },
};
