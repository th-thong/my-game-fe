import {create} from "zustand"
import { persist } from "zustand/middleware"


interface BannerState {
    bannerId: number,
    setBannerId:(bannerId:number) => void
}



export const useBannerStore = create<BannerState>()(
  persist(
    (set) => ({
      bannerId: 0,

      setBannerId: (bannerId)=> set({bannerId}),
    }),
    {
      name: "banner-id",
    },
  ),
);