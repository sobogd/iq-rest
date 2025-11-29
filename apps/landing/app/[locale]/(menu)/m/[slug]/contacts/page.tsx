import { notFound } from "next/navigation";
import { ArrowLeft, Phone, MessageCircle, Navigation } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { MapView } from "@/components/map-view";

interface ContactsPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      address: true,
      phone: true,
      whatsapp: true,
      instagram: true,
      x: true,
      y: true,
    },
  });

  return restaurant;
}

export default async function ContactsPage({ params }: ContactsPageProps) {
  const { slug } = await params;
  const [restaurant, t] = await Promise.all([
    getRestaurant(slug),
    getTranslations("publicMenu"),
  ]);

  if (!restaurant) {
    notFound();
  }

  const hasCoordinates = restaurant.x && restaurant.y;
  const lat = hasCoordinates ? parseFloat(restaurant.y!) : null;
  const lng = hasCoordinates ? parseFloat(restaurant.x!) : null;
  const mapLinkUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${restaurant.y},${restaurant.x}`
    : null;

  return (
    <div className="h-screen relative">
      {/* Full screen map */}
      {lat && lng ? (
        <div className="absolute inset-0">
          <MapView lat={lat} lng={lng} />
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ backgroundColor: "#f3f4f6", color: "#9ca3af" }}
        >
          {t("noLocation")}
        </div>
      )}

      {/* Header - absolute top */}
      <div
        className="absolute top-0 left-0 right-0 h-14 flex items-center px-4 z-10"
        style={{ backgroundColor: "#000" }}
      >
        <Link href={`/m/${slug}`} className="p-2 -ml-2" style={{ color: "#fff" }}>
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="ml-2 text-lg font-semibold" style={{ color: "#fff" }}>{t("contacts")}</h1>
      </div>

      {/* Buttons - absolute bottom right */}
      <div className="absolute bottom-0 right-0 flex flex-col items-end gap-3 p-4 pb-8 z-10">
        {/* WhatsApp */}
        {restaurant.whatsapp && (
          <a
            href={`https://wa.me/${restaurant.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-4 flex items-center gap-3 rounded-lg shadow-lg"
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">{t("writeWhatsApp")}</span>
          </a>
        )}

        {/* Phone */}
        {restaurant.phone && (
          <a
            href={`tel:${restaurant.phone}`}
            className="h-12 px-4 flex items-center gap-3 rounded-lg shadow-lg"
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            <Phone className="h-5 w-5" />
            <span className="font-medium">{t("makeCall")}</span>
          </a>
        )}

        {/* Instagram */}
        {restaurant.instagram && (
          <a
            href={`https://instagram.com/${restaurant.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-4 flex items-center gap-3 rounded-lg shadow-lg"
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="font-medium">{t("openInstagram")}</span>
          </a>
        )}

        {/* Open in Google Maps */}
        {mapLinkUrl && (
          <a
            href={mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-4 flex items-center gap-3 rounded-lg shadow-lg"
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            <Navigation className="h-5 w-5" />
            <span className="font-medium">{t("openGoogleMaps")}</span>
          </a>
        )}
      </div>
    </div>
  );
}
