import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function ImportSource() {
  return (
    <nav className="grid h-14 w-full items-center px-6 bg-background">
      <div className="flex justify-start">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className={navigationMenuTriggerStyle()}
              >
                Wuwatracker
              </NavigationMenuLink>
                            <NavigationMenuLink
                href="#"
                className={navigationMenuTriggerStyle()}
              >
                Other
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
