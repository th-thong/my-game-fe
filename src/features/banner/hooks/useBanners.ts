import api from "@/services/api";
import config from "@/config";
import { useState, useTransition } from "react";

export interface BannerItem {
  id: number;
  src: string;
  badgeType: string;
  badgeText?: string;
}

let fetchPromise: Promise<BannerItem[]> | null = null;

export function fetchBannersAction(forceUpdate = false): Promise<BannerItem[]> {
  if (!forceUpdate && fetchPromise) return fetchPromise;

  fetchPromise = api
    .post("/data/query", {
      query: `
      query {
        banners {
          Id
          ImagePath
          BadgeType
          BadgeText
        }
      }
    `,
    })
    .then((res) => {
      const banners = res.data?.data?.banners || [];
      return banners.map(
        (b: { Id: number; ImagePath: string; BadgeType: string; BadgeText?: string }) => ({
          id: b.Id,
          src: `${config.imageUrl}${b.ImagePath}?v=${config.gameVersion}`,
          badgeType: b.BadgeType,
          badgeText: b.BadgeText || undefined,
        }),
      );
    })
    .catch(() => {
      return [] as BannerItem[];
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export function useBanners() {
  const [promise, setPromise] = useState(() => fetchBannersAction());
  const [isPending, startTransition] = useTransition();

  const refetch = () => {
    startTransition(() => {
      setPromise(fetchBannersAction(true));
    });
  };

  return {
    bannersPromise: promise,
    refetch,
    isUpdating: isPending,
  };
}
