import { useState, useCallback } from "react";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { useUserStore } from "@/store/useUserStore";
import config from "@/config";

export interface BaseStats {
  Name: string;
  Id: number;
  CreatTime: number;
  ActiveDays: number;
  Level: number;
  RoleNum: number;
  Energy: number;
  MaxEnergy: number;
  StoreEnergy: number;
}

function getRegionFromPlayerId(playerId: string): string {
  const prefix = playerId.slice(0, 2);
  const map: Record<string, string> = {
    "10": "os_asia",
    "20": "os_asia",
    "30": "os_euro",
    "40": "os_usa",
    "50": "os_cht",
    "60": "os_sea",
    "90": "SEA",
  };
  return map[prefix] ?? "SEA";
}

async function fetchStatsData(
  playerId: string | null,
  oauthCode: string | null,
): Promise<{ data: BaseStats | null; error: string | null }> {
  if (!playerId || !oauthCode)
    return { data: null, error: "Missing credentials (UID or OAuth Code)" };

  try {
    const res = await api.post(
      config.ingameStatApi,
      {
        payload: {
          oauthCode,
          playerId,
          region: getRegionFromPlayerId(playerId),
        },
      },
    );

    if (res.data?.code !== 0)
      return {
        data: null,
        error: res.data?.message || "Add OAuth to see imgame data",
      };

    const region = getRegionFromPlayerId(playerId);
    const raw = res.data?.data?.[region];
    if (!raw) return { data: null, error: "No data for region" };

    const parsed = JSON.parse(raw);
    const base: BaseStats = {
      Name: parsed.Base.Name,
      Id: parsed.Base.Id,
      CreatTime: parsed.Base.CreatTime,
      ActiveDays: parsed.Base.ActiveDays,
      Level: parsed.Base.Level,
      RoleNum: parsed.Base.RoleNum,
      Energy: parsed.Base.Energy,
      MaxEnergy: parsed.Base.MaxEnergy,
      StoreEnergy: parsed.Base.StoreEnergy,
    };

    return { data: base, error: null };
  } catch (err) {
    return {
      data: null,
      error: isAxiosError(err)
        ? (err.response?.data?.message ?? "Request failed")
        : "Unexpected error",
    };
  }
}

export function useIngameStat() {
  const selectedGameUid = useUserStore((state) => state.selectedGameUid);
  const gameAccountList = useUserStore((state) => state.gameAccountList);

  const currentAccount = gameAccountList.find(
    (acc) => acc.uid === selectedGameUid,
  );
  const oauthCode = currentAccount?.oauthCode || null;

  const [promise, setPromise] = useState(() =>
    fetchStatsData(selectedGameUid, oauthCode),
  );

  const refetch = useCallback(() => {
    setPromise(fetchStatsData(selectedGameUid, oauthCode));
  }, [selectedGameUid, oauthCode]);

  return { promise, refetch };
}
