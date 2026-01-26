import { getTranslations } from "next-intl/server";
import { JsonLd, createWebPageSchema } from "../_lib";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Cookies Policy - IQ Rest",
    es: "Política de Cookies - IQ Rest",
  };

  const descriptions = {
    en: "Cookies Policy for IQ Rest - QR menu solution for restaurants and cafes. Learn how we use cookies on our website.",
    es: "Política de Cookies de IQ Rest - solución de menú QR para restaurantes y cafeterías. Aprende cómo usamos cookies en nuestro sitio web.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/cookies`,
      languages: {
        en: "https://iq-rest.com/en/cookies",
        es: "https://iq-rest.com/es/cookies",
        "x-default": "https://iq-rest.com/en/cookies",
      },
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://iq-rest.com/${locale}/cookies`,
      type: "website",
      images: [
        {
          url: "https://iq-rest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "IQ Rest - Cookies Policy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ["https://iq-rest.com/og-image.png"],
    },
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("cookies");

  const sections = t.raw("sections") as Array<{
    title: string;
    content: string[];
  }>;

  const cookieTypes = t.raw("cookieTypes") as Array<{
    name: string;
    purpose: string;
    duration: string;
    required: boolean;
  }>;

  const webPageSchema = createWebPageSchema(
    t("title"),
    "Cookies Policy for IQ Rest - QR menu solution for restaurants and cafes",
    `https://iq-rest.com/${locale}/cookies`
  );

  return (
    <>
      <JsonLd data={webPageSchema} />
      <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          {t("lastUpdated")}
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">{t("cookieTableTitle")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">{t("tableHeaders.name")}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t("tableHeaders.purpose")}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t("tableHeaders.duration")}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t("tableHeaders.required")}</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTypes.map((cookie, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-mono text-sm">{cookie.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{cookie.purpose}</td>
                      <td className="py-3 px-4 text-muted-foreground">{cookie.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${cookie.required ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {cookie.required ? t("yes") : t("no")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{t("contact.title")}</h2>
          <p className="text-muted-foreground">{t("contact.description")}</p>
          <p className="text-muted-foreground mt-2">
            <strong>Email:</strong> support@iq-rest.com
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
