import { useImport } from "@/features/setting/hooks/useImport";
import { useRef, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";

export function ImportSource() {
  const { importData, isLoading } = useImport();
  const [activeSource, setActiveSource] = useState<"mywuwa" | "wuwatracker">(
    "mywuwa",
  );

  const importSourceList = [
    { label: "MyWuwa", value: "mywuwa" },
    { label: "Wuwatracker", value: "wuwatracker" },
  ];
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
    <div className="w-full ">
      <div className="flex justify-between gap-2 mb-4">
        <span className="text-sm font-semibold flex items-center">
          Import File
        </span>
        <div className="min-w-[180px]">
          <Combobox
            value={activeSource}
            inputValue={
              importSourceList.find((s) => s.value === activeSource)?.label ||
              ""
            }
            onValueChange={(val) =>
              setActiveSource(val as "mywuwa" | "wuwatracker")
            }
            items={importSourceList}
          >
            <ComboboxInput placeholder="Select Source" readOnly={true} />
            <ComboboxContent>
              <ComboboxEmpty>No sources found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-dashed bg-muted/10 transition-all cursor-pointer hover:bg-muted/50 ${
          dragActive ? "border-primary bg-muted/10" : "border-border"
        } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{ minHeight: 80 }}
      >
        <input
          id={`import-${activeSource}-file`}
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
            (Selected:{" "}
            {importSourceList.find((s) => s.value === activeSource)?.label})
          </span>
        </span>
      </div>
    </div>
  );
}
