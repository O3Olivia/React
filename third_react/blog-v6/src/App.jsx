import {
  RouterProvider,
  createBrowserRouter,
  Route,
  Routes,
  createRoutesFromElements,
} from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage, { loader as blogPostsLoader } from "./pages/BlogPosts";
// BlogPost에서 export했던 loader를 이렇게 불러온다. 대신 loader의 종류가 많아지기 때문에 헤깔리지 않도록 이름을 따로 지정.
import NewPostPage from "./pages/NewPost";
import PostDetailPage, { loader as blogDetailLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      {/* 대빵 */}

      <Route index element={<WelcomePage />} />
      {/* /만 있으면 index 방문, /blog있으면 아래 blog 방문 */}
      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
        <Route
          path=":id"
          element={<PostDetailPage />}
          loader={blogDetailLoader}
          // errorElement={
          //   <p>
          //     Opps!
          //     <br /> An Error Occurred!
          //   </p>
          // }
          // errorElement는 데이터 로딩 중 오류가 생겼을 때 무엇을 표시하는지 설정함. -> 이렇게 작성해도 되고, 부모 라우트에 errorElement로 해서 errorPage컴포넌트를 만들어도 된다.
        />
      </Route>
      <Route path="/blog/new" element={<NewPostPage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />

    // v6.4에서 나옴. BlogPosts에서 export했던 loader 함수를 prop으로 받음. blogPostsLoader로 BlogPosts에서 내보낸 함수가 loader prop에 지정된 것 -> router로 탐색하면 자동으로 해당 함수를 호출하고 loader함수가 반환하는 데이터를 자동으로 가져와서 함수형 컴포넌트에서 사용할 수 있도록 함
  );
}

export default App;
