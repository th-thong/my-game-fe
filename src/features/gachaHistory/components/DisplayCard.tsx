import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useBannerStore } from "@/features/banner/store/useBannerStore";
import { useGachaData } from "../hooks/useGachaData";
import { useGachaDisplay } from "../hooks/useGachaDisplay";
import { GachaCardHeader } from "./CardHeader";
import { GachaCardContent } from "./GachaCardContent";

export function GachaHistoryDisplayCard() {
  const bannerId = useBannerStore((state) => state.bannerId);
  const [selectedQualities, setSelectedQualities] = useState<number[]>([5]);
  const [isDetailed, setIsDetailed] = useState(false);

  const { filteredLogs, storageKey } = useGachaData(
    bannerId,
    selectedQualities,
  );
  const { handleUpdate, isUpdating, isInitialLoading } =
    useGachaDisplay(bannerId);

  const toggleQuality = (q: number) =>
    setSelectedQualities((prev) =>
      prev.includes(q) ? prev.filter((i) => i !== q) : [...prev, q],
    );

  return (
    <Card className="border border-zinc-800 bg-[#252323] backdrop-blur-sm shadow-xl min-h-[500px]">
      <GachaCardHeader
        selectedQualities={selectedQualities}
        onToggle={toggleQuality}
        isDetailed={isDetailed}
        onDetailedChange={setIsDetailed}
        isUpdating={isUpdating}
        disabled={isUpdating || bannerId < 1}
        onUpdate={handleUpdate}
      />
      <GachaCardContent
        isInitialLoading={isInitialLoading}
        isDetailed={isDetailed}
        storageKey={storageKey}
        logs={filteredLogs}
      />
    </Card>
  );
}
