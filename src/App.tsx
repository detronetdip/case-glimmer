import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CasesPage from "./pages/CasesPage";
import CaseDetailPage from "./pages/CaseDetailPage";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CasesPage />} />
      </Route>
      <Route path="/cases/:id" element={<CaseDetailPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
