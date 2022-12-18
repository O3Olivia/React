import classes from "./BoardItem.module.css";

const BoardItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <div>
          <p>{props.text}</p>
        </div>
        <p>{props.author}</p>
        <p>{props.date}데이터 </p>
      </figure>
    </li>
  );
};

export default BoardItem;
