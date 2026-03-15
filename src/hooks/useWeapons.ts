import api from "@/services/api";
import { useState, useTransition } from "react";

import { useWeaponStore, type Weapon } from "@/store/useWeaponStore";

let fetchPromise: Promise<Weapon[]> | null = null;

const preloadImages = (items: Weapon[]) => {
  items.forEach((item) => {
    const img = new Image();
    img.src = item.Icon;
  });
};

export function fetchWeaponsAction(forceUpdate = false): Promise<Weapon[]> {
  const { weapons, setWeapons } = useWeaponStore.getState();

  if (!forceUpdate && weapons.length > 0) {
    return Promise.resolve(weapons);
  }

  if (fetchPromise) return fetchPromise;

  fetchPromise = api
    .post("/data/query", {
      query: `
      query {
        weapons {
          DBId
          Id
          Name
          Icon
          Type
          QualityID
          TypeName
          TypeIcon
        }
      }
    `,
    })
    .then((res) => {
      const fetchedData: Weapon[] = res.data?.data?.weapons || [];

      setWeapons(fetchedData);
      preloadImages(fetchedData);

      return fetchedData;
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export function clearWeaponsCache() {
  useWeaponStore.getState().clearWeapons();
}

export function useWeaponsPromise() {
  const [promise, setPromise] = useState(() => fetchWeaponsAction());
  const [isPending, startTransition] = useTransition();

  const refetch = () => {
    startTransition(() => {
      setPromise(fetchWeaponsAction(true));
    });
  };

  return {
    weaponsPromise: promise,
    refetch,
    isUpdating: isPending,
  };
}
