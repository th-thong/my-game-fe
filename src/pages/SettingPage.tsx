import { useSearchParams } from "react-router-dom";
import { SettingSidebar } from "@/components/SettingSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AccountSetting } from "@/components/AccountSetting";
import { GameDataSetting } from "@/components/DataSetting";

export function SettingsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
        <SettingSidebar />
        <SidebarInset className="flex-1 p-3 pt-0">
          <div>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            {category === "game-data" && <GameDataSetting/>}
            {!category && <AccountSetting/>}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}