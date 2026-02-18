import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GameAccountCombobox } from "./GameAccountCombobox";
import { ImportSource } from "./ImportSource";

export function GameDataSetting() {
  const gameUIDList = useUserStore((state) => state.gameUIDList);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="px-0 space-y-6">
          <div className="dark bg-background">
            <GameAccountCombobox />
            <Button>Manage Account</Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Import URL</Label>
              <div className="flex w-full items-center space-x-2">
                <Input id="url" type="url" className="bg-muted/50" />
                <Button variant="outline">Import</Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4 flex flex-row">
            {gameUIDList.length > 0 ? (
              gameUIDList.map((uid) => (
                <div className="grid gap-2">
                  <Label htmlFor="url">OAUTH Code</Label>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      id="url"
                      type="url"
                      value={uid}
                      readOnly
                      className="bg-muted/50"
                    />
                    <Input
                      id="url"
                      type="url"
                      readOnly
                      className="bg-muted/50"
                    />
                    <Button variant="outline">Import</Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No game account</p>
            )}
          </div>
          <Separator />

          <div>
            <Label>Import from other source</Label>
            <ImportSource />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
