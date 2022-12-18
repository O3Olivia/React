import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BoardItem from "./BoardItem";
import classes from "./BoardList.module.css";
import LogContext from "../../store/log-context";
// const sortBoards = (boards, ascending) => {
//   return boards.sort((boardA, boardB) => {
//     if (ascending) {
//       return boardA.id > boardB.id ? 1 : -1;
//     } else {
//       return boardA.id < boardB.id ? 1 : -1;
//     }
//   });
// };

const BoardList = (props) => {
  const logCtx = useContext(LogContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (logCtx.isLoggedIn === true) setIsLoggedIn(true);
  }, [logCtx.isLoggedIn]);

  // const queryParams = new URLSearchParams(location.search);
  // const isSortingAscending = queryParams.get("sort") === "asc";
  // const sortedBoards = sortBoards(props.boards, isSortingAscending);

  // const changeSortingHandler = () => {
  //   navigate.push({
  //     pathname: location.pathname,
  //     search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
  //   });
  // };

  return (
    <div className={classes.board_form}>
      <div>
        {/* <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button> */}
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
      <ul>
        {/* {sortedBoards.map((board) => (
          <BoardItem
            key={board.id}
            id={board.id}
            uName={board.userEmail}
            content={board.content}
            date={board.date}
          />
        ))} */}
        <BoardItem />
      </ul>
    </div>
  );
};

export default BoardList;
