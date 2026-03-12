import { useUserStore } from "@/store/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const data = {
  navMain: [{ title: "Game Data", url: "/settings?category=game-data" }],
};

interface SettingNavBarProps {
  currentCategory: string;
}

export function SettingNavBar({ currentCategory }: SettingNavBarProps) {
  const logout = useUserStore((state) => state.logout);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-end justify-between border-b pb-0 pr-4 mt-6">
      <nav className="flex gap-6 overflow-x-auto w-full no-scrollbar">
        {data.navMain.map((item) => {
          const isActive = currentCategory === item.url.split("=")[1];

          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "text-sm font-medium pb-2 border-b-2 transition-colors whitespace-nowrap",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      {isLoggedIn && (
        <div className="pb-2 shrink-0 ml-4 hidden sm:block">
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 px-3"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
