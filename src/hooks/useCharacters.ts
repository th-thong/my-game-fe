import { useState, useEffect, useCallback } from "react";
import api from "@/services/api";

export interface Character {
  id: string;
  name: string;
  roundIcon: string;
}

const CACHE_KEY = "wuwa_characters_cache";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : [];
  });

  const [isLoading, setIsLoading] = useState(!localStorage.getItem(CACHE_KEY));
  const [error, setError] = useState<string | null>(null);

  const preloadImages = (chars: Character[]) => {
    chars.forEach((char) => {
      const img = new Image();
      img.src = char.roundIcon;
    });
  };

  const fetchCharacters = useCallback(async () => {
    try {
      const res = await api.post("/query", {
        query: `
          query {
            listCharacter {
              id
              name
              roundIcon
            }
          }
        `,
      });

      const fetchedData: Character[] = res.data.data.listCharacter;

      const cachedString = localStorage.getItem(CACHE_KEY);
      const newString = JSON.stringify(fetchedData);

      if (cachedString !== newString) {
        console.log("Data changed! Updating cache and UI...");
        localStorage.setItem(CACHE_KEY, newString);
        setCharacters(fetchedData);

        preloadImages(fetchedData);
      } else {
        console.log("Data is up to date. Using cache.");
      }
    } catch (err: any) {
      console.error("Failed to fetch characters:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return { characters, isLoading, error, refetch: fetchCharacters };
}
