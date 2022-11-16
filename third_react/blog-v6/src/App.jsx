import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage, { loader as blogPostsLoader } from "./pages/BlogPosts";
// BlogPost에서 export했던 loader를 이렇게 불러온다. 대신 loader의 종류가 많아지기 때문에 헤깔리지 않도록 이름을 따로 지정.
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import PostDetailPage, { loader as blogDetailLoader } from "./pages/PostDetail";
import { action as newsletterAction } from "./pages/Newsletter";
import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";
import ErrorPage from "./pages/Error";
import DeferredBlogPostsPage, {
  loader as deferredBlogPostsPageLoader,
} from "./pages/DeferredBlogPosts";
import NewsletterSignup from "./components/NewsletterSignup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "/blog",
        element: <BlogLayout />,
        children: [
          {
            index: true,
            element: <DeferredBlogPostsPage />,
            loader: deferredBlogPostsPageLoader,
          },
          {
            path: ":id",
            element: <PostDetailPage />,
            loader: blogDetailLoader,
          },
        ],
      },
      {
        path: "/blog/new",
        element: <NewPostPage />,
        action: newPostAction,
      },
    ],
  },
  {
    path: "/newsletter",
    action: newsletterAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
