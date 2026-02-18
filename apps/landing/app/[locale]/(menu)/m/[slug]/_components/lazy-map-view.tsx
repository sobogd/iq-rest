"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 animate-pulse" />
  ),
});

interface LazyMapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
  showMarker?: boolean;
}

export function LazyMapView(props: LazyMapViewProps) {
  return <MapView {...props} />;
}
