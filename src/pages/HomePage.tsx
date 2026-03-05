import { BannerSelector } from "@/features/banner/components/BannerSelector";
import { GachaHistoryDisplayCard } from "@/features/gachaHistory/components/DisplayCard";
import { IngameStat } from "@/features/GameAccountStat/components/IngameStat";
import { GachaStatistic } from "@/features/GameAccountStat/components/GachaStatistic";
import { Separator } from "@/components/ui/separator";

export function HomePage() {
  return (
    <div className="grid grid-cols-[1fr_3fr_1fr] gap-0">
      <div className="min-w-0 pl-2">
        <BannerSelector />
      </div>
      <div className="min-w-0 w-full pr-5">
        <GachaHistoryDisplayCard />
      </div>
      <div className="min-w-0 pr-5 gap-10">
        <IngameStat/>
        <Separator/>
        <GachaStatistic />
      </div>
    </div>
  );
}
