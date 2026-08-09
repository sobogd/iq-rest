// Personal welcome email — sent manually from the admin panel to introduce
// Bogdan to a new restaurant owner. Name-less by design (many owners never set
// a restaurant title); {cta} is the dashboard-button label, URL injected by
// MailService. Copy is conversion-oriented (variant A): value-led subject,
// "account already set up" hook, first-person CTA — kept product-neutral
// (menu / website / bookings), not QR-specific.

interface T {
  subject: string;
  greeting: string;
  body: string;
  cta: string;
  help: string;
  closing: string;
}

export const WELCOME_PERSONAL: Record<string, T> = {
  ar: {
    subject: "حسابك في IQ Rest جاهز",
    greeting: "مرحبًا!",
    body: "شكرًا لاهتمامك بـ IQ Rest! أنا Bogdan — لقد أنشأت حسابك بالفعل، فكل ما تحتاجه لإدارة مطعمك عبر الإنترنت في مكان واحد: القائمة، الموقع الإلكتروني، الحجوزات والمزيد. لن يستغرق تخصيصه سوى بضع دقائق.",
    cta: "افتح حسابي",
    help: "هل لديك أي أسئلة حول البدء؟ ما عليك سوى الرد على هذا البريد الإلكتروني — أقرأ كل رسالة.",
    closing: "أتطلع إلى رؤية مطعمك على الإنترنت!",
  },
  bg: {
    subject: "Вашият акаунт в IQ Rest е готов",
    greeting: "Здравейте!",
    body: "Благодаря за интереса към IQ Rest! Аз съм Богдан — вече създадох акаунта ви, така че всичко необходимо, за да управлявате ресторанта си онлайн, е на едно място: меню, уебсайт, резервации и още. Отнема само няколко минути да го направите свой.",
    cta: "Отвори моя акаунт",
    help: "Имате въпроси за първите стъпки? Просто отговорете на този имейл — чета всеки един.",
    closing: "Очаквам с нетърпение да видя ресторанта ви онлайн!",
  },
  ca: {
    subject: "El teu compte a IQ Rest està llest",
    greeting: "Hola!",
    body: "Gràcies pel teu interès en IQ Rest! Soc en Bogdan — ja he creat el teu compte, així que tot el que necessites per gestionar el teu restaurant en línia és en un sol lloc: menú, lloc web, reserves i més. Només et cal un parell de minuts per fer-lo teu.",
    cta: "Obrir el meu compte",
    help: "Tens preguntes sobre com començar? Només has de respondre a aquest correu — els llegeixo tots.",
    closing: "Tinc ganes de veure el teu restaurant en línia!",
  },
  cs: {
    subject: "Váš účet IQ Rest je připraven",
    greeting: "Dobrý den!",
    body: "Děkuji za váš zájem o IQ Rest! Jsem Bogdan — už jsem vytvořil váš účet, takže vše, co potřebujete k online správě restaurace, je na jednom místě: menu, web, rezervace a další. Přizpůsobení zabere jen pár minut.",
    cta: "Otevřít můj účet",
    help: "Máte otázky ohledně prvních kroků? Stačí odpovědět na tento e-mail — čtu každý z nich.",
    closing: "Těším se, až uvidím vaši restauraci online!",
  },
  da: {
    subject: "Din IQ Rest-konto er klar",
    greeting: "Hej!",
    body: "Tak for din interesse i IQ Rest! Jeg hedder Bogdan — jeg har allerede oprettet din konto, så alt, hvad du skal bruge for at drive din restaurant online, er ét sted: menu, hjemmeside, reservationer og mere. Det tager kun et par minutter at gøre den til din.",
    cta: "Åbn min konto",
    help: "Har du spørgsmål om at komme i gang? Svar blot på denne e-mail — jeg læser dem alle.",
    closing: "Jeg glæder mig til at se din restaurant online!",
  },
  de: {
    subject: "Ihr IQ Rest-Konto ist bereit",
    greeting: "Hallo!",
    body: "Danke für Ihr Interesse an IQ Rest! Ich bin Bogdan — ich habe Ihr Konto bereits eingerichtet, sodass alles, was Sie zum Betrieb Ihres Restaurants online brauchen, an einem Ort ist: Menü, Website, Reservierungen und mehr. Es dauert nur ein paar Minuten, es zu Ihrem zu machen.",
    cta: "Mein Konto öffnen",
    help: "Haben Sie Fragen zum Einstieg? Antworten Sie einfach auf diese E-Mail — ich lese jede einzelne.",
    closing: "Ich freue mich darauf, Ihr Restaurant online zu sehen!",
  },
  el: {
    subject: "Ο λογαριασμός σου στο IQ Rest είναι έτοιμος",
    greeting: "Γεια σου!",
    body: "Ευχαριστώ για το ενδιαφέρον σου για το IQ Rest! Είμαι ο Bogdan — έχω ήδη δημιουργήσει τον λογαριασμό σου, οπότε όλα όσα χρειάζεσαι για να διαχειρίζεσαι το εστιατόριό σου online βρίσκονται σε ένα μέρος: μενού, ιστότοπος, κρατήσεις και άλλα. Χρειάζονται μόλις λίγα λεπτά για να τον κάνεις δικό σου.",
    cta: "Άνοιγμα του λογαριασμού μου",
    help: "Έχεις ερωτήσεις για το ξεκίνημα; Απλώς απάντησε σε αυτό το email — τα διαβάζω όλα.",
    closing: "Ανυπομονώ να δω το εστιατόριό σου online!",
  },
  en: {
    subject: "Your IQ Rest account is ready",
    greeting: "Hi there!",
    body: "Thanks for your interest in IQ Rest! I'm Bogdan — I've already set up your account, so everything you need to run your restaurant online is in one place: menu, website, bookings and more. It only takes a couple of minutes to make it yours.",
    cta: "Open my account",
    help: "Any questions about getting started? Just reply to this email — I read every one.",
    closing: "Looking forward to seeing your restaurant online!",
  },
  es: {
    subject: "Tu cuenta de IQ Rest está lista",
    greeting: "Hola!",
    body: "¡Gracias por tu interés en IQ Rest! Soy Bogdan — ya he creado tu cuenta, así que todo lo que necesitas para gestionar tu restaurante online está en un solo lugar: menú, sitio web, reservas y más. Solo te llevará un par de minutos personalizarla.",
    cta: "Abrir mi cuenta",
    help: "¿Tienes preguntas sobre cómo empezar? Solo responde a este correo — los leo todos.",
    closing: "¡Espero ver tu restaurante en línea!",
  },
  et: {
    subject: "Sinu IQ Resti konto on valmis",
    greeting: "Tere!",
    body: "Täname huvi eest IQ Resti vastu! Olen Bogdan — olen sinu konto juba loonud, nii et kõik, mida vajad oma restorani veebis haldamiseks, on ühes kohas: menüü, veebisait, broneeringud ja palju muud. Selle enda omaks tegemine võtab vaid paar minutit.",
    cta: "Ava minu konto",
    help: "Kas sul on küsimusi alustamise kohta? Lihtsalt vasta sellele e-kirjale — loen kõiki.",
    closing: "Ootan põnevusega, et näha sinu restorani veebis!",
  },
  fa: {
    subject: "حساب شما در IQ Rest آماده است",
    greeting: "سلام!",
    body: "از علاقه شما به IQ Rest سپاسگزارم! من Bogdan هستم — حساب شما را از قبل ایجاد کرده‌ام، بنابراین هر آنچه برای مدیریت آنلاین رستوران خود نیاز دارید در یک مکان است: منو، وب‌سایت، رزرو و موارد دیگر. تنها چند دقیقه طول می‌کشد تا آن را از آن خود کنید.",
    cta: "باز کردن حساب من",
    help: "سؤالی درباره شروع کار دارید؟ فقط به این ایمیل پاسخ دهید — همه را می‌خوانم.",
    closing: "مشتاقانه منتظر دیدن رستوران شما به‌صورت آنلاین هستم!",
  },
  fi: {
    subject: "IQ Rest -tilisi on valmis",
    greeting: "Hei!",
    body: "Kiitos kiinnostuksestasi IQ Restiä kohtaan! Olen Bogdan — olen jo luonut tilisi, joten kaikki, mitä tarvitset ravintolasi pyörittämiseen verkossa, on yhdessä paikassa: menu, verkkosivusto, varaukset ja paljon muuta. Sen muokkaaminen omaksesi vie vain pari minuuttia.",
    cta: "Avaa tilini",
    help: "Onko sinulla kysyttävää aloittamisesta? Vastaa vain tähän sähköpostiin — luen jokaisen.",
    closing: "Odotan innolla, että näen ravintolasi verkossa!",
  },
  fr: {
    subject: "Votre compte IQ Rest est prêt",
    greeting: "Bonjour !",
    body: "Merci de votre intérêt pour IQ Rest ! Je suis Bogdan — j'ai déjà créé votre compte, donc tout ce dont vous avez besoin pour gérer votre restaurant en ligne est au même endroit : menu, site web, réservations et plus encore. Il ne faut que quelques minutes pour le personnaliser.",
    cta: "Ouvrir mon compte",
    help: "Des questions pour bien démarrer ? Répondez simplement à cet e-mail — je les lis tous.",
    closing: "J'ai hâte de voir votre restaurant en ligne !",
  },
  ga: {
    subject: "Tá do chuntas IQ Rest réidh",
    greeting: "Dia duit!",
    body: "Go raibh maith agat as do spéis in IQ Rest! Is mise Bogdan — tá do chuntas cruthaithe agam cheana féin, mar sin tá gach rud a theastaíonn uait chun do bhialann a reáchtáil ar líne in aon áit amháin: biachlár, suíomh gréasáin, áirithintí agus níos mó. Ní thógann sé ach cúpla nóiméad é a dhéanamh mar do cheann féin.",
    cta: "Oscail mo chuntas",
    help: "An bhfuil aon cheist agat faoi thosú? Freagair an ríomhphost seo — léim gach ceann.",
    closing: "Táim ag tnúth le do bhialann a fheiceáil ar líne!",
  },
  hr: {
    subject: "Vaš IQ Rest račun je spreman",
    greeting: "Pozdrav!",
    body: "Hvala na zanimanju za IQ Rest! Ja sam Bogdan — već sam kreirao vaš račun, tako da je sve što vam je potrebno za vođenje restorana online na jednom mjestu: jelovnik, web stranica, rezervacije i više. Prilagođavanje traje samo nekoliko minuta.",
    cta: "Otvori moj račun",
    help: "Imate pitanja o početku? Samo odgovorite na ovaj email — čitam svaki.",
    closing: "Veselim se vidjeti vaš restoran online!",
  },
  hu: {
    subject: "Az IQ Rest fiókod készen áll",
    greeting: "Szia!",
    body: "Köszönöm az érdeklődésed az IQ Rest iránt! Bogdan vagyok — már létrehoztam a fiókodat, így minden, amire szükséged van az éttermed online kezeléséhez, egy helyen van: étlap, weboldal, foglalások és még sok más. Csak néhány perc, hogy a sajátoddá tedd.",
    cta: "Fiókom megnyitása",
    help: "Kérdésed van a kezdéssel kapcsolatban? Csak válaszolj erre az e-mailre — mindegyiket elolvasom.",
    closing: "Alig várom, hogy lássam az éttermed online!",
  },
  is: {
    subject: "IQ Rest reikningurinn þinn er tilbúinn",
    greeting: "Halló!",
    body: "Takk fyrir áhugann á IQ Rest! Ég heiti Bogdan — ég er þegar búinn að stofna reikninginn þinn, svo allt sem þú þarft til að reka veitingastaðinn þinn á netinu er á einum stað: matseðill, vefsíða, bókanir og fleira. Það tekur aðeins nokkrar mínútur að gera hann að þínum.",
    cta: "Opna reikninginn minn",
    help: "Ertu með spurningar um að byrja? Svaraðu bara þessum tölvupósti — ég les þá alla.",
    closing: "Ég hlakka til að sjá veitingastaðinn þinn á netinu!",
  },
  it: {
    subject: "Il tuo account IQ Rest è pronto",
    greeting: "Ciao!",
    body: "Grazie per il tuo interesse in IQ Rest! Sono Bogdan — ho già creato il tuo account, quindi tutto ciò che ti serve per gestire il tuo ristorante online è in un unico posto: menu, sito web, prenotazioni e altro. Bastano un paio di minuti per renderlo tuo.",
    cta: "Apri il mio account",
    help: "Hai domande su come iniziare? Rispondi semplicemente a questa email — le leggo tutte.",
    closing: "Non vedo l'ora di vedere il tuo ristorante online!",
  },
  ja: {
    subject: "IQ Rest のアカウントが準備できました",
    greeting: "こんにちは！",
    body: "IQ Rest にご関心をお寄せいただきありがとうございます！Bogdan です。すでにアカウントを作成しましたので、レストランをオンラインで運営するために必要なものがすべて一か所にそろっています：メニュー、ウェブサイト、予約など。ご自分用に設定するのに数分しかかかりません。",
    cta: "アカウントを開く",
    help: "始め方についてご質問はありますか？このメールに返信するだけで大丈夫です。すべて目を通しています。",
    closing: "あなたのレストランがオンラインになるのを楽しみにしています！",
  },
  ko: {
    subject: "IQ Rest 계정이 준비되었습니다",
    greeting: "안녕하세요!",
    body: "IQ Rest에 관심을 가져주셔서 감사합니다! 저는 Bogdan입니다 — 이미 계정을 만들어 두었으니, 레스토랑을 온라인으로 운영하는 데 필요한 모든 것이 한곳에 있습니다: 메뉴, 웹사이트, 예약 등. 나만의 것으로 설정하는 데 몇 분이면 충분합니다.",
    cta: "내 계정 열기",
    help: "시작하는 데 궁금한 점이 있으신가요? 이 이메일에 답장만 주세요 — 모두 읽고 있습니다.",
    closing: "귀하의 레스토랑을 온라인에서 볼 수 있기를 기대합니다!",
  },
  lt: {
    subject: "Jūsų IQ Rest paskyra paruošta",
    greeting: "Sveiki!",
    body: "Ačiū, kad domitės IQ Rest! Esu Bogdan — jau sukūriau jūsų paskyrą, todėl viskas, ko reikia jūsų restoranui valdyti internetu, yra vienoje vietoje: meniu, svetainė, rezervacijos ir daugiau. Prisitaikyti prireiks vos poros minučių.",
    cta: "Atidaryti mano paskyrą",
    help: "Turite klausimų apie pradžią? Tiesiog atsakykite į šį el. laišką — perskaitau kiekvieną.",
    closing: "Nekantrauju pamatyti jūsų restoraną internete!",
  },
  lv: {
    subject: "Jūsu IQ Rest konts ir gatavs",
    greeting: "Sveiki!",
    body: "Paldies par interesi par IQ Rest! Es esmu Bogdans — jūsu kontu jau esmu izveidojis, tāpēc viss, kas nepieciešams jūsu restorāna pārvaldībai tiešsaistē, ir vienuviet: ēdienkarte, tīmekļa vietne, rezervācijas un vēl vairāk. Lai to pielāgotu sev, vajadzīgas tikai dažas minūtes.",
    cta: "Atvērt manu kontu",
    help: "Vai jums ir jautājumi par darba sākšanu? Vienkārši atbildiet uz šo e-pastu — es izlasu katru.",
    closing: "Ar nepacietību gaidu, kad redzēšu jūsu restorānu tiešsaistē!",
  },
  nl: {
    subject: "Je IQ Rest-account is klaar",
    greeting: "Hallo!",
    body: "Bedankt voor je interesse in IQ Rest! Ik ben Bogdan — ik heb je account al aangemaakt, dus alles wat je nodig hebt om je restaurant online te beheren staat op één plek: menu, website, reserveringen en meer. Het kost maar een paar minuten om het van jou te maken.",
    cta: "Mijn account openen",
    help: "Heb je vragen om te beginnen? Beantwoord gewoon deze e-mail — ik lees ze allemaal.",
    closing: "Ik kijk ernaar uit om je restaurant online te zien!",
  },
  no: {
    subject: "IQ Rest-kontoen din er klar",
    greeting: "Hei!",
    body: "Takk for interessen for IQ Rest! Jeg heter Bogdan — jeg har allerede opprettet kontoen din, så alt du trenger for å drive restauranten din på nett er på ett sted: meny, nettsted, reservasjoner og mer. Det tar bare et par minutter å gjøre den til din.",
    cta: "Åpne kontoen min",
    help: "Har du spørsmål om å komme i gang? Bare svar på denne e-posten — jeg leser hver enkelt.",
    closing: "Jeg gleder meg til å se restauranten din på nett!",
  },
  pl: {
    subject: "Twoje konto IQ Rest jest gotowe",
    greeting: "Cześć!",
    body: "Dziękuję za zainteresowanie IQ Rest! Jestem Bogdan — już utworzyłem Twoje konto, więc wszystko, czego potrzebujesz do prowadzenia restauracji online, jest w jednym miejscu: menu, strona internetowa, rezerwacje i więcej. Dostosowanie zajmie tylko kilka minut.",
    cta: "Otwórz moje konto",
    help: "Masz pytania dotyczące rozpoczęcia? Po prostu odpowiedz na tego e-maila — czytam każdy.",
    closing: "Nie mogę się doczekać, aż zobaczę Twoją restaurację online!",
  },
  pt: {
    subject: "A sua conta IQ Rest está pronta",
    greeting: "Olá!",
    body: "Obrigado pelo seu interesse no IQ Rest! Sou o Bogdan — já criei a sua conta, por isso tudo o que precisa para gerir o seu restaurante online está num só lugar: menu, site, reservas e muito mais. Bastam alguns minutos para a personalizar.",
    cta: "Abrir a minha conta",
    help: "Tem dúvidas sobre como começar? Basta responder a este e-mail — leio todos.",
    closing: "Estou ansioso por ver o seu restaurante online!",
  },
  ro: {
    subject: "Contul tău IQ Rest este gata",
    greeting: "Salut!",
    body: "Îți mulțumesc pentru interesul față de IQ Rest! Sunt Bogdan — ți-am creat deja contul, așa că tot ce ai nevoie pentru a-ți gestiona restaurantul online este într-un singur loc: meniu, site web, rezervări și altele. Durează doar câteva minute să îl faci al tău.",
    cta: "Deschide contul meu",
    help: "Ai întrebări despre cum să începi? Răspunde pur și simplu la acest e-mail — le citesc pe toate.",
    closing: "Abia aștept să văd restaurantul tău online!",
  },
  ru: {
    subject: "Ваш аккаунт IQ Rest готов",
    greeting: "Здравствуйте!",
    body: "Спасибо за интерес к IQ Rest! Я Богдан — я уже создал ваш аккаунт, так что всё необходимое для управления рестораном онлайн в одном месте: меню, сайт, бронирования и не только. Настроить его под себя займёт всего пару минут.",
    cta: "Открыть мой аккаунт",
    help: "Есть вопросы, с чего начать? Просто ответьте на это письмо — я читаю каждое.",
    closing: "С нетерпением жду, когда увижу ваш ресторан онлайн!",
  },
  sk: {
    subject: "Váš účet IQ Rest je pripravený",
    greeting: "Dobrý deň!",
    body: "Ďakujem za váš záujem o IQ Rest! Som Bogdan — už som vytvoril váš účet, takže všetko, čo potrebujete na online správu reštaurácie, je na jednom mieste: menu, webová stránka, rezervácie a ďalšie. Prispôsobenie zaberie len pár minút.",
    cta: "Otvoriť môj účet",
    help: "Máte otázky, ako začať? Stačí odpovedať na tento e-mail — čítam každý.",
    closing: "Teším sa, až uvidím vašu reštauráciu online!",
  },
  sl: {
    subject: "Vaš račun IQ Rest je pripravljen",
    greeting: "Pozdravljeni!",
    body: "Hvala za zanimanje za IQ Rest! Sem Bogdan — vaš račun sem že ustvaril, zato je vse, kar potrebujete za spletno vodenje restavracije, na enem mestu: meni, spletna stran, rezervacije in več. Za prilagoditev boste potrebovali le nekaj minut.",
    cta: "Odpri moj račun",
    help: "Imate vprašanja o začetku? Preprosto odgovorite na to e-pošto — preberem vsako.",
    closing: "Veselim se, da vašo restavracijo vidim na spletu!",
  },
  sr: {
    subject: "Vaš IQ Rest nalog je spreman",
    greeting: "Zdravo!",
    body: "Hvala na interesovanju za IQ Rest! Ja sam Bogdan — već sam napravio vaš nalog, tako da je sve što vam je potrebno za vođenje restorana onlajn na jednom mestu: meni, veb sajt, rezervacije i još mnogo toga. Potrebno je samo nekoliko minuta da ga prilagodite sebi.",
    cta: "Otvori moj nalog",
    help: "Imate pitanja o početku? Samo odgovorite na ovaj imejl — čitam svaki.",
    closing: "Radujem se da vaš restoran vidim onlajn!",
  },
  sv: {
    subject: "Ditt IQ Rest-konto är klart",
    greeting: "Hej!",
    body: "Tack för ditt intresse för IQ Rest! Jag heter Bogdan — jag har redan skapat ditt konto, så allt du behöver för att driva din restaurang online finns på ett ställe: meny, webbplats, bokningar och mer. Det tar bara ett par minuter att göra det till ditt.",
    cta: "Öppna mitt konto",
    help: "Har du frågor om att komma igång? Svara bara på det här e-postmeddelandet — jag läser alla.",
    closing: "Jag ser fram emot att se din restaurang online!",
  },
  tr: {
    subject: "IQ Rest hesabınız hazır",
    greeting: "Merhaba!",
    body: "IQ Rest'e gösterdiğiniz ilgi için teşekkürler! Ben Bogdan — hesabınızı çoktan oluşturdum, böylece restoranınızı çevrimiçi yönetmek için ihtiyacınız olan her şey tek bir yerde: menü, web sitesi, rezervasyonlar ve daha fazlası. Kendinize göre ayarlamanız yalnızca birkaç dakika sürer.",
    cta: "Hesabımı aç",
    help: "Başlarken sorularınız mı var? Bu e-postaya yanıt vermeniz yeterli — hepsini okuyorum.",
    closing: "Restoranınızı çevrimiçi görmeyi dört gözle bekliyorum!",
  },
  uk: {
    subject: "Ваш акаунт IQ Rest готовий",
    greeting: "Вітаю!",
    body: "Дякую за інтерес до IQ Rest! Я Богдан — я вже створив ваш акаунт, тож усе необхідне для керування рестораном онлайн в одному місці: меню, сайт, бронювання та інше. Щоб налаштувати його під себе, знадобиться лише кілька хвилин.",
    cta: "Відкрити мій акаунт",
    help: "Маєте запитання, з чого почати? Просто дайте відповідь на цей лист — я читаю кожен.",
    closing: "З нетерпінням чекаю, коли побачу ваш ресторан онлайн!",
  },
  zh: {
    subject: "您的 IQ Rest 账户已就绪",
    greeting: "您好！",
    body: "感谢您对 IQ Rest 的关注！我是 Bogdan — 我已经为您创建好账户，因此在线经营餐厅所需的一切都集中在一处：菜单、网站、预订等等。只需几分钟即可将其设置为您自己的。",
    cta: "打开我的账户",
    help: "对如何开始有疑问吗？只需回复此邮件 — 我会阅读每一封。",
    closing: "期待看到您的餐厅在线上线！",
  },
};

const RTL = new Set(["ar", "fa"]);
export function isRtl(locale: string): boolean {
  return RTL.has(locale);
}

export function pickWelcomePersonal(locale: string): T {
  return WELCOME_PERSONAL[locale] || WELCOME_PERSONAL.en;
}
