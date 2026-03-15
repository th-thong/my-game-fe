import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 rounded-full"
        asChild
      >
        <Link to="/">
          <X className="h-5 w-5" />
          <span className="sr-only">Back to Home</span>
        </Link>
      </Button>

      <main className="w-full max-w-100">
        <Outlet />
      </main>
    </div>
  );
}
