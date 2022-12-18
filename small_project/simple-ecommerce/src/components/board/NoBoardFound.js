import { Link } from "react-router-dom";

import classes from "./NoBoardFound.module.css";

const NoBoardFound = () => {
  return (
    <div className={classes.noBoards}>
      <p>No quotes found!</p>
      <Link
        to="/create-board
        "
        className="btn"
      >
        등록하기
      </Link>
    </div>
  );
};

export default NoBoardFound;
