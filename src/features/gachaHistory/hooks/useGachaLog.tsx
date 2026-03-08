import type { GachaItem } from "./useGachaPromise";

export function getGachaLog(
  cardPoolType: number,
  gameUid: string,
  qualityLevel: number,
): Promise<GachaItem[]> {
  return new Promise((resolve) => {
    if (!gameUid || cardPoolType < 1) {
      resolve([]);
      return;
    }
    const storageKey = `gacha_log_${gameUid}_${cardPoolType}`;

    setTimeout(() => {
      const raw = localStorage.getItem(storageKey);
      const allLogs: GachaItem[] = raw ? JSON.parse(raw) : [];

      const filtered = allLogs
        .filter((item) => item.qualityLevel === qualityLevel)
        .reverse();
      resolve(filtered);
    }, 10);
  });
}

export function useGachaLog(
  cardPoolType: number,
  gameUid: string,
  qualityLevel: number,
) {
  return () => getGachaLog(cardPoolType, gameUid, qualityLevel);
}
