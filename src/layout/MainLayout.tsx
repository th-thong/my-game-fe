import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/NavBar/NavBar";
import { Footer } from "@/components/Footer";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <NavBar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
