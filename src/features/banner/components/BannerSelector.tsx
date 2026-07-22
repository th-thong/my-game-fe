import { use, useCallback } from "react";
import { BannerButton, type BadgeType } from "@/features/banner/components/BannerButton";
import { useBanner } from "@/features/banner/hooks/useBanner";
import { useBanners } from "@/features/banner/hooks/useBanners";

export function BannerSelector() {
  const { bannerId, setBannerId } = useBanner();
  const { bannersPromise } = useBanners();
  const banners = use(bannersPromise);

  const handleBannerClick = useCallback(
    (id: number) => {
      setBannerId(id);
    },
    [setBannerId],
  );

  return (
    <div className="flex flex-row overflow-x-auto lg:flex-col lg:h-full pl-2 lg:pl-4 gap-2 lg:gap-0 lg:pb-0 scrollbar-hide will-change-transform">
      {banners.map((banner) => {
        const isActive = bannerId === banner.id;

        return (
          <div key={banner.id} className="w-32 lg:w-40 shrink-0 aspect-[2/1]">
            <BannerButton
              id={banner.id}
              imageSrc={banner.src}
              badgeType={banner.badgeType as BadgeType}
              badgeText={banner.badgeText}
              isActive={isActive}
              onClick={handleBannerClick}
            />
          </div>
        );
      })}
    </div>
  );
}
