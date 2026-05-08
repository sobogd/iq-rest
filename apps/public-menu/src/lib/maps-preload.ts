import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

let started = false;

// Kick off Google Maps JS download in the background. Subsequent calls are
// no-ops. Call once after mount; when the user navigates to /contacts the
// library is already in cache and the map renders instantly.
export function preloadMaps() {
  if (started) return;
  const key = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined;
  if (!key) return;
  started = true;
  setOptions({ key, v: "weekly" });
  void importLibrary("maps");
  void importLibrary("core");
}
