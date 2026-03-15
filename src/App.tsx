import { HomePage } from "@/pages/HomePage";
import { MainLayout } from "@/layout/MainLayout";
import { AuthLayout } from "@/layout/AuthLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { Toaster } from "@/components/ui/sonner";
import { SettingsPage } from "@/pages/SettingPage";
import { useUserStore } from "./store/useUserStore";
import { TermsOfServicePage } from "@/pages/TermsOfServicePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { useEffect } from "react";

function App() {
  const initAuth = useUserStore((state) => state.initAuth);
  const isLoading = useUserStore((state) => state.isLoading);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
