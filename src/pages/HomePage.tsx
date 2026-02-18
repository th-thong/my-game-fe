import { BannerSelector } from "@/features/banner/components/BannerSelector";

export function HomePage() {
  return (
    <div className="flex flex-col pl-4 gap-2 pt-2">
      <BannerSelector/>
    </div>
  );
}
