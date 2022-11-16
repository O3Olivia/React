import { Suspense } from "react";

import { useLoaderData, defer, Await } from "react-router-dom";

import Posts from "../components/Posts";
import { getSlowPosts } from "../util/api";

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        {/* Await컴포넌트를 사용하려면 Suspense컴포넌트를 래핑해야한다. */}
        {/* defer로 느리게 연기했던 함수를 전달하여 Await 컴포넌트에서 resolve를 대기한다  + 만약 로딩이 실패할 경우를 대비하여 errorElement를 추가한다 */}
        <Await
          resolve={loaderData.posts}
          errorElement={<p>Error Loading Blog Posts.</p>}
        >
          {/* Await 컴포넌트 사이에 보여줄 부분 입력하기. */}
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
}
// 이렇게 Suspense, Await을 이용하면 페이지 전체가 로딩하는 것이 아니라 일부만 로딩되어 다른 나머지 페이지들은 미리 보여주게 된다.

export default DeferredBlogPostsPage;

export async function loader() {
  return defer({ posts: getSlowPosts() }); // 느리게 작동하는 함수-> 백엔드에 요청을 아주 느리게 보냄 -> api를 보면 요청을 전송하기 전, 약 2초간 실행을 멈추도록 설정 => defer

  // 만약, return defer({ posts: await getSlowPosts() }); 처럼 await를 추가하면, 페이지 전체가 보이지 않고, await가 없으면 설정한 부분만 보이지 않는다. (다른 부분은 보여짐 => 리액트 라우터에게 함수 실행이 완료될 때까지 페이지 로딩을 연기하지 말고, 우선 페이지를 보여준 뒤 패치가 다 완료되면 페이지에 나타나라고 하는 것 )
  // 다른 부분 추가하고 싶으면, return defer({ posts: getSlowPosts, (). abc: ... });
}
