import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ReadOnlyInputProps {
  label: string;
  value: string;
  className?: string;
  inputClassName?: string;
}

export function ReadOnlyInput({
  label,
  value,
  className,
  inputClassName,
}: ReadOnlyInputProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <Input
        value={value}
        readOnly
        className={cn(
          "bg-background/50 h-10 font-mono text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default",
          inputClassName,
        )}
      />
    </div>
  );
}
