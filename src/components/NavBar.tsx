import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { GameAccountCombobox } from "./GameAccountCombobox";

export function NavBar() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)

  const navigate = useNavigate();

  const handleSetting = () => {
    navigate("/settings");
  };

  return (
    <nav className="grid grid-cols-3 h-14 w-full items-center px-6 bg-background">
      <div className="flex justify-start">
        {/* <img src={logo} className="h-8" /> */}
      </div>

      <div className="flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex justify-end gap-4">
        <GameAccountCombobox></GameAccountCombobox>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Button size="sm" variant="ghost" onClick={handleSetting}>
              Setting
            </Button>
          </div>
        ) : (
          <Button size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
