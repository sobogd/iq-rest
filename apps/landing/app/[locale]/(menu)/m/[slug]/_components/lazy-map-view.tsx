"use client";

import { Component, type ReactNode } from "react";
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

class MapErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="w-full h-full bg-gray-100" />;
    }
    return this.props.children;
  }
}

export function LazyMapView(props: LazyMapViewProps) {
  return (
    <MapErrorBoundary>
      <MapView {...props} />
    </MapErrorBoundary>
  );
}
