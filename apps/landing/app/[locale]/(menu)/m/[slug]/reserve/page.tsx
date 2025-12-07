import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { ReserveForm } from "./reserve-form";

interface ReservePageProps {
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
      reservationsEnabled: true,
      reservationMode: true,
      reservationSlotMinutes: true,
      _count: {
        select: {
          tables: {
            where: { isActive: true },
          },
        },
      },
    },
  });

  return restaurant;
}

export default async function ReservePage({ params }: ReservePageProps) {
  const { slug, locale } = await params;
  const [restaurant, t] = await Promise.all([
    getRestaurant(slug),
    getTranslations("publicReserve"),
  ]);

  if (!restaurant) {
    notFound();
  }

  if (!restaurant.reservationsEnabled) {
    redirect(`/${locale}/m/${slug}`);
  }

  if (restaurant._count.tables === 0) {
    redirect(`/${locale}/m/${slug}`);
  }

  const translations = {
    title: t("title"),
    selectDate: t("selectDate"),
    selectTime: t("selectTime"),
    selectGuests: t("selectGuests"),
    selectTable: t("selectTable"),
    yourDetails: t("yourDetails"),
    name: t("name"),
    namePlaceholder: t("namePlaceholder"),
    email: t("email"),
    emailPlaceholder: t("emailPlaceholder"),
    phone: t("phone"),
    phonePlaceholder: t("phonePlaceholder"),
    notes: t("notes"),
    notesPlaceholder: t("notesPlaceholder"),
    submit: t("submit"),
    submitting: t("submitting"),
    success: t("success"),
    successAuto: t("successAuto"),
    successManual: t("successManual"),
    error: t("error"),
    guests: t("guests"),
    table: t("table"),
    capacity: t("capacity"),
    noAvailableTables: t("noAvailableTables"),
    back: t("back"),
    noTimeSlotsAvailable: t("noTimeSlotsAvailable"),
    loadingAvailability: t("loadingAvailability"),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 h-14 flex justify-center px-5 z-10 bg-black">
        <div className="max-w-[440px] w-full flex items-center relative">
          <Link href={`/m/${slug}`} className="p-2 -ml-2 text-white z-10">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
            {translations.title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex justify-center px-5 py-6">
        <div className="max-w-[440px] w-full">
          <ReserveForm
            restaurantId={restaurant.id}
            slotMinutes={restaurant.reservationSlotMinutes}
            mode={restaurant.reservationMode}
            translations={translations}
            slug={slug}
            locale={locale}
          />
        </div>
      </main>
    </div>
  );
}
