import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { useSheetClose } from "./NavBar";
import { cn } from "@/lib/utils";

const MENU = [
  { name: "Home", href: "/" },
  { name: "Setting", href: "/settings?category=game-data" },
];

export function Middle() {
  const location = useLocation();
  const closeSheet = useSheetClose();

  const handleClick = () => {
    closeSheet?.();
  };

  return (
    <div className="flex w-full md:w-auto md:justify-center">
      <NavigationMenu className="w-full md:w-auto px-0 max-w-full">
        <NavigationMenuList className="flex-col md:flex-row gap-2 items-start md:items-center w-full">
          {MENU.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                className={cn(navigationMenuTriggerStyle(), "w-full justify-start md:w-max md:justify-center")}
                active={location.pathname === item.href}
              >
                <Link to={item.href} onClick={handleClick}>
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
