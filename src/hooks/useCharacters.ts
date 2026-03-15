import api from "@/services/api";
import { useCharacterStore } from "@/store/useCharacterStore";
import { useState, useTransition } from "react";
import type { Character } from "@/store/useCharacterStore";

let fetchPromise: Promise<Character[]> | null = null;

const preloadImages = (chars: Character[]) => {
  chars.forEach((char) => {
    const img = new Image();
    img.src = char.RoleHeadIcon;
  });
};

export function fetchCharactersAction(
  forceUpdate = false,
): Promise<Character[]> {
  const { characters, setCharacters } = useCharacterStore.getState();

  if (!forceUpdate && characters.length > 0) {
    return Promise.resolve(characters);
  }

  if (fetchPromise) return fetchPromise;

  fetchPromise = api
    .post("/data/query", {
      query: `
      query {
        characters {
          DBId
          Id
          Name
          QualityID
          RoleHeadIcon
          Element { Id Name Icon }
          WeaponType { Id Name Icon }
          BannerImg
        }
      }
    `,
    })
    .then((res) => {
      const fetchedData: Character[] = res.data?.data?.characters || [];

      setCharacters(fetchedData);
      preloadImages(fetchedData);

      return fetchedData;
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export function clearCharactersCache() {
  useCharacterStore.getState().clearCharacters();
}

export function useCharactersPromise() {
  const [promise, setPromise] = useState(() => fetchCharactersAction());
  const [isPending, startTransition] = useTransition();

  const refetch = () => {
    startTransition(() => {
      setPromise(fetchCharactersAction(true));
    });
  };

  return {
    charactersPromise: promise,
    refetch,
    isUpdating: isPending,
  };
}
