"use client";

import { useState, useEffect } from "react";

interface RestaurantLanguages {
  languages: string[];
  defaultLanguage: string;
}

export function useRestaurantLanguages() {
  const [restaurant, setRestaurant] = useState<RestaurantLanguages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const res = await fetch("/api/restaurant");
        if (res.ok) {
          const data = await res.json();
          setRestaurant({
            languages: data.languages || ["en"],
            defaultLanguage: data.defaultLanguage || "en",
          });
        }
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRestaurant();
  }, []);

  const otherLanguages = restaurant?.languages.filter(
    (lang) => lang !== restaurant.defaultLanguage
  ) || [];

  return { restaurant, loading, otherLanguages };
}
