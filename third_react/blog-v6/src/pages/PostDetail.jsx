import { useLoaderData } from "react-router-dom";

import BlogPost from "../components/BlogPost";
import NewsletterSignup from "../components/NewsletterSignup";
import { getPost } from "../util/api";

function PostDetailPage() {
  const postData = useLoaderData(); // postData를 받기

  return (
    <>
      <BlogPost title={postData.title} text={postData.body} />
      <NewsletterSignup />
    </>
  );
}

export default PostDetailPage;

export function loader({ params }) {
  const postId = params.id;
  return getPost(postId); // id가 필요한 것
}
