import { Outlet } from "react-router-dom";

export function LoginLayout() {
  return (
    <div className="dark flex min-h-screen w-full items-center justify-center bg-background p-4">

      <main className="flex-1 w-full overflow-y-auto">
          <Outlet /> 
      </main>

    </div>
  );
}