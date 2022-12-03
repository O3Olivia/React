import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import WelcomePage from "./pages/WelcomePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {/* 만약 사용자가 로그인 상태가 아니면 비밀번호 변경 페이지로 못들어가도록 함. */}
        {authCtx.isLoggedIn && (
          <Route path="/profile" element={<UserProfile />} />
        )}

        {/* 만약 사용자가 로그인 상태가 아닌데 profile로 들어가거나 변경화면에서 로그아웃할경우, 메인으로 돌아감 = 접근 불가 */}

        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
