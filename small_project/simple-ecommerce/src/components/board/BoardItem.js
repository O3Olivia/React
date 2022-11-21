import { Link } from "react-router-dom";

import classes from "./BoardItem.module.css";

const BoardItem = (props) => {
  return (
    <Link to={`/boards/${props.id}`}>
      <li className={classes.item}>
        <div className={classes.contents}>
          <h2>{props.title}</h2>
          <p>{props.text}</p>
        </div>
        <div className={classes.author}>
          <p>{props.author}</p>
          <p>{props.date}</p>
        </div>
      </li>
    </Link>
  );
};

export default BoardItem;
