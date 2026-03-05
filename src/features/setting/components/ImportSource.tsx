import { useImport } from "@/features/setting/hooks/useImport";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function ImportSource() {
  const { importData, isLoading } = useImport();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) importData("wuwatracker", file);
  };

  return (
    <div className="flex gap-4 p-4 bg-muted/20 rounded-lg border border-dashed">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        aria-label="Import JSON file"
      />
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() => fileInputRef.current?.click()}
      >
        {isLoading ? "Importing..." : "Upload Wuwatracker JSON"}
      </Button>
      <Button variant="ghost" disabled>
        Other Source (Coming Soon)
      </Button>
    </div>
  );
}
