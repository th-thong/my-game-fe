import { useState } from "react";
import api from "@/services/api";

export function useUpdateGacha(bannerId: number, gameUid: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async () => {
    if (!gameUid || bannerId < 1 || isUpdating) return;
    setIsUpdating(true);
    setError(null);

    try {
      const res = await api.post("/convene/get-data/", {
        cardPoolType: bannerId,
        gameUid,
      });

      const storageKey = `gacha_log_${gameUid}_${bannerId}`;
      const allFetched = res.data?.data || [];

      localStorage.setItem(storageKey, JSON.stringify(allFetched));

      window.dispatchEvent(
        new CustomEvent("gacha-storage-updated", {
          detail: { key: storageKey },
        }),
      );
    } catch (err: any) {
      setError(err.response?.data?.error || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return { update, isUpdating, error };
}
