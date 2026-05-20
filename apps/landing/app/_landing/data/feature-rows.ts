// Shared conversion-focused alternating feature rows used on every landing
// page (homepage + PPC LP) in every locale. Image paths are identical across
// locales — only copy differs. SEO feature-detail pages are unaffected.

export interface FeatureRowData {
  image: { src: string; alt: string };
  eyebrow: string;
  heading: string;
  body: string;
  bullets: readonly [string, string, string];
  trackEvent: string;
}

const IMG = {
  reservation: "/landing/feature-reservation.webp",
  orders: "/landing/feature-orders.webp",
  kitchen: "/landing/feature-kitchen.webp",
  multilang: "/landing/feature-multilang.webp",
  mobile: "/landing/feature-mobile.webp",
};

interface RowCopy {
  alt: string;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: readonly [string, string, string];
}

interface LocaleCopy {
  reservation: RowCopy;
  orders: RowCopy;
  kitchen: RowCopy;
  multilang: RowCopy;
  mobile: RowCopy;
}

const COPY: Record<string, LocaleCopy> = {
  en: {
    reservation: {
      alt: "Hostess managing reservations from a tablet at the restaurant entrance",
      eyebrow: "Reservations",
      heading: "Fill the room while you're in the kitchen.",
      body: "Online bookings 24/7 straight into your calendar. Zero phone, zero paper.",
      bullets: [
        "Calendar per table and time slot.",
        "Auto confirmations and reminders.",
        "Book from the table QR or the menu.",
      ],
    },
    orders: {
      alt: "Waiter taking an order at the table from a smartphone running the ordering app",
      eyebrow: "Table ordering",
      heading: "The waiter takes the order. Straight to the kitchen.",
      body: "No notepad, no trips to the bar. Tap the table, mark the dishes, done.",
      bullets: [
        "Visual table map, live.",
        "Order instantly to kitchen and cash.",
        "Modifiers, notes and allergens per dish.",
      ],
    },
    kitchen: {
      alt: "Professional kitchen with tablet on a brass stand showing the kitchen display",
      eyebrow: "Kitchen display",
      heading: "From the guest's phone to the chef's screen.",
      body: "Goodbye paper tickets. Orders per table, with notes and allergens, ready to cook.",
      bullets: [
        "Columns per table: Ready / Cooking / Served.",
        "Allergens and notes highlighted on every dish.",
        "Floor, kitchen and till in real-time sync.",
      ],
    },
    multilang: {
      alt: "Two guests reading the same digital menu in different languages on their phones",
      eyebrow: "35 languages with AI",
      heading: "One QR. Every guest in their own language.",
      body: "Translate the entire menu into 35 languages in one tap. AI gets gastronomy.",
      bullets: [
        "35 languages included. No extra cost.",
        "Culinary context — not Google Translate.",
        "Guest language detected automatically.",
      ],
    },
    mobile: {
      alt: "Laptop and phone on a cafe table editing the same dish on the dashboard",
      eyebrow: "Mobile management",
      heading: "Your whole menu, in your pocket.",
      body: "Same panel on laptop, tablet and phone. Live changes in seconds.",
      bullets: [
        "No app to install — open the browser.",
        "Prices and photos in one tap.",
        "Work from wherever you are.",
      ],
    },
  },

  es: {
    reservation: {
      alt: "Anfitriona gestionando reservas desde una tablet en la entrada del restaurante",
      eyebrow: "Reservas",
      heading: "Llena la sala mientras estás en la cocina.",
      body: "Reservas online 24/7 directamente en tu agenda. Cero llamadas, cero papel.",
      bullets: [
        "Calendario por mesa y turno.",
        "Confirmaciones y recordatorios automáticos.",
        "Reserva desde el QR de la mesa.",
      ],
    },
    orders: {
      alt: "Camarero tomando un pedido en la mesa desde un smartphone con la app de pedidos",
      eyebrow: "Pedidos en mesa",
      heading: "El camarero toma el pedido. Va directo a la cocina.",
      body: "Sin libreta, sin idas a la barra. Toca la mesa, marca los platos, listo.",
      bullets: [
        "Mapa visual de mesas en tiempo real.",
        "Comanda instantánea a cocina y caja.",
        "Modificadores, notas y alérgenos por plato.",
      ],
    },
    kitchen: {
      alt: "Cocina profesional con tablet en soporte de latón mostrando la pantalla de cocina",
      eyebrow: "Pantalla de cocina",
      heading: "Del móvil del cliente a la pantalla del chef.",
      body: "Adiós tickets en papel. Pedidos por mesa, con notas y alérgenos, listos para preparar.",
      bullets: [
        "Columnas por mesa: Listo / En cocción / Servido.",
        "Alérgenos y notas destacados en cada plato.",
        "Sala, cocina y caja sincronizadas en tiempo real.",
      ],
    },
    multilang: {
      alt: "Dos huéspedes leyendo la misma carta digital en idiomas distintos desde sus teléfonos",
      eyebrow: "35 idiomas con IA",
      heading: "Un QR. Cada huésped en su idioma.",
      body: "Traduce toda la carta a 35 idiomas con un toque. La IA entiende de gastronomía.",
      bullets: [
        "35 idiomas incluidos. Sin coste extra.",
        "Contexto culinario, no Google Translate.",
        "Idioma del cliente detectado automáticamente.",
      ],
    },
    mobile: {
      alt: "Portátil y móvil sobre una mesa de cafetería editando el mismo plato del dashboard",
      eyebrow: "Gestión móvil",
      heading: "Toda tu carta, en el bolsillo.",
      body: "Mismo panel en portátil, tablet y móvil. Cambios en directo en segundos.",
      bullets: [
        "Sin app que instalar — abre el navegador.",
        "Precios y fotos en un toque.",
        "Trabaja desde donde estés.",
      ],
    },
  },

  it: {
    reservation: {
      alt: "Hostess gestisce prenotazioni da un tablet all'ingresso del ristorante",
      eyebrow: "Prenotazioni",
      heading: "Riempi la sala mentre sei in cucina.",
      body: "Prenotazioni online 24/7 direttamente in agenda. Zero telefono, zero carta.",
      bullets: [
        "Calendario per tavolo e turno.",
        "Conferme e promemoria automatici.",
        "Prenota dal QR del tavolo o dal menu.",
      ],
    },
    orders: {
      alt: "Cameriere prende un'ordinazione al tavolo da uno smartphone con l'app",
      eyebrow: "Ordini al tavolo",
      heading: "Il cameriere prende l'ordine. Direttamente in cucina.",
      body: "Niente blocchetto, niente corse al bancone. Tocca il tavolo, segna i piatti, fatto.",
      bullets: [
        "Mappa visiva dei tavoli in tempo reale.",
        "Comanda istantanea a cucina e cassa.",
        "Varianti, note e allergeni per piatto.",
      ],
    },
    kitchen: {
      alt: "Cucina professionale con tablet su supporto in ottone che mostra il display di cucina",
      eyebrow: "Display di cucina",
      heading: "Dal telefono del cliente allo schermo dello chef.",
      body: "Addio scontrini di carta. Ordini per tavolo, con note e allergeni, pronti da cucinare.",
      bullets: [
        "Colonne per tavolo: Pronto / In cottura / Servito.",
        "Allergeni e note evidenziati su ogni piatto.",
        "Sala, cucina e cassa sincronizzate in tempo reale.",
      ],
    },
    multilang: {
      alt: "Due ospiti leggono lo stesso menu digitale in lingue diverse dai loro telefoni",
      eyebrow: "35 lingue con IA",
      heading: "Un QR. Ogni ospite nella sua lingua.",
      body: "Traduci tutto il menu in 35 lingue con un tocco. L'IA capisce la gastronomia.",
      bullets: [
        "35 lingue incluse. Senza costi extra.",
        "Contesto culinario, non Google Translate.",
        "Lingua del cliente rilevata in automatico.",
      ],
    },
    mobile: {
      alt: "Portatile e cellulare su un tavolino da bar che modificano lo stesso piatto",
      eyebrow: "Gestione mobile",
      heading: "Tutto il menu, in tasca.",
      body: "Stesso pannello su portatile, tablet e cellulare. Modifiche in diretta in pochi secondi.",
      bullets: [
        "Nessuna app da installare — apri il browser.",
        "Prezzi e foto in un tocco.",
        "Lavora da dove vuoi.",
      ],
    },
  },

  pt: {
    reservation: {
      alt: "Anfitriã a gerir reservas a partir de um tablet na entrada do restaurante",
      eyebrow: "Reservas",
      heading: "Enche a sala enquanto estás na cozinha.",
      body: "Reservas online 24/7 diretamente na agenda. Zero telefone, zero papel.",
      bullets: [
        "Calendário por mesa e turno.",
        "Confirmações e lembretes automáticos.",
        "Reserva pelo QR da mesa ou do menu.",
      ],
    },
    orders: {
      alt: "Empregado a tirar um pedido na mesa a partir de um smartphone com a app",
      eyebrow: "Pedidos na mesa",
      heading: "O empregado tira o pedido. Vai direto para a cozinha.",
      body: "Sem bloco, sem idas ao balcão. Toca na mesa, marca os pratos, pronto.",
      bullets: [
        "Mapa visual de mesas em tempo real.",
        "Comanda instantânea para cozinha e caixa.",
        "Modificadores, notas e alergénios por prato.",
      ],
    },
    kitchen: {
      alt: "Cozinha profissional com tablet em suporte de latão a mostrar o ecrã de cozinha",
      eyebrow: "Ecrã de cozinha",
      heading: "Do telemóvel do cliente para o ecrã do chef.",
      body: "Adeus talões em papel. Pedidos por mesa, com notas e alergénios, prontos a preparar.",
      bullets: [
        "Colunas por mesa: Pronto / A cozinhar / Servido.",
        "Alergénios e notas destacados em cada prato.",
        "Sala, cozinha e caixa sincronizadas em tempo real.",
      ],
    },
    multilang: {
      alt: "Dois hóspedes a ler o mesmo menu digital em línguas diferentes nos seus telemóveis",
      eyebrow: "35 idiomas com IA",
      heading: "Um QR. Cada hóspede na sua língua.",
      body: "Traduz todo o menu para 35 idiomas num toque. A IA percebe de gastronomia.",
      bullets: [
        "35 idiomas incluídos. Sem custo extra.",
        "Contexto culinário, não Google Translate.",
        "Idioma do cliente detetado automaticamente.",
      ],
    },
    mobile: {
      alt: "Portátil e telemóvel numa mesa de café a editar o mesmo prato do dashboard",
      eyebrow: "Gestão móvel",
      heading: "Todo o teu menu, no bolso.",
      body: "Mesmo painel no portátil, tablet e telemóvel. Alterações em direto em segundos.",
      bullets: [
        "Sem app para instalar — abre o navegador.",
        "Preços e fotos num toque.",
        "Trabalha de onde estiveres.",
      ],
    },
  },

  fr: {
    reservation: {
      alt: "Hôtesse gérant les réservations depuis une tablette à l'entrée du restaurant",
      eyebrow: "Réservations",
      heading: "Remplis la salle pendant que tu es en cuisine.",
      body: "Réservations en ligne 24/7 directement dans ton agenda. Zéro téléphone, zéro papier.",
      bullets: [
        "Calendrier par table et créneau.",
        "Confirmations et rappels automatiques.",
        "Réservation depuis le QR de la table ou du menu.",
      ],
    },
    orders: {
      alt: "Serveur prenant une commande à table depuis un smartphone avec l'app",
      eyebrow: "Commandes à table",
      heading: "Le serveur prend la commande. Direct en cuisine.",
      body: "Sans carnet, sans allers-retours au bar. Touche la table, coche les plats, terminé.",
      bullets: [
        "Plan visuel des tables en temps réel.",
        "Commande instantanée en cuisine et caisse.",
        "Modificateurs, notes et allergènes par plat.",
      ],
    },
    kitchen: {
      alt: "Cuisine professionnelle avec tablette sur support en laiton affichant l'écran cuisine",
      eyebrow: "Écran de cuisine",
      heading: "Du téléphone du client à l'écran du chef.",
      body: "Adieu les tickets papier. Commandes par table, avec notes et allergènes, prêtes à préparer.",
      bullets: [
        "Colonnes par table : Prêt / En cuisson / Servi.",
        "Allergènes et notes mis en avant sur chaque plat.",
        "Salle, cuisine et caisse synchronisées en temps réel.",
      ],
    },
    multilang: {
      alt: "Deux clients lisant le même menu digital en langues différentes sur leurs téléphones",
      eyebrow: "35 langues avec IA",
      heading: "Un QR. Chaque client dans sa langue.",
      body: "Traduis tout le menu en 35 langues d'un toucher. L'IA comprend la gastronomie.",
      bullets: [
        "35 langues incluses. Sans coût supplémentaire.",
        "Contexte culinaire, pas Google Translate.",
        "Langue du client détectée automatiquement.",
      ],
    },
    mobile: {
      alt: "Portable et téléphone sur une table de café modifiant le même plat du tableau de bord",
      eyebrow: "Gestion mobile",
      heading: "Tout ton menu, dans la poche.",
      body: "Même panneau sur portable, tablette et téléphone. Modifications en direct en quelques secondes.",
      bullets: [
        "Aucune app à installer — ouvre le navigateur.",
        "Prix et photos en un toucher.",
        "Travaille de n'importe où.",
      ],
    },
  },

  de: {
    reservation: {
      alt: "Gastgeberin verwaltet Reservierungen über ein Tablet am Restauranteingang",
      eyebrow: "Reservierungen",
      heading: "Volle Tische, während du in der Küche stehst.",
      body: "Online-Reservierungen 24/7 direkt im Kalender. Null Telefon, null Papier.",
      bullets: [
        "Kalender pro Tisch und Zeitfenster.",
        "Automatische Bestätigungen und Erinnerungen.",
        "Reservieren über den QR am Tisch oder im Menü.",
      ],
    },
    orders: {
      alt: "Kellner nimmt eine Bestellung am Tisch über ein Smartphone mit der App auf",
      eyebrow: "Bestellung am Tisch",
      heading: "Der Kellner nimmt die Bestellung. Direkt in die Küche.",
      body: "Kein Block, keine Wege zur Theke. Tisch antippen, Gerichte markieren, fertig.",
      bullets: [
        "Visuelle Tisch-Übersicht in Echtzeit.",
        "Bestellung sofort an Küche und Kasse.",
        "Modifier, Notizen und Allergene pro Gericht.",
      ],
    },
    kitchen: {
      alt: "Profi-Küche mit Tablet auf Messingständer, das den Küchen-Bildschirm zeigt",
      eyebrow: "Küchendisplay",
      heading: "Vom Handy des Gastes auf den Bildschirm des Chefs.",
      body: "Tschüss Papierbons. Bestellungen pro Tisch, mit Notizen und Allergenen, kochfertig.",
      bullets: [
        "Spalten pro Tisch: Fertig / In Zubereitung / Serviert.",
        "Allergene und Notizen auf jedem Gericht hervorgehoben.",
        "Service, Küche und Kasse in Echtzeit synchronisiert.",
      ],
    },
    multilang: {
      alt: "Zwei Gäste lesen dieselbe digitale Speisekarte in verschiedenen Sprachen auf ihren Handys",
      eyebrow: "35 Sprachen mit KI",
      heading: "Ein QR. Jeder Gast in seiner Sprache.",
      body: "Übersetze die ganze Karte in 35 Sprachen mit einem Tipp. Die KI kennt Gastronomie.",
      bullets: [
        "35 Sprachen inklusive. Keine Zusatzkosten.",
        "Kulinarischer Kontext — kein Google Translate.",
        "Sprache des Gastes wird automatisch erkannt.",
      ],
    },
    mobile: {
      alt: "Laptop und Handy auf einem Cafétisch, beide bearbeiten dasselbe Gericht im Dashboard",
      eyebrow: "Mobile Verwaltung",
      heading: "Deine ganze Speisekarte, in der Tasche.",
      body: "Gleiches Panel auf Laptop, Tablet und Handy. Live-Änderungen in Sekunden.",
      bullets: [
        "Keine App nötig — einfach den Browser öffnen.",
        "Preise und Fotos mit einem Tipp.",
        "Arbeite, wo du gerade bist.",
      ],
    },
  },

  ru: {
    reservation: {
      alt: "Хостес управляет бронированиями с планшета у входа в ресторан",
      eyebrow: "Бронирование",
      heading: "Наполняйте зал, пока вы на кухне.",
      body: "Онлайн-бронирование 24/7 поступает напрямую в ваш календарь. Без звонков и блокнотов.",
      bullets: [
        "Календарь по столам и временным слотам.",
        "Автоматические подтверждения и напоминания.",
        "Бронирование через QR-код стола или из меню.",
      ],
    },
    orders: {
      alt: "Официант принимает заказ за столом со смартфона",
      eyebrow: "Заказы в зале",
      heading: "Официант принимает заказ — заказ уходит на кухню.",
      body: "Без бумажных блокнотов и переходов к стойке. Выберите стол, отметьте позиции — заказ отправлен.",
      bullets: [
        "Визуальная карта зала в реальном времени.",
        "Заказ мгновенно поступает на кухню и в кассу.",
        "Модификаторы, комментарии и аллергены к каждому блюду.",
      ],
    },
    kitchen: {
      alt: "Профессиональная кухня с планшетом на латунной подставке: кухонный дисплей с активными заказами",
      eyebrow: "Кухонный дисплей",
      heading: "С телефона гостя — на экран повара.",
      body: "Бумажные чеки больше не нужны. Заказы по столам с комментариями и аллергенами — сразу готовы к приготовлению.",
      bullets: [
        "Колонки по столам: «Готовится / Готово / Подано».",
        "Аллергены и комментарии выделены на каждом блюде.",
        "Зал, кухня и касса синхронизированы в реальном времени.",
      ],
    },
    multilang: {
      alt: "Два гостя читают одно и то же цифровое меню на разных языках с собственных телефонов",
      eyebrow: "35 языков с ИИ",
      heading: "35 языков с ИИ — каждый гость понимает меню.",
      body: "Один QR-код, 35 языков. ИИ учитывает гастрономический контекст — названия и описания блюд звучат естественно. Туристы заказывают увереннее, средний чек растёт без помощи официанта-переводчика.",
      bullets: [
        "35 языков включены в подписку, без доплат.",
        "Кулинарный ИИ, а не машинный перевод Google.",
        "Гость переключает язык одним касанием прямо в меню.",
      ],
    },
    mobile: {
      alt: "Ноутбук и телефон на столе кафе: одна и та же позиция меню редактируется на двух устройствах",
      eyebrow: "Управление с телефона",
      heading: "Управляйте меню с любого устройства.",
      body: "Единая панель открывается в браузере телефона, планшета или ноутбука. Изменили цену, исключили блюдо из стоп-листа или добавили специальное предложение — гости видят изменения через несколько секунд. Без установки программ и интеграций.",
      bullets: [
        "Без установки приложения: панель открывается в браузере.",
        "Цены, фотографии и стоп-лист — несколько касаний с телефона.",
        "Управляйте меню откуда угодно, в том числе из зала.",
      ],
    },
  },

  uk: {
    reservation: {
      alt: "Хостес керує бронюваннями з планшета біля входу в ресторан",
      eyebrow: "Бронювання",
      heading: "Наповнюй зал, поки ти на кухні.",
      body: "Бронювання онлайн 24/7 прямо в твій календар. Жодних дзвінків, жодного паперу.",
      bullets: [
        "Календар по столиках і слотах.",
        "Автопідтвердження та нагадування.",
        "Бронюй через QR столика або з меню.",
      ],
    },
    orders: {
      alt: "Офіціант приймає замовлення за столиком зі смартфона з застосунком",
      eyebrow: "Замовлення в залі",
      heading: "Офіціант приймає замовлення. Одразу на кухню.",
      body: "Без блокнота, без біганини до бару. Тицяєш столик, відмічаєш страви — готово.",
      bullets: [
        "Візуальна карта столів у реальному часі.",
        "Замовлення миттєво на кухню і в касу.",
        "Модифікатори, нотатки й алергени на кожну страву.",
      ],
    },
    kitchen: {
      alt: "Професійна кухня з планшетом на латунній підставці з екраном кухні",
      eyebrow: "Дисплей кухні",
      heading: "З телефона гостя — одразу на екран кухаря.",
      body: "Прощавай, паперові чеки. Замовлення за столиками, з нотатками й алергенами, готові до приготування.",
      bullets: [
        "Колонки по столиках: Готово / Готується / Подано.",
        "Алергени й нотатки виділені на кожній страві.",
        "Зал, кухня й каса синхронізовані в реальному часі.",
      ],
    },
    multilang: {
      alt: "Двоє гостей читають однакове цифрове меню різними мовами зі своїх телефонів",
      eyebrow: "35 мов з AI",
      heading: "Один QR. Кожен гість — своєю мовою.",
      body: "Переклади все меню на 35 мов одним дотиком. AI розуміє гастрономію.",
      bullets: [
        "35 мов включено. Без доплат.",
        "Кулінарний контекст, не Google Translate.",
        "Мова гостя визначається автоматично.",
      ],
    },
    mobile: {
      alt: "Ноутбук і телефон на столику кафе — редагують одну й ту ж страву в дашборді",
      eyebrow: "Керування з мобільного",
      heading: "Усе твоє меню — у кишені.",
      body: "Та сама панель на ноутбуку, планшеті й телефоні. Зміни наживо за секунди.",
      bullets: [
        "Без застосунку — відкрий браузер.",
        "Ціни й фото в один дотик.",
        "Працюй звідки завгодно.",
      ],
    },
  },

  nl: {
    reservation: {
      alt: "Gastvrouw beheert reserveringen vanaf een tablet bij de ingang",
      eyebrow: "Reserveringen",
      heading: "Vul de zaal terwijl jij in de keuken staat.",
      body: "Online reserveringen 24/7 direct in je agenda. Nul telefoontjes, nul papier.",
      bullets: [
        "Kalender per tafel en tijdslot.",
        "Automatische bevestigingen en herinneringen.",
        "Reserveer vanaf de QR van de tafel of het menu.",
      ],
    },
    orders: {
      alt: "Ober neemt aan tafel een bestelling op vanaf een smartphone met de app",
      eyebrow: "Bestellen aan tafel",
      heading: "De ober neemt de bestelling op. Direct naar de keuken.",
      body: "Geen bonnetjes, geen looprondjes naar de bar. Tik op de tafel, kies de gerechten, klaar.",
      bullets: [
        "Visuele plattegrond van tafels, live.",
        "Bestelling direct naar keuken en kassa.",
        "Modificaties, notities en allergenen per gerecht.",
      ],
    },
    kitchen: {
      alt: "Professionele keuken met tablet op messing standaard die het keukenscherm toont",
      eyebrow: "Keukenscherm",
      heading: "Van de telefoon van de gast naar het scherm van de chef.",
      body: "Vaarwel papieren bonnen. Bestellingen per tafel, met notities en allergenen, klaar om te bereiden.",
      bullets: [
        "Kolommen per tafel: Klaar / In bereiding / Geserveerd.",
        "Allergenen en notities uitgelicht op elk gerecht.",
        "Zaal, keuken en kassa in realtime gesynchroniseerd.",
      ],
    },
    multilang: {
      alt: "Twee gasten lezen hetzelfde digitale menu in verschillende talen op hun telefoons",
      eyebrow: "35 talen met AI",
      heading: "Eén QR. Elke gast in zijn eigen taal.",
      body: "Vertaal het hele menu naar 35 talen met één tik. De AI begrijpt gastronomie.",
      bullets: [
        "35 talen inbegrepen. Geen meerkosten.",
        "Culinaire context, geen Google Translate.",
        "Taal van de gast automatisch gedetecteerd.",
      ],
    },
    mobile: {
      alt: "Laptop en telefoon op een cafétafel die hetzelfde gerecht in het dashboard bewerken",
      eyebrow: "Beheer via mobiel",
      heading: "Je hele menu, in je zak.",
      body: "Hetzelfde paneel op laptop, tablet en telefoon. Live wijzigingen in seconden.",
      bullets: [
        "Geen app nodig — open de browser.",
        "Prijzen en foto's met één tik.",
        "Werk vanaf waar je bent.",
      ],
    },
  },

  pl: {
    reservation: {
      alt: "Hostessa zarządza rezerwacjami z tabletu przy wejściu do restauracji",
      eyebrow: "Rezerwacje",
      heading: "Wypełnij salę, podczas gdy jesteś w kuchni.",
      body: "Rezerwacje online 24/7 prosto w Twój kalendarz. Zero telefonów, zero papieru.",
      bullets: [
        "Kalendarz na stolik i przedział czasu.",
        "Automatyczne potwierdzenia i przypomnienia.",
        "Rezerwacja przez QR stolika lub menu.",
      ],
    },
    orders: {
      alt: "Kelner przyjmujący zamówienie przy stoliku ze smartfonu z aplikacją",
      eyebrow: "Zamówienia przy stoliku",
      heading: "Kelner przyjmuje zamówienie. Prosto do kuchni.",
      body: "Bez bloczku, bez biegania do baru. Dotknij stolika, zaznacz dania, gotowe.",
      bullets: [
        "Wizualna mapa stolików na żywo.",
        "Zamówienie natychmiast do kuchni i kasy.",
        "Modyfikatory, notatki i alergeny przy każdym daniu.",
      ],
    },
    kitchen: {
      alt: "Profesjonalna kuchnia z tabletem na mosiężnym stojaku z ekranem kuchni",
      eyebrow: "Wyświetlacz kuchenny",
      heading: "Z telefonu gościa na ekran szefa kuchni.",
      body: "Żegnaj paragony. Zamówienia po stolikach, z notatkami i alergenami, gotowe do przygotowania.",
      bullets: [
        "Kolumny po stolikach: Gotowe / W przygotowaniu / Podane.",
        "Alergeny i notatki wyróżnione przy każdym daniu.",
        "Sala, kuchnia i kasa zsynchronizowane na żywo.",
      ],
    },
    multilang: {
      alt: "Dwóch gości czyta to samo cyfrowe menu w różnych językach na swoich telefonach",
      eyebrow: "35 języków z AI",
      heading: "Jeden QR. Każdy gość w swoim języku.",
      body: "Przetłumacz całe menu na 35 języków jednym dotknięciem. AI rozumie gastronomię.",
      bullets: [
        "35 języków w cenie. Bez dodatkowych kosztów.",
        "Kontekst kulinarny, nie Google Translate.",
        "Język gościa wykrywany automatycznie.",
      ],
    },
    mobile: {
      alt: "Laptop i telefon na kawiarnianym stoliku edytujące to samo danie w panelu",
      eyebrow: "Zarządzanie z telefonu",
      heading: "Całe Twoje menu w kieszeni.",
      body: "Ten sam panel na laptopie, tablecie i telefonie. Zmiany na żywo w sekundy.",
      bullets: [
        "Bez aplikacji — otwórz przeglądarkę.",
        "Ceny i zdjęcia jednym dotknięciem.",
        "Pracuj skądkolwiek.",
      ],
    },
  },

  tr: {
    reservation: {
      alt: "Hostes restoran girişindeki bir tabletten rezervasyonları yönetiyor",
      eyebrow: "Rezervasyonlar",
      heading: "Sen mutfaktayken salonu doldur.",
      body: "Online rezervasyonlar 24/7 doğrudan ajandanda. Sıfır telefon, sıfır kâğıt.",
      bullets: [
        "Masa ve saat dilimine göre takvim.",
        "Otomatik onaylar ve hatırlatmalar.",
        "Masa QR'ından veya menüden rezervasyon.",
      ],
    },
    orders: {
      alt: "Garson masada akıllı telefondan uygulama ile sipariş alıyor",
      eyebrow: "Masada sipariş",
      heading: "Garson siparişi alıyor. Doğrudan mutfağa.",
      body: "Bloknot yok, bara koşma yok. Masaya dokun, yemekleri işaretle, tamamdır.",
      bullets: [
        "Anlık masa haritası.",
        "Sipariş hemen mutfak ve kasaya.",
        "Her yemekte modifikatörler, notlar ve alerjenler.",
      ],
    },
    kitchen: {
      alt: "Pirinç ayak üzerinde mutfak ekranını gösteren tabletli profesyonel mutfak",
      eyebrow: "Mutfak ekranı",
      heading: "Müşterinin telefonundan şefin ekranına.",
      body: "Kâğıt fişlere veda. Masaya göre siparişler, notlar ve alerjenlerle, pişirmeye hazır.",
      bullets: [
        "Masaya göre sütunlar: Hazır / Pişiyor / Servis edildi.",
        "Her yemekte alerjenler ve notlar vurgulanır.",
        "Salon, mutfak ve kasa gerçek zamanlı senkron.",
      ],
    },
    multilang: {
      alt: "İki misafir telefonlarından aynı dijital menüyü farklı dillerde okuyor",
      eyebrow: "Yapay zekâ ile 35 dil",
      heading: "Tek QR. Her misafir kendi dilinde.",
      body: "Tüm menüyü tek dokunuşla 35 dile çevir. Yapay zekâ gastronomiyi anlar.",
      bullets: [
        "35 dil dahil. Ek ücret yok.",
        "Kulinari bağlam — Google Translate değil.",
        "Misafirin dili otomatik algılanır.",
      ],
    },
    mobile: {
      alt: "Bir kafe masasında dizüstü ve telefon, aynı yemeği panelde düzenliyor",
      eyebrow: "Mobil yönetim",
      heading: "Tüm menün cebinde.",
      body: "Dizüstü, tablet ve telefonda aynı panel. Saniyeler içinde canlı değişiklikler.",
      bullets: [
        "Uygulamaya gerek yok — tarayıcıyı aç.",
        "Fiyatlar ve fotoğraflar tek dokunuşla.",
        "Nereden istersen oradan çalış.",
      ],
    },
  },

  ar: {
    reservation: {
      alt: "مضيفة تدير الحجوزات من جهاز لوحي عند مدخل المطعم",
      eyebrow: "الحجوزات",
      heading: "املأ الصالة بينما أنت في المطبخ.",
      body: "حجوزات أونلاين على مدار الساعة مباشرة في جدولك. صفر مكالمات، صفر ورق.",
      bullets: [
        "تقويم لكل طاولة وفترة.",
        "تأكيدات وتذكيرات تلقائية.",
        "احجز من QR الطاولة أو من القائمة.",
      ],
    },
    orders: {
      alt: "نادل يأخذ طلبًا عند الطاولة من هاتف ذكي بالتطبيق",
      eyebrow: "الطلب من الطاولة",
      heading: "النادل يأخذ الطلب. مباشرة إلى المطبخ.",
      body: "بدون دفتر، بدون ركض إلى البار. اضغط على الطاولة، حدد الأطباق، تم.",
      bullets: [
        "خريطة بصرية للطاولات لحظيًا.",
        "الطلب فوريًا إلى المطبخ والكاشير.",
        "إضافات وملاحظات ومسببات حساسية لكل طبق.",
      ],
    },
    kitchen: {
      alt: "مطبخ احترافي مع جهاز لوحي على حامل نحاسي يعرض شاشة المطبخ",
      eyebrow: "شاشة المطبخ",
      heading: "من هاتف الضيف إلى شاشة الشيف.",
      body: "وداعًا للفواتير الورقية. طلبات حسب الطاولة، مع ملاحظات ومسببات حساسية، جاهزة للتحضير.",
      bullets: [
        "أعمدة حسب الطاولة: جاهز / قيد الطهي / مُقدّم.",
        "مسببات الحساسية والملاحظات مُبرزة على كل طبق.",
        "الصالة والمطبخ والكاشير متزامنون لحظيًا.",
      ],
    },
    multilang: {
      alt: "ضيفان يقرآن نفس القائمة الرقمية بلغتين مختلفتين من هاتفيهما",
      eyebrow: "٣٥ لغة بالذكاء الاصطناعي",
      heading: "QR واحد. كل ضيف بلغته.",
      body: "ترجم كامل القائمة إلى ٣٥ لغة بنقرة واحدة. الذكاء الاصطناعي يفهم فن الطهي.",
      bullets: [
        "٣٥ لغة مشمولة. بدون تكلفة إضافية.",
        "سياق طهي، وليس Google Translate.",
        "لغة الضيف تُكتشف تلقائيًا.",
      ],
    },
    mobile: {
      alt: "لابتوب وهاتف على طاولة مقهى يحرران نفس الطبق على لوحة التحكم",
      eyebrow: "الإدارة من الموبايل",
      heading: "كل قائمتك في جيبك.",
      body: "نفس اللوحة على اللابتوب والجهاز اللوحي والموبايل. تغييرات مباشرة في ثوانٍ.",
      bullets: [
        "لا حاجة لتطبيق — افتح المتصفح.",
        "الأسعار والصور بنقرة.",
        "اعمل من أي مكان.",
      ],
    },
  },

  ja: {
    reservation: {
      alt: "ホステスがレストランの入口でタブレットから予約を管理している",
      eyebrow: "予約",
      heading: "あなたが厨房にいる間に、ホールを満席に。",
      body: "24時間オンライン予約があなたのカレンダーへ直接。電話ゼロ、紙ゼロ。",
      bullets: [
        "テーブルと時間枠ごとのカレンダー。",
        "自動確認とリマインダー。",
        "テーブルのQRやメニューから予約。",
      ],
    },
    orders: {
      alt: "ウェイターがテーブルでスマートフォンのアプリから注文を取っている",
      eyebrow: "テーブル注文",
      heading: "ウェイターが注文を取る。すぐに厨房へ。",
      body: "メモ帳なし、バーへの往復なし。テーブルをタップ、料理を選択、完了。",
      bullets: [
        "テーブルの視覚マップをリアルタイムで。",
        "注文は瞬時に厨房とレジへ。",
        "料理ごとにモディファイア、メモ、アレルゲン。",
      ],
    },
    kitchen: {
      alt: "真鍮スタンドのタブレットがキッチンディスプレイを表示するプロのキッチン",
      eyebrow: "キッチンディスプレイ",
      heading: "お客様の携帯からシェフの画面へ。",
      body: "紙の伝票にさようなら。テーブルごとの注文、メモとアレルゲン付きで調理準備完了。",
      bullets: [
        "テーブルごとの列：完了 / 調理中 / 提供済。",
        "各料理にアレルゲンとメモが強調表示。",
        "ホール、厨房、レジがリアルタイムで同期。",
      ],
    },
    multilang: {
      alt: "二人のお客様が同じデジタルメニューを異なる言語で携帯から読んでいる",
      eyebrow: "AIで35言語",
      heading: "ひとつのQR。それぞれのお客様の言語で。",
      body: "ワンタップでメニュー全体を35言語へ翻訳。AIがガストロノミーを理解。",
      bullets: [
        "35言語標準装備。追加費用なし。",
        "料理的なコンテキスト — Google翻訳ではない。",
        "お客様の言語を自動検出。",
      ],
    },
    mobile: {
      alt: "カフェのテーブルでノートPCと携帯がダッシュボードの同じ料理を編集",
      eyebrow: "モバイル管理",
      heading: "あなたのメニュー全部、ポケットに。",
      body: "ノートPC、タブレット、携帯で同じパネル。数秒でライブ変更。",
      bullets: [
        "アプリ不要 — ブラウザを開くだけ。",
        "価格と写真をワンタップで。",
        "どこからでも作業可能。",
      ],
    },
  },

  ko: {
    reservation: {
      alt: "호스티스가 식당 입구에서 태블릿으로 예약을 관리하고 있습니다",
      eyebrow: "예약",
      heading: "주방에 있는 동안 홀을 가득 채우세요.",
      body: "24/7 온라인 예약이 곧바로 캘린더로. 전화 제로, 종이 제로.",
      bullets: [
        "테이블 및 시간대별 캘린더.",
        "자동 확인 및 리마인더.",
        "테이블 QR 또는 메뉴에서 예약.",
      ],
    },
    orders: {
      alt: "웨이터가 테이블에서 스마트폰의 앱으로 주문을 받고 있습니다",
      eyebrow: "테이블 주문",
      heading: "웨이터가 주문을 받습니다. 바로 주방으로.",
      body: "메모장 없음, 바까지 왔다 갔다 없음. 테이블 탭, 메뉴 표시, 완료.",
      bullets: [
        "테이블의 시각적 맵을 실시간으로.",
        "주문 즉시 주방과 계산대로.",
        "요리별 옵션, 메모, 알레르겐.",
      ],
    },
    kitchen: {
      alt: "주방 디스플레이를 보여주는 황동 스탠드의 태블릿이 있는 전문 주방",
      eyebrow: "주방 디스플레이",
      heading: "손님의 휴대폰에서 셰프의 화면으로.",
      body: "종이 영수증과 작별. 테이블별 주문, 메모와 알레르겐 포함, 요리 준비 완료.",
      bullets: [
        "테이블별 열: 준비됨 / 조리 중 / 제공됨.",
        "각 요리에 알레르겐과 메모 강조.",
        "홀, 주방, 계산대가 실시간 동기화.",
      ],
    },
    multilang: {
      alt: "두 손님이 자신의 휴대폰으로 같은 디지털 메뉴를 서로 다른 언어로 읽고 있습니다",
      eyebrow: "AI로 35개 언어",
      heading: "QR 하나. 모든 손님이 자기 언어로.",
      body: "한 번의 탭으로 전체 메뉴를 35개 언어로 번역. AI가 미식을 이해합니다.",
      bullets: [
        "35개 언어 포함. 추가 비용 없음.",
        "요리 맥락 — 구글 번역이 아님.",
        "손님 언어 자동 감지.",
      ],
    },
    mobile: {
      alt: "카페 테이블의 노트북과 휴대폰이 대시보드의 같은 요리를 편집",
      eyebrow: "모바일 관리",
      heading: "전체 메뉴를 주머니에.",
      body: "노트북, 태블릿, 휴대폰에서 같은 패널. 몇 초 만에 라이브 변경.",
      bullets: [
        "앱 설치 불필요 — 브라우저를 여세요.",
        "가격과 사진을 한 번의 탭으로.",
        "어디서든 작업하세요.",
      ],
    },
  },

  zh: {
    reservation: {
      alt: "接待员在餐厅入口处通过平板管理预订",
      eyebrow: "预订",
      heading: "你在厨房时，前厅依然座无虚席。",
      body: "全天候在线预订直接进入你的日历。零电话，零纸张。",
      bullets: [
        "按桌位和时段的日历。",
        "自动确认和提醒。",
        "通过桌位二维码或菜单预订。",
      ],
    },
    orders: {
      alt: "服务员在桌边用智能手机应用接受订单",
      eyebrow: "桌边点餐",
      heading: "服务员接单。直达厨房。",
      body: "无需便签，无需跑到吧台。点击桌位，勾选菜品，完成。",
      bullets: [
        "桌位的可视化地图实时更新。",
        "订单立即送达厨房和收银台。",
        "每道菜的修改项、备注和过敏原。",
      ],
    },
    kitchen: {
      alt: "专业厨房，黄铜支架上的平板显示厨房屏幕",
      eyebrow: "厨房显示屏",
      heading: "从客人的手机直达主厨的屏幕。",
      body: "告别纸质小票。按桌位的订单，带备注和过敏原，已准备烹饪。",
      bullets: [
        "按桌位的列：就绪 / 烹饪中 / 已上桌。",
        "每道菜上突出显示过敏原和备注。",
        "前厅、厨房和收银台实时同步。",
      ],
    },
    multilang: {
      alt: "两位客人用手机以不同语言阅读同一份数字菜单",
      eyebrow: "AI 支持 35 种语言",
      heading: "一个二维码。每位客人用自己的语言。",
      body: "一键将整份菜单翻译成 35 种语言。AI 懂美食。",
      bullets: [
        "包含 35 种语言。无额外费用。",
        "烹饪语境——不是谷歌翻译。",
        "自动检测客人语言。",
      ],
    },
    mobile: {
      alt: "咖啡馆桌上的笔记本电脑和手机正在仪表板上编辑同一道菜",
      eyebrow: "移动管理",
      heading: "整份菜单，装在口袋里。",
      body: "笔记本、平板和手机用同一面板。几秒内即时变更。",
      bullets: [
        "无需安装应用——打开浏览器即可。",
        "一键修改价格和照片。",
        "随时随地办公。",
      ],
    },
  },
};

// English fallback for locales we haven't translated yet.
const LOCALES_REQUIRING_FALLBACK = [
  "bg", "ca", "cs", "da", "el", "et", "fa", "fi", "ga", "hr", "hu",
  "is", "lt", "lv", "no", "ro", "sk", "sl", "sr", "sv",
];
for (const loc of LOCALES_REQUIRING_FALLBACK) {
  if (!COPY[loc]) COPY[loc] = COPY.en;
}

export function getFeatureRows(locale: string): readonly FeatureRowData[] {
  const c = COPY[locale] ?? COPY.en;
  return [
    {
      image: { src: IMG.reservation, alt: c.reservation.alt },
      eyebrow: c.reservation.eyebrow,
      heading: c.reservation.heading,
      body: c.reservation.body,
      bullets: c.reservation.bullets,
      trackEvent: "l_feature_row_reservations_cta_click",
    },
    {
      image: { src: IMG.orders, alt: c.orders.alt },
      eyebrow: c.orders.eyebrow,
      heading: c.orders.heading,
      body: c.orders.body,
      bullets: c.orders.bullets,
      trackEvent: "l_feature_row_orders_cta_click",
    },
    {
      image: { src: IMG.kitchen, alt: c.kitchen.alt },
      eyebrow: c.kitchen.eyebrow,
      heading: c.kitchen.heading,
      body: c.kitchen.body,
      bullets: c.kitchen.bullets,
      trackEvent: "l_feature_row_kitchen_cta_click",
    },
    {
      image: { src: IMG.multilang, alt: c.multilang.alt },
      eyebrow: c.multilang.eyebrow,
      heading: c.multilang.heading,
      body: c.multilang.body,
      bullets: c.multilang.bullets,
      trackEvent: "l_feature_row_multilang_cta_click",
    },
    {
      image: { src: IMG.mobile, alt: c.mobile.alt },
      eyebrow: c.mobile.eyebrow,
      heading: c.mobile.heading,
      body: c.mobile.body,
      bullets: c.mobile.bullets,
      trackEvent: "l_feature_row_mobile_cta_click",
    },
  ];
}
