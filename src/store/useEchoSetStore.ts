import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type EchoGroup } from "./useEchoStore";

interface EchoSetStore {
  echoSets: EchoGroup[];
  setEchoSets: (sets: EchoGroup[]) => void;
  clearEchoSets: () => void;
}

export const useEchoSetStore = create<EchoSetStore>()(
  persist(
    (set) => ({
      echoSets: [],
      setEchoSets: (echoSets) => set({ echoSets }),
      clearEchoSets: () => set({ echoSets: [] }),
    }),
    {
      name: "wuwa_echo_sets_cache",
    },
  ),
);
