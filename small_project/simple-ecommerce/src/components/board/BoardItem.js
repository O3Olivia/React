import classes from "./BoardItem.module.css";

const BoardItem = (props) => {
  return (
    <li className={classes.item}>
      <div className={classes.contents}>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>
      <p>{props.author}</p>
      <p>{props.date}</p>
    </li>
  );
};

export default BoardItem;
