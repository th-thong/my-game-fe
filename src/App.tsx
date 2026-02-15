import { HomePage } from "@/pages/HomePage"
import { MainLayout } from "@/layout/MainLayout"
import { AuthLayout } from "@/layout/AuthLayout"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage"
import {SignUpPage} from "@/pages/SignupPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;