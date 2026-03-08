import { useState, useCallback, useTransition } from "react";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { useUserStore } from "@/store/useUserStore";
export interface GachaItem {
  id: string;
  resourceId: number;
  qualityLevel: number;
  name: string;
  time: string;
  pity: number;
  no: number;
}

import type { Character } from "@/hooks/useCharacters";
import type { Weapon } from "@/hooks/useWeapons";

const CACHE_KEY_CHARS = "wuwa_characters_cache";
const CACHE_KEY_WEAPONS = "wuwa_weapons_cache";

export interface GachaDataResult {
  logs: GachaItem[];
  storageKey: string;
  error: string | null;
}

async function fetchCharacters(): Promise<void> {
  const cachedData = localStorage.getItem(CACHE_KEY_CHARS);

  if (!cachedData) {
    try {
      const res = await api.post("/query", {
        query: `
          query {
            characters {
              DBId ID Name QualityID RoleHeadIcon
              Element { ID Name Icon }
              WeaponType { ID Name Icon }
            }
          }
        `,
      });
      const fetchedData: Character[] = res.data?.data?.characters || [];
      localStorage.setItem(CACHE_KEY_CHARS, JSON.stringify(fetchedData));
    } catch (e) {
      console.warn("Could not fetch characters on startup", e);
    }
  }
}

async function fetchWeapons(): Promise<void> {
  const cachedData = localStorage.getItem(CACHE_KEY_WEAPONS);
  if (!cachedData) {
    try {
      const res = await api.post("/query", {
        query: `
          query {
            weapons {
              DBId ID Name Icon Type QualityID TypeName TypeIcon
            }
          }
        `,
      });
      const fetchedData: Weapon[] = res.data?.data?.weapons || [];
      localStorage.setItem(CACHE_KEY_WEAPONS, JSON.stringify(fetchedData));
    } catch (e) {
      console.warn("Could not fetch weapons on startup", e);
    }
  }
}

async function fetchGachaLogs(
  bannerId: number,
  gameUid: string,
  forceUpdate: boolean = false,
): Promise<GachaDataResult> {
  const storageKey = `gacha_log_${gameUid}_${bannerId}`;

  await Promise.all([fetchCharacters(), fetchWeapons()]);

  if (bannerId <= 0 || !gameUid) {
    return { logs: [], storageKey, error: null };
  }

  if (!forceUpdate) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        return { logs: JSON.parse(raw), storageKey, error: null };
      }
    } catch (e) {
      console.warn("Failed to parse local storage for gacha logs", e);
    }
  }

  try {
    const res = await api.get(
      `/convene/get-data/${gameUid}?cardPoolType=${bannerId}`,
    );
    const allFetched = res.data?.data || [];
    localStorage.setItem(storageKey, JSON.stringify(allFetched));

    window.dispatchEvent(
      new CustomEvent("gacha-storage-updated", {
        detail: { key: storageKey },
      }),
    );

    return { logs: allFetched, storageKey, error: null };
  } catch (err: unknown) {
    return {
      logs: [],
      storageKey,
      error: isAxiosError(err)
        ? err.response?.data?.error || "Update failed"
        : "Update failed",
    };
  }
}

const ALL_BANNER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function useGachaPromise(bannerId: number) {
  const activeGameUid = useUserStore((state) => state.selectedGameUid) || "0";

  const [currentParams, setCurrentParams] = useState({
    bannerId,
    activeGameUid,
  });
  const [promise, setPromise] = useState(() =>
    fetchGachaLogs(bannerId, activeGameUid, false),
  );

  const [refreshKey, setRefreshKey] = useState(0);

  if (
    currentParams.bannerId !== bannerId ||
    currentParams.activeGameUid !== activeGameUid
  ) {
    setCurrentParams({ bannerId, activeGameUid });
    setPromise(fetchGachaLogs(bannerId, activeGameUid, false));
  }

  const [isPending, startTransition] = useTransition();
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);

  const updateAllBanners = useCallback(async () => {
    if (!activeGameUid || activeGameUid === "0") return;

    setIsUpdatingAll(true);
    try {
      for (const id of ALL_BANNER_IDS) {
        await fetchGachaLogs(id, activeGameUid, true);
      }

      startTransition(() => {
        setPromise(fetchGachaLogs(bannerId, activeGameUid, false));
        setRefreshKey((prev) => prev + 1);
      });
    } catch (error) {
      console.error("Error when updating all", error);
    } finally {
      setIsUpdatingAll(false);
    }
  }, [bannerId, activeGameUid]);

  const isUpdating = isPending || isUpdatingAll;

  return { promise, updateAllBanners, isUpdating, refreshKey };
}
