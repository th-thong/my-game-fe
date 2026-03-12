import { useImport } from "@/features/setting/hooks/useImport";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function ImportSource() {
  const { importData, isLoading } = useImport();
  const [activeSource, setActiveSource] = useState<"mywuwa" | "wuwatracker">(
    "mywuwa",
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(activeSource, file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      importData(activeSource, file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeSource === "mywuwa" ? "default" : "secondary"}
          size="sm"
          className="px-3"
          onClick={() => setActiveSource("mywuwa")}
          disabled={isLoading}
        >
          MyWuwa
        </Button>
        <Button
          variant={activeSource === "wuwatracker" ? "default" : "secondary"}
          size="sm"
          className="px-3"
          onClick={() => setActiveSource("wuwatracker")}
          disabled={isLoading}
        >
          Wuwatracker
        </Button>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-dashed bg-muted/20 transition-all cursor-pointer hover:bg-muted/50 ${
          dragActive ? "border-primary bg-primary/10" : "border-border"
        } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{ minHeight: 80 }}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept=".json"
          onChange={handleFileChange}
          aria-label={`Import ${activeSource} JSON file`}
        />
        <span className="text-xs text-muted-foreground text-center">
          Import file
          <br />
          <span className="opacity-70 mt-1 inline-block">
            (Selected: {activeSource === "mywuwa" ? "MyWuwa" : "Wuwatracker"})
          </span>
        </span>
      </div>
    </div>
  );
}
