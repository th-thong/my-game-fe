import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Element {
  Id: number;
  Icon: string;
  Name: string;
}

export interface WeaponType {
  Id: number;
  Name: string;
  Icon: string;
}

export interface Character {
  DBId: string;
  Id: number;
  Name: string;
  QualityID: number;
  Element: Element;
  RoleHeadIcon: string;
  WeaponType: WeaponType;
  BannerImg: string;
}

interface CharacterStore {
  characters: Character[];
  setCharacters: (chars: Character[]) => void;
  clearCharacters: () => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      characters: [],
      setCharacters: (characters) => set({ characters }),
      clearCharacters: () => set({ characters: [] }),
    }),
    {
      name: "wuwa_characters_cache",
    },
  ),
);
