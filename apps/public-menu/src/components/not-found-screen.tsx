import { UtensilsCrossed } from "lucide-react";

interface Props {
  // Headline. Defaults to "Restaurant not found" when omitted.
  title?: string;
  body?: string;
}

// Designed fallback for when the slug doesn't resolve to a restaurant — also
// used when bundle hits an unexpected route. Text intentionally English-only
// since i18n resources may not be loaded yet at this point.
export function NotFoundScreen({
  title = "Restaurant not found",
  body = "We couldn't find a menu at this address. Check the link or scan the QR code again.",
}: Props) {
  return (
    <div className="h-dvh flex items-center justify-center bg-black px-6">
      <div className="max-w-sm w-full text-center text-white/90 space-y-5">
        <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <UtensilsCrossed className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-white/60 leading-relaxed">{body}</p>
        <p className="text-xs text-white/30 pt-2">iq-rest.com</p>
      </div>
    </div>
  );
}
