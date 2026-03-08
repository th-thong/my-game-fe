import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { GameAccountCombobox } from "@/components/GameAccountCombobox";
import { useSheetClose } from "./NavBar";

interface RightProps {
  hideCombobox?: boolean;
}

export function Right({ hideCombobox }: RightProps) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isLoading = useUserStore((state) => state.isLoading);

  const navigate = useNavigate();
  const closeSheet = useSheetClose();

  const handleSetting = () => {
    navigate("/settings?category=game-data");
    closeSheet?.();
  };

  return (
    <div className="flex justify-end gap-4 items-center">
      {!hideCombobox && <GameAccountCombobox />}
      {isLoading ? (
        <div className="w-15 h-8 bg-muted animate-pulse rounded-md" />
      ) : isLoggedIn ? (
        <Button size="sm" variant="ghost" onClick={handleSetting}>
          Setting
        </Button>
      ) : (
        <Button size="sm" asChild>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
