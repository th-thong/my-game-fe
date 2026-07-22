import { useState } from "react";
import { useImport } from "@/features/setting/hooks/useImport";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GameAccountData } from "./GameAccountData";
import { ImportSource } from "@/features/setting/components/ImportSource";
import { ImportField } from "@/components/ImportField";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const KURO_PS_COMMAND =
  'iwr -UseBasicParsing -Headers @{"User-Agent"="Mozilla/5.0"} https://raw.githubusercontent.com/wuwatracker/wuwatracker/747a48b1b994baa9c372a4fb933ea7588428bd4b/import.ps1 | iex';

export function DataSetting() {
  const { importData, isLoading } = useImport();
  const [urlInput, setUrlInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleImportKuro = () => {
    if (!urlInput) return;
    importData("kuro", urlInput);
    setUrlInput("");
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(KURO_PS_COMMAND);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="px-0 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Label>Import URL (Kuro)</Label>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-muted/50 rounded-md px-3 py-2 break-all select-all">
                {KURO_PS_COMMAND}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCommand}
                className="shrink-0 gap-1.5"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <ImportField
            id="import-url-kuro"
            label="Paste URL"
            value={urlInput}
            onChange={setUrlInput}
            onImport={handleImportKuro}
            isLoading={isLoading}
          />

          <Separator />
          <div className="flex flex-col gap-4 items-start min-w-[220px]">
            <ImportSource />
          </div>
          <Separator />
          <div className="flex-1">
            <GameAccountData />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
