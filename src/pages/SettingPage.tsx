import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { DataSetting } from "@/features/setting/components/DataSetting";
import { SettingSidebar } from "@/features/setting/components/SettingSidebar";

const SETTING_COMPONENTS: Record<string, React.ReactNode> = {
  "game-data": <DataSetting />,
};

export function SettingsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "game-data";

  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
        <SettingSidebar />
        <SidebarInset className="flex-1 p-3 pt-0">
          <div>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            {SETTING_COMPONENTS[category] || <DataSetting />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
