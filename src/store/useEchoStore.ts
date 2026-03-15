import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EchoGroup {
  Id: number;
  Name: string;
  Icon: string;
}

export interface Echo {
  DBId: string;
  Id: number;
  Name: string;
  IconMiddle: string;
  EchoGroups: EchoGroup[];
}

interface EchoStore {
  echoes: Echo[];
  setEchoes: (echoes: Echo[]) => void;
  clearEchoes: () => void;
}

export const useEchoStore = create<EchoStore>()(
  persist(
    (set) => ({
      echoes: [],
      setEchoes: (echoes) => set({ echoes }),
      clearEchoes: () => set({ echoes: [] }),
    }),
    {
      name: "wuwa_echoes_cache",
    },
  ),
);
