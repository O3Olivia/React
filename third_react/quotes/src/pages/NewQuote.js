import { useHistory } from "react-router-dom";
// useHistory: 브라우저의 history를 변경할 수 있다

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);

    history.push("/quotes");
    // push = back button누르면 이전 페이지로 돌아갈 수 있다. (like add new page)
    // replace = back button 눌러도 이전 페이지로 돌아갈 수 없다. (like redirection)

    // add페이지에서 add quote 버튼 누르면 바로 다른 페이지로 이동하려고
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
