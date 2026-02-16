import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("access_token"),
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    window.location.reload();
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
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Button size="sm" onClick={handleLogout}>
              Logout
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
