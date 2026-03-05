import { useState } from "react";
import {useBannerStore} from "@/features/banner/store/useBannerStore"

export const useBanner = () => {
  const bannerIdFromStore = useBannerStore((state) => state.bannerId);
  const setBannerId = useBannerStore((state) => state.setBannerId);
  const [activeBanner, setActiveBanner] = useState<number>(bannerIdFromStore);


  return {
    setBannerId,
    activeBanner,
    setActiveBanner
  }
};
