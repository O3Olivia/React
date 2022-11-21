import classes from "./BoardDetail.module.css";

const BoardDetail = (props) => {
  return (
    <div className={classes.board_detail___form}>
      <h1>{props.title}</h1>
      <p>{props.author}</p>
      <p>{props.text}</p>
      <p>{props.date}</p>
    </div>
  );
};

export default BoardDetail;
