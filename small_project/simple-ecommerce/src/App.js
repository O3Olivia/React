import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./components/Layout/Main";
import LoginPage from "./pages/loginPage";
import ProductPage from "./pages/productPage";
import BoardPage from "./pages/board/boardPage";
import AdminPage from "./pages/adminPage";
import CartPage from "./pages/cartPage";
import NewBoard from "./pages/board/NewBoardPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/create-board" element={<NewBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
