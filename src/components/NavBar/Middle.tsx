import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { useSheetClose } from "./NavBar";

const MENU = [{ name: "Home", href: "/" }];

export function Middle() {
  const location = useLocation();
  const closeSheet = useSheetClose();

  const handleClick = () => {
    closeSheet?.();
  };

  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          {MENU.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
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
