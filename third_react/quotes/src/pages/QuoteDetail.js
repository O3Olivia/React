import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";

import Comments from "../components/comments/Comments";

const QuoteDetail = () => {
  const param = useParams();
  return (
    <Fragment>
      <h1>Quotes Detail Page!</h1>
      <p>{param.quoteId}</p>
      <Route path={`/quotes/${param.quoteId}/comments`}>
        <Comments />
      </Route>
      {/* <Route path="/quotes/:quoteId/comments" /> */}
    </Fragment>
  );
};

export default QuoteDetail;
