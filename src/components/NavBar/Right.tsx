import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { GameAccountCombobox } from "@/components/GameAccountCombobox";

interface RightProps {
  hideCombobox?: boolean;
}

export function Right({ hideCombobox }: RightProps) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isLoading = useUserStore((state) => state.isLoading);

  return (
    <div className="flex justify-end gap-4 items-center">
      {!hideCombobox && <GameAccountCombobox />}
      {isLoading ? (
        <div className="w-15 h-8 bg-muted animate-pulse rounded-md" />
      ) : !isLoggedIn ? (
        <Button size="sm" asChild className="hidden md:flex">
          <Link to="/login">Login</Link>
        </Button>
      ) : null}
    </div>
  );
}
