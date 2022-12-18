import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  console.log(quotes.sort);
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  console.log(history);
  console.log(location);

  const queryParams = new URLSearchParams(location.search);
  // 브라우저에 원래 있는 함수로 React router나 react에서 오지 않는다. 자바스크립트의 기본 생성자 함수 겸 기본 class인데 브라우저에서 사용할 수 있다.

  const isSortingAscending = queryParams.get("sort") === "asc"; // sort는 search에서 key 이름임 key의 value가 asc와 같으면 true, 틀리면 false

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  }; // asc이면 desc로 바꿔주는 것
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
            date={quote.date}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
