import { BannerSelector } from "@/features/banner/components/BannerSelector";
import { GachaHistoryDisplayCard } from "@/features/gachaHistory/components/DisplayCard";

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-2 lg:gap-2 px-2 sm:px-3 md:px-4 lg:px-6 pt-6">
      <div className="w-full">
        <div className="lg:pr-1 pt-3 lg:sticky lg:top-6 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto overflow-x-auto lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <BannerSelector />
        </div>
      </div>

      <div className="w-full">
        <GachaHistoryDisplayCard />
      </div>
    </div>
  );
}
