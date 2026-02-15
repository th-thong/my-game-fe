import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="flex h-14 w-full items-center border-b px-6 bg-background shadow-none">
      
      <NavigationMenu>

        <NavigationMenuList className="gap-2">
          
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto">
        <Button size="sm" asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
      
    </nav>
  );
}