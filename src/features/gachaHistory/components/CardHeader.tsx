import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Loader2 } from "lucide-react";

interface FilterProps {
  selected: number[];
  onToggle: (quality: number) => void;
}

export function Filter({ selected, onToggle }: FilterProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      {[5, 4, 3].map((q) => (
        <div key={q} className="flex items-center gap-2">
          <Label>{q}</Label>
          <Checkbox
            className="h-4 w-4"
            checked={selected.includes(q)}
            onCheckedChange={() => onToggle(q)}
          />
        </div>
      ))}
    </div>
  );
}

export function SwitchView() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="datailed-view" />
      <Label htmlFor="datailed-view">Detailed View</Label>
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
}

export function GachaCardHeader({
  selectedQualities,
  onToggle,
  isDetailed,
  onDetailedChange,
  isUpdating,
  disabled,
  onUpdate,
}: GachaCardHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-end py-2 px-4 border-b border-zinc-800/50">
      <Filter selected={selectedQualities} onToggle={onToggle} />

      <div className="flex items-center space-x-2 px-3 py-1.5 ml-4">
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
          Detailed View
        </Label>
      </div>

      <Button variant="ghost" size="sm" onClick={onUpdate} disabled={disabled}>
        {isUpdating ? (
          <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
        ) : (
          <RefreshCw className="w-4 h-4" />
        )}
      </Button>
    </CardHeader>
  );
}
