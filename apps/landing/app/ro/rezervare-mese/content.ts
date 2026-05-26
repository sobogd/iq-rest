import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ro",
  slug: "rezervare-mese",
  trackPrefix: "l_ro_bookings",

  meta: {
    title: "Rezervare mese 24/7 pentru restaurante | IQ Rest",
    description:
      "Rezervare mese 24/7 pentru restaurante: oaspeții rezervă singuri prin meniul QR sau site. Calendar pe masă, confirmări și mementouri automate. Niciun oaspete pierdut. 14 zile gratuit.",
    canonical: "https://iq-rest.com/ro/rezervare-mese",
    ogLocale: "ro_RO",
    ogTitle: "Rezervare mese 24/7 — oaspeții rezervă singuri",
    ogDescription:
      "Oaspeții rezervă mese prin meniul QR sau site. Calendar, confirmări automate, mementouri. Niciun oaspete pierdut.",
    brandLine: "IQ Rest — Rezervare mese pentru restaurante",
  },

  hero: {
    headline: "Rezervare mese 24/7 — oaspeții rezervă singuri.",
    cta: "Configurează rezervările de mese",
    sub: "Oaspeții rezervă mese prin meniul QR sau link direct. Calendar pe masă, confirmări și mementouri automate. Niciun oaspete pierdut și fără apeluri în orele de vârf.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostess gestionează rezervări de pe o tabletă la intrarea în restaurant",
  },

  scan: {
    heading: "Lansați rezervarea de mese",
    headingAccent: "în 5 minute.",
    sub: "Conectați calendarul, adăugați mesele cu fotografii și capacitate — oaspeții încep să rezerve în aceeași zi.",
    cta: "Activați rezervarea",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Formular de rezervare",
      heading: "Oaspeții rezervă singuri — după dată, oră și număr de persoane.",
      body: "Oaspetele deschide meniul QR sau un link direct, alege data, ora și numărul de persoane — și vede imediat mesele disponibile, fiecare cu fotografie, descriere (terasă, lângă fereastră, canapea lângă bar) și capacitate. Confirmarea este trimisă automat prin e-mail și WhatsApp.",
      bullets: [
        "Alegerea mesei după fotografie, descriere și capacitate.",
        "Confirmare automată și memento cu o oră înainte de vizită.",
        "Câmpuri minime în formular: nume, telefon, număr de persoane.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Oaspete rezervă o masă de restaurant de pe un telefon: data, ora, număr de persoane și selector de masă" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Calendar rezervări",
      heading: "Calendar pe zi și masă — totul dintr-o privire.",
      body: "Panoul de administrare afișează un calendar de rezervări detaliat pe masă, zi, săptămână și lună. Sloturi libere, mese ocupate, rezervări confirmate și neconfirmate pe un singur ecran. Funcționează pe tabletă în sală și pe laptop la birou.",
      bullets: [
        "Vizualizări zilnice, săptămânale și lunare.",
        "Detaliere pe masă: cine, când, câți oaspeți.",
        "Mutarea, anularea sau confirmarea unei rezervări cu o atingere de pe telefon.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Calendar de rezervări în panoul de administrare IQ Rest pe două tablete: Gantt zilnic pe mese și vizualizare lunară" },
    },
  ],

  faq: {
    sub: "Ce întreabă restauratorii despre rezervarea de mese în IQ Rest. Nu găsiți întrebarea dumneavoastră? Scrieți-ne pe WhatsApp.",
    items: [
      { q: "Pot alege în ce zile și ore este disponibilă rezervarea?", a: "Da. Panoul de administrare vă permite să setați orele de program și zilele săptămânii disponibile — sistemul nu va afișa oaspeților sloturi indisponibile. Puteți închide o dată specifică (eveniment corporativ, rezervare privată) sau dezactiva temporar întregul calendar." },
      { q: "Pot încărca o fotografie pentru fiecare masă?", a: "Da. Fiecare masă poate avea o fotografie, descriere (terasă, lângă fereastră, canapea lângă bar) și capacitate. Oaspetele vede exact masa pe care o rezervă și face o alegere informată — acest lucru reduce așteptările neîmplinite." },
      { q: "Pot dezactiva rezervările la date specifice?", a: "Da. Calendarul vă permite să închideți date specifice (sărbători, evenimente private, renovare) sau zile întregi din săptămână. La aceste date, oaspeții văd un mesaj „rezervare temporar indisponibilă“." },
      { q: "Pot personaliza ce câmpuri sunt colectate de la oaspete?", a: "Da. Setul implicit: nume, telefon, e-mail, număr de persoane. Puteți adăuga câmpuri personalizate (ocazie, alergii, solicitări speciale) sau elimina pe cele inutile pentru a păstra formularul cât mai scurt." },
      { q: "Pot limita numărul de oaspeți pe masă?", a: "Da. Fiecare masă are o setare de „capacitate“ — sistemul nu va permite ca o masă pentru 2 să fie rezervată pentru 6. La mesele mai mari puteți seta un minim pentru ca grupurile mici să nu ocupe „masa pentru opt“ de la grupuri mai mari." },
      { q: "Cât de dificilă este configurarea rezervării?", a: "Durează foarte puțin timp. Trei pași: (1) adăugați mesele cu nume, fotografii și capacitate, (2) activați modul de rezervare în setări, (3) distribuiți link-ul sau codul QR oaspeților. Lansare completă în 5–10 minute." },
      { q: "Pot folosi sistemul de rezervări pe propriul domeniu?", a: "Da. Suportăm un domeniu personalizat cu certificat SSL: oaspeții rezervă la adresa restaurantului dumneavoastră (de exemplu rezervare.restaurantuldvs.ro). Vă ajutăm cu configurarea DNS; procesul durează 5–10 minute." },
      { q: "Pot configura confirmare automată sau manuală?", a: "Da, modul este setat în setări. Cu confirmare automată, oaspetele primește confirmarea imediat după trimiterea formularului și rezervarea este considerată acceptată. Cu confirmare manuală, cererea ajunge în panoul de administrare cu statusul „așteaptă confirmare“ — managerul o revizuiește și confirmă sau respinge. Modul manual este util la un număr limitat de mese sau politici stricte pentru oaspeți." },
      { q: "Percepeți comision la rezervări?", a: "Nu. Rezervarea de mese este complet inclusă în planul Pro — fără procent de la oaspeți, fără taxă pe slot, fără comisioane de agregatori. Taxă lunară fixă și rezervări nelimitate." },
    ],
  },
};
