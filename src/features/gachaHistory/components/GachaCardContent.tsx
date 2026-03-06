import type { GachaItem } from "../hooks/useGachaLog";
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { GachaTable } from "./GachaTable";
import { GachaAvatarList } from "./GachaAvatarList";

interface GachaCardContentProps {
  isInitialLoading: boolean;
  isDetailed: boolean;
  storageKey: string;
  logs: GachaItem[];
}

export function GachaCardContent({
  isInitialLoading,
  isDetailed,
  storageKey,
  logs,
}: GachaCardContentProps) {
  return (
    <CardContent className="p-4 pt-4" key={storageKey}>
      {isInitialLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <p className="text-sm text-zinc-500">Initializing database...</p>
        </div>
      ) : (
        <div className="transition-all duration-300">
          {isDetailed ? (
            <GachaTable logs={logs} />
          ) : (
            <GachaAvatarList logs={logs} />
          )}
        </div>
      )}
    </CardContent>
  );
}
