import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./components/Layout/Main";
import LoginPage from "./pages/loginPage";
import ProductPage from "./pages/productPage";
import BoardPage from "./pages/board/boardPage";
import AdminPage from "./pages/adminPage";
import CartPage from "./pages/cartPage";
import LoadingSpin from "./components/Layout/LoadingSpin";

const NewBoard = React.lazy(() => import("./pages/board/NewBoardPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpin />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/boards" element={<BoardPage />} />
          <Route path="/create-board" element={<NewBoard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
