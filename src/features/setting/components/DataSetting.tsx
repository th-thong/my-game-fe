import { useState } from "react";
import { useImport } from "@/features/setting/hooks/useImport";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GameAccountData } from "./GameAccountData";
import { ImportSource } from "@/features/setting/components/ImportSource";
import { ImportField } from "@/components/ImportField";

export function DataSetting() {
  const { importData, isLoading } = useImport();
  const [urlInput, setUrlInput] = useState("");

  const handleImportKuro = () => {
    if (!urlInput) return;
    importData("kuro", urlInput);
    setUrlInput("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="px-0 space-y-6">
          <ImportField
            id="import-url-kuro"
            label="Import URL (Kuro)"
            value={urlInput}
            onChange={setUrlInput}
            onImport={handleImportKuro}
            isLoading={isLoading}
          />

          <Separator />

          <GameAccountData />

          <Separator />

          <div className="space-y-4">
            <Label>Import from other sources</Label>
            <ImportSource />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
