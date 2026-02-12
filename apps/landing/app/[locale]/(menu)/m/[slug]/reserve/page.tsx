import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { ReserveForm } from "./reserve-form";
import { MenuHeader, MenuPageWrapper } from "../_components";

interface ReservePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{ preview?: string }>;
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
      accentColor: true,
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

export default async function ReservePage({ params, searchParams }: ReservePageProps) {
  const { slug, locale } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "1";
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
    <MenuPageWrapper slug={slug}>
      {/* Header */}
      <MenuHeader slug={slug} title={translations.title} sticky accentColor={restaurant.accentColor} isPreview={isPreview} />

      {/* Content */}
      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full">
          <ReserveForm
            restaurantId={restaurant.id}
            slotMinutes={restaurant.reservationSlotMinutes}
            mode={restaurant.reservationMode}
            accentColor={restaurant.accentColor}
            translations={translations}
            slug={slug}
            locale={locale}
          />
        </div>
      </main>
    </MenuPageWrapper>
  );
}
