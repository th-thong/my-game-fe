import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/NavBar/NavBar";

export function MainLayout() {
  return (
    <div className="dark flex flex-col h-screen w-full bg-background text-foreground  overflow-hidden">
      <NavBar />

      <main className="flex-1 w-full overflow-y-auto">
          <Outlet /> 
      </main>

    </div>
  );
}