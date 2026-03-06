import { useState, useEffect, useCallback } from "react";

export interface GachaItem {
  id: string;
  resourceId: number;
  qualityLevel: number;
  name: string;
  time: string;
  pity: number;
  no: number;
}

export function useGachaLog(
  cardPoolType: number,
  gameUid: string,
  qualityLevel: number,
) {
  const [data, setData] = useState<GachaItem[]>([]);
  const storageKey = `gacha_log_${gameUid}_${cardPoolType}`;

  const loadData = useCallback(() => {
    if (!gameUid || cardPoolType < 1) {
      setData([]);
      return;
    }
    const raw = localStorage.getItem(storageKey);
    const allLogs: GachaItem[] = raw ? JSON.parse(raw) : [];

    const filtered = allLogs
      .filter((item) => item.qualityLevel === qualityLevel)
      .reverse();
    setData(filtered);
  }, [storageKey, qualityLevel]);

  useEffect(() => {
    loadData();

    const handleUpdate = (e: any) => {
      if (e.detail?.key === storageKey || e.key === storageKey) {
        loadData();
      }
    };

    window.addEventListener("gacha-storage-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("gacha-storage-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadData, storageKey]);

  return { data };
}
