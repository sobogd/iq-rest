import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { JsonLd, buildAlternates } from "../../_lib";
import { PageView } from "@/components/PageView";

// Define changelog entries data
const changelogEntries: Record<string, {
  date: string;
  translationKey: string;
  image: string;
  image2?: string;
  image3?: string;
}> = {
  "ai-menu-scanner-create-digital-qr-menu": {
    date: "2026-02-18",
    translationKey: "ai-menu-scanner-create-digital-qr-menu",
    image: "/og-image.png",
  },
  "redesigned-dashboard-qr-menu-management": {
    date: "2026-02-14",
    translationKey: "redesigned-dashboard-qr-menu-management",
    image: "/og-image.png",
  },
  "multi-currency-geo-pricing-qr-menu": {
    date: "2026-02-10",
    translationKey: "multi-currency-geo-pricing-qr-menu",
    image: "/og-image.png",
  },
  "reservation-emails-analytics-digital-qr-menu": {
    date: "2026-02-12",
    translationKey: "reservation-emails-analytics-digital-qr-menu",
    image: "/og-image.png",
  },
  "support-qr-menu-restaurant-cafe": {
    date: "2025-12-02",
    translationKey: "support-qr-menu-restaurant-cafe",
    image: "/changelog/support-qr-menu-restaurant.webp",
  },
  "detailed-analytics-restaurant-qr-menu-website": {
    date: "2025-12-02",
    translationKey: "detailed-analytics-restaurant-qr-menu-website",
    image: "/changelog/detailed-analytics-restaurant-qr-menu.webp",
  },
  "instant-qr-menu-restaurant-website-generator": {
    date: "2025-12-01",
    translationKey: "instant-qr-menu-restaurant-website-generator",
    image: "/changelog/instant-qr-menu-generator.webp",
  },
  "public-restaurant-qr-menu-website": {
    date: "2025-11-30",
    translationKey: "public-restaurant-qr-menu-website",
    image: "/changelog/public-menu-qr-scan-1.webp",
    image2: "/changelog/public-menu-qr-scan-2.webp",
    image3: "/changelog/public-menu-qr-scan-3.webp",
  },
  "add-items-restaurant-qr-menu-website": {
    date: "2025-11-29",
    translationKey: "add-items-restaurant-qr-menu-website",
    image: "/changelog/add-items-restaurant-list.webp",
    image2: "/changelog/add-items-restaurant-form.webp",
  },
  "qr-menu-restaurant-categories": {
    date: "2025-11-29",
    translationKey: "qr-menu-restaurant-categories",
    image: "/changelog/qr-menu-categories-list.webp",
    image2: "/changelog/qr-menu-category-form.webp",
  },
  "easy-qr-menu-cafe-control-panel": {
    date: "2025-11-29",
    translationKey: "easy-qr-menu-cafe-control-panel",
    image: "/changelog/easy-qr-menu-cafe-control-panel.webp",
  },
  "faq-page-organization": {
    date: "2025-11-20",
    translationKey: "faq-page-organization",
    image: "/changelog/faq-page-organization.webp",
  },
  "free-restaurant-website-improvements": {
    date: "2025-11-20",
    translationKey: "free-restaurant-website-improvements",
    image: "/changelog/free-restaurant-website-mobile-menu.webp",
    image2: "/changelog/free-restaurant-website-signup.webp",
  },
  "user-authentication-interface": {
    date: "2024-11-19",
    translationKey: "auth",
    image: "/changelog/restaurant-qr-menu-email-authentication.webp",
    image2: "/changelog/restaurant-qr-menu-otp-verification.webp",
  },
  "subscription-plans-qr-menu-restaurant-website": {
    date: "2025-11-30",
    translationKey: "subscription-plans-qr-menu-restaurant-website",
    image: "/changelog/billing-subscription-plans.webp",
  },
};

export async function generateStaticParams() {
  return Object.keys(changelogEntries).map((entryId) => ({
    entryId,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; entryId: string }> }) {
  const { locale, entryId } = await params;

  const entry = changelogEntries[entryId];
  if (!entry) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "changelog" });
  const key = entry.translationKey;

  return {
    title: t(`entries.${key}.meta.title`),
    description: t(`entries.${key}.meta.description`),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/changelog/${entryId}`,
      languages: buildAlternates(`/changelog/${entryId}`),
    },
    openGraph: {
      title: t(`entries.${key}.meta.title`),
      description: t(`entries.${key}.meta.description`),
      url: `https://iq-rest.com/${locale}/changelog/${entryId}`,
      type: "article",
      publishedTime: entry.date,
      images: [
        {
          url: "https://iq-rest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "IQ Rest - QR Menu for Restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t(`entries.${key}.meta.title`),
      description: t(`entries.${key}.meta.description`),
      images: ["https://iq-rest.com/og-image.png"],
    },
  };
}

export default async function ChangelogEntryPage({ params }: { params: Promise<{ locale: string; entryId: string }> }) {
  const { locale, entryId } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });

  const entry = changelogEntries[entryId];
  if (!entry) {
    notFound();
  }

  const key = entry.translationKey;
  const hasSixBenefits = key === "free-restaurant-website-improvements" || key === "faq-page-organization" || key === "easy-qr-menu-cafe-control-panel" || key === "qr-menu-restaurant-categories" || key === "add-items-restaurant-qr-menu-website" || key === "public-restaurant-qr-menu-website" || key === "subscription-plans-qr-menu-restaurant-website" || key === "instant-qr-menu-restaurant-website-generator" || key === "detailed-analytics-restaurant-qr-menu-website" || key === "support-qr-menu-restaurant-cafe" || key === "ai-menu-scanner-create-digital-qr-menu" || key === "redesigned-dashboard-qr-menu-management" || key === "multi-currency-geo-pricing-qr-menu" || key === "reservation-emails-analytics-digital-qr-menu";

  return (
    <>
      <PageView slug={`changelog-${entryId}`} />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
          <Link href="/changelog" className="text-primary hover:underline">
            ← {t("backToChangelog")}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <time className="text-sm text-muted-foreground" dateTime={entry.date}>
            {new Date(entry.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-4xl font-bold mt-2 mb-4">
            {t(`entries.${key}.title`)}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t(`entries.${key}.description`)}
          </p>
        </header>

        {/* Article Content */}
        <article className="prose prose-gray max-w-none">
          {/* Introduction */}
          <p className="text-lg leading-relaxed">
            {t(`entries.${key}.content.intro`)}
          </p>

          {/* First Image */}
          <figure className="my-8">
            <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src={entry.image}
                alt={t(`entries.${key}.content.image1Alt`)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                quality={80}
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {t(`entries.${key}.content.image1Caption`)}
            </figcaption>
          </figure>

          {/* Main Content Section 1 */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t(`entries.${key}.content.section1Title`)}
          </h2>
          <p className="leading-relaxed">
            {t(`entries.${key}.content.section1Text`)}
          </p>

          {/* Main Content Section 2 */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t(`entries.${key}.content.section2Title`)}
          </h2>
          <p className="leading-relaxed">
            {t(`entries.${key}.content.section2Text`)}
          </p>

          {/* Second Image - only for auth entry */}
          {entry.image2 && (
            <figure className="my-8">
              <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                <Image
                  src={entry.image2}
                  alt={t(`entries.${key}.content.image2Alt`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  loading="lazy"
                  quality={80}
                />
              </div>
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {t(`entries.${key}.content.image2Caption`)}
              </figcaption>
            </figure>
          )}

          {/* Main Content Section 3 */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t(`entries.${key}.content.section3Title`)}
          </h2>
          <p className="leading-relaxed">
            {t(`entries.${key}.content.section3Text`)}
          </p>

          {/* Third Image */}
          {entry.image3 && (
            <figure className="my-8">
              <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                <Image
                  src={entry.image3}
                  alt={t(`entries.${key}.content.image3Alt`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  loading="lazy"
                  quality={80}
                />
              </div>
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {t(`entries.${key}.content.image3Caption`)}
              </figcaption>
            </figure>
          )}

          {/* Benefits List */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t(`entries.${key}.content.benefitsTitle`)}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t(`entries.${key}.content.benefit1`)}</li>
            <li>{t(`entries.${key}.content.benefit2`)}</li>
            <li>{t(`entries.${key}.content.benefit3`)}</li>
            <li>{t(`entries.${key}.content.benefit4`)}</li>
            {hasSixBenefits && (
              <>
                <li>{t(`entries.${key}.content.benefit5`)}</li>
                <li>{t(`entries.${key}.content.benefit6`)}</li>
              </>
            )}
          </ul>

          {/* Conclusion */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t(`entries.${key}.content.conclusionTitle`)}
          </h2>
          <p className="leading-relaxed">
            {t(`entries.${key}.content.conclusionText`)}
          </p>

          {/* CTA */}
          <div className="mt-8 p-6 bg-muted rounded-lg text-center">
            <p className="font-medium mb-4">{t(`entries.${key}.content.ctaText`)}</p>
            <Link
              href="/dashboard"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {t(`entries.${key}.content.ctaButton`)}
            </Link>
          </div>
        </article>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: t(`entries.${key}.title`),
            description: t(`entries.${key}.description`),
            datePublished: entry.date,
            author: {
              "@type": "Organization",
              name: "IQ Rest",
            },
            publisher: {
              "@type": "Organization",
              name: "IQ Rest",
            },
          }}
        />
      </div>
    </div>
    </>
  );
}
