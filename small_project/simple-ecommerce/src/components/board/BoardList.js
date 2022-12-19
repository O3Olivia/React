import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import BoardItem from "./BoardItem";
import LogContext from "../../store/log-context";
import classes from "./BoardList.module.css";
import { HiOutlineChevronDown, HiChevronUp } from "react-icons/hi2";

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
      <div className={classes.header}>
        <h1>커뮤니티</h1>
        <p>패션을 넘어서 다양한 이야기를 이웃과 함께 나누어요.</p>
      </div>
      <div className={classes.body}>
        <div className={classes.sorting}>
          <button onClick={changeSortingHandler}>
            {isSortingAscending ? (
              <span>
                최신순
                <HiOutlineChevronDown />
              </span>
            ) : (
              <span>
                오래된순
                <HiChevronUp />
              </span>
            )}
          </button>
        </div>
        <div className={classes.writing}>
          {isLoggedIn ? (
            <Link
              to="/create-board
        "
            >
              <button>글쓰기</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>글쓰기</button>
            </Link>
          )}
        </div>
      </div>
      <div className={classes.lists}>
        <ul className={classes.list}>{boardList}</ul>
      </div>
    </div>
  );
};

export default BoardList;
