import { BannerButton } from "@/features/banner/components/BannerButton";
import characterBanner from "@/assets/banner/character.webp";
import weaponBanner from "@/assets/banner/weapon.webp";
import standardCharacterBanner from "@/assets/banner/standard_character.webp";
import standardWeaponBanner from "@/assets/banner/standard_weapon.webp";
import newbieBanner from "@/assets/banner/newbie.webp";
import choicebBanner from "@/assets/banner/choice.webp";
import giveBanner from "@/assets/banner/give.webp";
import { useState } from "react";

export function BannerSelector() {
  const [activeBanner, setActiveBanner] = useState<number>(0);

  const banners = [
    { id: 0, src: characterBanner },
    { id: 1, src: weaponBanner },
    { id: 2, src: standardCharacterBanner },
    { id: 3, src: standardWeaponBanner },
    { id: 4, src: newbieBanner },
    { id: 5, src: choicebBanner },
    { id: 6, src: giveBanner },
  ];

  return (
    <div className="flex flex-col pl-4 gap-2 pt-2">
      {banners.map((banner) => (
        <div key={banner.id} className="w-40 h-auto relative">
          <div
            onClick={() => setActiveBanner(banner.id)}
            className={`w-full h-full transition-transform duration-150 ease-in-out cursor-pointer ${
              activeBanner === banner.id ? "scale-115" : "scale-100"
            }`}
          >
            <BannerButton imageSrc={banner.src} />
          </div>
        </div>
      ))}
    </div>
  );
}
