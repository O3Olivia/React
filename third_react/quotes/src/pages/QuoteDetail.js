import { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  { id: "q1", author: "Olivia", text: "Learning React is Super Fun!!" },
  { id: "q2", author: "Rachel", text: "Learning React is Great" },
];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId); //params = URL

  if (!quote) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighLightedQuote text={quote.text} author={quote.author} />
      <Route path={`${match.path}`} exact>
        {/* exactly /comment 없으면 Load Comments가 보이고, 이걸로 Path가 정확하지 않으면 LoadComments가 안뜬다*/}
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            {/* url은 id값이 실제로 나오고 path는 그냥 quoteID로되어있어서 not found가뜬다. 정확한 id의 comment가 떠야하니까 정확한 ID값이 뜬 url을 사용 */}
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
      {/* <Route path="/quotes/:quoteId/comments" /> */}
    </Fragment>
  );
};

export default QuoteDetail;
