import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  { id: "q1", author: "Olivia", text: "Learning React is Super Fun!!" },
  { id: "q2", author: "Rachel", text: "Learning React is Great" },
];

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId); //params = URL

  if (!quote) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighLightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
      {/* <Route path="/quotes/:quoteId/comments" /> */}
    </Fragment>
  );
};

export default QuoteDetail;
