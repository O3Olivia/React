import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import BoardItem from "./BoardItem";
import LogContext from "../../store/log-context";
import classes from "./BoardList.module.css";

const sortBoards = (boards, ascending) => {
  console.log(boards.sort);
  return boards.sort((boardA, boardB) => {
    if (ascending) {
      return boardA.date > boardB.date ? 1 : -1;
    } else {
      return boardA.date < boardB.date ? 1 : -1;
    }
  });
};
const BoardList = (props) => {
  const logCtx = useContext(LogContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(navigate);
  console.log(location);

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedBoards = sortBoards(props.boards, isSortingAscending);

  const changeSortingHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (logCtx.isLoggedIn === true) setIsLoggedIn(true);
  }, [logCtx.isLoggedIn]);
  console.log(props);

  const boardList = sortedBoards.map((board) => (
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
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          {isSortingAscending ? "최신순" : "오래된순"}
        </button>
      </div>
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
