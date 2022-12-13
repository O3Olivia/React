import { useNavigate, useLocation, Link } from "react-router-dom";
import BoardItem from "./BoardItem";
import classes from "./BoardList.module.css";

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
  const navigate = useNavigate();
  const location = useLocation();

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
        <Link
          to="/create-board
        "
        >
          <button>글쓰기</button>
        </Link>
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
