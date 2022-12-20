import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered">No quote found!</p>;
  }

  return (
    <Fragment>
      <HighLightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
        date={loadedQuote.date}
        id={loadedQuote.id}
      />
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
