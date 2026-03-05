import { HomePage } from "@/pages/HomePage";
import { MainLayout } from "@/layout/MainLayout";
import { AuthLayout } from "@/layout/AuthLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { Toaster } from "@/components/ui/sonner";
import { SettingsPage } from "@/pages/SettingPage";
import { GoogleCallback } from "@/components/GoogleCallback";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";

function App() {
  const initAuth = useUserStore((state) => state.initAuth);
  useEffect(() => {
    initAuth();
  }, []);
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
