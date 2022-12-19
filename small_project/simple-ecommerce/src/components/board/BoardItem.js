import classes from "./BoardItem.module.css";

const BoardItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <div>
          <p>{props.title}</p>
          <p>{props.text}</p>
        </div>
        <p>{props.author}</p>
        <p>{props.date}</p>
      </figure>
    </li>
  );
};

export default BoardItem;
