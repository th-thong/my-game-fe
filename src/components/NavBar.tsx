import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, User, LogOut, Settings2 } from "lucide-react";
import ConveneBtnImg from "@/assets/ConveneBtn.png";

import { Button } from "@/components/ui/button";
import { GameAccountCombobox } from "@/components/GameAccountCombobox";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";



const ConveneIcon = ({ className, size = 40 }: { className?: string, size?: number | string }) => {
  return (
    <img
      src={ConveneBtnImg}
      alt="Convene"
      width={size}
      height={size}
      className={`object-contain ${className || ""}`}
    />
  );
};

const MENU = [
  { name: "Home", href: "/", icon: ConveneIcon },
  { name: "Setting", href: "/settings", icon: Settings2 },
];

const getTo = (href: string) =>
  href === "/settings" ? "/settings?category=game-data" : href;

function MobileMenu({ onClose }: { onClose: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-1 w-full">
      {MENU.map(({ name, href, icon: Icon }) => {
        const isActive =
          href === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(href);

        return (
          <Link
            key={name}
            to={getTo(href)}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50",
            )}
          >
            <Icon className={href === "/" ? "w-6 h-6 flex-shrink-0" : "w-4 h-4 flex-shrink-0"} />
            {name}
          </Link>
        );
      })}
    </div>
  );
}

function DesktopNavLinks() {
  const location = useLocation();

  return (
    <>
      {MENU.map(({ name, href, icon: Icon }) => {
        const isActive =
          href === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(href);

        return (
          <NavigationMenuItem key={name}>
            <Link
              to={getTo(href)}
              className={cn(
                "flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors border-b-2",
                isActive
                  ? "border-b-zinc-100 text-zinc-100"
                  : "border-b-transparent text-zinc-400 hover:text-zinc-200",
              )}
            >
              <Icon className={href === "/" ? "w-6 h-6 flex-shrink-0" : "w-4 h-4 flex-shrink-0"} />
              <span>{name}</span>
            </Link>
          </NavigationMenuItem>
        );
      })}
    </>
  );
}

function NavActions({ hideCombobox }: { hideCombobox?: boolean }) {
  const { isLoggedIn, isLoading } = useUserStore();

  return (
    <div className="flex justify-end gap-4 items-center">
      {!hideCombobox && <GameAccountCombobox />}
      {isLoading ? (
        <div className="w-16 h-8 bg-zinc-800 animate-pulse rounded-md" />
      ) : !isLoggedIn ? (
        <Button size="sm" asChild className="hidden md:flex">
          <Link to="/login">Login</Link>
        </Button>
      ) : null}
    </div>
  );
}

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);

  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="flex h-14 items-center px-4 md:px-6 md:max-w-7xl md:mx-auto md:w-full">
        {/* MOBILE LAYOUT */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center justify-center w-9 h-9 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[75vw] max-w-[280px] bg-zinc-950 border-zinc-800/60 p-0 flex flex-col"
            >
              <SheetHeader className="px-4 py-4 border-b border-zinc-800/60 text-left">
                <SheetTitle className="text-sm font-semibold text-zinc-100 tracking-tight">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-3 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-2 px-2">
                  Navigation
                </p>
                <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
              </div>

              {isLoggedIn && (
                <div className="px-3 pb-6 pt-3 border-t border-zinc-800/60 flex-shrink-0">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-md text-sm text-red-400 hover:text-red-300 hover:bg-zinc-900 transition-colors"
                  >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    Sign out
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* User & Login Actions (Mobile) */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setAccountDialogOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            {!isLoggedIn && (
              <Button size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid md:grid-cols-3 w-full items-center gap-4">
          <div />
          <div className="flex justify-center items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex-row">
                <DesktopNavLinks />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <NavActions />
        </div>
      </div>

      {/* Mobile Dialog */}
      <Dialog open={accountDialogOpen} onOpenChange={setAccountDialogOpen}>
        <DialogContent className="bg-zinc-950 text-zinc-100 border-zinc-800/60">
          <DialogHeader>
            <DialogTitle>Choose UID</DialogTitle>
          </DialogHeader>
          <div className="w-full pt-4">
            <GameAccountCombobox
              onSelectionChange={() => setAccountDialogOpen(false)}
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
