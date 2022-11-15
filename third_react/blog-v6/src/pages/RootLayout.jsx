import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout({ children }) {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
        {/* 중첩된 모든 자식 컴포넌트가 렌더링 되어야하는 위치를 지정하기 위해 Outlet사용  */}
      </main>
    </>
  );
}

export default RootLayout;
