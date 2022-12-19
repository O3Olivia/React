import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import classes from "./BoardForm.module.css";

const BoardForm = (props) => {
  const titleInputRef = useRef();
  const textInputRef = useRef();
  const nowTime = moment().format("YYYY년 MM월 DD일");

  function submitHandler(e) {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredText = textInputRef.current.value;
    const enteredAuthor = localStorage.email.split("@", 1);

    props.onAddBoard({
      title: enteredTitle,
      text: enteredText,
      date: nowTime,
      author: enteredAuthor,
    });
  }
  const navigate = useNavigate();

  return (
    <Fragment>
      <form className={classes.boardForm} onSubmit={submitHandler}>
        <div className={classes.titleInfo}>
          <h1>자유주제</h1>
          <p>서로 예의를 지키며 존중하여 소통할 수 있는 공간을 만들어봐요</p>
        </div>
        <div className={classes.title}>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력하세요"
            ref={titleInputRef}
          />
          <p>{nowTime}</p>
        </div>
        <div className={classes.control}>
          <textarea
            id="text"
            rows="14"
            placeholder="- 자유롭게 글을 작성해보세요.&#13;&#10;- 서비스관련 문의는 1:1문의하기를 이용해주세요. "
            ref={textInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => {
              navigate("/boards");
            }}
          >
            취소
          </button>
          <button>등록</button>
        </div>
      </form>
    </Fragment>
  );
};

export default BoardForm;
