import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { GachaStatistic } from "./GachaStatistic";
import type { GachaDataResult } from "../hooks/useGachaPromise";

interface FilterProps {
  selected: number[];
  onToggle: (quality: number) => void;
  availableQualities: number[];
}

export function Filter({
  selected,
  onToggle,
  availableQualities,
}: FilterProps) {
  return (
    <div className="flex flex-row items-center gap-2 max-w-full scrollbar-hide">
      {availableQualities.map((q) => (
        <div key={q} className="flex items-center gap-2 shrink-0">
          <Checkbox
            id={`quality-${q}`}
            className="h-4 w-4"
            checked={selected.includes(q)}
            onCheckedChange={() => onToggle(q)}
          />
          <Label htmlFor={`quality-${q}`}>{q}</Label>
        </div>
      ))}
    </div>
  );
}

interface GachaCardHeaderProps {
  selectedQualities: number[];
  onToggle: (q: number) => void;
  isDetailed: boolean;
  onDetailedChange: (v: boolean) => void;
  isUpdating: boolean;
  disabled: boolean;
  onUpdate: () => void;
  gachaPromise: Promise<GachaDataResult>;
  refreshKey: number;
  bannerId: number;
}

export function GachaCardHeader({
  selectedQualities,
  onToggle,
  isDetailed,
  onDetailedChange,
  isUpdating,
  disabled,
  onUpdate,
  gachaPromise,
  refreshKey,
  bannerId,
}: GachaCardHeaderProps) {
  return (
    <CardHeader>
      <div className="flex flex-col xl:flex-row xl:justify-between items-center gap-2 w-full max-w-full overflow-hidden">
        <div className="w-full xl:w-auto max-w-full overflow-x-auto scrollbar-hide flex justify-center xl:justify-start xl:text-left">
          <Suspense
            fallback={
              <div className="h-[42px] px-4 py-2 rounded-lg border border-zinc-800 inline-flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
                <span className="ml-2 text-xs text-zinc-500">
                  Loading stats...
                </span>
              </div>
            }
          >
            <GachaStatistic
              key={`stat-${refreshKey}`}
              gachaPromise={gachaPromise}
              bannerId={bannerId}
            />
          </Suspense>
        </div>

        <div className="flex flex-row items-center justify-center xl:justify-end gap-2 w-full xl:w-auto overflow-x-auto scrollbar-hide pb-1">
          <div className="shrink-0">
            <Filter
              selected={selectedQualities}
              onToggle={onToggle}
              availableQualities={isDetailed ? [5, 4, 3] : [5, 4]}
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Switch
              id="view-mode"
              checked={isDetailed}
              onCheckedChange={onDetailedChange}
              className="border-none shadow-none"
            />
            <Label
              htmlFor="view-mode"
              className="text-xs font-medium cursor-pointer select-none text-zinc-300"
            >
              Detail
            </Label>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onUpdate}
            disabled={disabled}
            className="shrink-0"
          >
            {isUpdating ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}
