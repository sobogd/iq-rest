"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Reservation {
  id: string;
  date: Date | string;
  startTime: string;
  duration: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  guestsCount: number;
  status: string;
  notes: string | null;
  table: {
    number: number;
    zone: string | null;
  };
}

interface ReservationsListProps {
  initialData: Reservation[];
  translations: {
    noReservations: string;
    confirm: string;
    reject: string;
    guests: string;
    awaitingResponse: string;
    today: string;
    tomorrow: string;
    otherReservations: string;
    table: string;
  };
}

function getDateFromReservation(date: Date | string): Date {
  if (typeof date === "string") {
    return parseISO(date);
  }
  return date;
}

const POLLING_INTERVAL = 30000; // 30 seconds

export function ReservationsList({ initialData, translations: t }: ReservationsListProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialData);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    try {
      const res = await fetch("/api/reservations");
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchReservations, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchReservations]);

  // Group reservations
  const groupedReservations = useMemo(() => {
    const pending: Reservation[] = [];
    const today: Reservation[] = [];
    const tomorrow: Reservation[] = [];
    const other: Reservation[] = [];

    // Sort all reservations by date and time
    const sorted = [...reservations].sort((a, b) => {
      const dateA = getDateFromReservation(a.date);
      const dateB = getDateFromReservation(b.date);
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
      return a.startTime.localeCompare(b.startTime);
    });

    for (const reservation of sorted) {
      // Skip cancelled reservations
      if (reservation.status === "cancelled") {
        continue;
      }

      const date = getDateFromReservation(reservation.date);

      // Pending reservations go only to pending group
      if (reservation.status === "pending") {
        pending.push(reservation);
        continue;
      }

      // Only confirmed/completed go to date groups
      if (isToday(date)) {
        today.push(reservation);
      } else if (isTomorrow(date)) {
        tomorrow.push(reservation);
      } else {
        other.push(reservation);
      }
    }

    return { pending, today, tomorrow, other };
  }, [reservations]);

  async function handleUpdateStatus(id: string, status: string) {
    setUpdating(id);

    const prevReservations = reservations;
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        setReservations(prevReservations);
        toast.error("Failed to update reservation");
      } else {
        toast.success(status === "confirmed" ? "Reservation confirmed" : "Reservation cancelled");
      }
    } catch {
      setReservations(prevReservations);
      toast.error("Failed to update reservation");
    } finally {
      setUpdating(null);
    }
  }

  if (reservations.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <p className="text-sm text-muted-foreground">{t.noReservations}</p>
      </div>
    );
  }

  function renderReservationCard(reservation: Reservation) {
    const date = getDateFromReservation(reservation.date);

    return (
      <div
        key={reservation.id}
        className="bg-card rounded-lg border p-4"
      >
        <div className="font-medium">{reservation.guestName}</div>
        <div className="text-sm text-muted-foreground">
          {reservation.guestEmail}
          {reservation.guestPhone && ` • ${reservation.guestPhone}`}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {format(date, "dd.MM.yyyy")} • {reservation.startTime}
        </div>
        <div className="text-sm text-muted-foreground">
          {t.table} {reservation.table.number}
          {reservation.table.zone && ` (${reservation.table.zone})`} • {reservation.guestsCount} {t.guests}
        </div>
        {reservation.notes && (
          <div className="text-sm text-muted-foreground">
            {reservation.notes}
          </div>
        )}

        {reservation.status === "pending" && (
          <div className="flex items-center gap-2 pt-2">
            <Button
              size="sm"
              onClick={() => handleUpdateStatus(reservation.id, "confirmed")}
              disabled={updating === reservation.id}
            >
              <Check className="h-4 w-4 mr-1" />
              {t.confirm}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUpdateStatus(reservation.id, "cancelled")}
              disabled={updating === reservation.id}
            >
              <X className="h-4 w-4 mr-1" />
              {t.reject}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Pending reservations */}
      {groupedReservations.pending.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.awaitingResponse}</h3>
          <div className="space-y-2">
            {groupedReservations.pending.map(renderReservationCard)}
          </div>
        </div>
      )}

      {/* Today's reservations */}
      {groupedReservations.today.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.today}</h3>
          <div className="space-y-2">
            {groupedReservations.today.map(renderReservationCard)}
          </div>
        </div>
      )}

      {/* Tomorrow's reservations */}
      {groupedReservations.tomorrow.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.tomorrow}</h3>
          <div className="space-y-2">
            {groupedReservations.tomorrow.map(renderReservationCard)}
          </div>
        </div>
      )}

      {/* Other reservations */}
      {groupedReservations.other.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.otherReservations}</h3>
          <div className="space-y-2">
            {groupedReservations.other.map(renderReservationCard)}
          </div>
        </div>
      )}
    </div>
  );
}
