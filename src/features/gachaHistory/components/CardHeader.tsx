import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function Filter() {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex items-center gap-2">
        <Label>5</Label>
        <Checkbox className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <Label>4</Label>
        <Checkbox className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <Label>3</Label>
        <Checkbox className="h-4 w-4" />
      </div>
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
