import { useLoaderData } from "react-router-dom";

import Posts from "../components/Posts";
import { getPosts } from "../util/api";

function BlogPostsPage() {
  // 자동으로 사용할 수 있게 된 데이터를 가져오기 위해선 새로운 useLoaderData hook 사용.
  const loaderData = useLoaderData();
  // react-router-dom이 제공하는 hook.
  // 이 훅은 loaderData에 접근할 수 있게 만들고,loader함수에 의해 데이터가 반환된다.
  // 만약 loader 함수가 promise를 반환한다면, promise가 완료되는 데이터

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Posts blogPosts={loaderData} />
    </>
  );
}

export default BlogPostsPage;

export function loader() {
  return getPosts(); // API가 반환하는 더미게시물. -> api.js에서 getPosts참고
}
// 데이터를 반환하는 함수. useEffect로 더이상받아오지 않아도 된다. 다만, loader함수만 있다고 받아올 순 없다.
// loader를 route에 등록하면 된다.
