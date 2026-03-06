import { BannerSelector } from "@/features/banner/components/BannerSelector";
import { GachaHistoryDisplayCard } from "@/features/gachaHistory/components/DisplayCard";
import { IngameStat } from "@/features/GameAccountStat/components/IngameStat";
import { GachaStatistic } from "@/features/GameAccountStat/components/GachaStatistic";
import { Separator } from "@/components/ui/separator";

export function HomePage() {
  return (
    <div className="grid grid-cols-[1fr_4fr_1fr] gap-0 h-full">
      <div className="min-w-0 max-w-100 pl-2 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <BannerSelector />
      </div>
      <div className="min-w-0 w-full pl-0 pr-10 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <GachaHistoryDisplayCard />
      </div>
      <div className="min-w-0 pr-5 h-full overflow-y-auto flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <IngameStat />
        <Separator />
        <GachaStatistic />
      </div>
    </div>
  );
}
