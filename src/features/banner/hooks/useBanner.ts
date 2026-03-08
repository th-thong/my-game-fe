import { useUserStore } from "@/store/useUserStore";

export const useBanner = () => {
  const bannerIdFromStore = useUserStore((state) => state.bannerId);
  const setBannerId = useUserStore((state) => state.setBannerId);

  return {
    activeBanner: bannerIdFromStore,
    setActiveBanner: setBannerId,
    setBannerId,
  };
};
