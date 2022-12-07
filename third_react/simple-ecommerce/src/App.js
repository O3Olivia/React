import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./components/Layout/Main";
import LoginPage from "./pages/loginPage";
import ProductPage from "./pages/productPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
