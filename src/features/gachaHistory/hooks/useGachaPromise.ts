import { useState, useCallback, useTransition } from "react";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useRef } from "react";
import {
  fetchCharactersAction,
  clearCharactersCache,
} from "@/hooks/useCharacters";
import { fetchWeaponsAction, clearWeaponsCache } from "@/hooks/useWeapons";
import { useGachaStore } from "@/store/useGachaStore";

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

export async function fetchGachaLogs(
  bannerId: number,
  gameUid: string,
  forceUpdate: boolean = false,
): Promise<GachaDataResult> {
  const storageKey = `gacha_log_${gameUid}_${bannerId}`;

  await Promise.all([
    fetchCharactersAction(forceUpdate),
    fetchWeaponsAction(forceUpdate),
  ]);

  if (bannerId <= 0 || !gameUid || gameUid === "0") {
    return { logs: [], storageKey, error: null };
  }

  const { bannerLogs, setBannerLogs } = useGachaStore.getState();

  if (!forceUpdate && bannerLogs[storageKey]) {
    return { logs: bannerLogs[storageKey], storageKey, error: null };
  }

  try {
    const res = await api.get(
      `/convene/get-data/${gameUid}?cardPoolType=${bannerId}`,
    );
    const allFetched = res.data?.data || [];

    setBannerLogs(storageKey, allFetched);

    window.dispatchEvent(
      new CustomEvent("gacha-storage-updated", { detail: { key: storageKey } }),
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
  const activeGameUid = useUserStore((s) => s.selectedGameUid) || "0";

  const [promise, setPromise] = useState(() =>
    fetchGachaLogs(bannerId, activeGameUid, false),
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);

  const prevParamsRef = useRef({ bannerId, activeGameUid });

  useEffect(() => {
    const prev = prevParamsRef.current;
    if (prev.bannerId === bannerId && prev.activeGameUid === activeGameUid)
      return;

    prevParamsRef.current = { bannerId, activeGameUid };
    startTransition(() => {
      setPromise(fetchGachaLogs(bannerId, activeGameUid, false));
    });
  }, [bannerId, activeGameUid]);

  const updateAllBanners = useCallback(async () => {
    if (!activeGameUid || activeGameUid === "0") return;
    setIsUpdatingAll(true);
    try {
      clearCharactersCache();
      clearWeaponsCache();

      useGachaStore.getState().clearBannerLogs();

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

  return {
    promise,
    updateAllBanners,
    isUpdating: isPending || isUpdatingAll,
    refreshKey,
  };
}
