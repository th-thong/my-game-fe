import { BannerSelector } from "@/features/banner/components/BannerSelector";
import { GachaHistoryDisplayCard } from "@/features/gachaHistory/components/DisplayCard";

export function HomePage() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(0,4fr)_auto] gap-4 lg:gap-6 p-2 lg:p-6">
      <div className="w-full lg:max-w-100">
        <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto overflow-x-auto lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <BannerSelector />
        </div>
      </div>
      <div className="w-full">
        <GachaHistoryDisplayCard />
      </div>
    </div>
  );
}
