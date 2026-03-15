import { useUserStore } from "@/store/useUserStore";

export const useBanner = () => {
  const bannerId = useUserStore((state) => state.bannerId);
  const setBannerId = useUserStore((state) => state.setBannerId);

  return { bannerId, setBannerId };
};