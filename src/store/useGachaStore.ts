import { create } from "zustand";
import type { GachaItem } from "@/features/gachaHistory/hooks/useGachaPromise";
import { persist } from "zustand/middleware";

interface GachaStore {
  bannerLogs: Record<string, GachaItem[]>;
  setBannerLogs: (key: string, logs: GachaItem[]) => void;
  clearBannerLogs: () => void;
}

export const useGachaStore = create<GachaStore>()(
  persist(
    (set) => ({
      bannerLogs: {},
      setBannerLogs: (key, logs) =>
        set((state) => ({ bannerLogs: { ...state.bannerLogs, [key]: logs } })),
      clearBannerLogs: () => set({ bannerLogs: {} }),
    }),
    {
      name: "wuwa-gacha-logs",
    },
  ),
);
