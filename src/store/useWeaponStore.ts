import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Weapon {
  DBId: string;
  Id: number; 
  Name: string;
  Icon: string;
  Type: number;
  QualityID: number;
  TypeName: string;
  TypeIcon: string;
}

interface WeaponStore {
  weapons: Weapon[];
  setWeapons: (weapons: Weapon[]) => void;
  clearWeapons: () => void;
}

export const useWeaponStore = create<WeaponStore>()(
  persist(
    (set) => ({
      weapons: [],
      setWeapons: (weapons) => set({ weapons }),
      clearWeapons: () => set({ weapons: [] }),
    }),
    {
      name: "wuwa_weapons_cache",
    }
  )
);