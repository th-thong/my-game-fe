import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import { GachaCardHeader } from "./CardHeader";
import { GachaCardContent } from "./GachaCardContent";
import { useGachaPromise } from "../hooks/useGachaPromise";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export function GachaHistoryDisplayCard() {
  const bannerId = useUserStore((state) => state.bannerId);
  const [selectedQualities, setSelectedQualities] = useState<number[]>([5]);
  const [isDetailed, setIsDetailed] = useState(false);

  const { promise, updateAllBanners, isUpdating, refreshKey } =
    useGachaPromise(bannerId);

  const toggleQuality = (q: number) =>
    setSelectedQualities((prev) =>
      prev.includes(q) ? prev.filter((i) => i !== q) : [...prev, q],
    );

  return (
    <Card className="border border-zinc-800 backdrop-blur-sm shadow-xl min-h-[500px]">
      <GachaCardHeader
        selectedQualities={selectedQualities}
        onToggle={toggleQuality}
        isDetailed={isDetailed}
        onDetailedChange={setIsDetailed}
        isUpdating={isUpdating}
        disabled={isUpdating}
        onUpdate={updateAllBanners}
        gachaPromise={promise}
        refreshKey={refreshKey}
      />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            <p className="text-sm text-zinc-500">Loading gacha records...</p>
          </div>
        }
      >
        <GachaCardContent
          key={`content-${refreshKey}`}
          gachaPromise={promise}
          selectedQualities={selectedQualities}
          isDetailed={isDetailed}
        />
      </Suspense>
    </Card>
  );
}
