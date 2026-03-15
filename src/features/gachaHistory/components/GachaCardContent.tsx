import { use, useMemo } from "react";
import { CardContent } from "@/components/ui/card";
import { GachaTable } from "./GachaTable";
import { GachaAvatarList } from "./GachaAvatarList";
import type { GachaDataResult } from "../hooks/useGachaPromise";

interface GachaCardContentProps {
  gachaPromise: Promise<GachaDataResult>;
  selectedQualities: number[];
  isDetailed: boolean;
}

export function GachaCardContent({
  gachaPromise,
  selectedQualities,
  isDetailed,
}: GachaCardContentProps) {
  const { logs, storageKey, error } = use(gachaPromise);

  if (error) {
    return (
      <CardContent className="p-4 pt-4 text-center text-red-500">
        {error}
      </CardContent>
    );
  }

  const filteredLogs = useMemo(() => {
    return [...logs]
      .filter((item) => {
        if (!isDetailed && item.qualityLevel === 3) return false;
        return selectedQualities.includes(item.qualityLevel);
      })
      .reverse();
  }, [logs, selectedQualities, isDetailed]);
  return (
    <CardContent key={storageKey}>
      <div className="transition-all duration-100">
        {isDetailed ? (
          <GachaTable logs={filteredLogs} />
        ) : (
          <GachaAvatarList logs={filteredLogs} />
        )}
      </div>
    </CardContent>
  );
}
