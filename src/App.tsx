import { HomePage } from "@/pages/HomePage"
import { MainLayout } from "@/layout/MainLayout"
import {LoginLayout} from "@/layout/LoginLayout"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<LoginLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;