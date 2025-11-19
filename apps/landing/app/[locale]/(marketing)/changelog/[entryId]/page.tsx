import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

// Define changelog entries data
const changelogEntries = {
  "user-authentication-interface": {
    date: "2024-11-19",
    images: [
      "/changelog/auth-email-step.png",
      "/changelog/auth-otp-step.png",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(changelogEntries).map((entryId) => ({
    entryId,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; entryId: string }> }) {
  const { locale, entryId } = await params;

  if (!changelogEntries[entryId as keyof typeof changelogEntries]) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "changelog" });

  const titleKey = `entries.${entryId.replace(/-/g, "_")}.meta.title`;
  const descriptionKey = `entries.${entryId.replace(/-/g, "_")}.meta.description`;

  return {
    title: t("entries.auth.meta.title"),
    description: t("entries.auth.meta.description"),
    openGraph: {
      title: t("entries.auth.meta.title"),
      description: t("entries.auth.meta.description"),
      type: "article",
      publishedTime: changelogEntries[entryId as keyof typeof changelogEntries].date,
    },
  };
}

export default function ChangelogEntryPage({ params }: { params: Promise<{ locale: string; entryId: string }> }) {
  const t = useTranslations("changelog");

  // For now, we handle only the auth entry
  const entryId = "user-authentication-interface";
  const entry = changelogEntries[entryId];

  if (!entry) {
    notFound();
  }

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
            {t("entries.auth.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("entries.auth.description")}
          </p>
        </header>

        {/* Article Content */}
        <article className="prose prose-gray max-w-none">
          {/* Introduction */}
          <p className="text-lg leading-relaxed">
            {t("entries.auth.content.intro")}
          </p>

          {/* First Image */}
          <figure className="my-8">
            <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src="/changelog/restaurant-qr-menu-email-authentication.webp"
                alt={t("entries.auth.content.image1Alt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                quality={80}
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {t("entries.auth.content.image1Caption")}
            </figcaption>
          </figure>

          {/* Main Content Section 1 */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t("entries.auth.content.section1Title")}
          </h2>
          <p className="leading-relaxed">
            {t("entries.auth.content.section1Text")}
          </p>

          {/* Main Content Section 2 */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t("entries.auth.content.section2Title")}
          </h2>
          <p className="leading-relaxed">
            {t("entries.auth.content.section2Text")}
          </p>

          {/* Second Image */}
          <figure className="my-8">
            <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src="/changelog/restaurant-qr-menu-otp-verification.webp"
                alt={t("entries.auth.content.image2Alt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                loading="lazy"
                quality={80}
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {t("entries.auth.content.image2Caption")}
            </figcaption>
          </figure>

          {/* Main Content Section 3 */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t("entries.auth.content.section3Title")}
          </h2>
          <p className="leading-relaxed">
            {t("entries.auth.content.section3Text")}
          </p>

          {/* Benefits List */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t("entries.auth.content.benefitsTitle")}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("entries.auth.content.benefit1")}</li>
            <li>{t("entries.auth.content.benefit2")}</li>
            <li>{t("entries.auth.content.benefit3")}</li>
            <li>{t("entries.auth.content.benefit4")}</li>
          </ul>

          {/* Conclusion */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            {t("entries.auth.content.conclusionTitle")}
          </h2>
          <p className="leading-relaxed">
            {t("entries.auth.content.conclusionText")}
          </p>

          {/* CTA */}
          <div className="mt-8 p-6 bg-muted rounded-lg text-center">
            <p className="font-medium mb-4">{t("entries.auth.content.ctaText")}</p>
            <Link
              href="/get-started"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {t("entries.auth.content.ctaButton")}
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
              headline: t("entries.auth.title"),
              description: t("entries.auth.description"),
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
