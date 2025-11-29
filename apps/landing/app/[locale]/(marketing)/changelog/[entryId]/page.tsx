import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

// Define changelog entries data
const changelogEntries: Record<string, {
  date: string;
  translationKey: string;
  image: string;
  image2?: string;
}> = {
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
  "get-started-page-redesign": {
    date: "2025-11-19",
    translationKey: "landing-redesign",
    image: "/changelog/get-started-redesign.webp",
  },
  "user-authentication-interface": {
    date: "2024-11-19",
    translationKey: "auth",
    image: "/changelog/restaurant-qr-menu-email-authentication.webp",
    image2: "/changelog/restaurant-qr-menu-otp-verification.webp",
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
    openGraph: {
      title: t(`entries.${key}.meta.title`),
      description: t(`entries.${key}.meta.description`),
      type: "article",
      publishedTime: entry.date,
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
  const hasSixBenefits = key === "landing-redesign" || key === "free-restaurant-website-improvements" || key === "faq-page-organization" || key === "easy-qr-menu-cafe-control-panel" || key === "qr-menu-restaurant-categories";

  return (
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
              href="/get-started"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {t(`entries.${key}.content.ctaButton`)}
            </Link>
          </div>
        </article>

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: t(`entries.${key}.title`),
              description: t(`entries.${key}.description`),
              datePublished: entry.date,
              author: {
                "@type": "Organization",
                name: "SobogdQR",
              },
              publisher: {
                "@type": "Organization",
                name: "SobogdQR",
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
