import { useState, useEffect, useCallback } from "react";
import api from "@/services/api";

export interface Weapon {
  id: string;
  name: string;
  roundIcon: string;
}

const WEAPON_CACHE_KEY = "wuwa_weapons_cache";

export function useWeapons() {
  const [weapons, setWeapons] = useState<Weapon[]>(() => {
    const cachedData = localStorage.getItem(WEAPON_CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : [];
  });

  const [isLoading, setIsLoading] = useState(
    !localStorage.getItem(WEAPON_CACHE_KEY),
  );
  const [error, setError] = useState<string | null>(null);

  const preloadImages = (items: Weapon[]) => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item.roundIcon;
    });
  };

  const fetchWeapons = useCallback(async () => {
    try {
      const res = await api.post("/query", {
        query: `
          query {
            listWeapon {
              id
              name
              roundIcon
            }
          }
        `,
      });

      const fetchedData: Weapon[] = res.data.data.listWeapon;

      const cachedString = localStorage.getItem(WEAPON_CACHE_KEY);
      const newString = JSON.stringify(fetchedData);

      if (cachedString !== newString) {
        console.log("Weapon data changed! Updating cache and UI...");
        localStorage.setItem(WEAPON_CACHE_KEY, newString);
        setWeapons(fetchedData);
        preloadImages(fetchedData);
      } else {
        console.log("Weapon data is up to date. Using cache.");
      }
    } catch (err: any) {
      console.error("Failed to fetch weapons:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeapons();
  }, [fetchWeapons]);

  return { weapons, isLoading, error, refetch: fetchWeapons };
}
