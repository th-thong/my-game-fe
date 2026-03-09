import { BannerSelector } from "@/features/banner/components/BannerSelector";
import { GachaHistoryDisplayCard } from "@/features/gachaHistory/components/DisplayCard";
import { IngameStat } from "@/features/gameAccountStat/components/IngameStat";
export function HomePage() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(0,4fr)_auto] gap-4 lg:gap-6 h-full p-2 lg:p-6 overflow-y-auto lg:overflow-hidden">
      <div className="w-full lg:max-w-100 lg:h-full lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <BannerSelector />
      </div>

      <div className="w-full lg:h-full lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:pr-5">
        <GachaHistoryDisplayCard />
      </div>

      <div className="w-full lg:min-w-[250px] lg:h-full lg:overflow-y-auto flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <IngameStat />
      </div>
    </div>
  );
}
