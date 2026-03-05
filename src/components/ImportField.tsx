import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ImportFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onImport: () => void;
  isLoading?: boolean;
  buttonText?: string;
  loadingText?: string;
}

export function ImportField({
  id,
  label,
  placeholder = "https://...",
  value,
  onChange,
  onImport,
  isLoading = false,
  buttonText = "Import",
  loadingText = "Importing...",
}: ImportFieldProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex w-full items-center space-x-2">
          <Input
            id={id}
            type="url"
            placeholder={placeholder}
            className="bg-muted/50"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
          />
          <Button
            variant="outline"
            onClick={onImport}
            disabled={isLoading || !value.trim()}
            className="min-w-[100px]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? loadingText : buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
