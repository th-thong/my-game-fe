import { useCallback } from "react";
import { BannerButton } from "@/features/banner/components/BannerButton";
import { useBanner } from "@/features/banner/hooks/useBanner";
import config from "@/config";

import CharStandard from "@/assets/banner/CharStandard.webp";
import WeapStandard from "@/assets/banner/WeapStandard.webp";
import CharBeginner from "@/assets/banner/CharBeginner.webp";
import BeginnerChoice from "@/assets/banner/BeginnerChoice.webp";
import Give from "@/assets/banner/Give.webp";
import Char30Day from "@/assets/banner/Char30Day.webp";
import Weap30Day from "@/assets/banner/Weap30Day.webp";

type BadgeType = "event" | "starter" | "discount" | "none";

interface BannerItem {
  id: number;
  src: string;
  badgeType: BadgeType;
  badgeText?: string;
}

const charLimitedUrl =
  "/Game/Aki/UI/UIResources/Common/Image/CurBanner/CharLimited.webp";
const weapLimitedUrl =
  "/Game/Aki/UI/UIResources/Common/Image/CurBanner/WeapLimited.webp";

const BANNERS: BannerItem[] = [
  {
    id: 1,
    src: `${config.imageUrl}${charLimitedUrl}?v=${config.gameVersion}`,
    badgeType: "event",
    badgeText: "EVENT",
  },
  {
    id: 2,
    src: `${config.imageUrl}${weapLimitedUrl}?v=${config.gameVersion}`,
    badgeType: "event",
    badgeText: "EVENT",
  },
  { id: 3, src: CharStandard, badgeType: "none" },
  { id: 4, src: WeapStandard, badgeType: "none" },
  { id: 5, src: CharBeginner, badgeType: "discount", badgeText: "20% OFF" },
  { id: 6, src: BeginnerChoice, badgeType: "discount", badgeText: "CHOICE" },
  { id: 7, src: Give, badgeType: "discount", badgeText: "GIVE" },
  { id: 8, src: Char30Day, badgeType: "starter", badgeText: "STARTER" },
  { id: 9, src: Weap30Day, badgeType: "starter", badgeText: "STARTER" },
];

export function BannerSelector() {
  const { bannerId, setBannerId } = useBanner();

  const handleBannerClick = useCallback(
    (id: number) => {
      setBannerId(id);
    },
    [setBannerId],
  );

  return (
    <div className="flex flex-row overflow-x-auto lg:flex-col lg:h-full pl-2 lg:pl-4 gap-2 lg:gap-0 lg:pb-0 scrollbar-hide will-change-transform">
      {BANNERS.map((banner) => {
        const isActive = bannerId === banner.id;

        return (
          <div key={banner.id} className="w-32 lg:w-40 shrink-0 aspect-[2/1]">
            <BannerButton
              id={banner.id}
              imageSrc={banner.src}
              badgeType={banner.badgeType}
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
