import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;
