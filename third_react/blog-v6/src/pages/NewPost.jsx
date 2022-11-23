import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { savePost } from "../util/api";

function NewPostPage() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {data && data.isError && <p>{data.message}</p>}
      {/* 데이터가 셋팅되었고 && 설정된 데이터가 오류상태면  && message를 출력 */}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === "submitting"}
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request }) {
  // 생성된 request객체에는 form(NewPostForm)에서 제출된 데이터를 포함하고 있다.
  // 따라서 input값으로 지정된 name을 이용해 데이터를 추출할 수 있다.

  // async를 적는 이유는 request 객체에 formData 메소드를 실행하여, Promise를 반환하고 await할거기 때문.
  const formData = await request.formData();
  const post = {
    title: formData.get("title"), // NewPostFrom에서 name의 값
    body: formData.get("post-text"),
  };
  try {
    savePost(post); // post는 문제가 생길 수 있기 때문에 try catch를 사용한다.
  } catch (error) {
    if (error.status === 422) {
      // 422: 유효성 오류
      return error; // throw하지 않고 return하면, 같은 페이지에 머물면서 redirect되지 않고 오류 페이지를 로딩하지 않는다.
    }
    throw error;
  }
  // try catch가 끝나면 백엔드에 게시물을 전송했다는 뜻이므로 사용자를 redirect해야한다. -> 게시물 올리면 blog페이지로 감
  return redirect("/blog");
}
