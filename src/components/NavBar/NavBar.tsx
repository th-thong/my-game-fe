import { Middle } from "@/components/NavBar/Middle";
import { Right } from "@/components/NavBar/Right";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, createContext, useContext } from "react";
import { GameAccountCombobox } from "@/components/GameAccountCombobox";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";

const SheetCloseContext = createContext<(() => void) | null>(null);

export function useSheetClose() {
  return useContext(SheetCloseContext);
}

export function NavBar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleComboboxChange = () => {
    setSheetOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setSheetOpen(false);
  };

  const closeSheet = () => {
    setSheetOpen(false);
  };

  return (
    <SheetCloseContext.Provider value={closeSheet}>
      <nav className="flex justify-between items-center h-14 w-full px-4 md:px-6 md:grid md:grid-cols-3">
        <div className="md:hidden flex items-center">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className="text-zinc-400 hover:text-zinc-100"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[250px] sm:w-[300px] border-r border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md p-6 flex flex-col"
              aria-describedby={undefined}
            >
              <SheetTitle className="text-left mb-6 text-zinc-100">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col items-start w-full">
                  <GameAccountCombobox
                    onSelectionChange={handleComboboxChange}
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <Middle />
                </div>
                <div className="flex flex-col items-start w-full [&>div]:flex-col [&>div]:items-start [&>div]:justify-start [&>div]:gap-4 [&>div]:w-full">
                  <Right hideCombobox />
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-zinc-800">
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex col-start-2 justify-center">
          <Middle />
        </div>

        <div className="hidden md:flex col-start-3 justify-end items-center">
          <Right />
        </div>
      </nav>
    </SheetCloseContext.Provider>
  );
}
