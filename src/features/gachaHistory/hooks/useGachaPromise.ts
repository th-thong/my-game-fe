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

export interface GachaDataResult {
  logs: GachaItem[];
  storageKey: string;
  error: string | null;
}

import { fetchCharacters, clearCharactersCache } from "@/hooks/useCharacters";
import { fetchWeapons, clearWeaponsCache } from "@/hooks/useWeapons";
import { useGachaStore } from "@/store/useGachaStore";

async function fetchGachaLogs(
  bannerId: number,
  gameUid: string,
  forceUpdate: boolean = false,
): Promise<GachaDataResult> {
  const storageKey = `gacha_log_${gameUid}_${bannerId}`;

  await Promise.all([fetchCharacters(), fetchWeapons()]);

  if (bannerId <= 0 || !gameUid || gameUid === "0") {
    return { logs: [], storageKey, error: null };
  }

  const { bannerLogs, setBannerLogs } = useGachaStore.getState();

  if (!forceUpdate) {
    if (bannerLogs[storageKey]) {
      return { logs: bannerLogs[storageKey], storageKey, error: null };
    }

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setBannerLogs(storageKey, parsed);
        return { logs: parsed, storageKey, error: null };
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
    setBannerLogs(storageKey, allFetched);

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
      clearCharactersCache();
      clearWeaponsCache();
      useGachaStore.getState().clearBannerLogs();

      for (const id of ALL_BANNER_IDS) {
        localStorage.removeItem(`gacha_log_${activeGameUid}_${id}`);
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
