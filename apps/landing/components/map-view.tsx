"use client";

import { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
  showMarker?: boolean;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

export function MapView({ lat, lng, zoom = 15, showMarker = true }: MapViewProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = { lat, lng };

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      options={{
        disableDefaultUI: true,
        gestureHandling: "greedy",
      }}
    >
      {showMarker && <Marker position={center} />}
    </GoogleMap>
  );
}
