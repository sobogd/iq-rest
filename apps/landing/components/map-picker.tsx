"use client";

import { useCallback, useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";

interface MapPickerProps {
  lat?: number;
  lng?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 40.4168,
  lng: -3.7038,
};

const libraries: ("places")[] = ["places"];

export function MapPicker({ lat, lng, onLocationSelect }: MapPickerProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
    libraries,
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    lat && lng ? { lat, lng } : null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const center = marker || defaultCenter;

  const handleClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setMarker({ lat: newLat, lng: newLng });
        onLocationSelect(newLat, newLng);
      }
    },
    [onLocationSelect]
  );

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onAutocompleteLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();
        setMarker({ lat: newLat, lng: newLng });
        onLocationSelect(newLat, newLng);
        map?.panTo({ lat: newLat, lng: newLng });
        map?.setZoom(15);
      }
    }
  }, [map, onLocationSelect]);

  if (!isLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-2 left-2 right-2 z-10">
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search location..."
            style={{ color: "#000", backgroundColor: "#fff" }}
            className="w-full px-3 py-2 border rounded-md shadow-sm text-sm text-black bg-white"
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={marker ? 15 : 5}
        onClick={handleClick}
        onLoad={onLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
}
