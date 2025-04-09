import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CasesPage from "./pages/CasesPage";
import CaseDetailPage from "./pages/CaseDetailPage";
import useAuthStore from "./store/useAuthStore";
import LoginForm from "./components/auth/login-form";


const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    isAuthenticated ?
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<CasesPage />} />
          </Route>
          <Route path="/cases/:id" element={<CaseDetailPage />} />
        </Routes>
      </BrowserRouter>
      : <LoginForm />
  )
};

export default App;
