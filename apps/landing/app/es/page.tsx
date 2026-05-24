import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/app/_landing/components/cta-button";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS } from "./texts";
import { homeAlternates } from "@/lib/hreflang";
import { SCHEMA_PRICE_BASIC_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "es";
const SITE = "https://iq-rest.com";

const HOME_HERO = {
  title: "Todo lo que tu restaurante necesita.",
  titleAccent: "En una sola plataforma.",
  sub: "Carta, pedidos, reservas, pantalla de cocina y traducción con IA — una única plataforma en lugar de cinco servicios distintos. Elige una función abajo para ver más.",
};

const FEATURE_IMAGES: Record<string, string> = {
  "Carta digital": "/landing/hero-cafe.webp",
  "Pedidos": "/landing/feature-orders.webp",
  "Reservas": "/landing/feature-reservation.webp",
  "KDS": "/landing/feature-kitchen.webp",
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    { "@type": "WebSite", url: `${SITE}/${LOCALE}`, name: "IQ Rest", inLanguage: LOCALE, publisher: { "@id": `${SITE}/#organization` } },
    {
      "@type": "SoftwareApplication",
      name: "IQ Rest — Plataforma de gestión para restaurantes",
      description: "Plataforma de gestión para restaurantes: carta digital, pedidos QR, reservas y pantalla de cocina. Listo en 5 minutos.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      url: `${SITE}/${LOCALE}`,
      inLanguage: LOCALE,
      publisher: { "@id": `${SITE}/#organization` },
      offers: { "@type": "Offer", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
    },
  ],
}).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical, languages: homeAlternates() },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest" }],
  },
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

export default function HomePage() {
  return (
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <LandingHeaderLp texts={TEXTS.header} locale={LOCALE} useLocalAnchors featureLinks={TEXTS.footer.featureLinks} />

      <Section dataSection="home_hero" noContainer accent>
        <div className="w-full lg:min-h-[50dvh] flex flex-col items-center justify-center text-center py-8 sm:py-14">
          <div className="sm:hidden w-full mb-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-1.5">
              {[...TEXTS.hero.verticals, ...TEXTS.hero.verticals].map((v, i) => (
                <span
                  key={`${v}-${i}`}
                  className="shrink-0 inline-flex items-center h-7 leading-none text-[11px] uppercase tracking-wider text-muted-foreground rounded-full px-2.5 whitespace-nowrap"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex flex-row flex-wrap items-center justify-center gap-1.5 mb-5 w-full">
            {TEXTS.hero.verticals.map((v) => (
              <span
                key={v}
                className="inline-flex items-center h-8 leading-none text-xs lg:text-sm uppercase tracking-wider text-muted-foreground rounded-full px-3"
              >
                {v}
              </span>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight max-w-4xl lg:max-w-6xl mb-5">
            {HOME_HERO.title}{" "}
            <span className="text-primary lg:block">{HOME_HERO.titleAccent}</span>
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-4xl mb-10">
            {HOME_HERO.sub}
          </p>
          <CtaButton
            text={TEXTS.homeCtaText}
            microcopy={TEXTS.microcopy}
            locale={LOCALE}
            align="center"
            trackEvent="l_home_hero_cta_click"
            extra={
              <a
                href="#features"
                className="inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-muted active:scale-[0.99] transition-all text-center leading-tight"
              >
                {TEXTS.header.navFeatures}
              </a>
            }
          />
        </div>
      </Section>

      <div id="features">
        {TEXTS.features.items.map((item, i) => {
          const image = item.tag ? FEATURE_IMAGES[item.tag] : undefined;
          const reverse = i % 2 === 1;
          return (
            <Section key={item.title} dataSection={`feature_${i}`} noContainer accent={i % 2 === 1}>
              <div className="w-full lg:min-h-[70dvh] flex items-center py-8 sm:py-16 lg:py-0">
                <div className={`grid grid-cols-1 gap-10 lg:gap-14 xl:gap-20 lg:grid-cols-2 lg:items-center w-full ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
                    <div className="inline-flex items-center gap-2 text-primary mb-5">
                      <item.Icon className="h-5 w-5" strokeWidth={2} />
                      {item.tag ? <span className="text-[11px] uppercase tracking-widest font-medium">{item.tag}</span> : null}
                    </div>
                    <h2 className="text-4xl sm:text-[2.625rem] lg:text-[3.25rem] xl:text-[3.5rem] font-medium tracking-tight leading-[1.05] mb-5">
                      {item.title}
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 max-w-xl leading-snug mb-8">
                      {item.desc}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center justify-center gap-2 min-h-11 py-2 px-6 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight"
                      >
                        Más información
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                  <div className="w-full">
                    {image ? (
                      <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
                        <Image src={image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      <Section id="pricing" dataSection="pricing_hero" noContainer>
        <PricingHero locale={LOCALE} ctaText={TEXTS.ctaText} demoText={TEXTS.demoText} microcopy={TEXTS.microcopy} texts={TEXTS.pricingHero!} trackPrefix="l_home_pricing" />
      </Section>

      <Section as="footer" dataSection="footer" noContainer accent className="!py-6 sm:!py-8">
        <LandingFooterLp texts={TEXTS.footer} headerTexts={TEXTS.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
