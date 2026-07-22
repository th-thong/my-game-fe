import api from "@/services/api";
import config from "@/config";
import { useState, useTransition } from "react";

export interface BannerItem {
  id: number;
  src: string;
  badgeType: string;
  badgeText?: string;
}

let cachedBanners: BannerItem[] | null = null;
let fetchPromise: Promise<BannerItem[]> | null = null;

export function fetchBannersAction(forceUpdate = false): Promise<BannerItem[]> {
  if (!forceUpdate && cachedBanners) {
    return Promise.resolve(cachedBanners);
  }

  if (!forceUpdate && fetchPromise) return fetchPromise;

  const promise = api
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
      const banners: BannerItem[] = (res.data?.data?.banners || []).map(
        (b: { Id: number; ImagePath: string; BadgeType: string; BadgeText?: string }) => ({
          id: b.Id,
          src: `${config.imageUrl}${b.ImagePath}?v=${config.gameVersion}`,
          badgeType: b.BadgeType,
          badgeText: b.BadgeText || undefined,
        }),
      );
      cachedBanners = banners;
      return banners;
    })
    .catch((): BannerItem[] => {
      return [];
    })
    .finally(() => {
      fetchPromise = null;
    });

  fetchPromise = promise;
  return promise;
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
