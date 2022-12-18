import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BoardItem from "./BoardItem";
import LogContext from "../../store/log-context";
import classes from "./BoardList.module.css";

const BoardList = (props) => {
  const logCtx = useContext(LogContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (logCtx.isLoggedIn === true) setIsLoggedIn(true);
  }, [logCtx.isLoggedIn]);
  console.log(props);
  const boardList = props.boards.map((board) => (
    <BoardItem
      id={board.id}
      key={board.id}
      title={board.title}
      text={board.text}
      date={board.date}
      author={board.author}
    />
  ));
  console.log(props.boards);
  return (
    <div className={classes.board_form}>
      <div>
        {isLoggedIn ? (
          <Link
            to="/create-board
        "
          >
            <button>글쓰기</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>로그인</button>
          </Link>
        )}
      </div>
      <ul className={classes.list}>{boardList}</ul>
    </div>
  );
};

export default BoardList;
