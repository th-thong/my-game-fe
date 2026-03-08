import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { DataSetting } from "@/features/setting/components/DataSetting";
import { SettingSidebar } from "@/features/setting/components/SettingSidebar";

const SETTING_COMPONENTS: Record<string, React.ReactNode> = {
  "game-data": <DataSetting />,
};

const SETTING_TABS = [{ id: "game-data", label: "Game Data" }];

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "game-data";

  const handleTabChange = (tabId: string) => {
    setSearchParams({ category: tabId });
  };

  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
        <div className="hidden md:block">
          <SettingSidebar />
        </div>

        <SidebarInset className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="md:hidden flex gap-2 mb-6 -mx-4 px-4 overflow-x-auto pb-2">
              {SETTING_TABS.map((tab) => (
                <Button
                  key={tab.id}
                  variant={category === tab.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTabChange(tab.id)}
                  className="whitespace-nowrap"
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {SETTING_COMPONENTS[category] || <DataSetting />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
