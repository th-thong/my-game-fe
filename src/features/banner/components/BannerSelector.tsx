import { BannerButton } from "@/features/banner/components/BannerButton";
import { useBanner } from "@/features/banner/hooks/useBanner";

import CharLimited from "@/assets/banner/CharLimited.webp";
import WeapLimited from "@/assets/banner/WeapLimited.webp";

import CharStandard from "@/assets/banner/CharStandard.webp";
import WeapStandard from "@/assets/banner/WeapStandard.webp";

import Beginner from "@/assets/banner/Beginner.webp";
import BeginnerChoice from "@/assets/banner/BeginnerChoice.webp";

import Give from "@/assets/banner/GiveChar.webp";

import Char30Day from "@/assets/banner/Char30Day.webp";
import Weap30Day from "@/assets/banner/Weap30Day.webp";

type BadgeType = "event" | "starter" | "discount" | "none";

interface BannerItem {
  id: number;
  src: string;
  badgeType: BadgeType;
  badgeText?: string;
}

export function BannerSelector() {
  const { setBannerId, activeBanner, setActiveBanner } = useBanner();

  const banners: BannerItem[] = [
    { id: 1, src: CharLimited, badgeType: "event", badgeText: "EVENT" },
    { id: 2, src: WeapLimited, badgeType: "event", badgeText: "EVENT" },
    { id: 3, src: CharStandard, badgeType: "none" },
    { id: 4, src: WeapStandard, badgeType: "none" },
    { id: 5, src: Beginner, badgeType: "discount", badgeText: "20% OFF" },
    { id: 6, src: BeginnerChoice, badgeType: "discount", badgeText: "CHOICE" },
    { id: 7, src: Give, badgeType: "discount", badgeText: "GIVE" },
    { id: 8, src: Char30Day, badgeType: "starter", badgeText: "STARTER" },
    { id: 9, src: Weap30Day, badgeType: "starter", badgeText: "STARTER" },
  ];

  const handleBannerClick = (id: number) => {
    setActiveBanner(id);
    setBannerId(id);
  };

  return (
    <div className="flex flex-row overflow-x-auto lg:flex-col lg:h-full pl-2 lg:pl-4 gap-3 lg:gap-2 pt-2 pb-4 lg:pb-0 scrollbar-hide snap-x lg:snap-y">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="w-32 lg:w-40 h-auto shrink-0 snap-center"
        >
          <div
            onClick={() => handleBannerClick(banner.id)}
            className={`w-full h-full cursor-pointer transition-all duration-200 lg:origin-left origin-center ${
              activeBanner === banner.id
                ? "scale-105 lg:scale-110 z-10"
                : "scale-100 opacity-70 hover:opacity-100"
            }`}
          >
            <BannerButton
              imageSrc={banner.src}
              badgeType={banner.badgeType}
              badgeText={banner.badgeText}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
