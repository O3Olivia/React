import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// useHistory: 브라우저의 history를 변경할 수 있다

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
    // push = back button누르면 이전 페이지로 돌아갈 수 있다. (like add new page)
    // replace = back button 눌러도 이전 페이지로 돌아갈 수 없다. (like redirection)

    // add페이지에서 add quote 버튼 누르면 바로 다른 페이지로 이동하려고
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
