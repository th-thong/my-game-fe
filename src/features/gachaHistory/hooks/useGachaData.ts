import { useState, useMemo, useEffect, useCallback } from "react";
import type { GachaItem } from "./useGachaLog";

export function useGachaData(bannerId: number, selectedQualities: number[]) {
  const [tick, setTick] = useState(0);
  const activeGameUid = localStorage.getItem("selected_game_uid") || "";

  const storageKey = useMemo(
    () => `gacha_log_${activeGameUid}_${bannerId}`,
    [activeGameUid, bannerId],
  );

  const forceUpdate = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    window.addEventListener("storage", forceUpdate);
    window.addEventListener("gacha-storage-updated", forceUpdate);
    return () => {
      window.removeEventListener("storage", forceUpdate);
      window.removeEventListener("gacha-storage-updated", forceUpdate);
    };
  }, [forceUpdate]);

  const allLogs = useMemo((): GachaItem[] => {
    if (!activeGameUid || bannerId < 1) return [];
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [storageKey, tick, activeGameUid, bannerId]);

  const filteredLogs = useMemo(() => {
    return [...allLogs]
      .filter((item) => selectedQualities.includes(item.qualityLevel))
      .reverse();
  }, [allLogs, selectedQualities]);

  return { filteredLogs, activeGameUid, storageKey };
}
