"use client";

import { useState } from "react";
import { format } from "date-fns";
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
    pending: string;
    confirmed: string;
    cancelled: string;
    completed: string;
    confirm: string;
    reject: string;
    guests: string;
  };
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-gray-100 text-gray-800",
};

export function ReservationsList({ initialData, translations: t }: ReservationsListProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialData);
  const [updating, setUpdating] = useState<string | null>(null);

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

  const statusLabels: Record<string, string> = {
    pending: t.pending,
    confirmed: t.confirmed,
    cancelled: t.cancelled,
    completed: t.completed,
  };

  return (
    <div className="space-y-2">
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-card rounded-lg border p-4 space-y-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">{reservation.guestName}</div>
              <div className="text-sm text-muted-foreground">
                {reservation.guestEmail}
                {reservation.guestPhone && ` • ${reservation.guestPhone}`}
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${statusColors[reservation.status]}`}
            >
              {statusLabels[reservation.status]}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span>
              {format(new Date(reservation.date), "dd.MM.yyyy")} • {reservation.startTime}
            </span>
            <span>
              {reservation.guestsCount} {t.guests}
            </span>
            <span className="text-muted-foreground">
              Table {reservation.table.number}
              {reservation.table.zone && ` (${reservation.table.zone})`}
            </span>
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
      ))}
    </div>
  );
}
