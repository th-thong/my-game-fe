import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { DataSetting } from "@/features/setting/components/DataSetting";
import { SettingNavBar } from "@/features/setting/components/SettingNavBar";
import { useUserStore } from "@/store/useUserStore";

const SETTING_COMPONENTS: Record<string, React.ReactNode> = {
  "game-data": <DataSetting />,
};

export function SettingsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "game-data";
  const logout = useUserStore((state) => state.logout);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return (
    <div className="flex w-full h-full justify-center overflow-auto p-4 md:p-6 lg:p-10 hide-scrollbar">
      <div className="width-full max-w-4xl mx-auto w-full flex flex-col pt-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Settings</h1>

        <SettingNavBar currentCategory={category} />

        <div className="mt-8">
          {SETTING_COMPONENTS[category] || <DataSetting />}
        </div>

        {isLoggedIn && (
          <div className="mt-12 sm:hidden pb-8">
            <Button variant="destructive" className="w-full" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
