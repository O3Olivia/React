import { Fragment } from "react";
import { useParams } from "react-router-dom";

const QuoteDetail = () => {
  const param = useParams();
  return (
    <Fragment>
      <h1>Quotes Detail Page!</h1>
      <p>{param.quoteId}</p>
    </Fragment>
  );
};

export default QuoteDetail;
