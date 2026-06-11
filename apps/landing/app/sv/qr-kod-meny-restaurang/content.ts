import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sv",
  slug: "qr-kod-meny-restaurang",
  trackPrefix: "l_sv_qr",

  meta: {
    title: "QR-kod meny för restauranger | IQ Rest",
    description:
      "QR-kod meny för restauranger: gästen skannar QR-koden på bordet, öppnar menyn i webbläsaren och beställer på sitt eget språk. 14 dagar gratis, utan kort.",
    canonical: "https://iq-rest.com/sv/qr-kod-meny-restaurang",
    ogLocale: "sv_SE",
    ogTitle: "QR-kod meny för restauranger",
    ogDescription:
      "QR på bordet, meny i telefonen — foton, allergener, 35 språk och uppdateringar i realtid.",
    brandLine: "IQ Rest — QR-kod meny för restauranger",
  },

  hero: {
    headline: "QR-kod meny för restauranger.",
    cta: "Skapa QR-meny",
    sub: "Gästen riktar kameran mot QR-koden på bordet och menyn öppnas direkt i telefonens webbläsare: bilder på rätterna, allergener, alltid uppdaterade priser och automatisk översättning till 35 språk. Utan att ladda ner appar och utan att trycka om menyn vid varje prisändring.",
  },

  scan: {
    heading: "Har du redan en pappers- eller PDF-meny?",
    headingAccent: "AI gör om den till en QR-meny på 60 sekunder.",
    sub: "Ladda upp ett foto av menyn eller PDF:en — AI extraherar kategorier, rätter och priser och kopplar dem direkt till QR-menyn.",
    cta: "Skapa QR-meny",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "En QR, 35 språk",
      heading: "En QR-kod, menyn på 35 språk.",
      body: "Gästen skannar QR-koden och väljer sitt språk: översättningen sköts av en AI med känsla för gastronomi, inte en generisk översättare. Slut på separata menyer för turister och lösa blad på bordet.",
      bullets: [
        "En QR-utskrift täcker 35 språk, ingår i prenumerationen.",
        "AI:n förstår köksspråket — rätternas namn låter naturliga på alla språk.",
        "Gästen byter språk inne i menyn utan att skanna QR-koden igen.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Två gäster skannar samma QR-kod på bordet och läser menyn på olika språk" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergener i QR:en",
      heading: "Allergener och kostetiketter inuti QR-menyn.",
      body: "Varje rätt i menyn som är kopplad till QR:en kan ha etiketter för gluten, laktos, nötter, skaldjur, veganska och glutenfria alternativ. Gästen filtrerar från telefonen de rätter som passar dennes restriktioner, utan att fråga personalen.",
      bullets: [
        "14 allergenkategorier på rättnivå.",
        "Vegan-, vegetarisk- och glutenfri-etiketter med ett klick i panelen.",
        "Gästen filtrerar QR-menyn efter sina egna restriktioner.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gäst filtrerar QR-menyn efter allergener på telefonen medan ägaren redigerar listan från en surfplatta" },
    },
    {
      icon: Palette,
      eyebrow: "Mer än bara en QR",
      heading: "En QR-meny lika genomarbetad som restaurangens egen webbplats.",
      body: "Efter att ha skannat koden landar gästen inte på en platt PDF: han ser en välkomstskärm med video eller utvald bild, beskrivningen av stället och en kontaktsida med karta, telefonnummer och sociala länkar. QR:en blir restaurangens ytterdörr online.",
      bullets: [
        "Bakgrundsvideo eller utvald bild på QR-menyns startskärm.",
        "Utrymme att berätta om ställets och varje kategoris koncept.",
        "Inbyggd kontaktsida: karta, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Två telefoner på ett bord: QR-menyns startskärm med bakgrundsvideo och en kontaktsida med karta" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Beställning från QR · valfritt",
      heading: "Från QR-koden kan gästen också beställa.",
      body: "Förutom att titta på menyn kan QR-menyn bli en beställningskanal: gästen lägger rätter i varukorgen och skickar förfrågan. Beställningen når servitören i lokalen, WhatsApp eller köksskärmen. Funktionen slås på eller av i inställningarna vid behov.",
      bullets: [
        "Varukorg, kommentarer och skickad beställning direkt från QR-skanningen.",
        "Beställningen kommer direkt till lokalen, WhatsApp eller köksskärmen.",
        "Funktionen kan aktiveras efter tider, salar eller specifika restauranger.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Två telefoner på ett bord: en varukorg skapad från QR-menyn och en bekräftelse på skickad beställning" },
    },
  ],

  faq: {
    sub: "Vad restauratörer frågar om QR-menyn från IQ Rest. Hittar du inte din fråga? Skriv till oss på WhatsApp.",
    items: [
      { q: "Hur fungerar QR-menyn från IQ Rest?", a: "Varje bord har en tryckt QR-kod. Gästen skannar den med telefonkameran och webbläsaren öppnar restaurangens meny — foton, beskrivningar, allergener och uppdaterade priser. Ingen app behövs, varken för gästen eller personalen." },
      { q: "Behöver jag tekniska kunskaper för att skapa QR-menyn?", a: "Nej. Panelen fungerar med klick och dra-och-släpp, utan kod eller komplicerade inställningar. Att lägga till en rätt tar några sekunder: namn, pris, foto. Den första uppsättningen tar oftast 30 minuter till en timme; har du redan en PDF-meny konverterar AI:n den automatiskt." },
      { q: "Måste gästerna installera en app för att läsa QR:en?", a: "Nej. Den inbyggda kameran på iPhone och Android känner igen QR-koden på sekunder och öppnar menyn direkt i webbläsaren. Administrationspanelen fungerar också från vilken modern webbläsare som helst — telefon, surfplatta eller laptop." },
      { q: "Hur trycks QR-koderna för borden?", a: "QR-koderna genereras automatiskt i panelen (en per bord eller en för hela stället) och laddas ner som tryckfärdiga PDF:er. Allt som behövs är en kontorsskrivare och en hållare: ställ, klistermärke eller glasunderlägg." },
      { q: "Kan jag använda min egen domän för QR-menyn?", a: "Ja. Vi stöder en restaurangdomän med SSL-certifikat (till exempel meny.dinrestaurang.se): när gästen skannar QR:en ser han din restaurangs adress i stället för en generisk subdomän. DNS-inställningen tar 5–10 minuter och vi guidar dig genom den." },
      { q: "Kan jag hantera QR-koderna för flera restauranger från ett konto?", a: "Ja, på begäran. Ett konto kan samla flera ställen, var och en med egna QR-koder, meny, design och analys. Skriv till oss på WhatsApp så aktiverar vi flerrestauranglägen." },
      { q: "Är det svårt att starta QR-menyn från grunden?", a: "Tre steg: (1) skapa kategorierna; (2) lägg till rätterna med namn, pris och foto; (3) tryck QR-koderna och placera dem på borden. Har du redan en pappers- eller PDF-meny, ladda upp den — AI:n känner igen kategorier och priser och fyller i korten. En grundmeny kan vara online på 5 minuter." },
    ],
  },
};
