import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./components/Layout/Main";
import LoginPage from "./pages/loginPage";
import ProductPage from "./pages/productPage";
import BoardPage from "./pages/boardPage";
import AdminPage from "./pages/adminPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
