import classes from "./HighlightedQuote.module.css";
import { useHistory } from "react-router-dom";

const HighlightedQuote = (props) => {
  const history = useHistory();
  const deleteHandler = () => {
    const url = `https://react-http-2a48b-default-rtdb.asia-southeast1.firebasedatabase.app/quotes/${props.id}.json`;
    fetch(url, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Sth went wrong");
      }
      history.push("/quotes");
    });
    console.log(props.id);
  };
  return (
    <figure className={classes.quote}>
      <button onClick={deleteHandler}>DELETE</button>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
      <p>{props.date}</p>
    </figure>
  );
};

export default HighlightedQuote;
